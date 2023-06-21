import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { addItems } from '../redux/reduxActions';
import { connect } from 'react-redux';
import { withRouter, Link as LinkRoute,  } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import {Switch} from '@material-ui/core';
import './menu.css';
import RoomIcon from '@material-ui/icons/Room';
import Use from './menu.style';
const mapStateToProps = state => {
	return {
		selectedDish: state.selectedDish
	}
}
const mapDispatchToProps = (dispatch) => ({
    addItems: (data) => dispatch(addItems(data))
});
 const styles =
{
  media: {
  height: 0,
  paddingTop: '56.25%', 
  marginTop:'30'
} };
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      menu2: [],
      menuSearch:[],
      active:'false',
      inputValue:'',
      total: 0,
      selectedDish: {
        restId: this.props.restId,
        userId: JSON.parse(localStorage.getItem('login')).userId,
        username: JSON.parse(localStorage.getItem('login')).username,
        userAddress: JSON.parse(localStorage.getItem('login')).address,
        dishes: [
        ],
       }
     }
  };
componentDidMount() {
  axios.get(`http://localhost:8080/api/restaurants/findDish/${this.props.restId}`)
    .then(res => {
      const menu = res.data;
      axios({
        method: 'GET',
        url: `http://localhost:8080/api/restaurants/${this.props.restId}`,
      })
      .then((response) => {
          this.setState({
            menu,
            menu2: menu,
            selectedDish: {
              ...this.state.selectedDish,
              restName: response.data.restName,
              restAddress: response.data.restAddress,
              imageAddress:response.data.imageAddress
        } ,isLoading: false
        });
      })
      .catch((error) => console.log(error))
    })
}
addValue(id, name, price, restId, evt)
{
  evt.preventDefault();
  let quantity=0;
  let dish = [...this.state.selectedDish.dishes];
  const updatedItemIndex = dish.findIndex(
    dish=> dish.dishId === id
  );
  if (updatedItemIndex < 0) {
    dish.push({
      dishName: name,
      dishId: id,
      price: price,
      restId: restId,
      quantity: quantity+1,
      total:this.state.total,
    });
  }
  else {
  let dishToAdd=dish.find((item)=>item.dishId==id);
  let dishes=dish.filter((item)=>item.dishId!=id);
  dishToAdd.quantity+=1;
  dishes.push(dishToAdd);
  }
  this.setState(prevState => {
    let selectedDish = { ...prevState.selectedDish }
    selectedDish.dishes = dish;
    return { selectedDish };
  });
}

deleteTask(taskToDelete) {
  const tasks = [...this.state.selectedDish.dishes];
  const indexOfTaskToDelete = tasks.findIndex(
    task => task.dishName === taskToDelete
  );
  tasks.splice(indexOfTaskToDelete, 1);
  this.setState(prevState => {
    let selectedDish = { ...prevState.selectedDish }
    selectedDish.dishes = tasks;
    return { selectedDish };
  })
}
category=(event)=>{
  console.log('switch: ',event.target.checked )
  if(event.target.checked) {
    this.state.menu.filter((item)=>item.category=="Veg");
    this.setState({menu:this.state.menu.filter((item)=>item.category=="Veg")})
  }
  else {
    this.setState({
      menu: this.state.menu2
    })
  }
}

handleContinue = () => {
  this.props.addItems(this.state.selectedDish);
}

onChangeHandler(e) {
  const search = [...this.state.menu];
  let newArray = search.filter(d => {
  let searchValue = d.dishName.toLowerCase();
    return searchValue.indexOf(e.target.value) !== -1;
  });
  this.setState({
    menuSearch: newArray,
    inputValue: e.target.value
  });
}

render() {
let total=0
  for(let i=0;i<this.state.selectedDish.dishes.length;i++){
   let total1=parseInt(this.state.selectedDish.dishes[i].price) * parseInt(this.state.selectedDish.dishes[i].quantity);
    total=total+total1;
  }
  const classes = Use;
  return (
  <React.Fragment>
  <div className={classes.heroContent}>
    <Container maxWidth="md">
      <div class="container">
        <div class="row">
           <div class="col-4">
              <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={this.state.selectedDish.imageAddress}
                    title="Image title"
                    style={styles.media}
                   />
              </Card> </div>
            <div class="col-8">
             <Typography style={{fontFamily:"Poppins, sans-serif",maxWidth:'md'}} variant="h4" align="center" color="textPrimary" gutterBottom>
                {this.state.selectedDish.restName}
              </Typography>
              <Typography style={{fontFamily:"Poppins, sans-serif"}} variant="p" align="center" color="textSecondary" paragraph>
                <RoomIcon/>
                  {this.state.selectedDish.restAddress}
               </Typography>
               </div>
          </div>
        </div>
    </Container>
    </div><br/>
    <div className="container" style={{marginLeft:"3.2%" ,fontFamily:'poppins'}}>
        <input class="searchbox"
         style={{marginRight:'1%'}}
          type="text"
          value={this.state.inputValue}
          placeholder="Search by Dish Name..."
          onChange={this.onChangeHandler.bind(this)}
        />
        <span style={{fontFamily:'poppins'}}>Veg<Switch
            color="primary"
            onChange={this.category}
        /></span></div>
         <br></br>
  <div class="container">
     <div class="row">
      <div class="col-lg-8 col-sm-12">
         <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
                   { ( this.state.inputValue=== '' ? this.state.menu : this.state.menuSearch).map(
                        menu => (  
                       <Grid item key={menu.dishId} xs={12} sm={6} md={4}>
                       <Card className={classes.card} id="card1">
                       <CardMedia
                        className={classes.cardMedia}
                        image={menu.imageAddress}
                        title="Image title"
                        style={styles.media}
                      />
                     <CardContent className={classes.cardContent}>
                     <Typography  variant="h6" align="left" paragraph  style={{fontFamily:'poppins'}}>
                      {menu.dishName}
                     </Typography>
                     <Typography  variant="h6" align="left" paragraph  style={{fontFamily:'poppins'}}>
                      {menu.category}
                     </Typography>
                     <Typography variant="p" align="left" color="textPrimary" paragraph>
                        <div className={classes.root}>
                          <Rating
                            name="get-feedback"
                            value={menu.rating}
                            precision={1}
                            readOnly
                          />
                        </div>
                    </Typography>
                    <Typography variant="h6" align="left" color="textPrimary" paragraph style={{fontFamily:'poppins'}}>
                    {'\u20B9'}.{menu.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <div class="col-md-12 center-block">
                    <Button class="btn btn-success" id="card1" size="small" variant="outlined" align="center" style={{fontFamily:'poppins'}} onClick={this.addValue.bind(this, menu.dishId, menu.dishName, menu.price, menu.restId)}>
                     Add to Cart
                    </Button>
                    </div>
                   </CardActions>
                </Card>
              </Grid>
               ))}
          </Grid>
        </Container><br/>
      </div>
      
     <div className="col-lg-4 col-sm-12" style={{fontFamily:'poppins'}} >
      <div>
        <h3 style={{border:'1px solid black',borderRadius:'4px'}}>Order placed</h3>
      </div>
        <table className="table table-striped table-responsive table-bordered">
           <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>quantity</th>
             </tr>
          </thead>
          <tbody>
            {this.state.selectedDish.dishes.map((user, index) =>
            (
              <tr className="table_row" key={index}>
                <td>{user.dishName}</td>
                <td>{user.price}</td>
                <td>{user.quantity}</td>
                <td> <Button size="small" variant="outlined" color="secondary" onClick={this.deleteTask.bind(this,user.dishName)}>
                      Remove
                    </Button>	
                </td>
              </tr>
            )
            )}
          </tbody>
        </table>
        <hr/>
        <h4><small>Total Amount:</small><span className="float-right text-primary">{'\u20B9'}.{total}</span></h4><hr/>
        <LinkRoute to={'/cart'}><button className="btn btn-success" onClick={this.handleContinue}>Continue</button></LinkRoute> 
      
    </div>

      </div>
      </div>
    </React.Fragment>
  )
}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));