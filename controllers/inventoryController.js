let inventoryModel = require("../models/inventoryModel").inventoryModel;

let inventoryController = {
  list: (req, res) => {
    let inventory = req.inventory
    // console.log(inventory)
    res.render("inventory", { 
      inventory,
     });
  },

  create: async (req, res) => {
    // console.log(
    //   req.body.qty, req.body.price, req.body.product, req.body.product_category, 
    //   req.body.vendor, req.body.location)
    const qty = Number(req.body.qty)
    const price = Number(req.body.price)
    if(isNaN(qty) || isNaN(price)) {
      res.status(400).send({"error": "Wrong data entered"})
    } else {
      await inventoryModel.addInventory({
        product: req.body.product,
        product_category: req.body.product_category,
        qty: parseInt(req.body.qty),
        price: price,
        vendor: req.body.vendor,
        location: req.body.location
      })
      .then(() => {
        res.redirect("/inventory");
      })
    }
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
