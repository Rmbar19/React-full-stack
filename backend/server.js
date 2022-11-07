const express = require('express');
const app = express();
const { Client } = require('pg');
const cors = require("cors");
const axios = require('axios');


const connectionString = 'postgresql://yourusername:yourpassword@ip:port/database'
const client = new Client({
    connectionString: connectionString,
})

const PORT = process.env.PORT || 4001;
client.connect();
app.use(express.json());

app.use(cors())

app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("/home", (req, res) => {
    client.query('SELECT * FROM build')
        .then((result) => {
        res.send(result.rows)
})   
})

app.get("/aoe", (req, res) => {
    axios.get('https://age-of-empires-2-api.herokuapp.com/api/v1/structures')
        .then((response) => {

            res.send(response.data)
        })
})

app.post('/build', (req, res) => {

    client.query(`INSERT INTO build (name) VALUES ('${req.body.name}');`)

        .then(() => res.json(req.body.name))
    res.status(201)


})

app.delete('/remove/:name', (req, res) => {
     console.log(req.params.name)
    client.query(`DELETE FROM build WHERE name = '${req.params.name}';`)
        .then(() => {
            res.send("success")
        }
        )
})

app.listen(PORT, () => {
    console.log("listening on port", PORT)
})

