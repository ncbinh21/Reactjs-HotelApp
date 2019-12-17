const Room = require('../models/RoomInformationModel.js');
const RoomType = require('../models/RoomTypeModel.js');

// Create and Save a new Room
exports.createUpdate = (req, res) => {
    var dataPush = JSON.parse(req.body.dataRoom);
    if(dataPush.roomId) {
        Room.findByIdAndUpdate(req.params.roomId, {
            title: dataPush.title,
            content: dataPush.content,
            price: dataPush.price,
            type: dataPush.type,
            size: dataPush.size,
            status: dataPush.status
        }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(400).send({
                    message: 'Can not find and update room with id ' + req.params.roomId
                })
            }
            return res.status(200).send({
                data: data,
                message: 'Update room successfully'
            })
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(400).send({
                    message: 'Can not find and update room with id ' + req.params.roomId
                })
            }
            return res.status(500).send({
                message: 'Something went wrong while updated room with id ' + req.params.roomId
            })
        })
    } else {
        const room = new Room({
            title: dataPush.title,
            content: dataPush.content,
            // url: dataPush.url.name,
            price: dataPush.price,
            type: dataPush.type,
            size: dataPush.size,
            status: dataPush.status
        });
        room.save()
        .then(data => {
            return res.status(200).send({
                data: data,
                message: 'Create room successfully'
            })
        }).catch(err => {
            return res.status(500).send({
                 message: err.message || 'Something wrong when create room'
             })   
        });
    }
};

// Retrieve and return all rooms from the database.
exports.findAll = (req, res) => {
    Room.find()
    .then(data => {
        return res.status(200).send(data)
    }).catch(err => {
        return res.status(500).send({
            message: err.message || 'Something when wrong while get list room'
        })
    });
};

// Retrieve and return all type of rooms from the database.
exports.findAllType = (req, res) => {
    RoomType.find()
    .then(data => {
        return res.status(200).send(data)
    }).catch(err => {
        return res.status(500).send({
            message: err.message || 'Something when wrong while get list room'
        })
    });
};

// Find a single room with a roomId
exports.findOne = (req, res) => {
    if(req.params.roomId) {
        Room.findById(req.params.roomId)
        .then(data => {
            if(!data) {
                return res.status(400).send({
                    message: 'Can not find room with id ' + req.params.roomId 
                })
            }
            return res.status(200).send(data)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(400).send({
                    message: err.message || 'Can not find room with id ' + req.params.roomId 
                })
            }
            return res.status(500).send({
                message: err.message || 'Something went wrong while got room with id ' + req.params.roomId
            })
        })
    }
};

// Update a room identified by the roomId in the request
exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({ 
            message: 'Room content can not be empty'
        })
    }

    Room.findByIdAndUpdate(req.params.roomId, {
        title: req.body.title || 'Untitled Note',
        content: req.body.content
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(400).send({
                message: 'Can not find and update room with id ' + req.params.roomId
            })
        }
        res.status(200).send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(400).send({
                message: 'Can not find and update room with id ' + req.params.roomId
            })
        }
        return res.status(500).send({
            message: 'Something went wrong while updated room with id ' + req.params.roomId
        })
    })
};

// Delete a room with the specified roomId in the request
exports.delete = (req, res) => {
    Room.findByIdAndRemove(req.params.roomId)
    .then(data => {
        if(!data) {
            return res.status(400).send({
                message: 'Can not find room with id ' + req.params.roomId
            })
        }
        return res.status(200).send(data)
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.kind === 'NotFound') {
            return res.status(400).send({
                message: 'Can not find room with id ' + req.params.roomId
            })
        }
        return res.status(500).send({
            message: err.message || 'Something went wrong when deleted room with id ' + req.params.roomId
        })
    })
};

exports.getListRoom = (req, res) => {
    let user = req.session.user;
    Room.find(
        {userId: user._id}
        )
    .then(data => {
        return res.status(200).send(data)
    }).catch(err => {
        return res.status(500).send({
            message: err.message || 'Something when wrong while get list room'
        })
    });
    
}

// book room
exports.bookRoom = (req, res) => {
    let user = req.session.user;
    Room.findByIdAndUpdate(req.params.roomId, {
        userId : user._id
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(400).send({
                message: 'Can not find and update room with id ' + req.params.roomId
            })
        }
        return res.status(200).send({
            data: data,
            message: 'Book room successfully'
        })
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(400).send({
                message: 'Can not find and book room with id ' + req.params.roomId
            })
        }
        return res.status(500).send({
            message: 'Something went wrong while book room with id ' + req.params.roomId
        })
    })
};

// checkout room
exports.checkoutRoom = (req, res) => {
    Room.findByIdAndUpdate(req.params.roomId, {
        userId : ''
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(400).send({
                message: 'Can not find and update room with id ' + req.params.roomId
            })
        }
        return res.status(200).send({
            data: data,
            message: 'Book room successfully'
        })
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(400).send({
                message: 'Can not find and book room with id ' + req.params.roomId
            })
        }
        return res.status(500).send({
            message: 'Something went wrong while book room with id ' + req.params.roomId
        })
    })
};

