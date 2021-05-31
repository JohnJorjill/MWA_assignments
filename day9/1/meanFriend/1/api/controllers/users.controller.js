const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

module.exports.usersRegister= function(req,res){
    console.log("Register User");
    const newUser = {
        username : req.body.username,
        name : req.body.name || null,
        password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }
    User.create(newUser,function(err,user){
        const response = {
            status:201,
            message: user
        }
        if(err){
            console.log(err);
            response.status = 400;
            response.message = err;
        }else{
            console.log("User Created");
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.usersAuthenticate= function(req,res){
    console.log("Authenticate User");
    const authUser = {
        username : req.body.username
    //    password : req.body.password
    }
    User.findOne(authUser).exec(function(err,user){
        const response = {
            status:200,
            message: user
        }
        if(err){
            console.log(err);
            response.status = 400;
            response.message = err;
        }else{
            if(!user){
                response.status=404;
                console.log("not found");
            }else{
                if(bcrypt.compareSync(req.body.password, user.password)){
                    console.log("User Authenticated");
                    const token=jwt.sign({user: user.name},"cs572",{expiresIn: 3600}); // token
                    response.message={
                        success: true,
                        token: token
                    };
                }else{
                    console.log("Unauthorized");
                    response.status=401;
                    response.message ={"message":"Unauthorized"};
                }
            }
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.authenticate = function(req,res,next){
    const headerExists = req.headers.authorization;
    if(headerExists){
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,"cs572",function(err,decoded){
            if(err){
                console.log(err);
                res.status(403).json({message:"Unauthorized"});
            }else{
                req.user = decoded.user;
                next();
            }
        });
    }else{
        res.status(403).json({message: "No token provided"});
    }
}