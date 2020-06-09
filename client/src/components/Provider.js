import React, {Component} from "react";
import '../provider.css';

const Provider = props => {
  const {name, providerImg, providerBackground, pricing, link, backgroundGradient, color, blurb} = props;

  const styling = {backgroundImage: `url("${providerBackground}"), ${backgroundGradient}`}
  return(
    <div className="provider" style={styling}>
    <h2>

    <img alt={name} title={name} src={providerImg}></img>

    </h2>
    <h3>{pricing}</h3>
    <hr style={{border: `2px ${color} solid`}}className="spacer"/>
    <br/>
    <ul className="blurb">
    {blurb}
    </ul>
    <a className="btn btn-default" style={{backgroundColor: color}}href={link}>Sign Up Now</a>
    </div>
  )
}

export default Provider;
