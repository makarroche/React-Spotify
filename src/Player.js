import React from "react";
import "./Player.css";

const Player = props => {
  let results;
  return (

    results = Object.keys(props.tracks.items).map((type) => {
      //console.log(props.tracks.items[type].album.images[0].url)
      //console.log(props.tracks.items[type].name)
      //console.log(props.tracks.items[type].artists[0].name)
      return (
        <div className="main-wrapper" key={props.tracks.items[type].name + props.tracks.items[type].artists[0].name}>
          <div className="track__img">
            <img alt = "" src={props.tracks.items[type].album.images[0].url}/>
          </div>
          <div className="track__side">
            <div className="track__name">
              {props.tracks.items[type].name}
            </div>
          </div>
          <div className="track__side">
            <div className="track__name">
              {props.tracks.items[type].artists[0].name}
            </div>
          </div>
        </div>
      )
    }),

    <div className="App">
      {results}
    </div>
  );
}

export default Player;