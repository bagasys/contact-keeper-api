const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000

connectDB();

// init middlewares
app.use(express.json({extended: false}))


app.get('/', (req, res) => {
    return res.json({msg: "welcome to contact keeper API"});
});

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => console.log(`server started on port ${PORT}`))