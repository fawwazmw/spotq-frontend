const fs = require('fs');
const path = require('path');

// Direktori proyek
const projectDir = path.resolve('./src'); // Sesuaikan path ini dengan folder sumber Anda

// Regex untuk menemukan tag <img>
const imgRegex = /<img([^>]*)src="([^"]+)"([^>]*)alt="([^"]+)"([^>]*)\/?>/g;

// Fungsi untuk menggantikan tag <img> menjadi komponen <Image>
const replaceImgWithImage = (content) => {
    return content.replace(imgRegex, (_, preProps, src, midProps, alt, postProps) => {
        return `<Image${preProps}src="${src}"${midProps}alt="${alt}"${postProps} layout="intrinsic" />`;
    });
};

// Fungsi untuk menambahkan import 'Image' dari 'next/image'
const addImageImport = (content) => {
    if (!content.includes("import Image from 'next/image';")) {
        return `import Image from 'next/image';\n${content}`;
    }
    return content;
};

// Fungsi rekursif untuk membaca dan memproses file dalam direktori
const processDirectory = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir, file);

        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.tsx')) {
            console.log(`Processing: ${fullPath}`);
            let content = fs.readFileSync(fullPath, 'utf8');
            const updatedContent = addImageImport(replaceImgWithImage(content));

            // Jika ada perubahan, tulis ulang file
            if (content !== updatedContent) {
                fs.writeFileSync(fullPath, updatedContent, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    });
};

// Jalankan proses pada direktori proyek
processDirectory(projectDir);
console.log('Conversion completed!');
