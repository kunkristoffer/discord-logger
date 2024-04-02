// Import dependencies
import express from 'express'
import cors from "cors"
import discordBot from './services/discord/client.js'
import connectDB from './services/mongodb/connect.js'

// Import configs from .env
import { EXPRESS_PORT, MONGODB_URL } from "./config/index.js"

// Initilize express servers
const server = express()
const client = express()

// Initilize dependencies
server.use(cors())
server.use(express.json())

// Connect to mongoDB
connectDB(MONGODB_URL)

// Start discord.js bot
try { discordBot() }
catch (err) { console.log('An error occoured starting the discord bot, read logs =>\n', err) }




// Temporary html response page
server.get('/', (request, response) => {
	return response.sendFile('app/pages/index.html', { root: '.' })
})

// Listen for requests
server.listen(EXPRESS_PORT, () => console.log(`Backend server listening at http://localhost:${EXPRESS_PORT}`))
client.listen(EXPRESS_PORT, () => console.log(`Frontend server listening at http://localhost:${EXPRESS_PORT}`))