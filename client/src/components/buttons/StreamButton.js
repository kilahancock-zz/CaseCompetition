import React, {useState} from 'react'

const StreamButton = ({ image, id, onClick, disabled, name, height, streamer }) => {
    const [opacity, setOpacity] = useState(1);

    const toggleOpacity = () => {
        opacity === 1 ? setOpacity(.4) : setOpacity(1)

        onClick({name: name, streamer: streamer})
    }

    return (
        <>
            <button disabled={disabled} onClick={toggleOpacity} style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer', overflow: 'hidden', outline: 'none', boxShadow: 'none'}}>
                <img src={image} alt="Snow" height={height} style={{borderRadius: 20, padding: '2px 5px 2px 5px', opacity: opacity}}/>
            </button>
        </>
    )
}

export default StreamButton;