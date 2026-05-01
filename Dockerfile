FROM node:18-slim

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    libreoffice-calc \
    libreoffice-writer \
    pdftk \
    --no-install-recommends \
    && pip3 install openpyxl pypdf reportlab --break-system-packages \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
