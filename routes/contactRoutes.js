const express = require("express");
const router = express.Router();
const tokenHandler = require("../middleware/tokenHandler");

const {
    getAllContacts,
    getContactbyId,
    CreateContact,
    deleteContactbyId,
    updateContactbyId,
} = require("../controllers/contactControllers");

// Middleware tokenHandler diterapkan untuk semua rute di bawah
router.use(tokenHandler);

// Rute API untuk kontak
router.route("/").get(getAllContacts).post(CreateContact);

router.route("/:id").get(getContactbyId).put(updateContactbyId).delete(deleteContactbyId);

module.exports = router;
