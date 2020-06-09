import React, {useState, useEffect, useLayoutEffect} from 'react'
import styled from 'styled-components'
import "react-input-range/lib/css/index.css"
import InputRange from 'react-input-range';
import axios from 'axios';
import '../streampair.css';
import netflix from './netflixlogo.jpeg';
import hbo from './hbo.jpg';
import amazon_prime from './amazon_prime.jpg';
import StreamButton from '../components/buttons/StreamButton';
import GenreButton from '../components/buttons/GenreButton';
import ServiceButton from '../components/buttons/ServiceButton';

const Header = styled.header`
    background: transparent;
    color: black;
    margin: 0 1em;
    padding: 0.25em 1em;
    font-size: 52px;
    font-weight: 500;
    margin-bottom: 20px;
`
const Question = styled.div`
    color: black;
    margin: 0 1em;
    padding: 20px 0px 20px 0px;
    font-size: 30px;
    color: black;
`
const Options = styled.div`
    justify-content: center;
    display: flex;
    margin: 40px 0;
`

const StreamPair = () => {
    let showss = [{
            poster: "https://m.media-amazon.com/images/M/MV5BZGExYjQzNTQtNGNhMi00YmY1LTlhY2MtMTRjODg3MjU4YTAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
            id: 0,
            name: 'Stranger Things'
        },
        {
            poster: "https://m.media-amazon.com/images/M/MV5BZGExYjQzNTQtNGNhMi00YmY1LTlhY2MtMTRjODg3MjU4YTAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
            id: 1,
            name: 'Stranger Things'
        },
        {
            poster: "https://m.media-amazon.com/images/M/MV5BZGExYjQzNTQtNGNhMi00YmY1LTlhY2MtMTRjODg3MjU4YTAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
            id: 2,
            name: 'Stranger Things'
        },
        {
            poster: "https://m.media-amazon.com/images/M/MV5BZGExYjQzNTQtNGNhMi00YmY1LTlhY2MtMTRjODg3MjU4YTAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
            id: 2,
            name: 'Stranger Things'
        },
        {
            poster: "https://m.media-amazon.com/images/M/MV5BZGExYjQzNTQtNGNhMi00YmY1LTlhY2MtMTRjODg3MjU4YTAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
            id: 2,
            name: 'Stranger Things'
        },
    ]

    let images = [{image: netflix, name: 'netflix'}, {image: amazon_prime, name: 'amazon_prime'}, {image: hbo, name: 'hbo'}];
    const [showsOrMovies, setShowsOrMovies] = useState('')
    const [movies, setMovies] = useState([])
    const [shows, setShows] = useState([])
    const [hasPrevSubscription, setHasPrevSubscription] = useState(false)
    const [prevSubscriptions, setPrevSubscriptions] = useState([])
    const [disabledButtons, setDisabledButtons] = useState({
        genreButton: false,
        streamButton: false,
        showButton: false,
        movieButton: false,
        showsOrMoviesButton: false
    })
    const [selectedGenres, setSelectedGenres] = useState([])
    const [selectedShows, setSelectedShows] = useState([])
    const [selectedMovies, setSelectedMovies] = useState([])

    const [maxPrice, setMaxPrice] = useState({ min: 8, max: 20})
    let genres = ['Action', 'Romance', 'Thriller', 'Drama', 'Fantasy', 'Horror', 'Western', 'Mystery', 'Informative'];

    // useEffect(() => {
    //     let netflixShows = [];
    //     let arr = [];
    //     axios.get('https://casecomp.konnectrv.io/show?platform=netflix')
    //     .then(response => {
    //         for (const show of response.data) {
    //             if (show.popularity > 85 && show.vote_average > 7) {
    //                 netflixShows.push(show);
    //                 show.poster = '';
    //             }
    //         }
    //     }).then(() => {
    //         for (const show of netflixShows) {
    //             // console.log(show.imdb)      
    //             const url = 'http://www.omdbapi.com/?i=' + show.imdb + '&apikey=4a3b711b';
    //             axios.get(url)
    //             .then(response => { show.poster  = response.data.Poster })
    //         }
    //     })

    //     setShows(netflixShows)
    // }, [])


    useLayoutEffect(() => {
        let tempMovies = [];

        const fetchMovies = async (platform) => {
            await axios.get('/api/movies/platform/' + platform)
            .then(res => {
                for (let i = 0; i < 3; i++)
                    tempMovies.push(res.data[i])
            })
            .then(async () => {
                for (const m of tempMovies) {
                    await axios.get('/api/poster/apikey/4a3b711b/IMDbID/' + m.imdb)
                    .then(res => {
                        m['poster'] = res.data
                    })
                }
            })
            //tempMovies = tempMovies.json()
            setMovies(tempMovies)
        }

        fetchMovies('netflix')
        fetchMovies('hbo')
        fetchMovies('amazon_prime')
    }, [])

    useLayoutEffect(() => {
        let tempShows = [];

        const fetchShows = async (platform) => {
            await axios.get('/api/shows/platform/' + platform)
            .then(res => {
                for (let i = 0; i < 4; i++)
                tempShows.push(res.data[i])
            })
            .then(async () => {
                for (const m of tempShows) {
                    await axios.get('/api/poster/apikey/4a3b711b/IMDbID/' + m.imdb)
                    .then(res => {
                        m['poster'] = res.data
                    })
                }
            })
            //tempMovies = tempMovies.json()
            setShows(tempShows)
        }

        fetchShows('netflix')
        fetchShows('hbo')
        fetchShows('amazon_prime')
    }, [])

    let showsmovies = ['Shows', 'Movies']

    const submitForm = () => {
        let res = {
            data: {
                genres: {
                    selectedGenres
                },
                movies: {
                    selectedMovies
                },
                shows: {
                    selectedShows
                },
                price: {
                    maxPrice
                },
                prevSubscriptions: {
                    prevSubscriptions
                }, showsOsMovies: {
                    showsOrMovies
                }
            },
            choices: {
                genres: {
                    genres
                },
                movies: {
                    movies
                },
                shows: {
                    shows
                }
            }
        }

        console.log(res)
    }

    const updateGenres = (res) => {
        if (selectedGenres.length >= 2) {
            setDisabledButtons({...disabledButtons, genreButton: true})
        }
        setSelectedGenres([...selectedGenres, res])
    }

    const updateShows = (res) => {
        // console.log('here')
        if (selectedShows.length >= 2) {
            setDisabledButtons({...disabledButtons, showButton: true})
        }
        setSelectedShows([...selectedShows, res])
    }

    console.log(selectedShows)
    console.log(shows)

    const updateMovies = (res) => {
        // console.log('here')
        if (selectedMovies.length >= 2) {
            setDisabledButtons({...disabledButtons, movieButton: true})
        }
        setSelectedMovies([...selectedMovies, res])
    }

    const updateSubscription = (res) => {
        setPrevSubscriptions([...prevSubscriptions, res])
    }

    const updateShowsMovies = (res) => {
        setDisabledButtons({...disabledButtons, showsOrMoviesButton: true})
        setShowsOrMovies(res)
    }

    console.log(showsOrMovies)

    // once form is submitted, store the max value
// 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,149,255,1) 0%, rgba(21,196,196,1) 100%)'
    return (
        <div className="form" style={{background: '#f8f8f8'}}>
            <div style={{ justifyContent: 'center', display: 'flex' }}>
                <Header>StreamPair</Header>
            </div>
            <Question>Select three of your favorite genres:</Question>
            <Options>
                <div style={{width: '60%'}} >
                    {genres.map(genre =>
                        <GenreButton genre={genre} disabled={disabledButtons.genreButton} onClick={updateGenres} name='genres'/>
                    )}
                </div>
            </Options>
            <Question>Select three of your favorite TV shows:</Question>
            <Options>
                <div style={{width: '50%'}}>
                    {shows.map(show => 
                        <StreamButton streamer={show.streaming_platform[0]} height={175} name={show.title} onClick={updateShows} disabled={disabledButtons.showButton} image={show.poster} id={show.id}/>    
                    )}
                </div>
            </Options>
            <Question className="question">Select three of your favorite movies:</Question>
            <Options>
                <div style={{width: '50%'}}>
                    {movies.map(movie => 
                        <StreamButton streamer={movie.streaming_platform[0]} height={175} name={movie.title} onClick={updateMovies} disabled={disabledButtons.movieButton} image={movie.poster}/>    
                    )}
                </div>
            </Options>
            <Question>Do you prefer shows or movies?</Question>
            <Options>
                <div >
                    {showsmovies.map(sm =>
                        <GenreButton genre={sm} disabled={disabledButtons.showsOrMoviesButton} onClick={updateShowsMovies} name={sm}/>
                    )}
                </div>
            </Options>
            <Question >What's your price range?</Question>
            <div style={{ justifyContent: 'center', display: 'flex', width: '50%', padding: '40px 0px 40px 80px'}}>
                <InputRange
                    maxValue={50}
                    minValue={0}
                    value={maxPrice}
                    onChange={value => setMaxPrice(value)
                    }
                />
            </div>
            <Question>Have you been subscribed to one of these services before?</Question>
                <Options>
                    <div className="radio-button" style={{width: '40%'}}>
                        <label htmlFor="name">
                        <input id="name" type="radio" value="Yes" name="service" onChange={() => setHasPrevSubscription(true)}/>&nbsp;Yes</label>
                        <label htmlFor="service">
                        <input id="service" type="radio" value="No" name="service" onChange={() => setHasPrevSubscription(false)}/>&nbsp;No</label>
                    </div>
                </Options>
                <Options>
                    <div>
                        {
                            hasPrevSubscription === true ? images.map(image => <StreamButton streamer={image.name} image={image.image} name={image.name} onClick={updateSubscription} disabled={false} height={100}/>) : <></>
                        }
                    </div>
                </Options>
            <div className="submit-button"><button className="btn btn-success" onClick={submitForm}>Find your provider!</button></div>
        </div>
    )
}

export default StreamPair
