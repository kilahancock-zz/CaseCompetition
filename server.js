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

//GET movie by production company sorted by popularity
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

//GET shows by production company sorted by popularity
app.get('/api/shows/production/:production', async (req, res) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    await fetch("https://casecomp.konnectrv.io/show", requestOptions)
      .then(response => response.json())
      .then(result => {
          let showsByProd = [];
          result.forEach(show => {
              if (show.production_companies) {
                show.production_companies.forEach(company => {
                    if (company.toLowerCase() == req.params.production.toLowerCase()) {
                        showsByProd.push(show);
                    }
                })
              }
             
          })
          showsByProd.sort((s, s2) => {return s2.popularity - s.popularity});
          res.send(showsByProd);
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
        res.send(moviesByPlatform);
    })
})

//GET shows by streaming platform sorted in order of popularity
app.get('/api/shows/platform/:platform', async (req, res) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    await fetch("https://casecomp.konnectrv.io/show", requestOptions)
    .then(response => response.json())
    .then(result => {
        let showsByPlatform = [];
        result.forEach(show => {
            show.streaming_platform.forEach(platform => {
                if (platform.toLowerCase() == req.params.platform.toLowerCase()) {
                    showsByPlatform.push(show);
                }
            })
        })
        showsByPlatform.sort((s, s2) => {return s2.popularity - s.popularity});
        console.log(showsByPlatform);
        res.send(showsByPlatform);
    })
})

//GET show or movie poster by IMDbID and apikey
app.get('/api/poster/apikey/:apikey/IMDbID/:id', async (req, res) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    await fetch(`http://www.omdbapi.com/?i=${req.params.id}&apikey=${req.params.apikey}`, requestOptions)
    .then(res => res.json())
    .then(result => {
        res.send(result.Poster);
    })
})

//Get number of movies by streaming platform
app.get('/api/movies/number/platform/:platform', async (req, res) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    await fetch(`https://casecomp.konnectrv.io/movie?platform=${req.params.platform}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        numMovies = {
            'MovieAmount': result.length
        };
        res.send(numMovies)
        
    })
})

//GET number of shows by streaming platform
app.get('/api/shows/number/platform/:platform', async (req, res) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    await fetch(`https://casecomp.konnectrv.io/show?platform=${req.params.platform}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        numShows = {
            'ShowsAmount': result.length
        };
        res.send(numShows)
        
    })
})

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
