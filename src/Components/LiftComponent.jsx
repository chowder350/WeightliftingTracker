import React, {Component} from 'react'

class LiftComponent extends Component {
  constructor() {
    super()
    this.state = {
    
    }
  }


  render() {
      console.log(this.props)
    return (
        <>
        <h3>{this.props.title}</h3>
        <label>Sets: </label> <input style={{display:'inline-block'}} value={this.props.sets}/>
        <label>Reps: </label> <input style={{display:'inline-block'}} value={this.props.reps}/>
        <label>Weight: </label> <input style={{display:'inline-block'}} value={this.props.weight}/>
        <label>Notes: </label> <input style={{display:'inline-block'}} type="textbox" value={this.props.notes}/>
        </>
    )
  }
}

export default LiftComponent;