const fs = require('fs');
const https = require('https');
const { execSync, spawn } = require('child_process');
const path = require('path');

const fileName = 'linux-amd64';
const url = `https://github.com/aldinokemal/go-whatsapp-web-multidevice/releases/download/v5.6.0/${fileName}`;
const filePath = path.join(__dirname, fileName);

// Cek apakah file sudah ada
if (fs.existsSync(filePath)) {
  console.log('File sudah ada, langsung menjalankan...');
  runBinary();
} else {
  console.log('Mengunduh file...');
  const file = fs.createWriteStream(filePath);

  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(() => {
        console.log('Unduhan selesai.');
        fs.chmodSync(filePath, 0o755); // chmod +x
        runBinary();
      });
    });
  }).on('error', (err) => {
    fs.unlinkSync(filePath);
    console.error('Gagal mengunduh file:', err.message);
  });
}

// Fungsi untuk menjalankan binary
function runBinary() {
  console.log('Menjalankan binary...');
  const proc = spawn(`./${fileName}`, { stdio: 'inherit' });

  proc.on('exit', (code) => {
    console.log(`Proses selesai dengan kode ${code}`);
  });
}
