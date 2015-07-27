var binaryzation = require('./binaryzation');

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    switch(chunk.replace(/\s+/g,"")){
      case 'bin-test':
        console.log('now binarize test data');
        binaryzation.bin_test();
      break;
      case 'bin-train':
        console.log('now binarize train data');
      break;
      case 'train':
        console.log('now training neural network');
      break;
      case 'save':
        console.log('now saving neural network');
      break;
      case 'load':
        console.log('now loading neural network');
      break;
      default :
        console.log('help');
    }
  }
});
