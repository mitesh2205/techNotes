const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
        
    },
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    text: {
        type: String,
        required: [true, 'Please provide a text'],
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

noteSchema.plugin(AutoIncrement, { inc_field: 'ticket', start_seq: 1000, id: 'ticketNum' });

module.exports = mongoose.model('Note', noteSchema);