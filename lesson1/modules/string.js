function transformString(string) {
    return string.trim().replace(/\s+/g," ")
}

export function wordsCount(string) {
    return transformString(string).split(' ').length;
}

export function* getWords(string) {
    string = transformString(string);
    let words = string.split(' ');
    for(let i = 0; i < wordsCount(string); i++) {
        yield words[i];
    }
}

/**
 *
 * Это вторая функция без использования промежуточного хранилища слов
 */

export function* getWords2(string) {
    string = transformString(string) + ' ';
    let lastIndex = 0;
    let index = string.indexOf(' ', lastIndex);
    while(index - lastIndex >= 0) {
        yield string.substr(lastIndex, index - lastIndex);
        lastIndex = index + 1;
        index = string.indexOf(' ', lastIndex);
    }
}
