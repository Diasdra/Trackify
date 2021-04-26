const express = require("express");
const router = express.Router();
const reminderController = require("../controllers/reminder_controller");
const { ensureAuthenticated } = require("../middleware/checkAuth")
const userModel = require("../models/userModel").userModel


router.get("/reminders", ensureAuthenticated, reminderController.list); //Don't ask.

router.get("/friends", ensureAuthenticated, (req, res) => {
    res.render("reminder/friends")
})

router.post("/friends", ensureAuthenticated, async (req, res) => {
    let searchTerm = req.body.search
    const users = await userModel.findFriend(searchTerm)
    console.log(users)
    res.render("reminder/friends", {
        searchResults: users, 
        user: req.user,
        searchTerm: searchTerm})
})

router.post("/friends/update", ensureAuthenticated, async (req, res) => {
    if(req.body.followID){
        await userModel.addFriend(req.user.id, req.body.followID)
    } else {
        await userModel.delFriend(req.user.id, req.body.unFollowID)
    }
    let searchTerm = req.body.search
    const users = await userModel.findFriend(searchTerm)
    res.render("reminder/friends", {
        searchResults: users, 
        user: req.user,
        searchTerm: searchTerm})
})

module.exports = router;