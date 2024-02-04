const express = require("express");
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config.js");

const postRouter = require("./routes/postRoutes");

const app = express();


mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to DB");
}).catch((error) => {
    console.error("Connection to DB failed:", error);
});


app.use(express.json());


app.get("/", (req, res) => {
        res.send("<h2> Hi There!!!<h2>");
});

//localhost:3009/api/v1/posts

app.use("/api/v1/posts", postRouter)

const port = process.env.PORT || 3009;

app.listen(port, () => console.log(`listening on port ${port}` ));


/*
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;


const connectWithRetry = () => {
        mongoose
        .connect(mongoURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: False,
        })
        .then(() => console.log("succesfully connected to DB"))
        .catch((e) => {
                console.log(error)
                setTimeout(connectWithRetry, 5000)
        });
}



mongoose
.connect(console.log("start"),`mongodb:/${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
.then(() => console.log("Succefully connected to DB"))
.catch((e) => console.log("error")); 


mongodb://localhost:27017/
mongodb://kumar:mypassword@172.19.0.2:27017/?authSource=admin   172.19.0.2(networkIP)
*/
