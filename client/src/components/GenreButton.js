import React, {useState} from 'react'

const StreamButton = ({ genre }) => {
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [color, setColor] = useState('black')
    const [opacity, setOpacity] = useState(1);


    const toggleColor = () => {
        // backgroundColor === 'white' ? setBackgroundColor('purple') : setBackgroundColor('white')
        color === 'black' ? setColor('gray') : setColor('black')
        opacity === 1 ? setOpacity(.4) : setOpacity(1)
    }

    return (
        <>
            <button onClick={toggleColor} style={{opacity: opacity, border: 'none', cursor: 'pointer', overflow: 'hidden', outline: 'none', boxShadow: 'none', borderRadius: 5, backgroundColor: backgroundColor, border: 'none', width: 125, height: 100, color: color, fontSize: 20, margin: 10}}>
                {genre}
            </button>
        </>
    )
}

export default StreamButton;