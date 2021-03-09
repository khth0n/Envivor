const emojis = require('../../local/emoji.json');

export function parse(text: string): string{
    
    let words = text.split(' ');

    for(let i = 0; i < words.length; i++){

        let emojiValue = emojis[words[i]];

        if(emojiValue){
            words[i] = emojiValue;
        }
    }

    return words.join(' ');
}