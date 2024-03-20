
const express = require('express')
const router = express.Router()

router.get('/shop', (req, res) => {
    res.render('shop', {shop: 'shop'})
})

// router.get('/products', (req, res) => {
//     res.render('product-details')
// })
// router.get('/contact', (req, res) => {
//     res.render('contact')
// })
module.exports = router