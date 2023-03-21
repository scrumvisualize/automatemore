const express = require('express');
const bodyParser = require("body-parser");
const db = require("./db/dbConfig");

const blogsDBName = process.env.REACT_DB_NAME;
const dbUserName = process.env.REACT_DB_USERNAME;
const dbPassword = process.env.REACT_DB_PASSWORD;

//var multer  = require('multer')
//var path = require('path');
//const moment = require('moment');

const { Sequelize, DataTypes } = require("sequelize");
const usersSchema = require('./modals/users');
const usersBlogSchema = require('./modals/userBlogs');
const subscriberSchema = require('./modals/subscriber');

const cors = require('cors');

const port = 8000;
const DB_NAME = blogsDBName;
const DB_PORT = 5432;
const DB_USERNAME = dbUserName;
const DB_PASSWORD = dbPassword;
const DB_HOST = 'localhost';
const DB_DIALECT = 'postgres';
const DB_POOL = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
}

const app = express();

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  pool: DB_POOL,
  port: DB_PORT
});


const UserModel = usersSchema(sequelize, DataTypes);
const BlogModel = usersBlogSchema(sequelize, DataTypes);
const SubscriberModel = subscriberSchema(sequelize, DataTypes);

app.use(cors()) // Use this after the variable declaration

// app.use(cors({
//   origin: "http://localhost:3000"
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



/* Below service is used to login to the blog site by an admin user */

app.post('/service/login', async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const sqlQuery = await UserModel.findAll({ attributes: ['email', 'password'] }, { where: { email: userEmail } });
    console.log("Records from DB" + sqlQuery);
    if (sqlQuery == null || sqlQuery == '') {
      res.status(403).json({ fail: "Invalid admin user details !" });
    }
    const email = sqlQuery[0].email;
    const password = sqlQuery[0].password;
    if (password === userPassword && email === userEmail) {
      res.status(200).json({ success: true });
    } else {
      res.status(403).json({ fail: "Email address or Password is incorrect !" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json();
  }
});

/* Creating and update a blog and saving into the database. Update by blog id */

app.put('/service/createblogs', async (req, res, next) => {

  try {
    const blogId = req.body.params.id;
    const userEmail = req.body.params.email;
    const blogDetails = req.body.params.blogValue;
    const tags = req.body.params.tagValue;
    if (blogId === null || blogId === undefined || blogId === ""){
      if (Object.keys(req.body).length === 0) {
        res.status(403).json({ fail: "Invalid blog request or blog request is blank !" });
      } else {
        var requestData = { email: userEmail, blogdetails: blogDetails, tags: tags };
        const createBlogRequest = await BlogModel.create(requestData);
        res.status(200).json({ success: true });
      }

    } else {
      var updateData = { email: userEmail, blogdetails: blogDetails, tags: tags };
        const createBlogRequest = await BlogModel.update(updateData, {where: { id: blogId }});
        res.status(200).send('Blog data updated successfully !');
    }
  
  } catch (e) {
    console.log(e);
    return next(e);
  }
});

/* Adding a service to update blog view count during onClick on each blog item */

app.get('/service/incrementblogviews', async (req, res) => {
  try {
    const blogId =  req.query.id;
    const dataCount = await BlogModel.findOne({ attributes: ['views'], where: { id: blogId }});
    const incrementCount = dataCount.views + 1;
    var updateData = { views: incrementCount };
    const updateBlogviews = await BlogModel.update(updateData, {where: { id: blogId }});
    res.status(200).json({ success: true  });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});




/* Get list of all blogs group by tags from database and display in the admin page */


app.get('/service/listofblogs', async (req, res) => {
  try {
    const blogData = await BlogModel.findAll(
      { attributes: ['id', 'blogdetails', 'tags', 'views', 'createdAt'] },
      { group: 'tags' }
    );
    res.status(200).json({ blogData });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


/* Get the blogs group by tagname */


app.get('/service/blogs/groupbyTags', async (req, res) => {
  try {
    const grpData = await sequelize.query('select max(id) as id, count (tags), tags as tagname from userblogs group by tags;')
    res.status(200).json({ grpData });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


/* Get the blogs lis in the groupByTag component */

app.get('/service/blogs/list', async (req, res) => {
  try {
    const blogData = await BlogModel.findAll(
      { attributes: ['id', 'tags', 'blogdetails'] },
      { group: 'tags' }
    );
    res.status(200).json({ blogData });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});



/* Get blog details to admin page fields by id on click on edit */

app.get('/service/findblogtoedit', async (req, res) => {
  try {
    const blogId = req.query.id;
    const blogData = await BlogModel.findOne({where: { id: blogId }});
    res.status(200).json({blogData});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


/* Delete a blog by a user from the admin page */

app.delete('/service/deleteblog', async (req, res) => {
  try {
    const blogId = req.body.id;
    const deleteBlog = await BlogModel.destroy({
      where: { id: blogId }
    });
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});



/* Adding subscriber email, comments entry in database  */

app.post('/service/createsubscriber', async (req, res, next) => {

  try {
    const subscriberEmail = req.body.email;
    const comments = req.body.comments;
    var subscriberData = { email: subscriberEmail, comments: comments };
    const createBlogRequest = await SubscriberModel.create(subscriberData);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    return next(e);
  }
});



(async () => {
  try {
    const sequelizeStatus = await sequelize.sync();
    console.log("your server is up and running");
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (e) {
    console.log(e, 'Database issue.');
  }
})();