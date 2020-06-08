function convertCamelCaseToSpinal(string) {
    if (!(typeof string === 'string')) return string;
    let convertedString = '';
    let character = '';

    // LOOP OVER CHARACTERS
    for (let i = 0; i < string.length; i++) {
        character = string.charAt(i);

        // NUMERIC CHARACTER: KEEP AS IS
        if (!isNaN(parseInt(character, 10))) convertedString += String(character);

        // ALPHA CHARACTER
        else { // SEPARATE AT UPPERCASE WITH '-'
            if (character === character.toUpperCase() && i > 0) convertedString += '-';

            convertedString += character.toLowerCase();
        }
    }

    return convertedString;
}

module.exports = { convertCamelCaseToSpinal };
