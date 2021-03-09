import fs from 'fs';

const commandFiles = fs.readdirSync('./dist/commands').filter(file => file.endsWith('.js'));

let text = '';
let tally = 0;
for(const file of commandFiles){
    const { aliases, execute, isActive } = require(`./commands/${file}`)
    for(const alias of aliases)
        text += `\t${alias} = ${tally},\n`;
    tally++;
}

let data = `enum test {\n${text}}`;

fs.writeFile('./src/test.ts', data, err => {
    if(err){
        console.log('Error writing file', err);
    } else {
        console.log('Successfully wrote file');
    }
})