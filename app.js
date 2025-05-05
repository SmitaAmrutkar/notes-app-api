const express  = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());

const notesRoutes = require('./routes/notes');
app.use('/api/notes', notesRoutes);

mongoose.connect('mongodb://localhost:27017/notesApp',{}
).then(()=> console.log('MongoDB connected!'))
.catch( (err) => console.log(err));

app.listen( 5000, () => {
    console.log('server runing on port : 5000');
});