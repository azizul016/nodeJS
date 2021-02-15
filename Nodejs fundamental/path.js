const path = require("path");
// console.log(path);



// console.log(path.parse(__dirname)); // output is { root: 'D:\\', dir: 'D:\\', base: 'Nodejs', ext: '', name: 'Nodejs' }

//console.log(path.parse(".test.js")); //output is { root: '', dir: '', base: '.test.js', ext: '.js', name: '.test' }

//const pathParse = path.parse(__dirname)
//console.log(path.format(pathParse)); // gives full directory name;

// console.log(path.resolve("./test.js"));

// console.log(path.join());


// console.log(path.isAbsolute(__dirname)); // return value is bolien; only gives absolute path. relative path ("./text.js") is false value provided

// console.log(path.dirname("./test.js")); // retuning value is "." . return the directory name;

// console.log(path.toNamespacedPath(__dirname)); // return value "\\?\D:\Nodejs";

// console.log(path.basename("./test.js")); // given the last portion in this path return value "test.js"

// console.log(path.extname("./test.js")); // given extension in this file . value is "js"


