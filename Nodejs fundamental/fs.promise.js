const fs = require("fs");
const util = require("util");
const path = require("path");


const myFilePath = path.join(__dirname, "files", "sample3.txt");


const writeFilePromise = util.promisify(fs.writeFile);
const appendFilePromise = util.promisify(fs.appendFile);
const readFilePromise = util.promisify(fs.readFile);

// writeFilePromise('./sample3.txt', "This is new file").then(()=>{
//     console.log('data write successfully');
//     appendFilePromise('./sample3.txt',' Updated file is success').then(()=>{
//         console.log('updated file successfully');
//         readFilePromise('./sample3.txt','utf-8').then(data =>{
//             console.log('data is reading');
//             console.log(data);
//         }).catch(err => console.log(err))
//     }).catch(err => console.log(err))
// }).catch(err => console.log(err))

// best way for promises
writeFilePromise(myFilePath, "This is new file")
  .then(() => {
    console.log("data write successfully");
    return appendFilePromise(myFilePath, " best way for promises");
  })
  .then(() => {
    console.log("data is updated successfully");
    return readFilePromise(myFilePath, "utf-8").then((data) => {
      console.log(data, "data is reading");
    });
  })
  .catch((err) => console.log(err));
