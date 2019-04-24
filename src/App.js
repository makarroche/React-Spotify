import React, { Component } from "react";
import ReactDOM from 'react-dom';
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes} from "./config";
import hash from "./hash";
import Player from "./Player";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      query: '',
      tracks: {
	       items: [{
	       	album: {
		       images: [{ url: "default" }],
		       
		    },
		    artists: [{
		       name: "",
		       
		    }],
		    name: "",
		    length: "",
	  	   }],
  	  },
    };

    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.search_track = this.search_track.bind(this);
    
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }
  }

  search_track(token) {
    // Make Spotify call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/search?q="+this.state.query+"&type=track",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        console.log("data", data);
        this.setState({
         tracks: data.tracks
        });
      }
    });
  }

  handleQueryChange(event) {
    this.setState({query: event.target.value});
    console.log("query: " + this.state.query);
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
       	  <h1>Track Finder</h1>
          <img src={logo} className="App-logo" alt="logo" />

          {!this.state.token && (
          	<div>
	      		<form>
				    <label>
					  <a className="btn btn--loginApp-link"
			          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
			          >
			          	Login to Spotify
			   	 	  </a>
				    </label>	
	  			</form>  	
          	</div>
          )}

          {this.state.token &&(
          	<div>
	          	<button className="btn btn--loginApp-link" onClick={() => this.search_track(this.state.token)}>
		          	Search
				</button>
				<input type="text" placeholder = "Type track name" value={this.state.query} onChange={this.handleQueryChange} />
	          	<Player
	             tracks={this.state.tracks}
	            />
            </div> 
          )}
        </header>
      </div>
    );
  }
}

export default App;