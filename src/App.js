import React, { Component } from "react";
import axios from "axios";

import "./App.css";

class App extends Component {
  state = {
    originalUrl: "",
    arrayLinks: [],
    isLoaded: false
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        "https://short-url-max-gavanon.herokuapp.com/api/links"
      );
      this.setState({ arrayLinks: response.data, isLoaded: true });
    } catch (error) {
      alert(error);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="headerTop">
          <div className="centerMain">
            <div className="title-div">
              <h1> Simplify your links</h1>
            </div>
            <div>
              <form className="input-form">
                <input
                  className="form-control formleft"
                  type="text"
                  placeholder="Votre URL à raccourcir - avec http préfixe"
                  value={this.state.originalUrl}
                  onChange={e => this.setState({ originalUrl: e.target.value })}
                />

                <input
                  className="btn-default formright"
                  value="SHORTEN URL"
                  type="button"
                  onClick={() =>
                    axios.post(
                      "https://short-url-max-gavanon.herokuapp.com/api/shorten",
                      { originalUrl: this.state.originalUrl }
                    )
                  }
                />
              </form>
            </div>
          </div>
        </div>
        <div className="bodyMain">
          <div className="centerMain">
            <ul className="list-group list-group-flush">
              <li className="linklist list-group-item grey">
                <strong> Lien d'origine</strong>
                <strong> Lien raccourci</strong>
              </li>
              {this.state.arrayLinks.map((link, index) => {
                return (
                  <li key={index} className="linklist list-group-item">
                    <div> {link.originalUrl} </div>
                    <div> {link.shortUrl} </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
