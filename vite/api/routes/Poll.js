const router = require('express').Router();
const { ResultWithContext } = require('express-validator/src/chain');
const { verify } = require('jsonwebtoken');
const Poll = require('../models/Poll');
const verifyToken = require('../utils/verifyToken');

router.get('/test', async(req, res)=>{
    console.log('Request Received')
    res.status(200).json("Test Route Working");
})

router.post('/new', verifyToken, async(req, res)=>{
    console.log(req.body);

    const poll = new Poll({
        user: req.user.id,
        identifier: `http://localhost:5000/singlePoll/:${req.user.id}`,
        poll: [...req.body.options],
        title: req.body.title
    })
    try{  
        const save = await poll.save();
        res.status(200).json({success: true, others: poll})
    }
    catch(err){
        console.log(err)
        res.status(200).json({success: false})
    }
});


router.get('/getPolls',verifyToken, async(req, res)=>{
    console.log('Request')
        try{
            const polls = await Poll.find({user: req.user.id});
            console.log(polls)
            res.status(200).json(polls);
        }
        catch{
            res.status(404).json({error: 'Not Found'});
        }


})

router.get('/single/:id', async(req, res)=>{

    const query = req.query.id

    try {
        const post  = await Poll.findOne({identifier: req.params.id});
        res.status(200).json(post)
    } catch {
        res.status(404).json("hello")
        
    }
})



module.exports = router