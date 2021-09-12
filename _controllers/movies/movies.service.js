const db = require('../../_helpers/db');
const genre = require('../genre/genre.service');

exports.insert_movie = async (req, res) => {
    try {

        const { movie_name, details, user_id, genre_id, release_date, image = '' } = req.body;
        const check_genre = await genre.genre_search(genre_id);

        if (!check_genre) {
            return res.json({
                status: 2,
                msgType: 'error',
                message: 'Invalid Gnere'
            })
        }

        const movie_data = new db.Movies({
            movie_name : movie_name,
            movie_details : details,
            added_by: user_id,
            genre : genre_id,
            release_date : release_date,
            movie_poster : image
        });

        const create_movie = await movie_data.save();

        const search_data = new db.SearchMovie({
            movie_name : movie_name,
            movie_id: create_movie._id,
            genre_name: check_genre.genre_name,
            genre_id: genre_id
        })
        
        await search_data.save();

        return res.json({
            status: 1,
            msgType: 'success',
            message: 'Movie Created Successfully',
            create_movie : create_movie
        });
    } catch (error) {
        return res.json({
            status: 2,
            msgType: 'error',
            message: error.toString()
        });
    }
};

exports.submit_review = async (req, res) => {
    try {

        const { movie_id, user_id, review } = req.body;
        const check_review = await get_review({ user_id: user_id, movie_id: movie_id });

        if (check_review) {
            return res.json({
                status: 2,
                msgType: 'error',
                message: 'Sorry You Have Already Added a Review'
            })
        }

        const reviewData = new db.Review({
            user_id: user_id,
            movie_id: movie_id,
            review: review
        });

        const store = await reviewData.save();

        return res.json({
            status: 1,
            msgType: 'success',
            message: 'Review Added Successfully',
            data: store
        });

    } catch (error) {
        return res.json({
            status: 2,
            msgType: 'error',
            message: error.toString()
        });
    }  
};

exports.rate_movie = async (req, res) => {
    try {
        const { vote, movie_id } = req.body;

        let updateParam = {};
        if (vote == "+ve") {
            updateParam = { $inc: { up_votes: 1 } }
        } else {
            updateParam = { $inc: { down_votes: 1 } }
        }

        const updateVote = await db.Movies.updateOne({
            _id: movie_id
        }, updateParam);
       
        return res.json({
            status: 1,
            msgType: 'success',
            message: 'Voted Successfully',
        });
    } catch (error) {
        return res.json({
            status: 2,
            msgType: 'error',
            message: error.toString()
        });
    }  
};

exports.movie_details = async (req, res) => {
    try {
        const movie_id = req.body.movie_id;
        const movie_details = await Promise.all([
            db.Movies.findOne({ _id: movie_id }),
            db.Review.find({ movie_id: movie_id })
        ]);
        const details = movie_details[0];
        const reviews = movie_details[1];
        return res.json({
            status: 1,
            msgType: 'success',
            message: 'success',
            data: { details: details, review: reviews }
        });
    } catch (error) {
        return res.json({
            status: 2,
            msgType: 'error',
            message: error.toString()
        });
    }
};

const get_review = async (param) => {
    const { movie_id, user_id } = param;
    const check_review = await db.Review.findOne({user_id : user_id, movie_id : movie_id});
    return check_review;
};