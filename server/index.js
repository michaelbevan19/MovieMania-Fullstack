const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: ["https://splendorous-lolly-7e568b.netlify.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
});

// --- RESTful API Endpoints ---

// GET /movies: Fetch all movies
app.get('/movies', (req, res) => {
    const sql = 'SELECT * FROM movies';
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// GET /movies/:id: Fetch single movie
app.get('/movies/:id', (req, res) => {
    const sql = 'SELECT * FROM movies WHERE id = ?';
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
    });
});

// POST /movies: Add new movie
app.post('/movies', (req, res) => {
    const sql = 'INSERT INTO movies (title, genre, description, poster_url, rating) VALUES (?)';
    const values = [
        req.body.title,
        req.body.genre,
        req.body.description,
        req.body.poster_url,
        req.body.rating
    ];
    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Movie added successfully");
    });
});

// PUT /movies/:id: Update movie
app.put('/movies/:id', (req, res) => {
    const sql = 'UPDATE movies SET title=?, genre=?, description=?, poster_url=?, rating=? WHERE id=?';
    const values = [
        req.body.title,
        req.body.genre,
        req.body.description,
        req.body.poster_url,
        req.body.rating
    ];
    db.query(sql, [...values, req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.json("Movie updated successfully");
    });
});

// DELETE /movies/:id: Delete movie
app.delete('/movies/:id', (req, res) => {
    const sql = 'DELETE FROM movies WHERE id = ?';
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.json("Movie deleted successfully");
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});