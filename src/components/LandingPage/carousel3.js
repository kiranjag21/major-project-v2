import React from "react";
import axios from 'axios';
import Carousel from "react-elastic-carousel";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import "./style.css";
import { CircularProgress } from "@material-ui/core";


const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

export default class TopDish extends React.Component{

  constructor(){
    super();
    this.state={
      restau:[],
      topRestaurants: [],
      isLoading: false
    }
  }
  componentDidMount(){

    this.setState({ isLoading: true });
    axios.get(`https://majorproject-server.onrender.com/api/deliveryusers/avgrating`)
    .then((res)=>{
      let data = res.data;
      if(data.length > 0 ) {
        let topRestaurantsSorted = data.sort((a, b) => (a.avgrate < b.avgrate) ? 1 : -1)
        this.setState({
          topRestaurants: topRestaurantsSorted,
          isLoading: false
        })
      }
    })
  }
  render(){

    return(
      <div style={{marginTop:"2%"}}>
        <h3 style={{'borderRadius':'4px','fontFamily':'Poppins, sans-serif','color':'#e7e8e8' ,'width':'90%','margin':'auto'}} > Top-Restaurants</h3><br/>
        <div className="top">

        {this.state.isLoading && <CircularProgress />}
        {!this.state.isLoading && <Carousel breakPoints={breakPoints}>
          {
            this.state.topRestaurants.map(rest => {
              return(
                <Container maxWidth="lg">
                  <Grid container spacing={2}>
                    <Card style={{width:'22rem',paddingLeft:'10px'}}>
                      <CardMedia
                        style={{    paddingTop: '56.25%',
                      }}
                      image={rest.imageAddress}
                      title="Image title"
                      />
                      <CardContent >
                        <Typography gutterBottom variant="h5" align="left" component="h2" style={{fontFamily:'poppins'}}>
                          {rest.restName}
                        </Typography>
                        <Typography variant="p" align="left" color="textPrimary" paragraph>
                        <div>
                          <Rating
                            name="get-feedback"
                            value={rest.avgrate}
                            precision={1}
                            readOnly
                          />
                        </div>
                        </Typography>
                        <CardActions>
                          <Button size="medium" variant="contained"  style={{backgroundColor:'#c3073f',color:'black',fontWeight: 'bold', margin:'auto',paddingLeft:'30px',paddingRight:'30px'}}>
                            <Link to={`/menu/${rest.restId}`}  style={{color:"#e7e8e8", textDecoration: 'none'}}>Order Now</Link>
                          </Button>
                        </CardActions>
                      </CardContent>
                    </Card>
                  </Grid>
                </Container>
              );
            })
          }
        </Carousel>}
      </div>
      </div>
    )
  }
}
