const fetch = require('node-fetch');
const express = require('express');

const app = express();
const app2Endpoint = process.env.app2;

app
    .get('/', (req, res) => {
        return res.send('hello from app1');
    })

    .get('/app2', async (req, res) => {
        let data = await fetch(`${app2Endpoint}/`).then(res => res.text());
        return res.send(data);
    })

    .get('/app2db', async(req, res) => {
        let data = await fetch(`${app2Endpoint}/data`).then(res => res.text());
        return res.send(data);
    });

app.listen(process.env.PORT, () => {
    console.log('App1 running on ' + process.env.PORT);
});
