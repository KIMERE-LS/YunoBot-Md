'use strict';
/**
 * @license
 * Copyright 2024 Lm Only
 *
 * FastGenYT - Youtube DownLoad
 * Módulo GenYoutbe criado por Lm Only;
 * Obtenha audio ou vídeo do YouTube de graça;
 *
 * Rápido e eficiente.
 */
const { load } = require('cheerio');
const { convert } = require('./url-utils.js');

const loadContent = async (html) => {
    try {
        const $ = load(html);
        const mediaType = {
            video: {},
            audio: {}
        };
        
        $('.btn').each((index, element) => {
            const quality = $(element).data('ftype');
            const mediaUrl = $(element).attr('href');
            const type = quality === 'mp3' ? 'audio' : 'video';
            
            const data = {
                id: $(element).data('fid'),
                url: mediaUrl,
                ffid: $(element).data('ffid'),
            };
            
            mediaType[type] = {
                download: convert.bind(null, mediaUrl, data)
            };
        });

        return mediaType;
    } catch (e) {
        throw new Error(`Erro ao processar o conteúdo: ${e.message}`);
    }
};
exports.loadContent = loadContent;
