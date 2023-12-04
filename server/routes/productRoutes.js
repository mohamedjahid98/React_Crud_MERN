const express = require('express');
const router = express.Router();
const ProductModel = require('../Models/Products');
const upload = require('../middleware/multer'); 


router.get('/productdata', (req, res) => {
    ProductModel.find({})
    .then(products=>res.json(products))
    .catch(err=>res.json(err))
});

router.get('/getProduct/:id', (req, res) => {
    const id =req.params.id;
    ProductModel.findById({_id:id})
    .then(products=>res.json(products))
    .catch(err=>res.json(err))
});


// router.post('/createProduct', (req, res) => {
//     ProductModel.create(req.body)
//     .then(products=>res.json(products))
//     .catch(err=>res.json(err))
// });

// router.post('/createProduct', async (req, res) => {
//     try {
//         const { imageUrl, name, category, description, price } = req.body;
//         const product = new ProductModel({ imageUrl, name, category, description, price });
//         const savedProduct = await product.save();
//         res.status(201).json(savedProduct);
//     } catch (error) {
//         console.error('Error creating product:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
router.post('/createProduct', upload.single('image'), async (req, res) => {
    try {
        const { name, category, description, price } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Save the path to the image
        const product = new ProductModel({ imageUrl, name, category, description, price });
        const savedProduct = await product.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/updateProduct/:id', (req, res) => {
    const id =req.params.id;
    ProductModel.findByIdAndUpdate({_id:id},{
        url:req.body.url,
        name:req.body.name,  
        category:req.body.category, description:req.body.description,
        price:req.body.price
    })
    .then(products=>res.json(products))
    .catch(err=>res.json(err)) 
});

router.delete('/deleteProduct/:id', (req, res) => {
    const id =req.params.id;
    ProductModel.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
});

module.exports = router;
