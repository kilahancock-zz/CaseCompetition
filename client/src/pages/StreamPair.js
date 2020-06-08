import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import "react-input-range/lib/css/index.css"
import InputRange from 'react-input-range';
import axios from 'axios';

const Header = styled.header`
    background: transparent;
    color: black;
    margin: 0 1em;
    padding: 0.25em 1em;
    font-size: 36px;
`
const Question = styled.div`
    color: black;
    margin: 0 1em;
    padding: 0.25em 1em;
    font-size: 22px;
`

const StreamPair = () => {
    const [val, setVal] = useState({ min: 8, max: 20})
    const [shows, setShows] = useState([{
        poster: "https://m.media-amazon.com/images/M/MV5BZGExYjQzNTQtNGNhMi00YmY1LTlhY2MtMTRjODg3MjU4YTAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
    }])
    let genres = ['Action', 'Romance', 'Rom Com', 'Thriller'];

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
        <div>
            <div style={{ justifyContent: 'center', display: 'flex' }}>
                <Header>StreamPair</Header>
            </div>
            <Question>Select up to three of your favorite genres.</Question>
            <div style={{justifyContent: 'space-around', display: 'flex', width: '40%'}}>
                {genres.map(genre => 
                    <button style={{borderRadius: 10, padding: '0px 10px 0px 10px', backgroundColor: 'lightgrey', height: 50, border: 'none'}}>{genre}</button>
                )}
            </div>
            <Question>Select up to three of your favorite TV shows.</Question>
            <div style={{position: 'relative', textAlign: 'center', color: 'white'}}>
                <button onClick={showClick} style={{border: 'none', backgroundColor: 'white'}}>
                    <img src="https://m.media-amazon.com/images/M/MV5BZGExYjQzNTQtNGNhMi00YmY1LTlhY2MtMTRjODg3MjU4YTAyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg" alt="Snow" height={175} style={{borderRadius: 23, padding: '0px 10px 0px 10px'}}/>
                </button>
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