import express from 'express'
import path from 'path'
import { __dirname } from '../main.js'

// Create express route
const attendanceRouter = express.Router()

attendanceRouter.get('/', ( req, res ) => {
  res.sendFile(path.join(__dirname, '../client/pages/attendance/index.html'))
})

attendanceRouter.get('/create', ( req, res ) => {
  res.sendFile(path.join(__dirname, '../client/pages/attendance/params.html'))
})

export default attendanceRouter