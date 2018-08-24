const path = require('path');

const entryName = [
    'portal',
    'search',
    'order',
    'login'
];

module.exports = entryName.reduce((o,v)=>{
    o[v] = path.resolve(__dirname, `../src/entry/${v}.js`);
    return o;
},{});
