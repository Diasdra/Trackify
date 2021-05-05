let inventoryModel = require("../models/inventoryModel").inventoryModel;

let inventoryController = {
  list: (req, res) => {
    res.render("inventory", { 
      inventory: req.inventory,
     });
  },

  new: (req, res) => {
    res.render("/");
  },

  listOne: async (req, res) => {
    let r = await inventoryModel.findInventory(req.params.id, req.user.id)
    if (r != null) {
      res.render("reminder/single-reminder", { reminderItem: r });
    } else {
      res.redirect("reminders");
    }
  },

  create: async (req, res) => {
    await inventoryModel.addInventory({
      product: req.body.product,
      product_category: req.body.product_category,
      qty: req.body.qty,
      price: req.body.price,
      vendor: req.body.vendor,
      location: req.body.location
    })
    .then(() => {
      res.redirect("/inventory");
    })
  },

/*   edit: (req, res) => {
    let itemToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("edit", { reminderItem: searchResult });
  }, */

/*   search: (req, res) => {
    res.render("reminder/search", {reminders: null})
    },

  listSearch: async (req, res) => {
    let r = await userModel.searchReminder(req.user.id, req.body.search)
    if (r != null) {
      res.render("reminder/search", { reminders: r, userid: req.user.id});
    } else {
      res.render("reminder/search", {reminders: null});
    }
  }, */

  update: async (req, res) => {
    await inventoryModel.updateinventory({
      product: req.body.product,
      product_category: req.body.product_category,
      qty: req.body.qty,
      price: req.body.price,
      vendor: req.body.vendor,
      location: req.body.location
    })
    .then(() => {
      res.redirect('/inventory');
    })
  },

  delete: async (req, res) => {
    await userModel.deleteReminder({
      id: req.params.id
    })
    .then(()=> {
      res.redirect('/inventory')
    })
  },
};

module.exports = inventoryController;
