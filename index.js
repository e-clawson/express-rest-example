const express = require("express");
const app = express();
const port = 3000;

// Importing the data from our fake database files.
const users = require("./data/users");
const posts = require("./data/posts");

//route for home 
app.get("/", (req, res) => {
  res.send("Work in progress!");
});

//route to get all users
// Creating a GET route for the entire users database.
// This would be impractical in larger data sets.
app.get("/api/users", (req, res) => {
    res.json(users) //display all the user info 
  });

//route to get info on a specific user 
// Creating a simple GET route for individual users,
// using a route parameter for the unique id.
app.get("/api/users/:id", (req, res) => {
    const user = users.find((u) => u.id == req.params.id); 
    //go through all the users and check if the user id === parameter for id, and 
    //cache that in variable user  
    if (user) res.json(user);
    //if user, display that user's info on the page 
}); 

//route to get all of the posts 
// Creating a GET route for the entire posts database.
// This would be impractical in larger data sets.
app.get("/api/posts", (req, res) => {
    res.json(posts); //display all the posts 
  });

// Creating a simple GET route for individual users,
// using a route parameter for the unique id.
app.get("/api/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id == req.params.id);
    //looping thrugh all the posts to find the specific post with the matching id 
    if (post) res.json(post);
    //displaying that post on the page 
  });

// Custom 404 (not found) middleware.
// Since we place this last, it will only process
// if no other routes have already sent a response!
// We also don't need next(), since this is the
// last stop along the request-response cycle.
app.use((req, res) => {
    res.status(404);
    res.json({ error: "Resource Not Found" });
  });

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});

