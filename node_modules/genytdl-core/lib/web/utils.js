'use strict';

const { request } = require('undici');

//FastGenYT url stringify
exports.stringify = (params) => new URLSearchParams(params).toString();

//Default request options
exports.defaultRequestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36',
    },
};

//FastGenYT undici request
exports.request = async (url, options) => {
    const {
        requestOptions,
        jsonType
    } = options;
    const {
        statusCode,
        headers,
        body
    } = await request(url, requestOptions);

    const code = statusCode.toString();
    if (code.startsWith('2')) {
        if (jsonType === 'HEAD') return true;
        
        return jsonType ? body.json() : body.text();
    }
    if (code.startsWith('3')) {
        return exports.request(headers.location, options);
    }

    const e = new Error(`Request failed with code: ${code}`);
    e.statusCode = statusCode;
    throw e;
};
