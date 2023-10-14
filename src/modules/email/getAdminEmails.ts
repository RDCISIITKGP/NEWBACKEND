import { MongoClient, ServerApiVersion } from "mongodb"

type User = {
    _id: string
    name: string
    email: string
    phone: string
    role: string
    password: string
    profileImage: string
}

const URI = "mongodb://nasim:nasim%40msf@103.154.184.52:27017"

const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

const getAdminEmails = async () => {
    await client.connect()
    const db = client.db("BSP")

    const users = db.collection("users").find({})

    let usersList: User[] = []

    await users.forEach((document) => {
        usersList.push(document as User)
    })

    const admins = usersList.filter(
        ({ role }) => role?.toLowerCase() === "admin"
    )

    const adminEmails = admins.map(({ email }) => email)

    return adminEmails
}

getAdminEmails()

export default getAdminEmails
