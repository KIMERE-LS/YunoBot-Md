'use strict';

const {
    request,
    stringify,
    defaultRequestOptions,
} = require('./utils.js');

const requestToServer = async (url, lang) => {
    try {
        const payload = {
            url,
            ajax: 1,
            lang
        };
        const opts = {
            requestOptions: {
                ...defaultRequestOptions,
                body: stringify(payload),
            },
            jsonType: true,
        };
        const body = await request(`https://genyoutube.online/mates/en/analyze/ajax?retry=0&platform=youtube`, opts);

        return body.status === 'success' ? body.result : null;
    } catch (e) {
        throw new Error(`Erro ao fazer a requisição ao servidor para a URL: ${e.message}`);
    }
};
exports.requestToServer = requestToServer;

