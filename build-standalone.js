const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'index.html');
const dest = path.join(__dirname, 'public', 'index.html');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('✓ Standalone single-file deployment bundle synchronized: index.html (' + fs.statSync(src).size + ' bytes)');
} else {
  console.error('Error: index.html not found.');
}
