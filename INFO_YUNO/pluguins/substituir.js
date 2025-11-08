'use strict';

const {
    writeFileSync,
    readFileSync,
    rm,
} = require('fs');

const remove = (directory) => new Promise(resolve => {
    rm(directory, {
        recursive: true
    }, (err) => {
        if (err) {
            resolve(false);
        } else {
            resolve(true);
        }
    });
});
exports.remove = remove;

const file = async (directory, buffer) => {
    try {
        const saveFile = readFileSync(directory);
        const isDelete = await remove(directory);
        
        if (!isDelete) {
            writeFileSync(directory, saveFile);
            throw new Error(`Falha ao exluir o diretório: ${directory}`);
        }
        
        writeFileSync(directory, buffer);
        return 'sucess';
    } catch (e) {
        throw e;
    }
};

exports.file = file;
