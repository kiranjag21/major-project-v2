import React from 'react';
import NumericInput from 'react-numeric-input';
import { changeQuantity } from '../redux/reduxActions';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Link as LinkRoute, } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    selectedDish: state.selectedDish
  }
}
const mapDispatchToProps = (dispatch) => ({
  changeQuantity: (id, quantity) => dispatch(changeQuantity(id, quantity))
});
class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props,
      quantity: this.props.product.quantity,
      id: this.props.product.dishId
    };
  }
  changeQuantity = value => {
    // console.log(value);
    // console.log(this.state.id);
    this.setState({ quantity: value });
    this.props.changeQuantity(this.state.id, value)

  }
  render() {

    const { product } = this.props;


    return (
      <>
        <div className="card border border-dark" style={{}}>
          <div className="card-body">
            <div className="col">
              <h4 className="card-title text-left ">{product.dishName}</h4>
              <h5 className="card-text text-left "><small>price: </small>{'\u20B9'}{product.price}</h5>
            </div>
            <div className="col mb-5">
              <h6 className="card-text text-success text-left mt-2  "><small className="text-left">Quantity: </small><NumericInput size={2} min={1} max={100} value={this.state.quantity} onChange={this.changeQuantity} /></h6>
              <button className="btn btn-sm btn-warning float-right" onClick={() => this.props.remove(product)}>Remove from cart</button>
            </div>
          </div>
        </div>

        {/* { product.length ? <div><h4><small>Total :</small><span className="float-right text-primary">{'\u20B9'}product.price *</span></h4><hr/></div>: ''} */}
      </>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartItem));