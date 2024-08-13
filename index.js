const express = require('express');
const mysql = require('mysql2'); // Import the MySQL module
const app = express();
const port = 3000; // Choose a port
//const connection = require('./database');
require('dotenv').config(); // Load environment variables from .env

const connection = mysql.createConnection(process.env.DATABASE_URL);

// const connection = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME
// });

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});



// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({
    extended: true
}));


// Route to serve alunos.html
app.get('/', (req, res) => {
    res.redirect("/students");
});


// Route to serve alunos.html
app.get('/students', (req, res) => {
    res.sendFile(__dirname + '/alunos.html');
});


// Route to fetch students from the database
app.get('/api/students', (req, res) => {
    connection.query('SELECT * FROM students', (err, results, fields) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching students');
            return;
        }
        res.json(results);
    });
});

// Route to add a new student (POST request)
app.post('/api/students', (req, res) => {
    const { name, age } = req.body; // Destructure directly

    if (name && age) {
        connection.query('INSERT INTO students (name, age) VALUES (?, ?)', [name, age], (err, result) => {
            if (err) {
                console.error('Error adding student:', err);
                res.status(500).send('Error adding student');
                return;
            }
            console.log('Student added successfully');
            res.status(201).send('Student added successfully');
        });
    } else {
        res.status(400).send('Missing name or age');
    }
});

// Close the connection when the server shuts down
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

// Close the connection when the server shuts down
process.on('SIGINT', () => {
    connection.end(err => {
        if (err) {
            console.error('Error closing MySQL connection:', err);
        }
        console.log('MySQL connection closed.');
        process.exit(0);
    });
});
