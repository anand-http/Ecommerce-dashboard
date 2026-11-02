const express = require('express');
require("./db/config")
const User = require('./db/userSchema')
const app = express()
const cors = require('cors');
const Product = require('./db/ProductSchema')
const Jwt = require('jsonwebtoken');
const Jwtkey = 'Ecommerce';

app.use(express.json());
app.use(cors());



app.post('/register', async (req, res) => {

    let user = new User(req.body)
    if (req.body.name == 0 || req.body.email == 0 || req.body.password == 0) {
        res.send({ result: "please enter valid details" })
    }
    else {
        let result = await user.save();
        result = result.toObject()
        delete result.password;

        Jwt.sign({ result }, Jwtkey, (err, token) => {

            if (err) {
                res.send({ result: "something went wrong please check again after sometimes" })
            }
            else {

                res.send({ result, auth: token })
            }
        })


    }


});

app.post('/login', async (req, res) => {
    let user = await User.findOne(req.body).select("-password");
    if (req.body.email && req.body.password) {
        if (user) {
            Jwt.sign({ user }, Jwtkey, { expiresIn: "5h" }, (err, token) => {

                if (err) {
                    res.send({ result: "Something went wrong" });
                }
                res.send({ user, auth: token })
            })
        }
        else {
            res.send({ result: "no user found" });
        }
    }
    else {
        res.send({ result: "no user found enter correct email and password" })
    }
})

app.post('/addProduct', tokenVerify, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
})



app.get('/products', tokenVerify, async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    }
    else {
        res.send({ result: "No product found" })
    }
})


app.delete('/product/:id', tokenVerify, async (req, res) => {
    let delproducts = await Product.deleteOne({ _id: req.params.id })
    res.send(delproducts)
});

app.get('/product/:id', tokenVerify, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    }
    else {
        res.send({ result: "result not found" });
    }

});



app.put('/product/:id', tokenVerify, async (req, res) => {
    let result = await Product.updateOne({ _id: req.params.id }, { $set: req.body })
    res.send(result);
})


app.get('/search/:key', tokenVerify, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    });
    res.send(result);

})


app.get('/user/:name', async (req, res) => {
        let user = await User.findOne({name:req.params.name}).select("-password")
        // user = await user.json();
        res.send(user);
});





function tokenVerify(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];

        Jwt.verify(token, Jwtkey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please add valid token" })
            }
            else {
                next();
            }
        })

    }
    else {
        res.status(403).send({ result: "plz add token with headers" })
    }

}


app.listen(5000);