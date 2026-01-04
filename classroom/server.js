const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

const sessionOptions = {
    secret: "mysupersecretstring", 
    resave: false, 
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
};
app.use(session(sessionOptions));
app.use(flash());

app.get("/register", (req, res) => {
    let  { name = "anonymous" } = req.query;
    req.session.name = name;
    
    if(name === "anonymous") {
    req.flash("error", "user not registered");
    } else {
        req.flash("success", "User registered successfully!");
    }
    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    // Use res.locals for flash messages
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");

    res.render("page.ejs", { 
        name: req.session.name, 
        successMsg: res.locals.successMsg,
        errorMsg: res.locals.errorMsg
    });
});

// app.get("/reqcount", (req, res) => {
//     if(req.session.count) {
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);
// });

// app.get("/test", (req, res) => {
//     res.send ("Test successful!");
// });

app.listen(3010, () => {
    console.log("Server started on port 3010");
});
