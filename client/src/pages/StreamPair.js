import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import "react-input-range/lib/css/index.css"
import InputRange from 'react-input-range';
import axios from 'axios';

import StreamButton from '../components/StreamButton';
import GenreButton from '../components/GenreButton';

const Header = styled.header`
    background: transparent;
    color: white;
    margin: 0 1em;
    padding: 0.25em 1em;
    font-size: 52px;
    font-weight: bold;
`
const Question = styled.div`
    color: black;
    margin: 0 1em;
    padding: 20px 0px 20px 0px;
    font-size: 30px;
    color: white;
`
const Options = styled.div`
    justify-content: center;
    display: flex;
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

    const [disabledButtons, setDisabledButtons] = useState({
        genreButton: false,
        streamButton: false,
        showButton: false,
        movieButton: false
    })
    const [results, setResults] = useState({
        formControls: {
            genres: {
                0: '',
                1: '',
                2: ''
            },
            shows: {
                0: '',
                1: '',
                2: ''
            },
            movies: {
                0: '',
                1: '',
                2: ''
            }
        }
    })
    const [selectedGenres, setSelectedGenres] = useState([])
    const [selectedShows, setSelectedShows] = useState([])
    const [selectedMovies, setSelectedMovies] = useState([])

    const [maxPrice, setMaxPrice] = useState({ min: 8, max: 20})
    const [shows, setShows] = useState([{
        poster: "https://m.media-amazon.com/images/M/MV5BZGExYjQzNTQtNGNhMi00YmY1LTlhY2MtMTRjODg3MjU4YTAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
    }])
    let genres = ['Action', 'Romance', 'Thriller', 'Drama', 'Fantasy', 'Horror', 'Western', 'Genre', 'Mystery', 'Hallmark', 'Informative', 'Sad', 'Cat', 'Only'];

    useEffect(() => {
        let netflixShows = [];
        let arr = [];
        axios.get('https://casecomp.konnectrv.io/show?platform=netflix')
        .then(response => {
            for (const show of response.data) {
                if (show.popularity > 85 && show.vote_average > 7) {
                    netflixShows.push(show);
                    show.poster = '';
                }
            }
        }).then(() => {
            for (const show of netflixShows) {
                // console.log(show.imdb)      
                const url = 'http://www.omdbapi.com/?i=' + show.imdb + '&apikey=4a3b711b';
                axios.get(url)
                .then(response => { show.poster  = response.data.Poster })
            }
        })

        setShows(netflixShows)
    }, [])

    const submitForm = () => {

    }

    const updateGenres = (res) => {
        if (selectedGenres.length >= 2) {
            setDisabledButtons({...disabledButtons, genreButton: true})
        }
        setSelectedGenres([...selectedGenres, res])
    }

    const updateShows = (res) => {
        if (selectedShows.length >= 2) {
            setDisabledButtons({...disabledButtons, showButton: true})
        }
        setSelectedShows([...selectedShows, res])
    }

    const updateMovies = (res) => {
        if (selectedMovies.length >= 2) {
            setDisabledButtons({...disabledButtons, movieButton: true})
        }
        setSelectedMovies([...selectedMovies, res])
    }

    console.log(selectedGenres)
    console.log(disabledButtons)


    // once form is submitted, store the max value

    return (
        <div style={{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,149,255,1) 0%, rgba(21,196,196,1) 100%)'}}>
            <div style={{ justifyContent: 'center', display: 'flex' }}>
                <Header>StreamPair</Header>
            </div>
            <Question>Select three of your favorite genres.</Question>
            <Options>
                <div style={{width: '60%'}} >
                    {genres.map(genre => 
                        <GenreButton genre={genre} disabled={disabledButtons.genreButton} onClick={updateGenres} name='genres'/>
                    )}
                </div>
            </Options>
            <Question>Select three of your favorite TV shows.</Question>
            <Options>
                <div style={{width: '50%'}}>
                    {showss.map(show => 
                        <StreamButton name={show.name} onClick={updateShows} disabled={disabledButtons.showButton} poster={show.poster} id={show.id}/>    
                    )}
                </div>
            </Options>
            <Question>Select three of your favorite movies.</Question>
            <Options>
                <div style={{width: '50%'}}>
                    {showss.map(movie => 
                        <StreamButton name={movie.name} onClick={updateMovies} disabled={disabledButtons.movieButton} poster={movie.poster} id={movie.id}/>    
                    )}
                </div>
            </Options>
            <Question>What's your price range?</Question>
            <div style={{ justifyContent: 'center', display: 'flex', width: '30%', padding: '40px 0px 40px 80px' }}>
                <InputRange
                    maxValue={50}
                    minValue={0}
                    value={maxPrice}
                    onChange={value => setMaxPrice(value)}
                />
            </div>
            <button onClick={submitForm}>SUBMIT FORM HERE</button>
        </div>
    )
}

export default StreamPair