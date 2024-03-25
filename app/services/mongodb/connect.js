import mongoose from "mongoose"

const connectDB = async (url) => {
  // Establish connection to database
  try { mongoose.connect(url) }
  catch (err) {
    console.log("\tError connecting to database =>", err)
  }

  const db = mongoose.connection

  db.once("open", () => {
    console.log(`Database connected: ${url}`)
  })

  db.on("error", (err) => {
    console.error(`connection error: ${err}`)
  })

  return
}

export default connectDB