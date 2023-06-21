import axios from 'axios';
import React from 'react';
import Deliveryaddress from './Deliveryaddress';
import CartDetails from './CartDetails';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
	return {
		selectedDish: state.selectedDish.selectedDish
	}
}

class Cart extends React.Component{
  constructor(props){

    super(props);
    this.state={
      selectedDish: this.props.selectedDish,
      coupon:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    console.log(event.target.value);
    this.setState({
      coupon : event.target.value
    })
  }

  handleSubmit(event){
      event.preventDefault();
  }

  render(){
    console.log(this.state.selectedDish);
    if(this.state.selectedDish.dishes){
      return(
        <div className="container justify-content-center mt-3 bg-light  h-100" style={{ fontFamily: 'poppins'}}>
          <div className="row justify-content-center border-left">
            {/* <marquee><h5>Apply coupon <span className="text-success">FIRST</span> to get 10% discount on your first order! </h5></marquee> */}
          </div>
          <div className="row justify-content-center">
          <div className="col-8 mr-md-5 mt-1 ">

                <CartDetails details={this.state.selectedDish} coupon={this.state.coupon}></CartDetails>

            </div>

            <div className="col mt-5  ">
              < Deliveryaddress data={this.state.selectedDish}/>
              <div className="card border border-dark mt-5">
              <div className="card-body">
                 <h5 className="card-title float-left"><h5>Apply coupon <span className="text-success">FIRST</span> to get 10% discount on your order! </h5> </h5><br/>
              </div>
            </div>
              <form className="mt-5">
                <input type="text" name="name" value={this.state.coupon} onChange={this.handleChange}/><br/>
                <button type="button" class="btn btn-success"> Apply </button>
              </form>
            </div>

          </div>
      </div>
      )
    }else{
      return(
        <div className="container justify-content-center mt-3 bg-light " style={{fontFamily:'Poppins, sans-serif'}}>
          <div className="row justify-content-center border-left">
            {/* <marquee><h5>Apply coupon <span className="text-success">FIRST</span> to get 10% discount on your first order! </h5></marquee> */}
          </div>
          <div className="row justify-content-center">
          <div className="col mr-md-5 mt-1 ">

                <CartDetails details={this.state.selectedDish} coupon={this.state.coupon}></CartDetails>

            </div>
          </div>
      </div>
      )
    }


}

}
export default withRouter(connect(mapStateToProps)(Cart));