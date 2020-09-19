import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js"
import Cors from 'cors';

import {CONNECTION_URL} from './configs.js'

// App config
const app = express();
const port = process.env.PORT || 8001;

// Middlewares
app.use(express.json())
app.use(Cors());

// DB Config
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndextrue: true,
    useUnifiedTopology: true,
});

// API Exndpoints
app.get('/', (req,res) => res.status(200).send("HELLO WORLD!"));
app.post('/webchat/card', (req, res) => {
    const dbCard = req.body

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get('/webchat/card', (req,res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
