const express = require('express');
const router = express.Router();
const CustomerModel = require('../Models/Customer');


router.get('/cusdata', (req, res) => {
    CustomerModel.find({})
    .then(customers=>res.json(customers))
    .catch(err=>res.json(err))
});

router.get('/getCustomer/:id', (req, res) => {
    const id =req.params.id;
    CustomerModel.findById({_id:id})
    .then(customers=>res.json(customers))
    .catch(err=>res.json(err))
});

router.post('/createCustomer', (req, res) => {
    CustomerModel.create(req.body)
    .then(customers=>res.json(customers))
    .catch(err=>res.json(err))
});

router.put('/updateCustomer/:id', (req, res) => {
    const id =req.params.id;
    CustomerModel.findByIdAndUpdate({_id:id},{
        name:req.body.name, age:req.body.age, 
        address:req.body.address, phone:req.body.phone
    })
    .then(customers=>res.json(customers))
    .catch(err=>res.json(err)) // ... (update Customer by ID route logic)
});

router.delete('/deleteCustomer/:id', (req, res) => {
    const id =req.params.id;
    CustomerModel.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
});

module.exports = router;
