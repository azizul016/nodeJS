const program = require("commander");
const validator = require("validator");
const colors = require("colors");
const { prompt } = require("inquirer");

program.version("0.0.1");
program.description("This is my first using command npm package");

const {
  addContact,
  isExistingEmail,
  listContacts,
  deleteContact,
  readContact,
  updateContact,
} = require("./contacts.js");

//add contact question
const addQuestions = [
  {
    type: "input",
    name: "firstName",
    message: "Type your firstName",
    validate(input) {
      if (!input) {
        console.log("Please provide your firstName".inverse.red);
      } else {
        return true;
      }
    },
  },
  {
    type: "input",
    name: "lastName",
    message: "Type your lastName",
    validate(input) {
      if (!input) {
        console.log("Please provide your lastName".inverse.red);
      } else {
        return true;
      }
    },
  },
  {
    type: "input",
    name: "email",
    message: "Type your email",
    async validate(input) {
      if (!input || !validator.isEmail(input)) {
        console.log("Please provide your valid email".inverse.red);
      } else if (await isExistingEmail(input)) {
        console.log(
          "Email is already exist. Please provide another email".inverse.red
        );
      } else {
        return true;
      }
    },
  },
  {
    type: "list",
    name: "type",
    message: "Please provide type of contact",
    choices: ["personal", "professional"],
  },
];

//updated contact question
const updatedQuestions = [
  {
    type: "input",
    name: "firstName",
    message: "Type your firstName",
  },
  {
    type: "input",
    name: "lastName",
    message: "Type your lastName",
  },
  {
    type: "input",
    name: "email",
    message: "Type your email",
    async validate(input) {
      if (input && !validator.isEmail(input)) {
        console.log("Please provide your valid email".inverse.red);
      } else {
        return true;
      }
    },
  },
  {
    type: "list",
    name: "type",
    message: "Please provide type of contact",
    choices: ["personal", "professional"],
  },
];

//search by email
const searchingByEmailQuestion = [
  {
    type: "input",
    name: "email",
    message: "provide your email",
    async validate(input) {
      if (!input || !validator.isEmail(input)) {
        console.log("Please provide your valid email".inverse.red);
      } else {
        return true;
      }
    },
  },
];

//add a new contact
program
  .command("add")
  .alias("a")
  //   .requiredOption("-f,--firstName <fName>", "Type your firstName")
  //   .requiredOption("-l,--lastName <lName>", "Type your lastName")
  //   .requiredOption("-e,--email <email>", "Type your email")
  //   .option("-t,--type <type>", "Type your type", "personal")
  //   .action(({ firstName, lastName, email, type }) => {
  //     const result = {
  //       firstName,
  //       lastName,
  //       email,
  //       type,
  //     };
  //     if (!validator.isEmail(email)) {
  //       console.log("Email is not valid. Please provide a valid email.".inverse.red);
  //     } else {
  //       addContact(result, email);
  //     }
  //   });
  .description("Add a new contact")
  .action(async () => {
    const result = await prompt(addQuestions);
    addContact(result, result.email);
  });

//list all contacts;
program
  .command("list")
  .alias("l")
  .description("List all contacts")
  .action(() => {
    listContacts();
  });

//delete contact;
program
  .command("delete")
  .alias("d")
  .description("Delete a contact")
  // .requiredOption("-e,--email <email>", "Type your email")
  // .action(({email}) =>{
  //     deleteContact(email)
  // })
  .action(async () => {
    const result = await prompt(searchingByEmailQuestion);
    deleteContact(result);
  });

//get a single contact;
program
  .command("read")
  .alias("r")
  .description("Read a contact by email")
  // .requiredOption("-e,--email <email>", "Type your email")
  // .action(({email}) =>{
  //     readContact(email)
  // })
  .action(async () => {
    const result = await prompt(searchingByEmailQuestion);
    readContact(result);
  });

//update contact;
program
  .command("update")
  .alias("u")
  .description("Update a contact by email")
  // .requiredOption("-e,--email <email>", "Type your email")
  // .action(({email}) =>{
  //     readContact(email)
  // })
  .action(async () => {
    const result = await prompt(searchingByEmailQuestion);
    if (await isExistingEmail(result.email)) {
      const updateQuestions = await prompt(updatedQuestions);

      updateContact(updateQuestions, {
        sendingEmail: result,
      });
    } else {
      console.log("Contact not found".inverse.red);
    }
  });

if (!process.argv[2]) {
  program.help();
}

program.parse(process.argv);
