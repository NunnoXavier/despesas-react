# Usando a imagem oficial do Node.js
FROM node:18-alpine

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiando o package.json e o package-lock.json para o container
COPY package*.json ./

# Instalando as dependências do projeto
RUN npm install

# Copiando o restante do código da aplicação
COPY . .

# criando build na pasta dist
RUN npm run build

# Servindo a aplicação (usando um servidor HTTP estático)
# Você pode usar a ferramenta `serve` para servir o build estático
RUN npm install -g serve

# Expondo a porta onde o servidor Node.js irá rodar (por padrão, vamos usar a 3000)
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["serve", "-s", "dist", "-l", "3000"]
