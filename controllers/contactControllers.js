const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access Private
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
});

//@desc Get contact by id
//@route GET /api/contacts/:id
//@access Private
const getContactbyId = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Creating new Contact
//@route POST /api/contacts/
//@access Private
const CreateContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json({ message: "sucssesfully created new contact", data: contact });
});

const updateContactbyId = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    // Periksa apakah data untuk pembaruan disediakan
    if (!name && !email && !phone) {
        res.status(400);
        throw new Error("Please provide at least one field to update");
    }

    // Cari dan perbarui kontak berdasarkan ID
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        { name, email, phone }, // Data baru untuk diperbarui
        { new: true, runValidators: true } // Opsi untuk mengembalikan data yang diperbarui
    );

    // Jika kontak tidak ditemukan, kembalikan error
    if (!updatedContact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json({
        message: "Successfully updated the contact",
        data: updatedContact,
    });
});

//@desc Creating new Contact
//@route DELETE /api/contacts/:id
//@access Private
const deleteContactbyId = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({ message: "Succsessfully deleate the contact", data: contact });
});

module.exports = {
    getAllContacts,
    getContactbyId,
    CreateContact,
    deleteContactbyId,
    updateContactbyId,
};
