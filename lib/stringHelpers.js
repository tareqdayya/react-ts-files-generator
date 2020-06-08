function convertCamelCaseToSpinal(string) {
    if (!(typeof string === 'string')) return string;
    let i = 0;
    let convertedString = '';
    let character = '';

    while (i <= string.length) {
        character = string.charAt(i);
        if (!isNaN(character * 1)) convertedString += character;
        else {
            // eslint-disable-next-line eqeqeq
            if (character == character.toUpperCase()) {
                if (i) {
                    convertedString += '-';
                }
                convertedString += character.toLowerCase();
            } else {
                convertedString += character;
            }
        }
        i++;
    }

    return convertedString;
}

module.exports = { convertCamelCaseToSpinal };
