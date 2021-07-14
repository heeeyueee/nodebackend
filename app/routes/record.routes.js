
module.exports = (app) => {
    const records = require('../controllers/record.controller.js');

    // Create a new Record
    app.post('/records', records.create);

    // Retrieve all Record
    app.get('/records', records.findAll);

    // Retrieve a single Record with RecordId
    app.get('/records/:recordId', records.findOne);

    // Update a Record with RecordId
    app.put('/records/:recordId', records.update);

    // Delete a Record with RecordId
    app.delete('/records/:recordId', records.delete);
}