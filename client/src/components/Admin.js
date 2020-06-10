import React, {Component} from 'react';
import Map from './Map';
import '../admin.css'

class Admin extends Component{
  constructor(props){
    super(props);
    this.state = {
      users : [],
      fill: {
        "Amazon": "#17A7E0",
        "HBO": "#c600ff",
        "Netflix": "#e50914"
      }
  }
  }

  handleChange = (e) => {
    if (e.target.value === "Providers Matched"){
      console.log("Matched")
    }

    else{
      console.log("Clicked");
    }
  }

  componentDidMount(){
    //call Providers Matched
    this.setState({
      ...this.state,
      users: [
        { provider: "Netflix",          coordinates: [139.6917,35.6895]},
        { provider: "Amazon",        coordinates: [106.8650,-6.1751]},
        { provider: "Netflix",          coordinates: [77.1025,28.7041] },
        { provider: "Netflix",         coordinates: [120.9842,14.5995]},
        { provider: "Netflix",          coordinates: [126.9780,37.5665]},
        { provider: "Amazon",       coordinates: [121.4737,31.2304]},
        { provider: "Amazon",        coordinates: [67.0099,24.8615]},
        { provider: "Amazon",        coordinates: [116.4074,39.9042]},
        { provider: "Amazon",       coordinates: [-74.0059,40.7128]},
        { provider: "HBO",      coordinates: [113.2644,23.1291]},
        { provider: "HBO",      coordinates: [-46.6333,-23.5505]},
        { provider: "HBO",    coordinates: [-99.1332,19.4326]},
        { provider: "HBO",         coordinates: [72.8777,19.0760]},
        { provider: "HBO",          coordinates: [135.5022,34.6937]},
        { provider: "HBO",         coordinates: [37.6173,55.7558]},
        { provider: "HBO",          coordinates: [90.4125,23.8103]},
        {  provider: "Netflix",  coordinates: [31.2357,30.0444]},
      ]
    })
  }

  render(){
    const {users, fill} = this.state;
     return(
       <div>
       <div className="admin-page">
       <h1 style={{textAlign: 'left', marginLeft: "10px"}}>StreamPair Analytics</h1>
      <select id="choice" className="d3-choice" onChange={this.handleChange} defaultValue="Providers Matched">
        <option value="Providers Matched">Providers Matched</option>
        <option value="Providers Clicked">Providers Clicked</option>
      </select>
      </div>
        <Map users={users} fill={fill}/>
      </div>
    )
  }
}

export default Admin;
