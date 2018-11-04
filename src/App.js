import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'Simple React CRUD',
      action: 0,
      index: '',
      datas: []
    }
  }


  componentDidMount() {
    this.refs.name.focus();
  }

  submit = (e) => {
    e.preventDefault();

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let description = this.refs.description.value;

    if(this.state.action === 0) {
      let data = {
        name, description
      }

      datas.push(data);

    } else {
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = description;
    }

    this.setState({
      datas: datas
    })

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  remove = (i) => {
    let datas = this.state.datas;
    datas.splice(i, 1);

    this.setState({datas: datas});

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  edit = (i) => {
    let data = this.state.datas[i];

    this.refs.name.value = data.name;
    this.refs.description.value = data.description;

    this.setState({
      action: 1,
      index: i
    })

    this.refs.name.focus();
  }


  render() {
    let datas = this.state.datas;

    return (
      <div className="App">
      
        <h1>{this.state.title}</h1>

        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="Name" className="formField"></input>
          <input type="text" ref="description" placeholder="Description" className="formField"></input>
          <button onClick={(e) => this.submit(e)} className="myButton">Add</button>
        </form>

        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i+1}.{data.name} - {data.description}
              <button onClick={() => this.remove(i)} className="myListButton">Remove</button>
              <button onClick={() => this.edit(i)} className="myListButton">Edit</button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
