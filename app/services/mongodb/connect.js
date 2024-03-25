import mongoose from "mongoose"

const connectDB = async (url) => {

  try {
    mongoose.connect(url)
  }
  catch (err) {
    console.log("\tError connecting to database =>", err)
  }

  const dbConnection = mongoose.connection

  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`)
  })

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`)
  })

  return
}

export default connectDB