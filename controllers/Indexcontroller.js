const Joi = require('@hapi/joi');
const Actor = require('../models/Actors');
const Movies = require('../models/Movies');


exports.get_all_movies = async (req , res) =>{

    Movies.find({})
        .populate('actors')
        .then(result => {
            const movies = result.map(ret => {
                return {
                    title : ret.title,
                    year : ret.year,
                    rating : ret.rating,
                    actor : ret.actors.map(re  => {
                        return {
                            name : re.name,
                            birthday : re.birthday,
                            country : re.country
                        }
                    })
                }
            });
            return res.status(200).json(movies);
        }).catch(err => {
            return res.status(500).json({
                error: err
            });
        });
};

exports.get_all_actor = (req , res) =>{
    
    Actor.find({})
        .then(result => {
            const actors = result.map(ret => {
                    return {
                        name : ret.name,
                        birthday : ret.birthday,
                        country : ret.country
                    }
                })
            
            return res.status(200).json(actors);
        }).catch(err => {
            return res.status(500).json({
                error: err
            });
        });
};


const acotr_schema = Joi.object({
    name : Joi.string().required(),
    birthday : Joi.date().required(),
    country : Joi.string().required()
});



exports.add_an_actor = (req , res) =>{
    const { error } = acotr_schema.validate({ name: req.body.name , birthday : req.body.birthday , country : req.body.country});

    if(error) return res.status(500).json({
        error : error.details[0].message
    });

    const actor = new Actor({
        name: req.body.name,
        birthday : req.body.birthday, 
        country : req.body.country
    });

    actor.save()
        .then(result => {
            return res.status(201).json({
                message : "A new actor created"
            });
        })
        .catch(err => {
            return res.status(500).json({
                error : err
            });
        });
};

const movie_schema = Joi.object({
    title : Joi.string().required(),
    year : Joi.number().required(),
    rating : Joi.number().required() 
});

exports.add_a_movie = async (req , res) =>{
    
    const { error } = movie_schema.validate({ title : req.body.title , year : req.body.year , rating : req.body.rating });

    if(error) return res.status(500).json({
        error : error.details[0].message
    });
    const movie = new Movies({
       
        title : req.body.title, 
        year : req.body.year, 
        rating : req.body.rating
    });

    const result = await movie.save();

    req.body.actors.forEach( async actor => {
        const { error } = acotr_schema.validate({ name: actor.name , birthday : actor.birthday , country : actor.country});
                
        if(error) return res.status(500).json({
            error : error.details[0].message
        });

        let store_actor = new Actor({
            name: actor.name,
            birthday : actor.birthday, 
            country : actor.country,
            movie :  result._id
        });
        await result.actors.push(store_actor);
        await store_actor.save();
    });
    await result.save();
    res.status(201).json({
        message : "New Movie Created"
    });
};

