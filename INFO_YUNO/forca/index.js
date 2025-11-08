'use strict';
/**
 * Joguinho da Forca
 * Criado 100% do zero por Lm
 * Espero que gostem
 * Código não tem 100% de certeza que vai dar certo 
 * Mas é pra facilitar mais o uso
 */
const { writeFileSync, readFileSync } = require('fs');

//Normalize uma String
function StringNormalize(query) {
    return query.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function WRT_FL(directory, database) {
    try {
        writeFileSync(directory, JSON.stringify(database, null, 2));
    } catch (error) {
        console.log(error);
    }
}
/**
 * Inicia um game com a sessão e a databse do jogo
 * Tema e dica não são opcionais
 *
 * @param {String} session - id da sessão para o game
 * @param {Object} params - A palavra para adivinhar
 */
function startSession(session, params) {
    try {
        if (!session || !params) {
            throw new Error('Requer a sessão e um objeto');
        }
        const word = params.palavra;
        const directory = `${params.path}/session-${session}.json`;
        
        const data = {
            session: directory,
            palavra: word,
            tema: params.tema,
            dica: params.dica,
            acertos: 0,
            erros: 0,
            ended: false,
            win: false,
            usado: [],
            letrasY: [...StringNormalize(word).split('')],
            letrasX: [...word.split('').map(letra => letra !== ' ' ? '_' : ' ')]
        };
        WRT_FL(directory, data);
        return data;
    } catch (error) {
        console.log(error);
    }
}
exports.startSession = startSession;
/**
 * Verificar se uma letra incluí ou não
 * Também suporta a palavra toda
 * Letra maiúscula ou minúscula 
 * Vai funcionar perfeitamente
 *
 * @param {String} session - sessão do game
 * @param {String} query - Letra ou palavra
 */
function verify(session, query, path) {
    try {
        if (!session || !query) {
            throw new Error('Parâmetro inválido');
        }
        if (typeof query !== 'string') {
            throw new Error('Query deve ser uma string');
        }
        const directory = `${path}/session-${session}.json`;
        const data = JSON.parse(readFileSync(directory));

        const queryToLC = StringNormalize(query).toLowerCase();
        if (query.length > 1) {
            const word_normalize = StringNormalize(data.palavra).toLowerCase();
            if (queryToLC === word_normalize) {
                data.win = true;
            }
            data.ended = true;
            return data;
        }

        let errou = true;
        if (data.letrasY.join('').toLowerCase().includes(queryToLC)) {
            data.letrasY.forEach((element, index) => {
                if (element.toLowerCase() === queryToLC) {
                    data.letrasX[index] = element;
                }
            });
            errou = false;
        }

        errou ? data.erros++ : data.acertos++;
        data.usado.push(queryToLC);
        data.ended = data.erros >= 6;

        if (data.letrasX.join('') === data.letrasY.join('')) {
            data.win = true;
            data.ended = true;
        }

        WRT_FL(directory, data);
        return data;
    } catch (error) {
        console.error(error);
    }
}
exports.verify = verify;
