const User = require('../models/User');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const schema = Joi.object({
    username : Joi.string().min(3).max(255).required(),
    password : Joi.string().min(6).max(1024).required()
});

exports.add_a_user = (req , res) => {
   
    const { error } = schema.validate({ username: req.body.username , password : req.body.password});

    if(error) return res.status(500).json({
        error : error.details[0].message
    });

    User.findOne({username : req.body.username})
        .then(user => {
            if(user){
                return res.status(409).json({
                    message : "This username is taken"
                });
            }
            else {
                bcrypt.hash(req.body.password , 10 , (err , hash) =>{
                    if(err){
                        return res.status(500).json({
                            error : err
                        });
                    }
                    else {
                        const user = new User({
                            username : req.body.username,
                            password : hash
                        });
                        user.save()
                            .then(result => {
                                const token = jwt.sign({_id : result._id} , process.env.TOKEN_SECRET , { expiresIn: '1h' });
                                return res.header('auth-token' , token).status(201).json({
                                    token : token,
                                    message : "User created"
                                });
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    error : err
                                });
                            });
                    }
                });
                
            }
        });
};


exports.login_a_user =  (req , res) =>{
    
    const { error } = schema.validate({ username: req.body.username , password : req.body.password});

    if(error) return res.status(400).json({
        error : error.details[0].message
    });

    User.findOne({username : req.body.username})
        .then(user => {
            if(!user){
                return res.status(400).json({
                    message : "Invlide Username or Password"
                })
            }
            bcrypt.compare(req.body.password , user.password , (err, result) => {
                if(err){
                    return res.status(400).json({
                        message : "Invlide Username or Password"
                    })
                }
                else{
                    if(result){
                        const token = jwt.sign({_id : user._id} , process.env.TOKEN_SECRET ,  { expiresIn: '1h' });
                        return res.status(400).header('auth-token' , token).json({
                            token : token
                        });
                    }
                    else{
                        return res.status(400).json({
                            message : "Invlide Username or Password"
                        })
                    }
                }
            }); 
        });
};