const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

app.use(cors())
app.use(express.static('public'))

main().catch(err => console.log(err));

async function main(){
  mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
  console.log("Connected successfully");
  const userSchema = new mongoose.Schema({
    username: String
  });
  const Users = mongoose.model('Users', userSchema);
  const frank = new Users({username: 'Frank Xia'});

  frank.save();
  console.log(frank.username)
  });
  


}



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
