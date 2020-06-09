import React, {useState} from 'react';
import '../../genrebutton.css';

const StreamButton = ({ genre, onClick, disabled, name }) => {
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [color, setColor] = useState('black')
    const [opacity, setOpacity] = useState(1);


    const toggleColor = () => {
        // backgroundColor === 'white' ? setBackgroundColor('purple') : setBackgroundColor('white')
        color === 'black' ? setColor('gray') : setColor('black')
        opacity === 1 ? setOpacity(.4) : setOpacity(1)

        onClick(genre)
    }

    return (
        <>
            <button className="genre-button" disabled={disabled} onClick={toggleColor} style={{opacity: opacity, border: 'none', cursor: 'pointer', overflow: 'hidden', outline: 'none', boxShadow: 'none', borderRadius: 5, backgroundColor: backgroundColor, border: 'none', width: 125, height: 100, color: color, fontSize: 20, margin: 10}}>
                {genre}
            </button>
        </>
    )
}

export default StreamButton;
