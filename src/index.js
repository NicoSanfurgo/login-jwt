const express = require("express")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const handlebars = require("express-handlebars")
const mongoose = require("mongoose")

const errorHandler = require("./middlewares/errorHandler")
const router = require("./router/router")

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(__dirname + "/public"))
app.use(session({
    store: new MongoStore({
        mongoUrl: `mongodb+srv://gonzi2001:coder123@cluster0.dh8ss5x.mongodb.net/class-19?retryWrites=true&w=majority`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 30
    }),
    secret: "test",
    resave: false,
    saveUninitialized: false
}))

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")

mongoose.connect(`mongodb+srv://gonzi2001:coder123@cluster0.dh8ss5x.mongodb.net/class-19?retryWrites=true&w=majority`)
    .then(response => console.log("MongoDB connected."))
    .catch(error => console.log(error))

router(app)

app.use(errorHandler)

app.listen(PORT, ()=> console.log(`Server running at ${PORT}.`))