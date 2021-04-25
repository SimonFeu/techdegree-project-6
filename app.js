//requiring express to start a server
const express = require("express");

//importing the data from data.json
const { projects } = require("./data.json");

//creating the express-application
const app = express();

//Since CSS is a static file, it is loaded from the "public" folder using the following method
app.use("/static", express.static("public"));

//This code tells express which templet engine to use.
//By default express will search for templets in the folder "views".
app.set("view engine", "pug");

// This function is called when there is a get request which is calling the route "/"
// With "redner" the pug-template "index" is searched for in the folder "view" and then it will execute the file
// The second argument in the render function passes the array projects to the pug file
app.get("/", (req, res) => {
  res.render("index", { projects: projects });
});

// This function is called when there is a get request which is calling the route "/about"
// With "redner" the pug-template "about" is searched for in the folder "view" and then it will execute the file
app.get("/about", (req, res) => {
  res.render("about");
});

// This function is called when there is a get request which is calling the route "/projects"
// The get request also contains a parameter ":id" which is then used as indexnumber to select a specific array element
// With "redner" the pug-template "project" is searched for in the folder "view" and then it will execute the file
// The second argument in the render function passes the specific array element to the pug file
app.get("/project/:id", (req, res) => {
  res.render("project", { project: projects[req.params.id] });
});

/**
 * In order to ensure that, for example, an easily readable error appears 
   when a page call is made to a non-existent subpage, this middleware  generates a 404 error.
   The error middleware is then added behind this middleware. 
 * Normally, a Rout handler would be used first and the program would not run through to this point 
   due to the response sent.  
 * But if no corresponding Rout is found, the program runs through to this point and generates the 404 error 
   and outputs it via the following error middleware.
 */
app.use((req, res, next) => {
  const err = new Error("Not found!");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(`The pages does not exist (${err.status} - ${err.message}) `);
  res.status(err.status);
  res.render("error", { error: err });
});

//creates a server with the PORT number 3000 and a callback function which tells the console that the program is running.
app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});
