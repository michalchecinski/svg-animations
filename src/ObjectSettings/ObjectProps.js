import React from 'react';
import './ObjectProps.css';
import { CircleSettings, SquareSettings, PolygonSettings } from './ShapeSettings';
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
    this.props.functions.generalFunctions.fillColorChange(color.hex);
  };

  onStrokePickerChanged = color => {
    this.setState({
      displayStrokePicker: false
    })
    this.props.functions.generalFunctions.strokeColorChange(color.hex);
  };

  renderBasedOnType = () => {
    switch(this.props.selectedItem.type){
      case "Circle":
        return(
          <CircleSettings
            diameterChange={this.props.functions.circleFunctions.diameterChange}
            selectedItem={this.props.selectedItem}/>
        );
      case "Square":
        return(
          <SquareSettings
            sizeChange={this.props.functions.squareFunctions.sizeChange}
            selectedItem={this.props.selectedItem} />
        );
      default:
        return(
          <PolygonSettings
            functions={this.props.functions.polygonFunctions}
            selectedItem={this.props.selectedItem} />
        );
    }
  };

  render() {
    return(
      <div className="scrollable-config pl-5">
        <div className="object-prop-control-no-marg">
          <p><strong>Figure name:</strong></p>
          <div className="input-group mb-3 object-prop-control">
            <input className="form-control" placeholder={this.props.selectedItem.name}
                    aria-label="Recipient's username" aria-describedby="basic-addon2"
                    onKeyUp={(e) => this.props.functions.generalFunctions.nameChange(e, "")}
                    onBlur={(e) => {
                      this.setState({name: e.target.value});
                      e.target.value = "";
                    }} />
            <div>
              <button className="btn btn-primary" onClick={(e) => this.props.functions.generalFunctions.nameChange(e, this.state.name)}>Save</button>
            </div>
          </div>
        </div>

        <p><strong>Figure type:</strong></p>
        <div className="form-group object-prop-control">
          <select className="form-control object-prop-control"  value={this.props.selectedItem.type} onChange={(e) => this.props.functions.generalFunctions.typeChange(e)}>
            <option>Circle</option>
            <option>Square</option>
            <option>Polygon</option>
          </select>
        </div>
  

        <p><strong>X position:</strong></p>
        <input type="range" className="slider" onChange={(e) => this.props.functions.generalFunctions.xChange(e)} value={this.props.selectedItem.x}/>
        <p>X set to: {this.props.selectedItem.x}</p>

        <p><strong>Y position:</strong></p>
        <input type="range" className="slider" max="80" onChange={(e) => this.props.functions.generalFunctions.yChange(e)} value={this.props.selectedItem.y}/>
        <p>Y set to: {this.props.selectedItem.y}</p>

        <p><strong>Opacity:</strong></p>
        <input type="range" className="slider" onChange={(e) => this.props.functions.generalFunctions.opacityChange(e)} value={this.props.selectedItem.opacity} max="1" step="0.01"/>
        <p>Opacity set to: {this.props.selectedItem.opacity}</p>

        <p><strong>Fill color:</strong></p>
        <div className="object-prop-control">
          <div className="input-group mb-3">
            <input type="text" onClick={() => this.onFillPickerShow()}
                  value={this.props.selectedItem.fillColor}
                  className="form-control"
                  style={{backgroundColor: this.props.selectedItem.fillColor}} readOnly/>
            {this.state.displayFillPicker && <CompactPicker onChange={this.onFillPickerChanged}/>}
          </div>
        </div>

        <p><strong>Stroke color:</strong></p>
        <div className="object-prop-control">
          <div className="input-group mb-3">
            <input type="text" onClick={() => this.onStrokePickerShow()}
                  value={this.props.selectedItem.strokeColor}
                  className="form-control"
                  style={{backgroundColor: this.props.selectedItem.strokeColor}} readOnly/>
            {this.state.displayStrokePicker && <CompactPicker onChange={this.onStrokePickerChanged}/>}
          </div>
        </div>

        {this.renderBasedOnType()}

        </div>
    );
  }
}

export default ObjectProps;