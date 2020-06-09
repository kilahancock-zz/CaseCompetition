const express = require("express");
const app = express();
const db = require('./models');
const userHandler = require('./handlers/users')
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

app.use(bodyParser.json());

app.get("/api/test", (req, res) => {
    const testObject = [
        {id: 1, name: "test1"},
        {id: 2, name: "test2"}
    ];
    res.json(testObject);
});

//GET userdata from quiz
const userData = [];
app.get("/api/userdata", (req, res) => {
    res.send(userData);
})

//POST userdata from quiz
app.post("/api/userdata", (req, res) => {
    const user = {
        id: req.body.id,
        genre: req.body.genre,
        priceRange: req.body.priceRange
    }
    userData.push(user);
    res.send(user);
}); 

//GET all movies
 app.get('/api/movies', async (req, res)  => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      let movies = [];
      await fetch("https://casecomp.konnectrv.io/movie", requestOptions)
      .then(response => response.json())
      .then(result => {
          movies = result;
        }
          )
      .catch(error => console.log('error', error));
      movies.sort((m, m2) => {return m2.popularity - m.popularity});
      res.send(movies);
})

//GET all shows
app.get('/api/shows', async (req, res) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let shows = [];
    await fetch("https://casecomp.konnectrv.io/show", requestOptions)
    .then(response => response.json())
    .then(result => {
        shows = result;
        console.log(shows);
    }).catch(error => console.log('error', error))
    shows.sort((m, m2) => {return m2.popularity - m.popularity});
    res.send(shows);
})

//GET movie by production company
app.get('/api/movies/production/:production', async (req, res) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    await fetch("https://casecomp.konnectrv.io/movie", requestOptions)
      .then(response => response.json())
      .then(result => {
          let moviesByProd = [];
          result.forEach(movie => {
              movie.production_companies.forEach(company => {
                  if (company.toLowerCase() == req.params.production.toLowerCase()) {
                      moviesByProd.push(movie);
                  }
              })
          })
          moviesByProd.sort((m, m2) => {return m2.popularity - m.popularity});
          res.send(moviesByProd);
        }

          )
      
      
})

//GET movies by streaming platform sorted in order of popularity
app.get('/api/movies/platform/:platform', async (req, res) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    await fetch("https://casecomp.konnectrv.io/movie", requestOptions)
    .then(response => response.json())
    .then(result => {
        let moviesByPlatform = [];
        result.forEach(movie => {
            movie.streaming_platform.forEach(platform => {
                if (platform.toLowerCase() == req.params.platform.toLowerCase()) {
                    moviesByPlatform.push(movie);
                }
            })
        })
        moviesByPlatform.sort((m, m2) => {return m2.popularity - m.popularity});
        console.log(moviesByPlatform);
        res.send(moviesByPlatform);
    })
})


const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
