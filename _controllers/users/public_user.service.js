const db = require('../../_helpers/db');

exports.get_movie_guggestion = async (req, res) => {
    try {
        const query = req.body.name;
        const searchMovie = await db.SearchMovie.find({
            "$or": [
                { movie_name: { $regex: query, $options: 'i' } },
                { genre_name: { $regex: query, $options: 'i' } }
            ]
        });

        return res.json({
            status: 1,
            msgType: 'success',
            message: 'success',
            data: searchMovie
        });
    } catch (error) {
        return res.json({
            status: 2,
            msgType: 'error',
            message: error.toString()
        });
    }
}

exports.sort_movie = async (req, res) => {
    try {

        const { sortType, sortOn } = req.body;

        let order_type = -1;
        if (sortType == 'ASC') {
            order_type = 1;
        }

        let sortFilter = {};
        switch (sortOn) {
            case 'upVotes':
                sortFilter = { up_votes : order_type };
                break;
            case 'downVotes':
                sortFilter = { down_votes: order_type };
                break;
            case 'release_date':
                sortFilter = { release_date : order_type }
                break;
        }

        console.log(sortFilter);
        const sorted_list = await db.Movies.find().sort(sortFilter)

        return res.json({
            status: 1,
            msgType: 'success',
            message: 'success',
            data: sorted_list
        });

    } catch (error) {
        return res.json({
            status: 2,
            msgType: 'error',
            message: error.toString()
        });
    }
}