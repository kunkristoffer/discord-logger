// Import dependencies
import express from 'express'
import path from 'path'
import discord from './services/discord/client.js'

const port = 2000

// Initilize app
const app = express()

app.get('/', (request, response) => {
	return response.sendFile('app/pages/index.html', { root: '.' })
})

app.listen(port, () => console.log(`Express app listening at http://localhost:${port}`))


// Start discord bot
// discord()

// Initilize dependencies

