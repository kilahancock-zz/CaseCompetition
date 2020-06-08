import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import "react-input-range/lib/css/index.css"
import InputRange from 'react-input-range';
import axios from 'axios';

import StreamButton from '../components/StreamButton';

const Header = styled.header`
    background: transparent;
    color: white;
    margin: 0 1em;
    padding: 0.25em 1em;
    font-size: 36px;
`
const Question = styled.div`
    color: black;
    margin: 0 1em;
    padding: 0.25em 1em;
    font-size: 22px;
    color: white;
`

const StreamPair = () => {
    let showss = [{
            poster: "https://m.media-amazon.com/images/M/MV5BZGExYjQzNTQtNGNhMi00YmY1LTlhY2MtMTRjODg3MjU4YTAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
            id: 0,
        },
        {
            poster: "https://m.media-amazon.com/images/M/MV5BZGExYjQzNTQtNGNhMi00YmY1LTlhY2MtMTRjODg3MjU4YTAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
            id: 1,
        },
        {
            poster: "https://m.media-amazon.com/images/M/MV5BZGExYjQzNTQtNGNhMi00YmY1LTlhY2MtMTRjODg3MjU4YTAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
            id: 2,
        }
    ]

    const [val, setVal] = useState({ min: 8, max: 20})
    const [shows, setShows] = useState([{
        poster: "https://m.media-amazon.com/images/M/MV5BZGExYjQzNTQtNGNhMi00YmY1LTlhY2MtMTRjODg3MjU4YTAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
    }])
    let genres = ['Action', 'Romance', 'Thriller', 'Drama', 'Fantasy', 'Horror', 'Western', 'Fantasy', 'Mystery'];

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

    console.log(shows)

    const showClick = () => {
        alert('clicked')
    }

    // once form is submitted, store the max value

    return (
        <div style={{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 3%, rgba(0,212,255,1) 100%)'}}>
            <div style={{ justifyContent: 'center', display: 'flex' }}>
                <Header>StreamPair</Header>
            </div>
            <Question>Select up to three of your favorite genres.</Question>
            <div style={{justifyContent: 'space-around', display: 'flex', width: '70%'}}>
                {genres.map(genre => 
                    <button style={{borderRadius: 5, backgroundColor: 'white', border: 'none', width: 200, height: 60, fontSize: 18}}>{genre}</button>
                )}
            </div>
            <Question>Select up to three of your favorite TV shows.</Question>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {showss.map(show => 
                    <StreamButton onClick={showClick} poster={show.poster} id={show.id}/>    
                )}
            </div>
            <Question>What's your price range?</Question>
            <div style={{ justifyContent: 'center', display: 'flex', width: '30%', padding: '40px 0px 40px 80px' }}>
                <InputRange
                    maxValue={50}
                    minValue={0}
                    value={val}
                    onChange={value => setVal(value)}
                />
            </div>
        </div>
    )
}

export default StreamPair