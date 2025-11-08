### GenYoutube downaloader 1.0 ☆ ###

Criado por Lm Only, o GenYoutube downloader é uma forma fácil de baixar vídeos ou áudios usando o link do vídeo do YouTube.

```Example
const { genyt } = require('genytdl-core');

genyt('https://youtube.com/watch?v=9g6F1D70cEM')
.then(result => {
    const audio = await result.audio.download();
    console.log(audio);
})
.catch(console.error);
```


### LICENSE

Projeto criado por Lm Only, todos os direitos reservados.