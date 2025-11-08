'use strict';

const { requestToServer, loadContent } = require('../global.js');
const DEFAULT_LANG = 'en';

const genyt = async (url, lang) => {
    try {
        if (url.startsWith('https') && url.includes('youtu')) {
            lang = lang || DEFAULT_LANG;
            
            let content = await requestToServer(url, lang);

            if (content) {
                content = loadContent(content);
                return content;
            }

            throw new Error('Data not found!');
        }

        throw new Error('Invalid URL');
    } catch (e) {
        throw new Error(e);
    }
};

exports.genyt = genyt;
