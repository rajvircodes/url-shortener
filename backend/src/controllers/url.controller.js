const Url = require('../models/url.model')

const shortenUrl = async  (req, res) =>{
    try{
        const {originalUrl} = req.body

        if(!originalUrl){
            return res.status(400).json({
                err:"URL is required"
            })
        }

        try{
            new URL(originalUrl)
        }catch{
            return res.status(400).json("Invalid URL")
        }

        let shortenUrl;
        let exist = true

        while(exist){
            shortenUrl= nanoid(7)
            exist = await Url.findOne({shortenUrl})
        }

        const url = await Url.create({
            originalUrl,
            shortenUrl
        })

        

    }catch(err){
        console.log("Error:", err.message);
        
    }
}