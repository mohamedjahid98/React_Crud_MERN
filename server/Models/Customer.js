const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: String,
    age: String,
    address: String,
    phone: Number
});



const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
