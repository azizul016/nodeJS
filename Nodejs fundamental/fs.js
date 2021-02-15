const fs = require('fs');
// console.log(fs);


//read data from file;
// fs.readFile("./sample.txt", "utf-8", (err, data)=>{
//     if(err) return console.log(err);
//     console.log(data);
// })

//write data from file;
// fs.writeFile("./sample.txt", "I am a good programmer" ,() => {
//     console.log("data write successfully");
// })

//update data from file;
// fs.appendFile('./sample.txt', " Hello programmer", (err)=>{
//           if(err) return console.log(err);
//     console.log(data, "data updated successfully");
// })


//delete text file;
// fs.unlink('./sample.txt',(err)=>{
//    if(err) return console.log(err);
//     console.log('delete text file');
// })



// get the full data with write, update and read

// fs.writeFile('./sample.txt', "Hello Programmer", ()=>{
//     fs.appendFile('./sample.txt', " I am a Programmer", (err)=>{
//           if(err) return console.log(err);
//         fs.readFile('./sample.txt', 'UTF-8', (err,data)=>{
//             if(err) return console.log(err);
//             console.log(data);
//         })
//     })
// })


//with path module include fs module
// const path = require("path");
// const newPath = path.join("./sample2.txt")


//updated path
// const newPath = path.join(__dirname, "files", "sample2.txt");

fs.writeFile(newPath, "Hello Programmer", ()=>{
    fs.appendFile(newPath, " I am a Programmer", (err)=>{
          if(err) return console.log(err);
        fs.readFile(newPath, 'UTF-8', (err,data)=>{
            if(err) return console.log(err);
            console.log(data);
        })
    })
})

//read how many file in an folder;
// fs.readdir('./dir', (err,files) =>{
//     if(err) return console.log(err);
//     console.log(files);
// })