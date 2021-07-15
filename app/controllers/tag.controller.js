const Tag = require('../models/tag.model.js');


// Create and Save a new Note
exports.create = (req, res) => {
    console.log(req.body)
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Record content can not be empty"
        });
    }

    // Create a Note

    const tag = new Tag({
        id: req.body.id,
        name: req.body.name,
        iconName: req.body.iconName,
        mold: req.body.mold,
    });

    // Save Note in the database
    tag.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Record."
            });
        });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Tag.find()
        .then(tags => {
            res.send(tags);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving records."
            });
        });

};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Tag.findById(req.params.id)
        .then(tag => {
            if (!tag) {
                return res.status(404).send({
                    message: "record not found with id " + req.params.id
                });
            }
            res.send(tag);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "record not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving record with id " + req.params.id
            });
        });

};

// Update a Record identified by the tagIds in the request
exports.update = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Record content can not be empty"
        });
    }

    // Find Record and update it with the request body
    Tag.findByIdAndUpdate(req.params.tagIds, {
        id: req.body.id,
        name: req.body.name,
        iconName: req.body.iconName,
        mold: req.body.mold,
    }, { new: true })
        .then(tag => {
            if (!tag) {
                return res.status(404).send({
                    message: "Record not found with id " + req.params.id
                });
            }
            res.send(tag);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Record not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Record with id " + req.params.id
            });
        });

};

// Delete a Tag with the specified noteId in the request
exports.delete = (req, res) => {
    console.log(req.params)
    Tag.findOneAndDelete({ id: req.params.id })
        .then(tag => {
            if (!tag) {
                return res.status(404).send({
                    message: "Tag not found with id " + req.params.id
                });
            }
            res.send({ message: "Tag deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Tag not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Tag with id " + req.params.id
            });
        });

};