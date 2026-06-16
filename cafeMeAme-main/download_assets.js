const fs = require('fs');
const https = require('https');
const path = require('path');

const assets = [
  'b1.png',
  'b2.png',
  'pieceCoffee1.svg',
  'pieceCoffee2.svg',
  'pieceCoffee3.svg',
  'pieceCoffee4.svg',
  'pieceCoffee5.svg',
  'cup1.png',
  'cup2-2.png',
  'cup3.png',
  'cup4.png',
  'sticker1-2.png',
  'sticker2-2.png',
  'sticker3-2.png',
  'coffee1.jpg',
  'coffee2.jpg',
  'logo2.png',
  'logo3.png',
  'icon.png'
];

const baseUrl = 'https://caffinity-omega.vercel.app/';
const publicDir = path.join(__dirname, 'public');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Starting assets download...');
  for (const asset of assets) {
    const url = baseUrl + asset;
    const dest = path.join(publicDir, asset);
    try {
      await download(url, dest);
      console.log(`Successfully downloaded: ${asset}`);
    } catch (err) {
      console.error(`Failed to download ${asset}: ${err.message}`);
    }
  }
  console.log('Finished downloading all assets!');
}

run();
