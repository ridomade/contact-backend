const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access Private
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    // status success (OK)
    res.status(200).json(contacts);
});

//@desc Get contact by id
//@route GET /api/contacts/:id
//@access Private
const getContactbyId = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404); // not found
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403); // Forbidden
        throw new Error("You do not have permission to access this contact");
    }
    res.status(200).json(contact);
});

//@desc Creating new Contact
//@route POST /api/contacts/
//@access Private
const CreateContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body; // get the data from the request body

    // Array to store missing fields
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!phone) missingFields.push("phone");

    if (missingFields.length > 0) {
        res.status(400); // bad request
        throw new Error(`Please fill all the fields: ${missingFields.join(", ")}`);
    }

    // Create a new contact
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    // status created (success), send the response
    res.status(201).json({ message: "sucssesfully created new contact", data: contact });
});

const updateContactbyId = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    // check if at least one field is provided
    if (!name && !email && !phone) {
        res.status(400);
        throw new Error("Please provide at least one field to update (name, email,phone)");
    }

    // check if the contact exists
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404); // not found
        throw new Error("Contact not found");
    }

    // check if the user is the owner of the contact
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403); // Forbidden
        throw new Error("You do not have permission to update this contact");
    }

    // Update the contact
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        { name, email, phone },
        { new: true }
    );

    res.status(200).json({
        message: "Successfully updated the contact",
        data: updatedContact,
    });
});

//@desc Creating new Contact
//@route DELETE /api/contacts/:id
//@access Private
const deleteContactbyId = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You do not have permission to delete this contact");
    }
    const deleteContact = await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Succsessfully deleate the contact", data: deleteContact });
});

module.exports = {
    getAllContacts,
    getContactbyId,
    CreateContact,
    deleteContactbyId,
    updateContactbyId,
};
