const express = require("express");
const app = express();
const db = require('./models');
const userHandler = require('./handlers/users')
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const port = 5000;
app.use(bodyParser.json());

//GET all users from quiz
app.get("/api/userdata", (req, res) => {
    userHandler.getUser(req, res);
})

//GET user by unique id
app.get("/api/userdata/id/:id", (req, res) => {
    userHandler.getUserById(req, res);
})

//GET users by country
app.get("/api/userdata/country/:country", (req, res) => {
    userHandler.getUsersByCountry(req, res);
})

//GET users by state
app.get("/api/userdata/state/:state", (req, res) => {
    userHandler.getUsersByState(req, res);
})

//GET users by city
app.get("/api/userdata/city/:city", (req, res) => {
    userHandler.getUsersByCity(req, res);
})

//GET users by time zone
app.get("/api/userdata/time/:time", (req, res) => {
    userHandler.getUsersByTimeZone(req, res);
})
//POST userdata from quiz
app.post("/api/userdata", (req, res) => {
    userHandler.postUser(req, res);
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
            'Amount': result.length
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
            'Amount': result.length
        };
        res.send(numShows)
        
    })
})

//GET all movies and shows
app.get('/api/all', async (req, res) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let movies = [];
    await fetch("https://casecomp.konnectrv.io/movie", requestOptions)
    .then(response => response.json())
    .then(result => {
        movies = result;
    })
    movies.sort((m, m2) => {return m2.popularity - m.popularity});

    let shows = [];
    await fetch("https://casecomp.konnectrv.io/show", requestOptions)
    .then(response => response.json())
    .then(result => {
        shows = result;
    }).catch(error => console.log('error', error))
    shows.sort((s, s2) => {return s2.popularity - s.popularity});

    moviesAndShows = movies.concat(shows);

    res.send(moviesAndShows);
})


let genreData = [
    {
        "genre": "action",
        "netflix": 26,
        "hbo": 5,
        "amazon_prime": 21
    },
    {
        "genre": "romance",
        "netflix": 14,
        "hbo": 3,
        "amazon_prime": 12
    },
    {
        "genre": "thriller",
        "netflix": 33,
        "hbo": 5,
        "amazon_prime": 36
    },
    {
        "genre": "drama",
        "netflix": 72,
        "hbo": 11,
        "amazon_prime": 72
    },
    {
        "genre": "fantasy",
        "netflix": 18,
        "hbo": 5,
        "amazon_prime": 5
    },
    {
        "genre": "horror",
        "netflix": 14,
        "hbo": 1,
        "amazon_prime": 13
    },
    {
        "genre": "western",
        "netflix": 3,
        "hbo": 0,
        "amazon_prime": 5
    },
    {
        "genre": "mystery",
        "netflix": 26,
        "hbo": 4,
        "amazon_prime": 28
    }
]
/* fillGenreData - makes live calculation of the number of TV Shows and Movies 
                   for each streaming service that match a given genre
  NOTE -           Results of this function should be sent to a database rather than stored locally.
                   This function takes a very long time to execute
*/
async function fillGenreData() {
    let apikey = '4a3b711b';
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let all;
    await fetch(`http://localhost:${port}/api/all`, requestOptions)
    .then(response => response.json())
    .then(result => {
        all = result;
    })
    genreData.forEach(element => {
        const calculate = async () => {
           await asyncForEach(all, async (movie) =>  {
                id = movie.imdb;
                await fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${id}`)
                .then(response => response.json())
                .then(omdbMovie => {
                    if (omdbMovie.Genre.toLowerCase().includes(element.genre)) {
                        element[movie.streaming_platform[0]]++;
                        console.log(genreData);
                    } 
                })
            })
        }
        calculate();
    })
}
//fillGenreData();

//utility function for executing asynchronous iterations within a forEach loop
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }


app.get('/api/platform-by-genre/:genre/apikey/:apikey', async (req, res) => {
    res.send(genreData);
})


app.listen(port, () => console.log(`Server started on port ${port}`));

