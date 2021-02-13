const fs = require("fs");
const path = require("path");
require("colors");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) console.log(error);
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) console.log(error);

    const contacts = JSON.parse(data);
    const findedContact = contacts.find((contact) => contact.id === contactId);

    console.log(
      "Your contact is: " +
        `${findedContact.name} ${findedContact.email} ${findedContact.phone}`
          .yellow
    );
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) console.log(error);

    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), (error) => {
      if (error) console.log(error);
    });
    console.log(
      "Contact has just been deleted, contacts list was updatted!".red
    );
    console.table(updatedContacts);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) console.log(error);

    const contacts = JSON.parse(data);
    const generatedId = new Date().getTime().toString();
    const newContact = { id: generatedId, name, email, phone };
    const updatedContacts = [...contacts, newContact];

    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), (error) => {
      if (error) console.log(error);
    });
    console.log(
      "New contact has just been added, contacts list was updatted!".green
    );
    console.table(updatedContacts);
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
