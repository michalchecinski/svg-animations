import React from 'react';
import ObjectList from "./ObjectList";
import './ObjectPane.css';

class ObjectsPane extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      objects: props.objects,
      selected: undefined 
    };

    this.trasnportObjectToParent = this.trasnportObjectToParent.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
  }

  onClickAdd(event) {
    let newObjects = this.state.objects;
    let num = newObjects.length+1;
    newObjects.push({name: "Figure "+ num});
    this.setState({ objects : newObjects});
    event.preventDefault();
  }

  trasnportObjectToParent(obj){
    this.props.selectItem(obj);
  }

    render() {
      return <div className="Object-Pane Pane">
        <h1>This is components pane</h1>
        <button onClick={this.onClickAdd}>Add object</button>
        <ObjectList objects={this.state.objects} selectItem={this.trasnportObjectToParent} />
      </div>
    }
  }

  export default ObjectsPane;