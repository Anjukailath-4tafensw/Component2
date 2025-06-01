/**
 * This is a simple Express server that implements a RESTful API for managing
 * courses. The server listens on port 3000 and responds to the following
 * routes:
 *
 *   - GET /courses: returns an array of all courses
 *   - GET /courses/:id: returns the course details with the given ID, or a 404 error
 *     if not found
 *   - POST /courses: creates a new course with a generated ID, using the
 *     title, description, instructor, duration, category from the request body and returns the
 * 
 * @module courses-server
 */
/*import { createClient } from 'redis';*/
import express, { json } from 'express';
import cors from 'cors'; // Import the cors package
import pkg from 'mongoose';
const { connect, connection, Schema, model, Types } = pkg;
import mongoose from 'mongoose';
import dotenv  from 'dotenv';
dotenv.config();

/*const redisClient = createClient();
await redisClient.connect();*/

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(json());

// MongoDB connection
connect(process.env.MONGODB_URI);

const db = connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define Mongoose schemas and models
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: String,
  duration: Number,
  category: String,
});

const Course = model('Course', courseSchema);

// To check cache
/*const cache = async (req, res, next) => {
  const cachedData = await redisClient.get('all_courses');
  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }
  next();
};

app.get('/courses', cache, async (req, res) => {
  const courses = await Course.find({});
  await redisClient.setEx('all_courses', 3600, JSON.stringify(courses)); // TTL = 1 hour
  res.json(courses);
});*/

// Retrieve all courses
app.get('/courses', (req, res) => {
    Course.find({})
        .then(courses => {
            res.json(courses);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error retrieving courses');
        });
});


// Retrieve a single course by course_id
app.get('/courses/:id', (req, res) => {
    Course.findById(req.params.id)
        .then(courses => {
            if (!courses) {
                return res.status(404).send('Course not found');
            }
            res.json(courses);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error retrieving course');
        });
});


// Add a new Course
app.post('/courses', async (req, res) => {
    const newCourse = new Course({
        _id: new Types.ObjectId(),
        ...req.body,
    });
    try {
        await newCourse.save();
        console.log('Course created:', newCourse);
        /*await redisClient.del('all_courses'); // Clear cache*/
        res.status(201).send(newCourse);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


