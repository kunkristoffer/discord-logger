// Import dependencies
import express from 'express'
import cors from "cors"
import discordBot from './services/discord/client.js'
import connectDB from './services/mongodb/connect.js'

// Import configs from .env
import { EXPRESS_PORT, MONGODB_URL } from "./config/index.js"

// Initilize express app
const app = express()

// Initilize dependencies
app.use(cors())
app.use(express.json())

// Connect to mongoDB
connectDB(MONGODB_URL)

// Start discord.js bot
try { discordBot() }
catch (err) { console.log('An error occoured starting the discord bot, read logs =>\n', err) }

// Temporary html response page
app.get('/', (request, response) => {
	return response.sendFile('app/pages/index.html', { root: '.' })
})

// Listen for requests
app.listen(EXPRESS_PORT, () => console.log(`Express app listening at http://localhost:${EXPRESS_PORT}`))