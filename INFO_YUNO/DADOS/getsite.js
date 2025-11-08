'use strict';
/**
 * Obtenha a source de um site HTML
 * Suporte a JS, CSS E HTML
 * Após é guardado tudo em 1 arquivo TXT
 * By Lm Only
 *
 * Lm não domina 
 * Nk devs modz domina
 */
 
const { writeFileSync } = require('fs');
const { get } = require('axios');
const { load } = require('cheerio');

async function getHtml(url) {
    try {
        const { 
            data 
        } = await get(url);
        
        const $ = load(data);
        
        let javascript = "\n\n//==JAVASCRIPT==\\\n\n", css = "\n\n//==CSS==\\\n\n", html = "\n\n<!--HTML-->\n\n" + data;
        
        $('script').each(function () {
            const element = $(this);
            javascript += "\n" + element.text();
        });
        
        $('style').each(function () {
            const element = $(this);
            css += "\n" + element.text();
        });
        
        const result = javascript + css + html;
        
        const fileName = `./source-${Date.now()}.txt`;
        
        writeFileSync(fileName, result);
        
        return fileName;
    } catch (e) {
        throw new Error(e);
    }
}

exports.getHtml = getHtml;
