const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

app.use(cors())
app.use(express.static('public'))
// For parsing application/json 
app.use(express.json()); 
// For parsing application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended:true })); 

main().catch(err => console.log(err));

async function main(){
  mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");

    // post username
    const userSchema = new mongoose.Schema({
      username: String
    });
    const Users = mongoose.model('Users', userSchema);
    app.post('/api/users', (req, res) => {
      const input_username = req.body.username;
      const username = new Users({
        username: input_username
      })
      username.save();    
    })

  });
  


}



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
