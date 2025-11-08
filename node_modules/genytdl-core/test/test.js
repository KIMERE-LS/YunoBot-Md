'use strict';

const { genyt } = require('..');
const url = 'https://www.youtube.com/watch?v=_pNOpd-5ffE';

(async () => {
    try {
        const result = await genyt(url);
        
        console.log('Primeiro resultado: ', result);
        console.log('Baixando áudio...');
        
        const link = await result.video.download();
        console.log(`Link:  ${link}`);
    } catch (e) {
        console.error(e);
    }
})();
