import React, { Component } from "react";

import "./App.css";

class App extends Component {
  state = {
    originalUrl: "",
    arrayLinks: [],
    isLoaded: false
  };

  // async componentDidMount() {
  //   try {
  //     const response = await axios.get(
  //       "https://short-url-max-gavanon.herokuapp.com/api/links"
  //     );
  //     this.setState({ arrayLinks: response.data, isLoaded: true });
  //   } catch (error) {
  //     alert(error);
  //   }
  // }

  render() {
    return (
      <div className="App">
        <div className="four-main">
          <div className="left-col">
            <div className="main-boxes">
              <h1>Users</h1>
            </div>
            <div className="main-boxes">
              <h1>New User</h1>
            </div>
          </div>
          <div className="right-col">
            <div className="main-boxes">
              <h1>New User</h1>
            </div>
            <div className="main-boxes">
              <h1>New User</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
