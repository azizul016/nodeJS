const fs = require("fs");
const util = require("util");
const path = require("path");

const myFilePath = path.join(__dirname, "files", "sample4.txt");

const writeFilePromise = util.promisify(fs.writeFile);
const appendFilePromise = util.promisify(fs.appendFile);
const readFilePromise = util.promisify(fs.readFile);

(async function getContents() {
  try {
    await writeFilePromise(myFilePath, "Hello World ");
    console.log("data write successfully");
    await appendFilePromise(myFilePath, "I am a programmer");
    console.log("updated file successfully");
    const data = await readFilePromise(myFilePath);
    console.log(data.toString());
    console.log("read file successfully");
  } catch (error) {
    console.log(error);
  }
})();
