var express           = require('express'),
    router            = express.Router(),
    loginController   = require('../controllers/login_controller'),
    feedController    = require('../controllers/feed_controller');

module.exports = function(app) {

    // REGISTER OUR ROUTES ---------------
    // All of our routes will be prefixed with /api
    app.use('/api', router);
    // Route to handle all angular requests
    router.get('/', function(req, res) {
        res.json({
            message: 'Welcome to API World'
        });
    });

    router.post('/user',loginController.saveUser);

    router.get('/user',loginController.getUser);

    router.get('/logout',loginController.logout);

    router.get('/posts/google',feedController.getGoogleFeeds);

    router.post('/posts',feedController.savePost);

    router.get('/posts',feedController.getPosts);
    
}
