import {readFile} from 'node:fs/promises';

const requiredFiles = ['index.html', 'src/main.js', 'src/styles.css'];
const requiredMarkup = [
  ['index.html', '<div id="app"></div>'],
  ['index.html', '/src/main.js'],
  ['index.html', '/src/styles.css'],
  ['src/main.js', '@material/web@2.3.0/all.js/+esm'],
  ['src/main.js', 'https://m3.material.io/develop/web'],
  ['src/main.js', '<md-filled-button'],
  ['src/main.js', '<md-outlined-select'],
  ['src/main.js', '<md-dialog'],
  ['src/styles.css', '--md-sys-color-primary'],
  ['src/styles.css', '.component-grid'],
];

const contents = new Map();
for (const file of requiredFiles) {
  contents.set(file, await readFile(file, 'utf8'));
}

const failures = requiredMarkup
  .filter(([file, snippet]) => !contents.get(file).includes(snippet))
  .map(([file, snippet]) => `${file} is missing ${snippet}`);

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

const mainJs = contents.get('src/main.js');
if (/import\s+['\"]\.\/styles\.css['\"]/.test(mainJs)) {
  console.error('src/main.js imports CSS directly, which breaks without a bundler. Link CSS from index.html instead.');
  process.exit(1);
}

console.log('Static Material 3 site validation passed.');
