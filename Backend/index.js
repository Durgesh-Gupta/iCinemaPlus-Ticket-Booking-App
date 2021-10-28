const express =require("express")
const app=express()
const port = 5000
//connecting to Mongo
const connectToMongo=require('./db')
connectToMongo()

app.use(express.json())

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