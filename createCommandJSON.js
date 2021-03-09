const { resolve } = require('path');
const { readdir, writeFile } = require('fs').promises;

async function getFiles(dir, fileArr){
    let dirents = await readdir(dir, { withFileTypes: true });

    let directories = dirents.filter((value, index, arr) => {

        if(value.isDirectory()){
            return true;
        } else if(value.name.endsWith('.c.js')){
            let commandFile = require(resolve(dir, value.name));

            fileArr.push(commandFile);
        }

        return false;
    });

    for(const directory of directories){
        let newDir = resolve(dir, directory.name);

        await getFiles(newDir, fileArr);
    }

    return fileArr;
}


async function createCommandInfo(){
    let commandList = await getFiles('./dist/commands', []);

    let commandInfo = {};

    for(const { name, aliases } of commandList){
        
        for(const alias of aliases){
            commandInfo[alias] = name;
        }
    }

    let jsonData = JSON.stringify(commandInfo, null, 2);

    try {
        writeFile('./local/commandInfo.json', jsonData);

        console.log('Successfully wrote file!');
    } catch (error) {
        console.log('Error writing file: ', err);
    }
}


createCommandInfo();