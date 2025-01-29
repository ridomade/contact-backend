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

// middleware for handling token, all routes in this file will use this middleware
router.use(tokenHandler);

// routes for contact api
router.route("/").get(getAllContacts).post(CreateContact);

router.route("/:id").get(getContactbyId).put(updateContactbyId).delete(deleteContactbyId);

module.exports = router;
