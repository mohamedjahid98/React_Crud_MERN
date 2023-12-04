const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    dob: Date,
    email: String,
    password: String,
    address: String
});



const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
