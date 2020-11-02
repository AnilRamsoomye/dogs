import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: null,
      isLoaded: false,
      items: [],
      allImageLinks: [],
      usedImageLinks: []
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.images = this.images.bind(this);
    this.setImageLinks = this.setImageLinks.bind(this);
  }

  componentDidMount() {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.message
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if (this.state.value.split(" ").length == 1 && this.state.value.toLowerCase() in this.state.items) {
      fetch("https://dog.ceo/api/breed/"+ this.state.value.toLowerCase() + "/images")
      .then(res => res.json())
      .then(
        (result) => {
          this.setImageLinks(result);

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
    else if( this.state.value.split(" ").length == 2 ) {
      var breed = this.state.value.toLowerCase().split(" ");
      if (this.state.items[breed[1]] != null && this.state.items[breed[1]].includes(breed[0])) {
        fetch("https://dog.ceo/api/breed/"+ breed[1] + "/"+ breed[0] + "/images")
      .then(res => res.json())
      .then(
        (result) => {
          this.setImageLinks(result);

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      }
    }
    else {
      this.setState({ usedImageLinks: [], allImageLinks: []});
    }
    event.preventDefault();
  }

  setImageLinks(result) {
    var joined = [];
    for (var i = 0; i < 9; i ++) {
      var random = result.message[Math.floor(Math.random()*result.message.length)];
      joined.push(random)
    }
    this.setState({ usedImageLinks: joined,
      isLoaded: true,
      allImageLinks: result.message
     });
  }
  images() {
    if (!(this.state.usedImageLinks.length == 0)) {
      return (
        <table>
          <tr>
            <td><img src = {this.state.usedImageLinks[0]} alt = ""></img></td>
            <td><img src = {this.state.usedImageLinks[1]} alt = ""></img></td>
            <td><img src = {this.state.usedImageLinks[2]} alt = ""></img></td>
            </tr>
            <tr>
            <td><img src = {this.state.usedImageLinks[3]} alt = ""></img></td>
            <td><img src = {this.state.usedImageLinks[4]} alt = ""></img></td>
            <td><img src = {this.state.usedImageLinks[5]} alt = ""></img></td>
            </tr>
            <tr>
            <td><img src = {this.state.usedImageLinks[6]} alt = ""></img></td>
            <td><img src = {this.state.usedImageLinks[7]} alt = ""></img></td>
            <td><img src = {this.state.usedImageLinks[8]} alt = ""></img></td>
            </tr>

          </table>
      );
    }
    return (<div><label>No Breed Selected Yet!</label></div>);
  }

  render() {
    return (
      <div id= "main">
        <body>
        <header>Start Looking At Cute Dogs</header>
      <form onSubmit={this.handleSubmit}>
        <label>
          Breed Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form> <label>If entering a sub-breed format is sub-breed breed, i.e. afghan hound </label>
      {this.images()}
      </body>
      </div>
    
    );
  }
}


