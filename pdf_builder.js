const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browserPath = fs.existsSync(chromePath) ? chromePath : edgePath;

function generatePdf(htmlFilePath, outputPdfPath) {
    return new Promise((resolve, reject) => {
        const cmd = `"${browserPath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --no-pdf-header-footer --print-to-pdf="${outputPdfPath}" "${htmlFilePath}"`;
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(outputPdfPath);
            }
        });
    });
}

module.exports = { generatePdf };
