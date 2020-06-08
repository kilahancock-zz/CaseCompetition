import React, {useState} from 'react'

const StreamButton = ({ poster, id, onClick }) => {
    const [opacity, setOpacity] = useState(1);

    const toggleOpacity = () => {
        opacity == 1 ? setOpacity(.4) : setOpacity(1)
    }

    return (
        <>
            <button onClick={toggleOpacity} style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer', overflow: 'hidden', outline: 'none', boxShadow: 'none'}}>
                <img src={poster} alt="Snow" height={175} style={{borderRadius: 27, padding: '0px 10px 0px 10px', opacity: opacity}}/>
            </button>
        </>
    )
}

export default StreamButton;