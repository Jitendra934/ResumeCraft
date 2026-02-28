import "./config/env.js"
import { connectDB } from "./db/index.js"
import { app } from "./app.js" 

const port = process.env.PORT || 3000;

connectDB()
 .then(() => {
    app.on("error", (error) => (
      console.log("ERROR: ", error)
    )),

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`)
    })
 })
 .catch((err) => (
   console.log("ERROR: ", err)
 ))