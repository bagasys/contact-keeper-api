const mongoose = require("mongoose");
const config = require("config");
db = config.get("mongoURI");


const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("MongoDB Connected")
    } catch (err) {
        console.error(err.message);
        process.exit(1)
    }
};

module.exports = connectDB;


// const connectDB = () => {
//     mongoose.connect(db, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false
//     }).then(() => {
//         console.log("MongoDB Connected")
//     })
//         .catch(err => {
//             console.error(err.message);
//             process.exit(1)
//         })
//     ;
// };

