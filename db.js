const mongoose = require('mongoose')

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

async function dbConnect() {
    mongoose.connect(process.env.DB_URL,
            {
                useNewUrlParser : true,
                useUnifiedTopology : true,
            }
          )
          .then(() => {
            console.log("Successfully connected to mongoDB")
          }) .catch((err) => {
            console.log("Unable to connect to mongoDb")
            console.error(err)
          })
}

module.exports = dbConnect



