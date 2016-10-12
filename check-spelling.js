const readline = require('readline');

var SpellChecker = require('./spell-checker.js')

var spellChecker = new SpellChecker('/usr/share/dict/words');

spellChecker.lineReader.on('close', () => {
  var lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  lineReader.setPrompt('>');

  lineReader.on('line', (word) => {
    if (word !== null) {
      word = word.trim();
      console.log(`${spellChecker.check(word)}`);
    }
    lineReader.prompt();
  });
  lineReader.prompt();
});

