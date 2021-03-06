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
    console.log(req.body.id)
    if(isNaN(qty) || isNaN(price)) {
      res.status(400).send({"error": "Wrong data entered"})
    } else {
      await inventoryModel.addInventory({
        id: parseInt(req.body.id),
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
    console.log(req.body)
    const qty = Number(req.body.qty)
    const price = Number(req.body.price)
    if(isNaN(qty) || isNaN(price)) {
      res.status(400).send({"error": "Wrong data entered"})
    } else {
      await inventoryModel.updateInventory({
        id: parseInt(req.body.id),
        product: req.body.product,
        product_category: req.body.product_category,
        qty: parseInt(req.body.qty),
        price: price,
        vendor: req.body.vendor,
        location: req.body.location
      })
      .then(() => {
        res.status(302).send({'success': 'added to the database'});
      })
    }
  },

  delete: async (req, res) => {
    console.log(parseInt(req.body.id))
    try {
      await inventoryModel.deleteInventory({
        id: parseInt(req.body.id)
      })
      .then(()=> {
        res.status(200).send({'success': 'deleted from the database'})
      })
    } catch (err) {
      res.status(400).send({"error": "Record not found"})
    }
  },
};

module.exports = inventoryController;
