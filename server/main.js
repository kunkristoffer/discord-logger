// Import dependencies
import express from 'express'
import cors from "cors"
import connectDiscordBot from './services/discord/client.js'
import connectDB from './services/mongodb/connect.js'

// Import routes
import apiRouter from './routes/api.js'

// Import configs from .env
import { EXPRESS_CLIENT_PORT, EXPRESS_SERVER_PORT, MONGODB_URL, MONGODB_DB } from "./config/index.js"

// ES6 import fix for path
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

// Initilize express servers
const server = express()
const client = express()

// Setup cors
// const corsOptions = { origin: "http://localhost:3000" }

// Initilize dependencies
server.use(cors({ origin: "http://localhost:3000" }))
server.use(express.json())

// Connect to mongoDB with mongoose
connectDB(MONGODB_URL + MONGODB_DB)

// Start discord.js bot
// connectDiscordBot()

// Define static path for client assets
client.use(express.static(path.join(__dirname, '../client/dist')))

// Handle HTML response
client.get('/', ( req, res ) => { res.sendFile(path.join(__dirname, '../client/dist/index.html')) })

// Handle api requests
server.use('/', apiRouter)

// Listen for requests
server.listen(EXPRESS_SERVER_PORT, () => console.log(`Backend server listening at http://localhost:${EXPRESS_SERVER_PORT}`))
client.listen(EXPRESS_CLIENT_PORT, () => console.log(`Frontend server listening at http://localhost:${EXPRESS_CLIENT_PORT}`))