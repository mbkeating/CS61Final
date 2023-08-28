import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import mysql from 'mysql';
import cors from 'cors';
dotenv.config();

const port = 3010;
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db = null;

const init = async () => {
    db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "[covered]",
        database: "movie_db"
    });
}

app.get('/actors', async(req, res) => {
    const actorName = req.query.actorName
    db.query(`SELECT * FROM actor WHERE actor_name LIKE \'%${actorName}%\' LIMIT 40`, (err, result) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
        res.json(result)
    })
})

app.get('/movies', async(req, res) => {
    const actorId = req.query.actorId

    db.query(`SELECT title FROM movie_actor AS ma JOIN movie AS m ON ma.movie_id = m.movie_id WHERE ma.actor_id = ${actorId}`, (err, result) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
        res.json(result)
    })
})

app.get('/mostGenresForDirectors', async(req, res) => {
    db.query(`SELECT director_name, COUNT(DISTINCT genre_name) AS genre_count FROM genre AS g JOIN movie_genre AS mg ON g.genre_id = mg.genre_id JOIN movie AS m ON mg.movie_id = m.movie_id JOIN director AS d On m.director_id = d.director_id GROUP BY director_name ORDER BY COUNT(DISTINCT genre_name) DESC LIMIT 5`, (err, result) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
        res.json(result)
    })
})

app.get('/bestMinuteGrossing', async(req, res) => {
    db.query(`SELECT title, ROUND(gross * 1000000 / runtime_min) AS per_min_grossing FROM movie ORDER BY ROUND(gross * 1000000 / runtime_min) DESC LIMIT 5`, (err, result) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
        res.json(result)
    })
})

app.get('/popularGenre', async(req, res) => {
    db.query(`SELECT genre_name, COUNT(genre_name) AS movies_count FROM genre AS g JOIN movie_genre AS mg ON g.genre_id = mg.genre_id GROUP BY genre_name ORDER BY COUNT(genre_name) DESC LIMIT 5`, (err, result) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
        res.json(result)
    })
})

app.get('/frequentActors', async(req, res) => {
    db.query(`SELECT actor_name, count(character_name) AS movie_count FROM movie_actor as ma join actor as a on ma.actor_id = a.actor_id group by a.actor_name order by count(character_name) desc limit 5`, (err, result) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
        res.json(result)
    })
})

app.get('/highestProfit', async(req, res) => {
    db.query(`SELECT title, ROUND(gross - budget) AS profit_m FROM movie AS m JOIN supplementary_data AS s ON m.data_id = s.data_id WHERE gross > 0 ORDER BY ROUND(gross - budget) DESC LIMIT 5`, (err, result) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
        res.json(result)
    })
})

app.get('/flops', async(req, res) => {
    db.query(`SELECT title, (gross - budget) AS profit_m FROM movie AS m JOIN supplementary_data AS s ON m.data_id = s.data_id WHERE gross > 0 AND gross - budget < 0 ORDER BY (gross - budget) LIMIT 5`, (err, result) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
        res.json(result)
    })
})

app.listen(port, () => {
    console.log("starting on port 3010")
  
    init()
})