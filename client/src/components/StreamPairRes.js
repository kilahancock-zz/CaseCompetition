import React from 'react'
import styled from 'styled-components'


const StreamPairRes = ({ image, name, link, color }) => {
    return (
        <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
            <img src={image} height={100} style={{ borderRadius: 10 }}/>
            <div style={{ fontSize: 20 }}>You have been matched with {name}!</div>
            <div>
                <button style={{ backgroundColor: color, color: 'white', borderRadius: 5, fontSize: 15, width: 200 }}>Sign Up</button>
            </div>
        </div>
    )
}

export default StreamPairRes