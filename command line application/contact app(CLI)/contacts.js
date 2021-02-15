const fs = require("fs");
const util = require("util");

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

//after refactoring;

//read contact;
const listContacts = async () => {
  const contacts = await loadContact();
  if (contacts.length) {
    console.log(contacts);
    console.log("ALL Contacts".inverse.green);
  } else {
    console.log("No contacts found. Please add a new contact".inverse.red);
  }
};

//add a new contact
const addContact = async (contact, email) => {
  const contacts = await loadContact();
  const existingEmail = await isExistingEmail(email);
  if (existingEmail) {
    console.log("Email is already exist. Please try another email".inverse.red);
  } else {
    contacts.push(contact);
    await saveContact(contacts);
    console.log("contact successfully added".inverse.green);
  }
};

//delete contact;
const deleteContact = async ({ email }) => {
  // console.log(email);
  const contacts = await loadContact();
  const existingEmail = await isExistingEmail(email);
  if (!existingEmail) {
    console.log("Contact is not fine with this email".inverse.red);
  } else {
    const updateContact = contacts.filter(
      (eachContact) => eachContact.email !== email
    );
    await saveContact(updateContact);
    console.log("Contact delete successfully".inverse.green);
  }
};

//get a single contact
const readContact = async ({ email }) => {
  const contact = await isExistingEmail(email);
  if (!contact) {
    console.log("Contact is not fine with this email".inverse.red);
  } else {
    console.log("Contact found".inverse.green);
    console.log(contact);
  }
};

//update contact;
const updateContact = async (updateQuestions, sendingEmail) => {
  const sendingUpdatedEmail = sendingEmail.sendingEmail.email
  const {firstName, lastName, email, type} = updateQuestions;
  const contacts = await loadContact();
  const existingEmail = await isExistingEmail(sendingUpdatedEmail);
  if(existingEmail){
    //get updated value and make a new contact from getting updated value
    const updatedContact = {
      firstName: firstName ? firstName: existingEmail.firstName,
      lastName: lastName ? lastName: existingEmail.lastName,
      email: email ? email: existingEmail.email,
      type: type ? type: existingEmail.type,
    }
    const updateWithContact = contacts.map(contact => (contact.email === sendingUpdatedEmail) ? (contact= updatedContact) : contact)
    //save contact;
    await saveContact(updateWithContact);
    console.log("updated successfully");

  }
};

//load contact form contacts.js file
const loadContact = async () => {
  try {
    const dataBuffer = await readFilePromise("./contacts.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return [];
  }
};

//search by email from total contacts
const isExistingEmail = async (email) => {
  const contacts = await loadContact();
  return contacts.find((eachContact) => eachContact.email === email);
};

//save contacts in contacts.js file
const saveContact = async (contacts) => {
  const contactJson = JSON.stringify(contacts);
  await writeFilePromise("./contacts.json", contactJson);
};

//without refactoring add contact
// const addContact = async (contact) => {
//   let contacts;
//   try {
//     const dataBuffer = await readFilePromise("./contacts.json");
//     const dataJson = dataBuffer.toString();
//     contacts = JSON.parse(dataJson);
//     contacts.push(contact);
//     const contactJson = JSON.stringify(contacts);
//     await writeFilePromise("./contacts.json", contactJson);
//     console.log("contact successfully added");
//   } catch (error) {
//     contacts = [];
//     contacts.push(contact);
//     const contactJson = JSON.stringify(contacts);
//     await writeFilePromise("./contacts.json", contactJson);
//     console.log("fully new contact successfully added");
//   }
// };

module.exports = {
  addContact,
  isExistingEmail,
  listContacts,
  deleteContact,
  readContact,
  updateContact,
};
