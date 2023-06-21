import axios from 'axios';
import React from 'react';
//import icons from 'glyphicons'
import 'bootstrap/dist/css/bootstrap.css';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import { Route, Switch, withRouter, Link as LinkRoute, } from 'react-router-dom';
import { clearCart, removeItem } from '../redux/reduxActions';
import { connect } from 'react-redux';
const mapStateToProps = state => {
	return {
		selectedDish: state.selectedDish
	}
}
const mapDispatchToProps = (dispatch) => ({
	removeItem: (id) => dispatch(removeItem(id)),
	clearCart: () => dispatch(clearCart())
});
class CartDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orderDetails: this.props.details,
			newList: this.props.details.dishes,
		}
	}
	onRemoveProduct(id) {
		const newList = this.state.newList.filter((item) => item.dishId !== id);
		this.setState({ newList });
		console.log(id);
		this.props.removeItem(id);
	};
	clearCart = () => {
		this.setState({ newList: [] })
		this.props.clearCart();
	}

	handleCheckout = (total) => {
		let data = this.state.orderDetails;
		data.total = total;
		data.uniqueId = new Date().valueOf().toString();


		axios({
			method: 'POST',
			url: `https://majorproject-server.onrender.com/orders`,
			data: data
		})
			.then((response) => {
				console.log('from server: ', response);
				//this.props.removeLiveOrder(data);	
			})
			.catch((error) => console.log(error));


	}
	render() {
		let amountToPay = 0;
		if (this.state.newList == null) {
			return (<EmptyCart />);
		} else {
			let discount = 0;

			for (let i = 0; i < this.state.newList.length; i++) {
				amountToPay += this.state.newList[i].price * this.state.newList[i].quantity;
			}
			if (this.props.coupon.toLowerCase() == "first") {
				discount = amountToPay * 0.1;
				amountToPay = amountToPay - discount;
			}
			return (
				<>
					<div className=" container">
						{/* <div className="card" style="width: 18rem;"> */}
						<h4 className="card-title text-left font-italic">Cart</h4>

						<hr />
						{
							this.state.newList.map((product, index) => <CartItem product={product} remove={() => this.onRemoveProduct(product.dishId)} key={index} />)
						}
						<hr />
						<p className="text-right"><h6>Total         :  {amountToPay + discount}</h6></p>
						<p className="text-right"><h6>Discount      :  {discount}</h6></p>
						{this.state.newList.length ? <div><h4><small>Total Amount:</small><span className="float-right text-primary">{'\u20B9'}{amountToPay}</span></h4><hr /></div> : ''}

						{!this.state.newList.length ? <EmptyCart /> : <LinkRoute to="/tracking"><button className="btn btn-success float-right" onClick={() => this.handleCheckout(amountToPay)}>Checkout</button></LinkRoute>}
						{/* <Link to="/checkout"><button className="btn btn-success float-right">Checkout</button></Link> */}
						<button className="btn btn-danger float-right" onClick={this.clearCart} style={{ marginRight: "10px" }}>Clear Cart</button>
						<br /><br /><br />
						{/* </div> */}
					</div></>
			)
		}
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDetails));