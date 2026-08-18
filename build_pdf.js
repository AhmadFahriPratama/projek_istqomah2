const { generatePdf } = require('./pdf_builder.js');
const path = require('path');

const htmlPath = path.resolve(__dirname, 'blueprint.html');
const pdfPath = path.resolve(__dirname, 'Istiqomah_Stock_Perencanaan_Mobile_App.pdf');

console.log('Generating PDF from:', htmlPath);
console.log('Target PDF:', pdfPath);

generatePdf(htmlPath, pdfPath)
  .then(res => {
    console.log('PDF Generated Successfully at:', res);
    const stats = require('fs').statSync(pdfPath);
    console.log('PDF File Size:', stats.size, 'bytes');
  })
  .catch(err => {
    console.error('PDF Generation Failed:', err);
    process.exit(1);
  });
