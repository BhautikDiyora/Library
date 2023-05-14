require("./db/config");

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const bookModel = require("./db/Book");
const userModel = require("./db/User");
const multer = require('multer');

const cors = require("cors");

const JWT = require('jsonwebtoken')
const jwtKey = 'vibe'

const app = express();
app.use(express.json());

app.use(cors());

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization']
    if (token) {
        let t = token.split(' ')[1]
        JWT.verify(t, jwtKey, (err, valid) => {
            if (err) {
                res.status(403).send({ result: "Wrong Token" })
            } else {
                next()
            }
        })
    } else {
        res.status(401).send({ result: "Token not Provided" })
    }
}


app.get("/user-book/:id", async (req, res) => {
    let data = await userModel.findOne({ _id: req.params.id });
    res.send(data.favorites);
});


app.get("/users", async (req, res) => {
    let data = await userModel.find();
    res.send(data);
});


app.get("/books", async (req, res) => {
    let data = await bookModel.find();
    res.send(data);
});

app.get("/get-user/:id", async (req, res) => {
    let data = await userModel.find({ _id: req.params.id });
    if (data.length > 0) {
        res.send(data)
    } else {
        res.send({ result: "No User Found!" })
    }
});

app.get("/get-book/:id", async (req, res) => {
    let data = await bookModel.findOne({ _id: req.params.id });
    res.send(data)
});

app.post('/update-password/:id', async (req, res) => {
    let data = await userModel.findOne({ _id: req.params.id });
    const validPassword = await bcrypt.compare(
        req.body.oldPassword,
        data.password
    );
    if (validPassword) {
        let hashPwd = await bcrypt.hash(req.body.newPassword, 10);
        let result = await userModel.updateOne({ _id: req.params.id }, { $set: { "password": hashPwd } })
        res.send(result)
    } else {
        res.send({ "error": "Done" })
    }
})



app.post('/update-user/:id', async (req, res) => {
    let data = await userModel.updateOne({ _id: req.params.id }, { $set: req.body })
    res.send(data)
})

app.post('/add-fav/:id', async (req, res) => {
    let data = await userModel.updateOne({ _id: req.params.id }, { $addToSet: req.body })
    res.send(data)
})


app.post('/update-fav/:id', async (req, res) => {
    let data = await userModel.updateOne({ _id: req.params.id }, { $set: req.body })
    res.send(data)
})

app.post('/update-issue/:id', async (req, res) => {
    let data = await userModel.updateOne({ _id: req.params.id }, { $set: req.body })
    res.send(data)
})

app.get('/get-issue/:id', async (req, res) => {
    let data = await userModel.findOne({ _id: req.params.id })
    res.send(data)
})


app.post('/issue-book/:id', async (req, res) => {
    let data = await userModel.updateOne({ _id: req.params.id }, { $set: req.body })
    res.send(data)
})

app.post('/book-update/:id', async (req, res) => {
    let data = await bookModel.updateOne({ _id: req.params.id }, { $set: req.body })
    res.send(data)
})

app.delete('/delete-book/:id', verifyToken, async (req, res) => {
    let data = await bookModel.deleteOne({ _id: req.params.id })
    res.send(data)
})


app.post('/add-book', verifyToken, async (req, res) => {
    let data = new bookModel(req.body)
    let result = await data.save()
    res.send(result)
})


app.post('/register', async (req, res) => {
    let data = new userModel(req.body);
    data.password = await bcrypt.hash(data.password, 10);
    let result = await data.save()
    let ores = result.toObject()
    delete ores.password
    if (ores) {
        JWT.sign({ id: result._id }, jwtKey, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                res.send({ result: "Something went wrong" })
            } else {
                res.send({ data, auth: token })
            }
        })
    } else {
        res.send({ result: "Registration failed!" })
    }
})


app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await userModel.findOne({ email: req.body.email })
        if (user) {
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (validPassword) {
                JWT.sign({ id: user._id }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                    if (err) {
                        res.send({ result: "Something went wrong" })
                    } else {
                        res.send({ user, auth: token })
                    }
                })
            } else {
                res.send({ result: "Wrong Password" })
            }

        } else {
            res.send({ result: "No user found" })
        }
    } else {
        res.send({ result: "Input fields empty" })
    }
})

app.listen(6969);