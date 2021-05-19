const { prisma, app, run } = require('./index')
const supertest = require('supertest')
const request = supertest(app)

beforeAll((done) => {
  done();
})

afterAll(async (done) => {
  await prisma.$disconnect()
  run.close()
  done()
})

const item1 = {
  id: '9999',
  product: 'Test Item',
  product_category: 'Test Category',
  qty: '30',
  price: '27.99',
  vendor: 'Test Vendor',
  location: 'Test Location'
}

const item2 = {
  id: '9999',
  product: 'Test Item 2',
  product_category: 'Test Category',
  qty: '30.o',
  price: '27.adj',
  vendor: 'Test Vendor',
  location: 'Test Location'
}

it("creates an item", async done => {
  const response = await request
    .post("/create")
    .send(item1)
    .expect(302)
    done()
})

it("edits an item", async done => {
  const response = await request
    .post("/inventory")
    .send(item1)
    .expect(302)
    done()
})

it("edits an item with wrong data", async () => {
  const response = await request
    .post("/inventory")
    .send(item2)
    .expect(400)
    expect(response.body).toEqual({"error": "Wrong data entered"})
})

it("deletes an item", async () => {
  const response = await request
    .delete("/inventory")
    .send({ id: item1.id })
    .expect(200)
    done()
})

it("deletes an that doesn't exist", async () => {
  const response = await request
    .delete("/inventory")
    .send({ id: 1293841287342 })
    .expect(200)
    done()
})

// update: async (req, res) => {
//   console.log(req.body)
//   const qty = Number(req.body.qty)
//   const price = Number(req.body.price)
//   if(isNaN(qty) || isNaN(price)) {
//     res.status(400).send({"error": "Wrong data entered"})
//   } else {
//     await inventoryModel.updateInventory({
//       id: parseInt(req.body.id),
//       product: req.body.product,
//       product_category: req.body.product_category,
//       qty: parseInt(req.body.qty),
//       price: price,
//       vendor: req.body.vendor,
//       location: req.body.location
//     })
//     .then(() => {
//       res.redirect('/inventory');
//     })
//   }
// },