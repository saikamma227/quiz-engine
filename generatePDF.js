const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = function(name, score, total) {
  return new Promise((resolve) => {

    // ✅ ensure folder exists
    if (!fs.existsSync('certs')) {
      fs.mkdirSync('certs');
    }

    const fileName = `cert_${Date.now()}.pdf`;
    const filePath = `certs/${fileName}`;

    const doc = new PDFDocument({ size: 'A4' });
    doc.pipe(fs.createWriteStream(filePath));

    // 🎨 Simple styling
    doc.fontSize(26).text("Certificate of Completion", { align: "center" });
    doc.moveDown();

    doc.fontSize(18).text("This is to certify that", { align: "center" });
    doc.moveDown();

    doc.fontSize(22).text(name, { align: "center" });
    doc.moveDown();

    doc.fontSize(16).text(`has successfully completed the quiz`, { align: "center" });
    doc.moveDown();

    doc.text(`Score: ${score} / ${total}`, { align: "center" });
    doc.moveDown();

    doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: "center" });

    doc.end();

    // return path for browser
    resolve(`/certs/${fileName}`);
  });
};