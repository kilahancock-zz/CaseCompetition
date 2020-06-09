import React from 'react'

const ServiceButton = ({ image }) => {
    return (
        <>
            <button style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer', overflow: 'hidden', outline: 'none', boxShadow: 'none'}}>
                <img src={image} alt="Snow" height={100} style={{borderRadius: 20, padding: '2px 5px 2px 5px'}}/>
            </button>
        </>
    );
}

export default ServiceButton;