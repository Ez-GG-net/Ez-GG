function stringToHex(inputString) {
    let hexString = '';
    for (let i = 0; i < inputString.length; i++) {
        hexString += inputString.charCodeAt(i).toString(16);
    }
    return hexString;
}
function hexToString(hexString) {
    let str = '';
    for (let i = 0; i < hexString.length; i += 2) {
        const hexChar = hexString.substr(i, 2); // Get two characters at a time
        const charCode = parseInt(hexChar, 16); // Convert from hex to decimal
        str += String.fromCharCode(charCode); // Convert from decimal to character
    }
    return str;
}

function encode(json) {
    // Convert the JSON to a string
    const string = JSON.stringify(json);

    // Shift the order of the string
    const shiftAmount = 17 % string.length;
    const shiftedString = string.slice(shiftAmount) + string.slice(0, shiftAmount);

    // Get the char code of each character
    let charCodes = [];
    shiftedString.split('').forEach((char, i) => {
        charCodes.push(shiftedString.charCodeAt(i));
    });

    // Add the character by a number
    charCodes.forEach((code, i) => {
        charCodes[i] = code + 32;
    });

    // Divide every other character
    charCodes.forEach((code, i) => {
        if (i % 2 === 0) return (charCodes[i] = code);
        charCodes[i] = code ** 2;
    });

    // Make them all an 8-character number
    const eightCharNumbers = charCodes
        .map((code) => code.toString().padStart(8, '0'))
        .join('');

    // Convert the string to hex
    const hex = stringToHex(eightCharNumbers);

    // Convert the hex to a number and multiply it by 2
    const hex2 = hex
        .match(/.{1,2}/g)
        .map((x) => `${Number(x) * 2}`)
        .join('');

    // Simulate the appearance of backticks and replace them with counts
    const encodedStringWithBackticks = hexToString(hex2);
    const compressed = encodedStringWithBackticks.replace(/`+/g, (match) => match.length);

    return compressed;
}

const encoded =encode({
    "name": "John Doe",
    "age": 30,
    "isEmployee": true,
    "skills": ["JavaScript", "Node.js", "React", "Python"],
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip": "10001"
    },
    "projects": [
      {
        "title": "Website Redesign",
        "completed": true,
        "budget": 5000
      },
      {
        "title": "Mobile App Development",
        "completed": false,
        "budget": 10000
      }
    ],
    "preferences": {
      "theme": "dark",
      "notifications": {
        "email": true,
        "sms": false
      }
    },
    "metadata": false
  }
  )
const decoded = decode(encoded)
console.log(encoded)
console.log(decoded)
console.log(encoded.split('').length)
console.log(JSON.stringify(decoded).split('').length)
function decode(encodedString) {
    // Restore backticks from the compressed format
    const decompressed = encodedString.replace(/(\d+)/g, (match, count) =>
        '`'.repeat(parseInt(count))
    );

    // Convert the decompressed string back to its char codes
    const charCodesHex = stringToHex(decompressed)
        .match(/.{1,2}/g)
        .map((x) => `${Number(x) / 2}`)
        .join('');

    // Convert the hex to string
    let charCodes = hexToString(charCodesHex)
        .match(/.{1,8}/g)
        .map((x) => Number(x));

    // Square root every other character
    charCodes.forEach((code, i) => {
        if (i % 2 === 0) return (charCodes[i] = code);
        charCodes[i] = Math.sqrt(code);
    });

    // Subtract the added number
    charCodes.forEach((code, i) => {
        charCodes[i] = code - 32;
    });

    // Convert char codes back to a string
    let string = String.fromCharCode(...charCodes);

    // Shift the order of the string back
    const shiftAmount = -17 % string.length;
    const shiftedString = string.slice(shiftAmount) + string.slice(0, shiftAmount);

    // Convert the string to a JSON object
    return JSON.parse(shiftedString);
}
