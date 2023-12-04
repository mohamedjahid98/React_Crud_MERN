const express = require('express');
const router = express.Router();
const EmployeeModel = require('../Models/Emploees');


router.get('/empdata', (req, res) => {
    EmployeeModel.find({})
    .then(employees=>res.json(employees))
    .catch(err=>res.json(err))
});

router.get('/getEmployee/:id', (req, res) => {
    const id =req.params.id;
    EmployeeModel.findById({_id:id})
    .then(employees=>res.json(employees))
    .catch(err=>res.json(err))
});

router.post('/createEmployee', (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees=>res.json(employees))
    .catch(err=>res.json(err))
});

router.put('/updateEmployee/:id', (req, res) => {
    const id =req.params.id;
    EmployeeModel.findByIdAndUpdate({_id:id},{
        name:req.body.name, age:req.body.age, 
        dob:req.body.dob, gender:req.body.gender, 
        email:req.body.email, password:req.body.password,
        address:req.body.address
    })
    .then(employees=>res.json(employees))
    .catch(err=>res.json(err)) // ... (update employee by ID route logic)
});

router.delete('/deleteEmployee/:id', (req, res) => {
    const id =req.params.id;
    EmployeeModel.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
});

module.exports = router;
