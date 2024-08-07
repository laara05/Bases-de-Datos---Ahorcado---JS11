const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// configurar la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mypassword', 
    database: 'Score'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// ruta para obtener todos los puntajes
app.get('/scores', (req, res) => {
    db.query('SELECT * FROM score ORDER BY puntos DESC', (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

// ruta para agregar un nuevo puntaje
app.post('/scores', (req, res) => {
    const { tiempo, puntos, nombre } = req.body;
    const query = 'INSERT INTO score (tiempo, puntos, nombre) VALUES (?, ?, ?)';
    db.query(query, [tiempo, puntos, nombre], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).send('Score added successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
