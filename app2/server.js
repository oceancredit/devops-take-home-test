const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

let schema = new mongoose.Schema({
    value: String
});

let Model = mongoose.model('app2', schema);

const app = express();

app
    .get('/', (req, res) => {
        return res.send('hello from app2');
    })
    .get('/data', async(req, res) => {
        let data = await Model.findOne().lean().exec();

        return res.send(data.value);
    });

mongoose
    .connect(process.env.mongo_url)
    .then(() => {
        app.listen(process.env.PORT, async(err) => {
            await Model.remove({}).exec();
            let entity = new Model({ value: 'hello from mdb' });
            await entity.save();
            if (err) {
                console.log(err.message);
            } else {
                console.log('Service app2 listening on' + process.env.PORT);
            }
        });
    })
    .catch(() => {
        console.log('Could not connect to mongo using' + process.env.mongo_url);
    });