const fs = require("fs")
const sabrpg = JSON.parse(fs.readFileSync("./DADOS DO YUNO/usuarios/SystemRPG/sabrpg.json"));

exports.AdicionarGold = (UserID, ValorA) => {
userNumber = sabrpg.map(i => i.id).indexOf(UserID)
sabrpg[userNumber].money += Number(ValorA)
fs.writeFileSync("./DADOS DO YUNO/usuarios/SystemRPG/sabrpg.json", JSON.stringify(sabrpg))
}

exports.RemoverGold = (UserID, ValorR) => {
userNumber = sabrpg.map(i => i.id).indexOf(UserID)
sabrpg[userNumber].money -= Number(ValorR)
fs.writeFileSync("./DADOS DO YUNO/usuarios/SystemRPG/sabrpg.json", JSON.stringify(sabrpg))
}
   