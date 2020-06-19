const express = require('express');
const router = express.Router();

const mongodb = require('mongodb');
const dbManager = require('../../lib/dbManager');

router.get('/', async (req, res) => {
    const blogs = await dbManager.loadBlogsCollection();
    if(req.query.id){
        const id = new mongodb.ObjectID(req.query.id);
        let blog = (await blogs.find({_id: id}).toArray())[0];
        res.send(blog);
    }else{
        res.send(await blogs.find({}).toArray());
    }
});

router.post('/', async(req, res) =>{
    const blogs = await dbManager.loadBlogsCollection();
    let blog = req.body.blog;
    let {_id, title, author, description, thumbnail, elements} = blog;
    if(title && !_id){
        await blogs.insertOne({
            createdAt: new Date(),
            title,
            author,
            description,
            thumbnail,
            elements,
        });
        res.status(201).send();//created
    }else if(title && _id){
        blogs.updateOne(
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
    const blogs = await dbManager.loadBlogsCollection();
    const id = new mongodb.ObjectID(req.params.id);
    try{
        await blogs.deleteOne({_id: id});
        res.status(200).send();
    }catch{
        res.status(400).send();
    }
});

module.exports = router;
