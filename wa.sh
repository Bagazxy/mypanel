#!/bin/bash

# Nama file yang akan disimpan
FILE_NAME="linux-amd64"
URL="https://github.com/aldinokemal/go-whatsapp-web-multidevice/releases/download/v5.6.0/$FILE_NAME"

# Cek apakah file sudah ada
if [ -f "$FILE_NAME" ]; then
    echo "File sudah ada, langsung menjalankan..."
else
    echo "File belum ada, mengunduh dari $URL..."
    curl -L -o "$FILE_NAME" "$URL"
    if [ $? -ne 0 ]; then
        echo "Gagal mengunduh file."
        exit 1
    fi
fi

# Ubah jadi executable
chmod +x "$FILE_NAME"

# Jalankan file
./"$FILE_NAME"
