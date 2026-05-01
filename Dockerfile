FROM node:18-slim

# Installa Python, LibreOffice, pdftk e dipendenze
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-openpyxl \
    libreoffice-calc \
    libreoffice-writer \
    pdftk \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia package.json e installa dipendenze Node
COPY package*.json ./
RUN npm install --production

# Copia tutto il resto
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
