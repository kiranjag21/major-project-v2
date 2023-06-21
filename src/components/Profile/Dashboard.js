import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ViewOrder from './ViewOrderModal';
import axios from 'axios';
import HeroUnit from './Hero';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%'
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
   const [myPastOrders, setData] = useState([]);
  useEffect(()=>{
    const fetchRestaurants = async () => {
      try{
        const response = await axios.get(`${process.env.BASE_API_URL}/api/restaurants/profile/${JSON.parse(localStorage.getItem('login')).userId}`);
        setData(response.data);
      } catch(e){
        throw e;
      }
    };
    fetchRestaurants();
  },[])
  return (
    <React.Fragment>
      <main>
        <HeroUnit/>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {myPastOrders.map((order) => (
              <Grid item key={order} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom style={{fontFamily:"Poppins, sans-serif"}} variant="h5" component="h2">
                      {order.restName}
                    </Typography><hr></hr>
                    <Typography style={{fontFamily:"Poppins, sans-serif"}} variant="p" align="center" color="textSecondary" paragraph>
                      ORDER NUMBER
                    </Typography>
                    <Typography style={{fontFamily:"cursive"}} variant="p" align="center" color="textPrimary" paragraph>
                      {order.orderId}
                    </Typography>
                    <Typography  style={{fontFamily:"Poppins, sans-serif"}} variant="p" align="center" color="textSecondary" paragraph>
                      TOTAL AMOUNT
                    </Typography>
                    <Typography style={{fontFamily:"cursive"}} variant="p" align="center" color="textPrimary" paragraph>
                      &#8377;{order.total}
                    </Typography>                
                  </CardContent>
                  <CardActions>
                    <ViewOrder pastOrder = {order}/>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    
    </React.Fragment>
  );
}