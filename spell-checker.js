"use strict"

const fs = require('fs');
const readline = require('readline');

const vowels = ['a','e','i','o','u'];

class SpellChecker {

  constructor(wordsFile) {
    this.wordsFile = wordsFile;
    this.lineReader = readline.createInterface({
      input: fs.createReadStream(this.wordsFile)
    });
    this.processWords();
  }

  static removeRepeats(letters) {
    var result = [];
    for (var i = 0; i < letters.length - 1; ++i) {
      if (letters[i] != letters[i + 1]) {
        result.push(letters[i]);
      }
    }
    result.push(letters[letters.length - 1]);
    return result;
  }

  static getReducedWord(word) {
    word = word.toLowerCase();
    var letters = word.split('');
    letters.forEach(function(letter, index, arr) {
      if (vowels.indexOf(letter) > -1) {
        arr[index] = '_';
      }
    });
    letters = SpellChecker.removeRepeats(letters);
    return letters.join('');
  }

  processWords() {
    this.reducedWords = {};
    this.lineReader.on('line', (word) => {
      var reducedWord = SpellChecker.getReducedWord(word);
      if (!this.reducedWords[reducedWord]) {
        this.reducedWords[reducedWord] = [];
      }
      this.reducedWords[reducedWord].push(word);
    });
  }

  check(word) {
    var corrections = this.reducedWords[SpellChecker.getReducedWord(word)];
    if (!corrections) {
      return 'NO SUGGESTION';
    } else if (corrections.indexOf(word) > -1) {
      return word;
    } else {
      return corrections[0];
    }
  }
}


module.exports = SpellChecker;
