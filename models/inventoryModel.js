const PrismaClient = require("@prisma/client").PrismaClient
const prisma = new PrismaClient()


const selectInventory = {
    id: true,
    product: true,
    product_category: true,
    qty: true,
    price: true,
    vendor: true,
    location: true
}

const inventoryModel = {

    addInventory: async (data) => {
        await prisma.inventory.create({
            data: {
                product: data.product,
                product_category: data.product_category,
                qty: data.qty,
                price: data.price,
                vendor: data.vendor,
                location: data.location
            }
        })
    },

    updateInventory: async (data) => {
        await prisma.inventory.update({
            where: { id: data.id},
            data: data
        });
    },

    deleteInventory: async(data) => {
        await prisma.inventory.delete({
            where: {id: data.id}
        })
    },
}
module.exports = {inventoryModel};