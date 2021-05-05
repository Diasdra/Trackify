let inventoryModel = require("../models/inventoryModel").inventoryModel;

let inventoryController = {
  list: (req, res) => {
    res.render("inventory", { 
      inventory: req.reminders,
     });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: async (req, res) => {
    let r = await userModel.findReminder(req.params.id, req.user.id)
    if (r != null) {
      res.render("reminder/single-reminder", { reminderItem: r });
    } else {
      res.redirect("reminders");
    }
  },

  create: async (req, res) => {
    await userModel.addReminder({
      title: req.body.title,
      body: req.body.description,
      tags: req.body.tags,
      date: req.body.date,
      userId: req.user.id
    })
    .then(() => {
      res.redirect("/reminders");
    })
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  search: (req, res) => {
    res.render("reminder/search", {reminders: null})
    },

  listSearch: async (req, res) => {
    let r = await userModel.searchReminder(req.user.id, req.body.search)
    if (r != null) {
      res.render("reminder/search", { reminders: r, userid: req.user.id});
    } else {
      res.render("reminder/search", {reminders: null});
    }
  },

  update: async (req, res) => {
    await userModel.updateReminder({
      id: req.params.id,
      title: req.body.title,
      body: req.body.description,
      date: req.body.date,
      userId: req.user.id,
      completed: JSON.parse(req.body.completed),
      tags: req.body.tags
    })
    .then(() => {
      res.redirect('/reminders');
    })
  },

  delete: async (req, res) => {
    await userModel.deleteReminder({
      id: req.params.id
    })
    .then(()=> {
      res.redirect('/reminders')
    })
  },
};

///module.exports = remindersController;
