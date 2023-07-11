const express = require('express');
const router = express.Router();

const db = require('../users/model');

router.post('/', async (req, res) => {
  try {
    if(req.body.name && req.body.bio) {
      const newUser = await db.insert(req.body);
      res.status(201);
      res.json(newUser);
      return
    }
    res.status(400);
    res.json({
      message: "Please provide name and bio for the user"
    });
  } catch {
    res.status(500);
    res.json({
      message: "There was an error while saving the user to the database"
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await db.find();
    res.send(users);
    return;
  } catch {
    console.log("Failed to retrieve data from database");
    res.send("Error: Could not Retrieve data from users");
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await db.findById(req.params.id);
    if(user) {
      res.send(user);
      return;
    }
    res.status(404);
    res.send({message: "The user with the specified ID does not exist"});
  } 
  catch {
    console.log(`Failed to retrieve User with id: ${req.params.id} from database`);
    res.send(`Error: Could not Retrieve data from user with id: ${req.params.id}`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await db.remove(req.params.id);
    console.log(user);
    if (user) {
      console.log(`Deleting user with id: ${user.id} - User data: ${user}`);
      res.send(user);
      return;
    }
    res.status(404);
    res.send({message: "The user with the specified ID does not exist"});
  } catch {
    console.log(`Failed to DELETE User with id: ${req.params.id} from database`);
    res.status(500);
    res.send({ message: "The user could not be removed" });
  }
});

router.put('/:id', async (req, res) => { 
  if (!req.body.name || !req.body.bio) {
    res.status(400);
    res.json({message: "Please provide name and bio for the user"});
    return;
  }
  try {
    const user = await db.findById(req.params.id);
    if (user) {
      const updatedUser = await db.update(req.params.id, req.body);
      res.send(updatedUser);
      return;
    }
    res.status(404);
    res.json({message: "The user with the specified ID does not exist"});
    return;
  } catch {
    res.status(500);
    res.json({ message: "The user information could not be modified" });
  }
});

module.exports = router;