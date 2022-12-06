import path from 'path';
import fs from 'fs/promises';
import got from 'got';
import AdmZip from 'adm-zip';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function download(url, archive){
    const buffer = await got.get(url).buffer()

    await fs.writeFile(archive, buffer);
}

async function main (){
    console.log("Downloading...");

    const url = "http://www.cbr.ru/s/newbik";

    const ziptestFolder = path.resolve(__dirname, 'ziptest');
    const archive = path.resolve(ziptestFolder, "archive.zip");

    await download(url, archive);

    console.log("Unzip...");

    const zip = new AdmZip(archive)
    zip.extractAllTo(ziptestFolder, true)

    
}
    

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })