const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'files', 'sample5.txt')

const rsStream = fs.createReadStream(filePath);

let text = ''

rsStream.on('data', chunk => {
    // console.log(chunk.toString());
    text += chunk
})

rsStream.on('end', ()=>{
    // console.log('data successfully');
    console.log(text);
})