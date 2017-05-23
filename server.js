var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var contacts = [
{
    id: 1,
    firstName: 'Steve',
    lastName: 'Becherer',
    email: 'steve@conquer.com'
},
{
    id: 2,
	firstName: 'Mike',
    lastName: 'Jones',
    email: 'jones@theman.com'}
];

var currentId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/contacts', function(req, res) {
    res.send({ contacts: contacts });
});

app.post('/contacts', function(req, res) {
    var contactFirstName = req.body.firstName;
    var contactLastName = req.body.lastName;
    var contactEmail = req.body.email;
    currentId++;

    contacts.push({
        id: currentId,
        firstName: contactFirstName,
        lastName: contactLastName,
        email: contactEmail,

    });

    res.send('Successfully created contact!');
});

app.put('/contacts/:id', function(req, res) {
    var id = req.params.id;
    var newFirstName = req.body.newFirstName;
    var newLastName = req.body.newLastName;
    var newEmail = req.body.newEmail;

    var found = false;

    contacts.forEach(function(contact, index) {
        if (!found && contact.id === Number(id)) {
            contact.firstName = newFirstName;
        	contact.lastName = newLastName;
        	contact.email = newEmail;
        }
    });

    res.send('Succesfully updated product!');
});

app.delete('/contacts/:id', function(req, res) {
    var id = req.params.id;

    var found = false;

    contacts.forEach(function(contact, index) {
        if (!found && contact.id === Number(id)) {
            contacts.splice(index, 1);
        }
    });

    res.send('Successfully deleted contact!');
});

app.listen(PORT, function() {
    console.log('The Dragon Roars On Port ' + PORT);
});