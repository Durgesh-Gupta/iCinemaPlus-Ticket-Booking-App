const express =require("express")
const app=express()
const port = 5000
//connecting to Mongo
const connectToMongo=require('./db')
connectToMongo()
//
var cors = require('cors')
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname+"./Backend/public/"))
// app.use("/public",express.static("public"))

//Routes
app.use("/api/auth",require("./Routes/auth"))
app.use("/api/admin",require("./Routes/admin"))
// Admin Actions
app.use("/api/movies",require("./Routes/movies"))
app.use("/api/show",require("./Routes/Showtime"))
//Ticket Booking
app.use("/api/booking",require("./Routes/Reservation"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})