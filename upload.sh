#!/bin/bash

# =========================
# CONFIGURAÇÕES
# =========================
REPO="KIMERE-LS/YunoBot-Md1"
# ⚠️ Altere para seu usuário/repositorio
COMMIT_MSG="Update Yuno v1.0.5"
# Mensagem do commit
BRANCH="main"
# Branch principal
DIR=$(pwd)
# Diretório atual
CYAN='\033[36m'
NC='\033[0m'
# Cor para os textos

# =========================
# VERIFICAÇÃO DO GIT
# =========================
echo "${CYAN}💻 Verificando Git..${NC}"
if ! command -v git &> /dev/null; then
echo "${CYAN}⚠️ Git não encontrado. Instalando...${NC}"
pkg update -y && pkg install git -y
else
echo "${CYAN}✅ Git encontrado!${NC}"
fi

# =========================
# INICIALIZAÇÃO DO REPO
# =========================
if [ ! -d "$DIR/.git" ]; then
echo "${CYAN}📂 Inicializando repositório Git..${NC}"
git init
else
echo "${CYAN}📂 Repositório Git já inicializado.${NC}"
fi

# =========================
# CONFIGURANDO safe.directory
# =========================
git config --global --add safe.directory "$DIR"
echo "${CYAN}🔒 Diretório configurado como seguro.${NC}"

# =========================
# CONFIGURANDO USUÁRIO
# =========================
git config --global user.name "KIMERE-LS"
git config --global user.email "playtube0077@gmail.com"
echo "${CYAN}📧 Usuário e email configurados (opcional).${NC}"

# =========================
# ADICIONANDO ARQUIVOS E COMMIT
# =========================
echo "${CYAN}➕ Adicionando arquivos (aguarde).${NC}"
git add .
echo "${CYAN}♻️  Arquivos adicionados..${NC}"
git commit -m "$COMMIT_MSG"
echo "${CYAN}📝 Commit realizado:${NC} $COMMIT_MSG"

# =========================
# PEGAR TOKEN NA HORA
# =========================
echo -n "${CYAN}🔑 Digite seu GitHub Personal Access Token:${NC} "
read TOKEN

# =========================
# ADICIONANDO REMOTO E PUSH
# =========================
git remote remove origin 2>/dev/null
git remote add origin https://$TOKEN@github.com/$REPO.git
git branch -M $BRANCH
echo "${CYAN}🚀 Enviando arquivos para GitHub..${NC}"
git push -u origin $BRANCH

echo "${CYAN}🎉 Upload concluído com sucesso!${NC}"
echo "${CYAN}💡 Lembre-se: configure REPO como seu usuario/repositorio antes de usar o script.${NC}"
