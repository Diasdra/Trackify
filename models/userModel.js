const PrismaClient = require("@prisma/client").PrismaClient
const prisma = new PrismaClient()
const fetch = require('node-fetch')

const unsplashApi = "https://api.unsplash.com/photos/random"
const settings = {
    method: "Get",
    headers: {
        Authorization: `Client-ID ${process.env.apiAccess}`,
        query: "Cat"
    }
}

const selectReminder = {
    id: true,
    title: true,
    body: true,
    date: true,
    completed: true,
    createdAt: true,
    tags: true
}

const selectFollowing = {
    name: true,
    profileURL: true,
    reminders: {select: selectReminder}
}

const selectInfo = {
    id: true,
    name: true,
    profileURL: true,
    reminders: {select: selectReminder},
    following: {select: selectFollowing}
}
const userModel = {
    getUserByEmailAndPassword: async (user_email, user_pass) => {
        
        const user = await prisma.user.findFirst({
            where: {email: user_email, password: user_pass},
            select: selectInfo
        })
        if (user) {
            return user
        } else {
            return null
        }
    },
    findByEmail: async (user_email) => {
        const user = await prisma.user.findUnique({
            where: {email: user_email},
            select: selectInfo
        })
        if (user) {
            return user
        }
        return null
    },
    findById: async (user_id) => {
        const user = await prisma.user.findUnique({
            where: {id: user_id},
            select: selectInfo
        })
        if (user) {
            return user
        }
        return null
    },

    addReminder: async (data) => {
        await prisma.reminder.create({
            data: {
                title: data.title,
                body: data.body,
                userId: data.userId,
                date: data.date,
                tags: data.tags
            }
        })
    },

    updateReminder: async (data) => {
        await prisma.reminder.update({
            where: { id: data.id},
            data: data
        });
    },

    deleteReminder: async(data) => {
        await prisma.reminder.delete({
            where: {id: data.id}
        })
    },

    addProfile: async (profile) => {
        await prisma.user.create({
            data: profile
        })
    },

    findOrCreate: async (profile, cb) => {
        await userModel.findById(profile.id)
        .then(async (user) => {
            if (user) {
                cb(null, user)
            } else {
                await fetch(unsplashApi, settings)
                .then(res => res.json())
                .then(imgJson => {
                    userModel.addProfile({
                        id: profile.id,
                        name: profile.username,
                        profileURL: imgJson.urls.thumb
                    })
                .then(() => {return userModel.findById(profile.id)})
                .then(user => {
                    cb(null, user)
                })
                .catch(err => {cb(err, null)})
                })
              }
            })
    },
    
    findReminder: async (reminderId, userId) => {
        const reminder = await prisma.user.findUnique({
            where: {id: userId},
            select: {reminders: {
                where: {id: reminderId},
                select: selectReminder
            }}
        })
        if (reminder.reminders){
            return reminder.reminders[0]
        } else {
            return null
    }},

    addFriend: async (userID, toAddID) => {
        await prisma.user.update({
            where: {
                id: userID
            },
            data: {
                following: {
                    connect: {id: toAddID}
                }
            }
        })
    },

    delFriend: async (userID, toDelID) => {
        await prisma.user.update({
            where: {
                id: userID
            },
            data: {
                following: {
                    disconnect: {id: toDelID}
                }
            }
        })
    },

    findFriend: async (searchTerm) => {
        const result = await prisma.user.findMany({
            where: { name: {
                contains: searchTerm
            }},
            select: {
                name: true,
                id: true,
                profileURL: true,
                followedBy: true
            }
        })
        return result
    },
    searchReminder: async (userId, search) => {
        const reminder = await prisma.reminder.findMany({
            where: {
                tags: {
                    contains: search,
                },
            },
            include: {
                user: true,
            }
        })
        if (reminder){  
            return reminder
        } else {
            return null
    }}
}

module.exports = {userModel};