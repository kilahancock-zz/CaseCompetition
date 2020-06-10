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
      fetch("/api/userdata").then(response => {
        response.json().then(data => {
          let users = data.map(u => ({provider: u.matchedProvider, coordinates:[u.latitude, u.longitude]}));
          console.log(users);
          this.setState({
            ...this.state,
            users
          })
        });
      })
    }

    else{
      fetch("/api/userdata").then(response => {
        response.json().then(data => {
          let users = []
          data.forEach(d => {
            if (d.clickedNetflix){
              users.push({provider: "Netflix", coordinates:[d.latitude, d.longitude] })
            }

            if (d.clickedAmazon){
              users.push({provider: "Amazon", coordinates:[d.latitude, d.longitude]})
            }

            if (d.clickedHBO){
              users.push({provider: "HBO", coordinates:[d.latitude, d.longitude]})
            }
          })
          console.log(users);
          this.setState({
            ...this.state,
            users
          })
        });
      })
    }
  }

  componentDidMount(){

    fetch("/api/userdata").then(response => {
      response.json().then(data => {
        let users = data.map(u => ({provider: u.matchedProvider, coordinates:[u.latitude, u.longitude]}));
        console.log(users);
        this.setState({
          ...this.state,
          users
        })
      });
    })
  }

  render(){
    const {users, fill} = this.state;
    (function (p,o,s,t,m,a,n) {
      !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
      !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
        (n = o.createElement("script")),
        (n.id = s+t), (n.async = 1), (n.src = m), n
      ));
    }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
     return(
       <div>
       <div className="admin-page">
       <h1 style={{textAlign: 'left', marginLeft: "10px"}}>StreamPair Analytics</h1>
      <select id="choice" className="d3-choice" onChange={this.handleChange} defaultValue="Providers Matched">
        <option value="Providers Matched">Providers Matched</option>
        <option value="Providers Clicked">Providers Clicked</option>
      </select>
      <div class="postman-run-button"
          data-postman-action="collection/import"
          data-postman-var-1="e85152dc6106ea218fae"></div>
      </div>
      <Map users={users} fill={fill}/>
      </div>
    )
  }
}

export default Admin;
