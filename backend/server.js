import dotenv from 'dotenv'
import app from './app.js'
import mongoose from 'mongoose'

// Loads the Environment Variables at the very start
// So anywhere in the project they will be globally available
// in the process object
dotenv.config()

// Extracting the PORT as well as suggesting the one in case of nofound
const PORT = process.env.PORT || 5000

// Calling the mongoose driver function which is like fetch() call
// and provides the .then() and .catch() functionalities out of the box
mongoose
  .connect(process.env.MONGO_URI, { dbName: 'bugnest' })
  .then(() => {
    console.log('MongoDB Connected!')
    app.listen(PORT, () => console.log(`Server Running on the Port ${PORT}`))
  })
  .catch((err) => {
    console.log('DB Connection Failed!', err)
  })

// This file is the first thing that runs in our server
// This file is the starting setter of the whole project and is the most essential file
// because it setsup the essential things on which our whole project stands
// if these things could not setup then our project fails even from the start
// And in this way we could find the problem as early as possible
