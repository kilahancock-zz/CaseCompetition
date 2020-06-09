import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import "react-input-range/lib/css/index.css"
import InputRange from 'react-input-range';
import axios from 'axios';

import netflix from './netflixlogo.jpeg';
import hbo from './hbo.jpg';
import amazon_prime from './amazon_prime.jpg';
import StreamButton from '../components/buttons/StreamButton';
import GenreButton from '../components/buttons/GenreButton';
import ServiceButton from '../components/buttons/ServiceButton';

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

    let images = [{image: netflix, name: 'netflix'}, {image: amazon_prime, name: 'amazon_prime'}, {image: hbo, name: 'hbo'}];
    const [movies, setMovies] = useState([])
    const [hasPrevSubscription, setHasPrevSubscription] = useState(false)
    const [prevSubscriptions, setPrevSubscriptions] = useState([])
    const [disabledButtons, setDisabledButtons] = useState({
        genreButton: false,
        streamButton: false,
        showButton: false,
        movieButton: false
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


    useEffect(() => {
        let tempMovies = [];

        const fetchMovies = async (platform) => {
            await axios.get('/api/movies/platform/' + platform)
            .then(res => {
                for (let i = 0; i < 3; i++)
                    tempMovies.push(res.data[i])
            })
            setMovies(tempMovies)
        }

        // const fetchPosters = async () => {
        //     for (const movie of tempMovies) {
        //         await axios.get('/api/poster/apikey/4a3b711b/IMDbID/' + movie.imdb)
        //         .then(res => console.log(res.data))
        //     }
        // }

        fetchMovies('netflix')
        // fetchMovies('hbo')
        // fetchMovies('amazon_prime')
        // fetchPosters()

    }, [])

    console.log('popular movies: ', movies)

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

    const updateSubscription = (res) => {
        setPrevSubscriptions([...prevSubscriptions, res])
    }

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
                        <StreamButton height={175} name={show.name} onClick={updateShows} disabled={disabledButtons.showButton} image={show.poster} id={show.id}/>    
                    )}
                </div>
            </Options>
            <Question>Select three of your favorite movies.</Question>
            <Options>
                <div style={{width: '50%'}}>
                    {showss.map(movie => 
                        <StreamButton height={175} name={movie.name} onClick={updateMovies} disabled={disabledButtons.movieButton} image={movie.poster} id={movie.id}/>    
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
            <Question>Have you been subscribed to one of these services before?</Question>
                <Options>
                    <div style={{width: '20%'}}>
                        <input type="radio" value="Yes" name="service" onChange={() => setHasPrevSubscription(true)}/>Yes
                        <input type="radio" value="No" name="service" onChange={() => setHasPrevSubscription(false)}/>No
                    </div>
                </Options>
                <Options>
                    <div>
                        {
                            hasPrevSubscription === true ? images.map(image => <StreamButton image={image.image} name={image.name} onClick={updateSubscription} disabled={false} height={100}/>) : <></>
                        }
                    </div>
                </Options>
            <button onClick={submitForm}>SUBMIT FORM HERE</button>
        </div>
    )
}

export default StreamPair