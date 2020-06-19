const express = require('express');
const router = express.Router();

const mongodb = require('mongodb');
const dbManager = require('../../lib/dbManager');

router.get('/', async (req, res) => {
    const news = await dbManager.loadNewsCollection();
    if(req.query.id){
        const id = new mongodb.ObjectID(req.query.id);
        let report = (await news.find({_id: id}).toArray())[0];//report is one new
        res.send(report);
    }else{
        res.send(await news.find({}).toArray());
    }
});

router.post('/', async(req, res) =>{
    const news = await dbManager.loadNewsCollection();
    let report = req.body.report;
    let {_id, title, author, description, thumbnail, elements} = report;
    if(title && !_id){
        await news.insertOne({
            createdAt: new Date(),
            title,
            author,
            description,
            thumbnail,
            elements,
        });
        res.status(201).send();//created
    }else if(title && _id){
        news.updateOne(
            { _id: mongodb.ObjectID(_id) },
            {
                $set: { createdAt: new Date(), title, author, description, thumbnail, elements },
            }
        )
        res.status(201).send();//created
    }
    else{
        res.status(400).send();//bad request
    }
});

router.delete('/:id', async(req, res) =>{
    const news = await dbManager.loadNewsCollection();
    const id = new mongodb.ObjectID(req.params.id);
    try{
        await news.deleteOne({_id: id});
        res.status(200).send();
    }catch{
        res.status(400).send();
    }
});

module.exports = router;
