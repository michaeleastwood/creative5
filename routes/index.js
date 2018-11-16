var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency
var mongo = require('mongo');
var mongodb = require('mongodb');

mongoose.connect('mongodb://localhost/contactDB', { useNewUrlParser: true }); //Connects to a mongo database called "contactDB"

var contactSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Phone: String,
    Email: String,
    Address: String
});

var Contact = mongoose.model('Contact', contactSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});


/* GET home page. */
router.post('/contact', function(req, res, next) {
    console.log("POST contact route");
    var newcontact = new Contact(req.body);
    console.log(newcontact);
    newcontact.save(function(err, post) {
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });
});

/*router.post('/delete', function(req, res, next) {
    console.log("POST delete route");
    db.collection("contacts").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
    });
});*/

router.get('/contact', function(req, res, next) {
    console.log("In the GET route?");
    console.log(req.query)
    var requestname = req.query["q"]
    console.log("Requestname: " + requestname)

    if (requestname) {
        obj = { Name: requestname }
    }
    else {
        obj = {};
    }
    console.log(String(obj))
    Contact.find(obj, function(err, contactList) { //Calls the find() method on your database
        if (err) {
            return console.error(err); //If there's an error, print it out
        }
        else {
            console.log(contactList); //Otherwise console log the contacts you found
            res.json(contactList); //Then send the contacts
        }
    })
});

module.exports = router;
