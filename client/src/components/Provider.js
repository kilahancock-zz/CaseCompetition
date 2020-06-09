import React, {Component} from "react";
import '../provider.css';

const Provider = props => {
  const {name, providerImg, providerBackground, pricing, supportedDevices, link, backgroundGradient, color} = props;
  const players = supportedDevices.map(device => (
    <li key={device}>{device}</li>
  ));
  const plans = pricing.map(plan => (
    <li key={plan}>{plan}</li>
  ))

  const styling = {backgroundImage: `url("${providerBackground}"), ${backgroundGradient}`}
  return(
    <div class="provider" style={styling}>
    <h2>

    <img alt={name} title={name} src={providerImg}></img>

    </h2>
    <h3>Pricing Plans</h3>
    <ul class="plans">
    {plans}
    </ul>
    <hr style={{border: `2px ${color} solid`}}class="spacer"/>
    <br/>
    <h3>Supported Devices </h3>
    <ul class="plans">
    {players}
    </ul>
    <a class="btn btn-default" style={{backgroundColor: color}}href={link}>Sign Up Now</a>
    </div>
  )
}

export default Provider;
