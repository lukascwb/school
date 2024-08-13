const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

// Define the Student model using Sequelize
const Sequelize = require('sequelize');
// const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
//     host: process.env.DATABASE_HOST,
//     dialect: 'mysql',
//     logging: true // You can uncomment this for debugging
// });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: false // You can uncomment this for debugging
    });

const Student = sequelize.define('Student', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// Test database connection


// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.redirect("/students");
});

app.get('/students', (req, res) => {
    res.sendFile(__dirname + '/alunos.html');
});

app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.findAll();
        res.json(students);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).send('Error fetching students');
    }
});

app.post('/api/students', async (req, res) => {
    const { name, age } = req.body;

    if (name && age) {
        try {
            const newStudent = await Student.create({ name, age });
            console.log('Student added successfully:', newStudent);
            res.status(201).send('Student added successfully');
        } catch (err) {
            console.error('Error adding student:', err);
            res.status(500).send('Error adding student');
        }
    } else {
        res.status(400).send('Missing name or age');
    }
});

// Close the connection when the server shuts down
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

process.on('SIGINT', () => {
    sequelize.close()
        .then(() => {
            console.log('MySQL connection closed.');
            process.exit(0);
        })
        .catch(err => {
            console.error('Error closing MySQL connection:', err);
        });
});


(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: true }); // force
        //await sequelize.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        // Handle the error as needed
    }
})();