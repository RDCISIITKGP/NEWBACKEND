import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import { UserModel } from "./user.model"
import { Request } from "express"
import { LoginUserBody, RegisterUserBody } from "./user.schema"
import dotenv from "dotenv"
import { StatusCodes } from "http-status-codes"
import { ObjectId } from "mongodb"

dotenv.config()

const { MongoClient, ServerApiVersion } = require("mongodb")

const uri = "mongodb://nasim:nasim%40msf@103.154.184.52:27017"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

/**
 @desc    Register new user
 @route   POST /api/users
 @access  Public
*/

// function to register a new user
const registerUser = asyncHandler(
    async (req: Request<{}, {}, RegisterUserBody>, res) => {
        console.log("YEH I GOT YOU, I LOVE YOU")
        const { name, email, password, profileImage, role, phone } = req.body
        // const name = "Ananta Dutta"
        // const email = "duttaananta03@gmail.com"
        // const password = "Ananta_dutta_123"
        // const profileImage = ""
        // const role = "Admin"
        // const phone = "9679196904"

        if (!name || !email || !password) {
            res.status(400)
            throw new Error("Please add all fields")
        }

        // Check if user exists
        const userExists = await UserModel.findOne({ email })

        if (userExists) {
            res.status(400)
            throw new Error("User already exists")
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user
        const user = await UserModel.create({
            name,
            email,
            profileImage,
            role,
            phone,
            password: hashedPassword,
        })

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profileImage: user.profileImage,
                token: generateToken(user._id),
            })
        } else {
            res.status(400)
            throw new Error("Invalid user data")
        }
    }
)

/**
 @desc    Authenticate a user
 @route   POST /api/users/login
 @access  Public
*/

// function to login a registered user
const loginUser = asyncHandler(
    async (req: Request<{}, {}, LoginUserBody>, res) => {
        console.log("YEH I GOT YOU , LOVE YOU LOGIN")
        console.log(req.body)
        const { email, password } = req.body
        await client.connect()
        const db = client.db("BSP")
        const collectionUser = db.collection("users")

        const user = await collectionUser.findOne({ email })
        console.log(user)

        console.log("yeh is done")

        // Check for user email

        if (user && (await bcrypt.compare(password, user.password))) {
            console.log("matched")
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profileImage: user.profileImage,
                token: generateToken(user._id),
            })
        } else {
            console.log("no")
            res.status(400)
            throw new Error("Invalid credentials")
        }
    }
)

/**
@desc Get user data
@route GET /api/users/me
@access Private
*/

// getting the information of a logged in user
const getMe = asyncHandler(async (req, res) => {
    // @ts-ignore
    res.status(200).json(req.user)
})

/**
@desc Get all users
@route GET /api/users/me
@access Public
*/
// getting the list of all the users
const getUsers = asyncHandler(async (req, res) => {
    await client.connect()
    const db = client.db("BSP")
    // 64918764fedaff5916642880
    const collectionUser = db.collection("users")
    const cursor = collectionUser.find()
    const users = await cursor.toArray()
    console.log(users)
    res.send(users)
})

/**
@desc Deletes a user
@route GET /api/users/:id
@access Private
*/

// function to delete a user by their id
const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id
    console.log({ userId })

    try {
        await client.connect()
        const db = client.db("BSP")
        const collectionUser = db.collection("users")

        const user = await collectionUser.deleteOne({
            _id: new ObjectId(userId),
        })

        console.log({ user })

        if (!!user) {
            res.status(StatusCodes.OK).json({ id: req.params.id })
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" })
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error })
    }

    // @ts-ignore
    // if (!req.user) {
    //     res.status(StatusCodes.UNAUTHORIZED)
    //     throw new Error("User not found")
    // }

    // @ts-ignore
    // if (user._id.toString() !== req.user.id) {
    //     res.status(StatusCodes.UNAUTHORIZED)
    //     throw new Error("User not authorized")
    // }

    // await user.remove()
})

/**
@desc Updates a user with a given id
@route GET /api/users/:id
@access Private
*/

// function to update a user by their id
const updateUser = asyncHandler(
    async (req: Request<{ id: string }, {}, RegisterUserBody>, res) => {
        const user = await UserModel.findById(req.params.id)

        if (!user) {
            res.status(StatusCodes.BAD_REQUEST)
            throw new Error("User not found")
        }

        // @ts-ignore
        if (!req.user) {
            res.status(StatusCodes.UNAUTHORIZED)
            throw new Error("User not found")
        }

        // @ts-ignore
        if (user._id.toString() !== req.user.id) {
            res.status(StatusCodes.UNAUTHORIZED)
            throw new Error("User not authorized")
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        )

        res.status(StatusCodes.OK).json({ user: updatedUser })
    }
)

// function to generate a json web token (used for authentication)
// Generate JWT
const generateToken = (id: string) => {
    return jwt.sign({ id }, "Batfleck", {
        expiresIn: "30d",
    })
}

export { loginUser, registerUser, getMe, getUsers, deleteUser, updateUser }
