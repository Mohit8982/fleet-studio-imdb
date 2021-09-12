const db = require('../../_helpers/db');
const { hash_key, compare, sign_token } = require('../../_helpers/encryption_key');


exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const finduser = await db.User.findOne({ username: username.toLowerCase() }, { _id : 1 });

        if (finduser) {
            return res.json({
                status: 2,
                msgType: 'error',
                message: "Username Already Taken"
            })
        }

        const hashed_password = await hash_key(password);
        const user_data = new db.User({
            username: username.toLowerCase(),
            passwordHash: hashed_password
        })

        await user_data.save();

        return res.json({
            status: 1,
            msgType: 'success',
            message: 'Woohooo Registered Succesfully !!!!'
        });
    } catch (error) {
        return res.json({
            status: 2,
            msgType: 'error',
            message: error.toString()
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const finduser = await db.User.findOne({ username: username.toLowerCase() }, { passwordHash: 1 });
        console.log(finduser);
        if (!finduser) {
            return res.json({
                status: 2,
                msgType: 'error',
                message: `Username ${username} Not Found`
            });
        }

        const db_password = finduser.passwordHash;
        const checkPass = await compare(password, db_password);

        if (!checkPass) {
            return res.json({
                status: 2,
                msgType: 'error',
                message: `Invalid Password, Please Enter Correct Password To Login`
            });
        }

        const generatetoken = await sign_token({ value: `${username}_9090` }); //expirt is set 1 hour default

        return res.json({
            status: 1,
            msgType: 'success',
            message: `Login Successfull`,
            data: {
                user_id: finduser._id,
                token: generatetoken,
                username: username
            }
        });

    } catch (error) {
        return res.json({
            status: 2,
            msgType: 'error',
            message: error.toString()
        });
    }
};

exports.set_genre = async (req, res) => {
    try {
        const { genre_id, user_id } = req.body;
        const update_intrest = await db.User.updateOne({
            _id: user_id
        }, { $addToSet: { "fav_genre": genre_id } });

        return res.json({
            status: 1,
            msgType: "success",
            message: "Genre Added Successfully",
            update_intrest
        });
    } catch (error) {
        return res.json({
            status: 2,
            msgType: 'error',
            message: error.toString()
        });
    }
};

exports.getRecommendedMovie = async (req, res) => {
    try {

        const userid = req.body.user_id;
        const user_genre = await db.User.findOne({ _id: userid });

        if (!user_genre) {
            return res.json({
                status: 2,
                msgType: "error",
                message: "No Genre Found"
            });
        }

        const fav_genre = user_genre.fav_genre;
        const movie_list = await db.Movies.find({ genre: { $in: fav_genre } });  //in this query we can also use populate options to get user details & genre name
        return res.json({
            status: 1,
            msgType: 'success',
            message: 'success',
            data: movie_list
        });
    } catch (error) {
        return res.json({
            status: 2,
            msgType: 'error',
            message: error.toString()
        }); 
    }  
};