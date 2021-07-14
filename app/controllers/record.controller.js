const Record = require('../models/record.model.js');

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

    const record = new Record({
        tagIds: req.body.tagIds,
        note: req.body.note,
        category: req.body.category,
        amount: req.body.amount,
        createdAt: req.body.createdAt,
    });

    // Save Note in the database
    record.save()
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
    Record.find()
        .then(records => {
            res.send(records);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving records."
            });
        });

};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Record.findById(req.params.tagIds)
        .then(record => {
            if (!record) {
                return res.status(404).send({
                    message: "record not found with id " + req.params.tagIds
                });
            }
            res.send(record);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "record not found with id " + req.params.tagIds
                });
            }
            return res.status(500).send({
                message: "Error retrieving record with id " + req.params.tagIds
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
    Record.findByIdAndUpdate(req.params.tagIds, {
        tagIds: req.body.tagIds[0] || "Untitled Record",
        note: req.body.note,
        category: req.body.category,
        amount: req.body.amount,
        createdAt: req.body.createdAt
    }, { new: true })
        .then(record => {
            if (!record) {
                return res.status(404).send({
                    message: "Record not found with id " + req.params.tagIds
                });
            }
            res.send(record);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Record not found with id " + req.params.tagIds
                });
            }
            return res.status(500).send({
                message: "Error updating Record with id " + req.params.tagIds
            });
        });

};

// Delete a Record with the specified noteId in the request
exports.delete = (req, res) => {
    Record.findByIdAndRemove(req.params.tagIds)
        .then(record => {
            if (!record) {
                return res.status(404).send({
                    message: "Record not found with id " + req.params.tagIds
                });
            }
            res.send({ message: "Record deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Record not found with id " + req.params.tagIds
                });
            }
            return res.status(500).send({
                message: "Could not delete Record with id " + req.params.tagIds
            });
        });

};