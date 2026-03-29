const errorHandler = (err, req, res, next) =>{
    console.log(`[Error] ${req.method} ${req.path} -`, err.message);
    

    if(err.code === 11000){
        return res.status(409).json({
            success:false,
            message:"Duplicate key error - this value already exists"
        });
    }

    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map((e)=>e.message);
        return res.status(400).json({
            success:false, message:message.join(", ")
        });

       
    }

    res.status(err.statusCode || 500).json({
        success:false,
        message:err.message || "Internal server error"
    })

}

module.exports = errorHandler