const express = require("express");
// We import the body-parser package.
// This package contains middleware that can handle
// the parsing of many different kinds of data,
// making it easier to work with data in routes that
// accept data from the client (POST, PATCH).
const bodyParser = require("body-parser");
//you might also be able to use express.json to do the same as this body parser 

const app = express();
const port = 3000;
//step 4 - using bodyParser middleware 

// We use the body-parser middleware FIRST so that
// we have access to the parsed data within our routes.
// The parsed data will be located in "req.body".
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
// look at the documentation about the true part 

app  
  .route("/api/users") //define the routes here
  //then add the functionality for each type of response (get, post, etc)
  .get((req, res) => { 
    res.json(users);
  })
  .post((req, res) => {
    // Within the POST request route, we create a new
    // user with the data given by the client.
    // We should also do some more robust validation here,
    // but this is just an example for now.
    if (req.body.name && req.body.username && req.body.email)  { //checking to make sure this property exists and has a value
      if (users.find((u) => u.username == req.body.username)) { //if the name username and email are filled out, try and find the specific user with that username 
        res.json({ error: "Username Already Taken" }); // if we find a matching username this means there's already a user with that username - have to send an error message and let them know 
        return; 
      }
      // if not found, create a new user with the request body (form data) name, username, and email
      //should match our user data fields
      const user = {
        id: users[users.length - 1].id + 1, //create a unique id for this user 
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };
      //once created - add to the users.js (it's a mock database which is why we push 
      //if this was a real database we'd do something different)
      users.push(user);
      res.json(users[users.length - 1]);
    } else res.json({ error: "Insufficient Data" });
    //send back the user data as a response to let them know it worked, it includes the 
    //newly made id for that user that was created in the server - need to send it back to the client 
    //the client might want to use that id to make changes 
    //if it didn't work (no name, username, or email) - send an error message 
  });

  app
  .route("/api/users/:id")
  .get((req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);
    if (user) res.json(user);
    else next();
  })
  .patch((req, res, next) => {
    // Within the PATCH request route, we allow the client
    // to make changes to an existing user in the database.
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  })
  .delete((req, res, next) => {
    // The DELETE request route simply removes a resource.
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  });

  app
  .route("/api/posts")
  .get((req, res) => {
    res.json(posts);
  })
  .post((req, res) => {
    // Within the POST request route, we create a new
    // post with the data given by the client.
    if (req.body.userId && req.body.title && req.body.content) {
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  });

app
  .route("/api/posts/:id")
  .get((req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);
    if (post) res.json(post);
    else next();
  })
  .patch((req, res, next) => {
    // Within the PATCH request route, we allow the client
    // to make changes to an existing post in the database.
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          posts[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  })
  .delete((req, res, next) => {
    // The DELETE request route simply removes a resource.
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        posts.splice(i, 1);
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  });

app.get("/", (req, res) => {
    res.send("Work in progress!");
});
  
app.use((req, res) => {
    res.status(404);
    res.json({ error: "Resource Not Found" });
});
  
app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});


// // step 2 and 3 - adding basic routes and middleware 
// // Importing the data from our fake database files.
// const users = require("./data/users");
// const posts = require("./data/posts");

// //route for home 
// app.get("/", (req, res) => {
//   res.send("Work in progress!");
// });

// //route to get all users
// // Creating a GET route for the entire users database.
// // This would be impractical in larger data sets.
// app.get("/api/users", (req, res) => {
//     res.json(users) //display all the user info 
//   });

// //route to get info on a specific user 
// // Creating a simple GET route for individual users,
// // using a route parameter for the unique id.
// app.get("/api/users/:id", (req, res) => {
//     const user = users.find((u) => u.id == req.params.id); 
//     //go through all the users and check if the user id === parameter for id, and 
//     //cache that in variable user  
//     if (user) res.json(user);
//     //if user, display that user's info on the page 
// }); 

// //route to get all of the posts 
// // Creating a GET route for the entire posts database.
// // This would be impractical in larger data sets.
// app.get("/api/posts", (req, res) => {
//     res.json(posts); //display all the posts 
//   });

// // Creating a simple GET route for individual users,
// // using a route parameter for the unique id.
// app.get("/api/posts/:id", (req, res) => {
//     const post = posts.find((p) => p.id == req.params.id);
//     //looping thrugh all the posts to find the specific post with the matching id 
//     if (post) res.json(post);
//     //displaying that post on the page 
//   });

// // Custom 404 (not found) middleware.
// // Since we place this last, it will only process
// // if no other routes have already sent a response!
// // We also don't need next(), since this is the
// // last stop along the request-response cycle.
// app.use((req, res) => {
//     res.status(404);
//     res.json({ error: "Resource Not Found" });
//   });

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});

