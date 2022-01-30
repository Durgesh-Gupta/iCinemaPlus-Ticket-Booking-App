const express =require("express")
const path=require("path")
const app=express()
const port = process.env.PORT || 5000
const dotenv = require('dotenv')
//connecting to Mongo
const connectToMongo=require('./db')
connectToMongo()
//
// app.set('view engine', 'ejs')
dotenv.config({ path: './config.env' })

var cors = require('cors')
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(express.static(__dirname+"./Backend/public/"))
// app.use('/public', express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')))


//Routes
app.use("/api/auth",require("./Routes/auth"))
app.use("/api/admin",require("./Routes/admin"))
// Admin Actions
app.use("/api/movies",require("./Routes/movies"))
app.use("/api/show",require("./Routes/Showtime"))
//Ticket Booking
app.use("/api/booking",require("./Routes/Reservation"))


// app.get('/', (req, res) => {
//   res.send('Welcome To ICinema Backend !')
// })

// For Heroku
// server static assets if in production
if(process.env.NODE_ENV === 'production'){    
  app.use(express.static('client/build'))  // set static folder 
  //returning frontend for any route other than api 
  app.get('*',(req,res)=>{     
      res.sendFile (path.resolve(__dirname,'client','build',         
                    'index.html' ));    
  });
}



// end heroku

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})