
const pdfPoppler = require('pdf-poppler');

const pdfPath = 'input.pdf';
const outputDir = 'out';

async function convertPdfToImage(pdfPath, outputPath) {
  const opts = {
    format: 'jpeg',      // You can choose other formats like png or tiff
    out_dir: outputPath,
    out_prefix: 'page',
    page: null           // Specify the page number here to convert a specific page, otherwise null to convert all pages
  };

  try {
    await pdfPoppler.convert(pdfPath, opts);
    console.log('PDF converted to image successfully!');
  } catch (error) {
    console.error('Error converting PDF to image:', error);
  }
}

convertPdfToImage(pdfPath, outputDir);
