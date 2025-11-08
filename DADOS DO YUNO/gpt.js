"use strict";

/**
 * Google gemini serach;
 * Full scraper 
 * By Lm Never dominah
 *
 * Dessa vez eu escolhi usar classe para 
 * para aprimorar
 */
const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Google URL 
 * affs 
 */
const BASE_URL = "https://www.google.com";

/**
 * Search in Google
 * @param {String} query
 * @return {String}
 */
class GoogleSearchIA {
    constructor(params) {
        this.params = params.replace("explique", "");
    }
    
    text() {
        return new Promise((resolve, reject) => {
            axios.get(`${BASE_URL}/search?q=${encodeURIComponent("Explique sobre " + this.params)}`, {
                headers: {
                    "user-agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36"
                }
            })
            .then((response) => {
                const html = cheerio.load(response.data);
                
                const fetchText = html('span[class="hgKElc"]').text();
                const result = {
                    status: response.status,
                    message: "OK",
                    criador: "Lm não domina",
                    result: {
                        text: fetchText || "Não entendi o assunto. Por favor explique melhor o que voce deseja buscar!"
                    }
                };
                
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}

module.exports = GoogleSearchIA;

