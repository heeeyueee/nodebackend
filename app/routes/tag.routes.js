module.exports = (app) => {
    const tags = require('../controllers/tag.controller.js');

    // Create a new Record
    app.post('/tags', tags.create);

    // Retrieve all Record
    app.get('/tags', tags.findAll);

    // Retrieve a single Record with RecordId
    app.get('/tags/:id', tags.findOne);

    // Update a Record with RecordId
    app.put('/tags/:id', tags.update);

    // Delete a Record with RecordId
    app.delete('/tags/:id', tags.delete);
}