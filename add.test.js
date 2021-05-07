const { prisma, app, run } = require('./index')
const supertest = require('supertest')
const request = supertest(app)

beforeAll((done) => {
  done();
})

afterAll(async (done) => {
  await prisma.inventory.deleteMany()
  await prisma.$disconnect()
  run.close()
  done()
})

const item1 = {
  product: 'Test Item',
  product_category: 'Test Category',
  qty: '30',
  price: '27.99',
  vendor: 'Test Vendor',
  location: 'Test Location'
}

const item2 = {
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

it("creates an item with wrong data", async () => {
  const response = await request
    .post("/create")
    .send(item2)
    .expect(400)

    expect(response.body).toEqual({"error": "Wrong data entered"})
})