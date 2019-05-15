import React from 'react';
import './ObjectProps.css';
import {CompactPicker} from 'react-color';

class ObjectProps extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.selectedItem.name,
      displayFillPicker: false,
      displayStrokePicker: false,
      defaultColor: "#999"
    }
  }

  onFillPickerShow = () => {
    this.setState({displayFillPicker: true});
  };

  onStrokePickerShow = () => {
    this.setState({displayStrokePicker: true});
  };

  onFillPickerChanged = color => {
    this.setState({
      displayFillPicker: false
    })
    this.props.fillColorChange(color.hex);
  };

  onStrokePickerChanged = color => {
    this.setState({
      displayStrokePicker: false
    })
    this.props.strokeColorChange(color.hex);
  };

  
  render() {
    return( 
    <div className="object-props pane">
      <div className="object-pane-header">
        <h1 className="display-4 figure-header">Modify a figure</h1>
        <h2>You are currently modifing {this.props.selectedItem.name}</h2>
      </div>
      <div className="scrollable-config">
        <div className="object-prop-control-no-marg">
          <p><strong>Figure name:</strong>
          <div className="input-group mb-3 object-prop-control">
            <input typeName="text" className="form-control" 
                    placeholder={this.props.selectedItem.name} 
                    aria-label="Recipient's username" aria-describedby="basic-addon2"
                    onKeyUp={(e) => this.props.nameChange(e, "")}
                    onBlur={(e) => {
                      this.setState({name: e.target.value});
                      e.target.value = "";
                    }} />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={(e) => this.props.nameChange(e, this.state.name)}>Save</button>
            </div>
          </div>
          </p>
        </div>

        <p><strong>Figure type:</strong>
        <div className="form-group object-prop-control">
          <select className="form-control object-prop-control"  value={this.props.selectedItem.type} onChange={(e) => this.props.typeChange(e)}>
            <option>Circle</option>
            <option>Square</option>
            <option>Polygon</option>
          </select>
        </div>
        </p>

        <p><strong>X position:</strong></p>
        <input type="range" className="slider" onChange={(e) => this.props.xChange(e)} value={this.props.selectedItem.x}/>
        <p>X set to: {this.props.selectedItem.x}</p>

        <p><strong>Y position:</strong></p>
        <input type="range" className="slider" onChange={(e) => this.props.yChange(e)} value={this.props.selectedItem.y}/>
        <p>Y set to: {this.props.selectedItem.y}</p>

        <p><strong>Opacity:</strong></p>
        <input type="range" className="slider" onChange={(e) => this.props.opacityChange(e)} value={this.props.selectedItem.opacity} max="1" step="0.01"/>
        <p>Opacity set to: {this.props.selectedItem.opacity}</p>

        <p><strong>Fill color:</strong>
        <div className="object-prop-control">
          <div className="input-group mb-3">
            <input type="text" 
                  onClick={() => this.onFillPickerShow()} 
                  value={this.props.selectedItem.fillColor}
                  className="form-control"
                  style={{backgroundColor: this.props.selectedItem.fillColor}}/>
            {this.state.displayFillPicker && <CompactPicker onChange={this.onFillPickerChanged}/>}
          </div>
        </div>
        </p>

        <p><strong>Stroke color:</strong>
        <div className="object-prop-control">
          <div className="input-group mb-3">
            <input type="text" 
                  onClick={() => this.onStrokePickerShow()} 
                  value={this.props.selectedItem.strokeColor}
                  className="form-control"
                  style={{backgroundColor: this.props.selectedItem.strokeColor}}/>
            {this.state.displayStrokePicker && <CompactPicker onChange={this.onStrokePickerChanged}/>}
          </div>
        </div>
        </p>
        
        </div>
    </div>
    );
  }
}


  export default ObjectProps;