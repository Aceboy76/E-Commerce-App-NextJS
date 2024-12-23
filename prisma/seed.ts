import prisma from "./db"


const roles = [
    {
        role_name: "Customer"
    },
    {
        role_name: "Seller"
    }
]

async function seedDB() {
    console.log("seeding...")

    for (const role of roles) {
        const result = await prisma.role.create({
            data: role,
        })

        console.log("the id: " + result.id + " is created")
        
    }

    console.log("Seeding is done")
}

seedDB()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })