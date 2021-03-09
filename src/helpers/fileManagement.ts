import { Dirent } from 'fs';
import { resolve } from 'path';
const { readdir, writeFile } = require('fs').promises;



export async function retrieve<T>(dir: string, fileArr: T[], desiredExtension?: string, isRecursive?: boolean){
    let dirents = await readdir(dir, { withFileTypes: true });

    let directories = dirents.filter((value: Dirent, index: number, arr: Dirent[]) => {
        
        if(value.isDirectory()){
            return true;
        }

        if(!desiredExtension || value.name.endsWith(desiredExtension)){
            
            let file = require(resolve(dir, value.name));

            fileArr.push(file);
        }

        return false;
    });


    if(isRecursive){
        for(const directory of directories){
            let newDir = resolve(dir, directory.name);

            await retrieve(newDir, fileArr, desiredExtension, isRecursive);
        }
    }

    return fileArr;
}

export async function save<T>(data: T, path: string){

    let jsonData = JSON.stringify(data, null, 2);

    try {
        writeFile(path, jsonData);

        console.log('Successfully wrote file!');
    } catch (error) {
        console.log('Error writing file: ', error);
    }
}