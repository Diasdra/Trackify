const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function main() {
    const apple = await prisma.inventory.upsert({
      where: { product: "apple" },
      update: {},
      create: {
        product: `apple`,
        product_category: 'fruit',
        qty: 10,
        price: 3.00,
      },
    })
    console.log({ apple })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })