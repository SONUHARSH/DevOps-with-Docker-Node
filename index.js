
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");


const { 
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET
    
} = require("./config/config"); 


let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
});
`` 
//const RedisStore = connectRedis(session); 
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes//userRoutes");

const app = express();


const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?
authSource=adimin`;

const connectWithRetry = () => {
    mongoose
      .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => console.log("succesfully connected to DB"))
      .catch((e) => {
        setTimeout(connectWithRetry, 5000);
      });
};
connectWithRetry();

//const sessionStore = new connectRedis({ client: redisClient });
app.enable("trust proxy");
app.use(session({
  cookie: {
    //store: new RedisStore({ client: redisClient }),
  //store: sessionStore,
  secret: SESSION_SECRET,
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 30000,
  },
}));



app.use(express.json());


app.get("/api/v1", (req, res) => {
        res.send("<h2> Hi There!!!<h2>");
        console.log("yeah it ran")
});

//localhost:3009/api/v1/posts

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter)


const port = process.env.PORT || 3009;

app.listen(port, () => console.log(`listening on port ${port}` ));





/*

app.listen(3009, async () => {
        console.log("server is started at 3009");


        mongoose.connect('mongodb://localhost:27017/');
        console.log("mongoose DB is connected")

});


mongodb://localhost:27017/
mongodb://kumar:mypassword@172.19.0.2:27017/?authSource=admin   172.19.0.2(networkIP)
*/






