let inventoryModel = require("../models/inventoryModel").inventoryModel;

let inventoryController = {
  list: (req, res) => {
    let inventory = req.inventory
    res.render("inventory", { 
      inventory,
     });
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

  update: async (req, res) => {
    await inventoryModel.updateinventory({
      product: req.body.product,
      product_category: req.body.product_category,
      qty: parseInt(req.body.qty),
      price: parseFloat(req.body.price),
      vendor: req.body.vendor,
      location: req.body.location
    })
    .then(() => {
      res.redirect('/inventory');
    })
  },

  delete: async (req, res) => {
    await inventoryModel.deleteReminder({
      id: req.params.id
    })
    .then(()=> {
      res.redirect('/inventory')
    })
  },
};

module.exports = inventoryController;
