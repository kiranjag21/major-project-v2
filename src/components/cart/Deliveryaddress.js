import React from 'react';

class Deliveryaddress extends React.Component{
  constructor(props){
    super(props);
    this.state={
      userDetails:this.props.data,
      address:null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({address: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
  }

  render(){
      console.log(this.state.address);
      if(this.state.address==null){
        return(
          <div>

            <h3 className="font-italic">Delivery Address</h3>

            <form onSubmit={this.handleSubmit}>
              <label>
                Add Address:<br/>
                <textarea value={this.state.address} onChange={this.handleChange} />
              </label>
            </form>
              <div className="card border border-dark">
                <div className="card-body">
                   <h5 className="card-title float-left"> Delivering To: </h5><br/>
                  <span className="card-text float-left"><h6>{this.state.userDetails.username}</h6>,{this.state.userDetails.userAddress}</span>
                </div>
              </div>

          </div>
        )
      }else{
        return(
          <div>

            <h3 className="font-italic">Delivery Address</h3>
            <form onSubmit={this.handleSubmit}>
              <label>
                Add Address:<br/>
                <textarea value={this.state.address} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
              <div className="card border border-dark">
                <div className="card-body">
                   <h5 className="card-title float-left"> Delivering To: </h5><br/>
                  <span className="card-text float-left"><h6>{this.state.userDetails.username}</h6>,{this.state.address}</span>
                  {/* <span  className="card-text align-text-right  float-right">{this.state.userDetails.userAddress}</span> */}
                </div>
              </div>

          </div>
        )
      }




  }
}
export default Deliveryaddress;