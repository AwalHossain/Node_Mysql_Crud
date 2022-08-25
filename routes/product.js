const router = require('express').Router();
const db = require('../connection');
const authGuard = require('../services/authGuard');
const checkRole = require('../services/checkRole');

/** Add product details */
router.post("/add", authGuard, checkRole, (req, res) => {
    let { name, categoryId, description, price, status } = req.body;
    let query = "insert into product (name, categoryId, description, price, status) values (?,?,?,?,'true')";

    db.query(query, [name, categoryId, description, price], (err, result) => {
        if (!err) {
            console.log(result);
            return res.status(200).json({ msg: "Product Added successfully" })
        } else {
            return res.status(500).json(err)
        }
    })
})


/** Get product with catefory name */
router.get('/get', authGuard, (req, res) => {
    // query to get product from db
    let query = "select p.id, p.name, p.description, p.price, p.price, c.id as categoryId, c.name as categoryName from product as p INNER JOIN category as c where p.categoryId = c.id";

    db.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result)
        } else {
            return res.status(500).json(err);
        }
    })
})



/** Get by category */

router.get("/categoryId/:id", authGuard,(req, res)=>{
    const id = req.params.id
    let query = "select id, name from product where categoryId=? and status='true'";

    db.query(query, [id], (err, result)=>{
        if(!err){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(err);
        }
    })
})


module.exports = router;