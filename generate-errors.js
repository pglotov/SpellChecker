const fs = require('fs');
const readline = require('readline');

const vowels = ['a','e','i','o','u'];

var words = [];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var lineReader = readline.createInterface({
  input: fs.createReadStream('/usr/share/dict/words')
});

lineReader.on('line', (word) => {
  words.push(word);
});

var errorFunctions = [
  function(word) { // double letter at random location
    var index = getRandomInt(0, word.length);
    var letters = word.split('');
    letters.splice(index, 0, letters[index]);
    return letters.join('');
  },
  function(word) { // vowel substitution
    var isVowel = function(letter) {
      if (vowels.indexOf(letter) > -1) {
        return true;
      } else {
        return false;
      }
    };
    var letters = word.split('');
    var vowelLetters = letters.filter(isVowel);
    var vowelIndex = getRandomInt(0, vowelLetters.length);
    var i = 0;
    var index = letters.findIndex((letter) => {
      if (isVowel(letter) && ++i == vowelIndex) {
        return true;
      } else {
        return false;
      }
    });
    if (index > -1) {
      letters[index] = vowels[getRandomInt(0, vowels.length)];
    }
    return letters.join('');
  },
  function(word) { // uppercase a letter
    var index = getRandomInt(0, word.length);    
    var letters = word.split('');
    letters[index] = letters[index].toUpperCase();
    return letters.join('');
  }
];


lineReader.on('close', () => {
  for (var i = 0; i < 100; ++i) { // generate 100 words
    var word = words[getRandomInt(0, words.length)];
    //console.log('word = ' + word);
    for (var j = 0; j < 5; ++j) { // apply 5 errors to each word
      word = errorFunctions[getRandomInt(0, errorFunctions.length)](word);
    }
    process.stdout.write(`${word}\n`);
  }
});
