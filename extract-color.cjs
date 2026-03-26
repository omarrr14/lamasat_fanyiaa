const { Vibrant } = require('node-vibrant/node');
const path = require('path');

const imgPath = path.join(__dirname, 'src/assets/images/logo.png');
console.log('Extracting colors from:', imgPath);

Vibrant.from(imgPath).getPalette()
  .then((palette) => {
    console.log('Palette Hex Values:');
    console.log(palette);
  })
  .catch((err) => {
    console.error('Error extracting color:', err);
  });
