const http = require("http");
const util = require("util");
const path = require("path");
const fs = require("fs");
const { runInNewContext } = require("vm");

const myFilePath = path.join(__dirname, "files", "index.html");
const readFilePromise = util.promisify(fs.readFile);

// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.write("Hello Programmer");
//     res.end();
//   } else if (req.url === "/hello") {
//     res.write("This is hello page for programmer");
//     res.end();
//   } else {
//     res.write("404 not found");
//     res.end();
//   }
// });

// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     const content = fs.readFile(myFilePath, (err, data) => {
//         if (err) return console.log(err);
//       //   return console.log("data");
//       res.write(data);
//       res.end();
//     });
//     // const content = fs.readFileSync(myFilePath)
//     // res.write(content);
//     // res.end();
//   }
// });

//asynchonous method using promise;
const server = http.createServer((req, res) => {
  // readFilePromise(myFilePath).then(content => {
  //     res.write(content);
  //     res.end()
  // }).catch(err => console.log(err))

  const readFileStream = fs.createReadStream(myFilePath);
  readFileStream.pipe(res);
});

server.listen(3000, () => {
  console.log("server is connected in 3000 port");
});
