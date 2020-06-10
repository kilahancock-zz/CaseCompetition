import React from 'react'
import Reward from 'react-rewards'

const StreamPairRes = ({ image, name, link, color }) => {
    const signUp = () => {
        window.open(link);
    }

    return (
        <div style={{textAlign: 'center'}}>
            <img src={image} height={100} style={{ borderRadius: 10 }}/>
            <div style={{ fontSize: 30, margin: 20 }}>You have been matched with {name}!</div>
            <div>
                <button onClick={signUp} className='stream-button' style={{ backgroundColor: color, height: 50, color: 'white', borderRadius: 5, fontSize: 20, width: 200, border: 'none', cursor: 'pointer', overflow: 'hidden', outline: 'none', boxShadow: 'none' }}>Sign Up</button>
            </div>
        </div>
    )
}

export default StreamPairRes