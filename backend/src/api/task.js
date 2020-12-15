const express = require('express');
const task = express.Router();
const Task = require('../../models/Task');
const { check, validationResult } = require('express-validator');
const faker = require('faker');

//@route    POST api/v1/task/list/random
//@des      Generate 1 random list include 3 tasks return list ID
//@access   public
task.post('/list/random', async (req, res) => {
  try {
    const listObj = new Object();
    listObj.title = faker.commerce.productAdjective();
    listObj.stars = Math.floor(Math.random() * 5) + 1;
    listObj.tasks = [];
    for (let i = 0; i < 3; i++) {
      let taskElement = {};
      taskElement.text = faker.git.commitMessage();
      listObj.tasks.push(taskElement);
    }
    // console.log(listObj.tasks);
    let mylist = new Task();
    mylist.list = listObj;
    // console.log(mylist);
    await mylist.save();
    res.json(mylist.id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
//@route    POST api/v1/task/list/
//@des      post 1  list  from user
//@access   public
task.post(
  '/list',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('tasks', 'Tasks cannot be empty').isArray({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, stars, tasks } = req.body;
      // console.log(typeof req.body.tasks);
      let mylist = new Task();
      mylist.list.title = title;
      mylist.list.stars = stars;
      // const cloneTasks = JSON.parse(JSON.stringify(req.body.emptyTasks));
      mylist.list.tasks = tasks;
      // console.log(mylist.list.tasks);
      await mylist.save();
      res.json(mylist.id);
    } catch (err) {
      //console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

//@route    GET api/v1/task/random
//@des      get 1 random list
//@access   public

task.get('/random', async (req, res) => {
  try {
    let numberOfRecords = await Task.countDocuments();
    if (numberOfRecords === 0) {
      return res.status(400).json({ msg: 'List is empty' });
    }
    let listObj = await Task.find()
      .limit(1)
      .skip(Math.floor(Math.random() * numberOfRecords));
    if (!listObj) {
      return res.status(404).json({ msg: 'List not found' });
    }
    console.log('GET');
    return res.json(listObj);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'List not found' });
    res.status(500).json({ msg: 'server error' });
  }
});

//@route    GET api/v1/task/list/:id
//@des      get 1 list by id
//@access   public
task.get('/list/:id', async (req, res) => {
  try {
    let listObj = await Task.findById(req.params.id);
    if (!listObj) {
      return res.status(404).json({ msg: 'List not found' });
    }
    return res.json(listObj);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'List not found' });
    res.status(500).json({ msg: 'server error' });
  }
});

//@route    PUT api/v1/task/list/:id
//@des      update 1 list with list id
//@access   public
task.put(
  '/list/:id',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('tasks', 'Tasks cannot be empty').isArray({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, stars, tasks } = req.body;
    console.log(req.params.id);
    try {
      const myList = await Task.findById(req.params.id);
      if (!myList) {
        return res.status(404).json({ msg: 'List not found' });
      } else {
        if (title) myList.list.title = title;
        if (stars) myList.list.stars = stars;
        if (tasks) myList.list.tasks = tasks;
        await myList.save();
        res.json(myList);
      }
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId')
        return res.status(404).json({ msg: 'List not found' });
      res.status(500).json({ msg: 'server error' });
    }
  }
);

//@route    DELETE api/v1/task/list/:id
//@des      delete 1 list with list id
//@access   public
task.delete('/list/:id', async (req, res) => {
  try {
    await Task.findOneAndRemove({ _id: req.params.id });
    console.log('DELETED');
    res.json({ msg: 'List deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'List not found' });
    res.status(500).json({ msg: 'server error' });
  }
});

module.exports = task;
