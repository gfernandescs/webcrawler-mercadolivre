const axios = require('axios');
const cheerio = require('cheerio');

const fetchData = Symbol('fetchData');
const findProducts = Symbol('findProducts');

class IndexController {

    async searchProducts(req, res, next) {
        try {
            this._products = [];
            this._limit = req.body.limit;
            this._productToSearch = req.body.search.trim().replace(/ /g, "-");

            const resultData =
                await this[fetchData](`${process.env.URL_TO_SEARCH_MERCADO_LIVRE_PRODUCTS}/${this._productToSearch}`);

            await this[findProducts](resultData);

            console.log(`Search completed, ${this._products.length} products found\n`);

            res.status(200).json({
                count: this._products.length,
                products: this._products
            });
        } catch (e) {
            next(e);
        }
    }

    /**
     *
     * @param {String} url
     * @returns {Promise<any>}
     */
    async [fetchData](url) {
        console.log(`Fetching data ==> ${url}`);

        const result = await axios.get(url);

        return result.data;
    }

    /**
     *
     * @param data
     * @returns {Promise<[]>}
     */
    async [findProducts](data) {
        console.log(`Looking for ${this._limit} products`);

        const $ = cheerio.load(data);

        let count = $('.results-item').each((i, e) => {
            if (i + 1 > this._limit) {
                return false;
            }

            const productName = $(e).find('.main-title').text().trim();
            const productLink = $(e).find('.item__info-link').attr("href") || $(e).find('a').attr("href");
            const productPrice = $(e).find('.item__price').text().trim();
            const storeName = $(e).find('.item__brand').text().trim();
            const productState = $(e).find('.item__status').text().trim();

            this._products.push({
                name: productName,
                link: productLink,
                price: productPrice,
                store: storeName,
                state: productState
            })
        }).length;

        this._limit += -count;

        if (this._limit > 0) {
            const resultData =
                await this[fetchData](`${process.env.URL_TO_SEARCH_MERCADO_LIVRE_PRODUCTS}/${this._productToSearch}_Desde_${this._products.length + 1}`);

            await this[findProducts](resultData);
        }

        return this._products;
    }
}

module.exports = new IndexController();
