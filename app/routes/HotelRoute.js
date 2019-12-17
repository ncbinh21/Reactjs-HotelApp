module.exports = (app) => {
    const hotel = require('../controllers/HotelController.js');
    const user = require('../controllers/AccountsController.js');
    const sessionMiddleware = require('../middleware/sessionMiddleware.js');
    var session = require('express-session');
    var cookieParser = require('cookie-parser');
    const formData = require('express-form-data')
    // const path = require('path');
    // const multer = require('multer');
     
    app.use(formData.parse())
    app.use(cookieParser());
    app.use(session({
        secret: 'your-secret',
        cookie: {
            path: '/',
            domain: 'localhost',
            maxAge: 1000 * 60 * 24 // 24 hours
        }
    }));


    // Create a new room or update room
    app.post('/admin/createUpdateRoom/:roomId?', hotel.createUpdate);

    // Retrieve all Hotel Admin
    app.get('/admin/getListRoom', sessionMiddleware(), hotel.findAll);

    // Retrieve all room frontend
    app.get('/frontend/getListRoom', hotel.findAll);

    // Retrieve a single room with roomId
    app.get('/admin/getRoomWithId/:roomId?', sessionMiddleware(),  hotel.findOne);

    // Update a room with roomId
    // app.put('/updateRoomWithId/:roomId', hotel.update);

    // Delete a room with roomId
    app.delete('/admin/deleteRoomWithId/:roomId', hotel.delete);

    // Retrieve all Type of room
    app.get('/admin/getListTypeRoom', hotel.findAllType);

    //login user 
    app.post('/loginPost', user.loginPost);

    //logout
    app.post('/logoutPost', user.logout);
    
    //book rook
    app.get('/getListRoom',sessionMiddleware(), hotel.getListRoom);

    //book rook
    app.post('/bookRoom/:roomId',sessionMiddleware(), hotel.bookRoom);
    
    //book rook
    app.post('/checkoutRoom/:roomId',sessionMiddleware(), hotel.checkoutRoom);

    // room-detail
    app.get('/roomDetail/:roomId?', hotel.findOne);

    //check user login
    app.get('/checkLogin', sessionMiddleware(), user.checkLogin);

}