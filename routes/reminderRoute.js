const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/checkAuth")
const reminderController = require("../controllers/reminder_controller");


router.get("/new", ensureAuthenticated, reminderController.new);

router.get("/search", ensureAuthenticated, reminderController.search);

router.post("/search", ensureAuthenticated, reminderController.listSearch);

router.get("/:id", ensureAuthenticated, reminderController.listOne);

router.get("/:id/edit", ensureAuthenticated, reminderController.edit);

router.post("/", ensureAuthenticated, reminderController.create);

// Implement this yourself
router.post("/update/:id", ensureAuthenticated, reminderController.update);

// Implement this yourself
router.post("/delete/:id", ensureAuthenticated, reminderController.delete);

module.exports = router;