const db = require('../../_helpers/db');

exports.genre_search = async (id) => {
    const genre = await db.Genre.findOne({ _id: id });
    return genre;
};

exports.create_genre = async (req, res) => {
    try {

        const name = req.body.name;
        const genreCheck = await db.Genre.findOne({ genre_name: name.toLowerCase() });

        if (genreCheck) {
            return res.json({
                status: 2,
                msgType: 'error',
                message: 'Genre Already Exist'
            });
        }
        
        const genre_check = new db.Genre({
            genre_name: name.toLowerCase()
        });

        const genre = await genre_check.save();
        return res.json({
            status: 1,
            msgType: 'success',
            message: 'Genre Created Successfully',
            data: genre
        });
    } catch (error) {
        return res.json({
            status: 2,
            msgType: 'error',
            message: error.toString()
        });
    }
};