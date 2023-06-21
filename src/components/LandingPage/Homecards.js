import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState,useEffect} from "react";
import Rating from '@material-ui/lab/Rating';
import { Link} from "react-router-dom";
import Search from './Home/search'
import axios from 'axios';

const RESTAURANT_DB_URL = `${process.env.BASE_API_URL}/api/restaurants`;
const useStyles = makeStyles((theme) => ({
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
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    fontFamily:'poppins'
  },
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  }
}));


export default function Album() {
  const classes = useStyles();



    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(()=>{
      axios
      .get(
        `${process.env.BASE_API_URL}/api/restaurants/`
      )
      .then(res => {
      
        setData(res.data);
      })
      .catch(error => {
       throw error
      });
  }, []);

  const searchHandler = value => {
    setSearchValue(value);
  };

  let restaurant = data.filter(item => {
    return item.restName.toLowerCase().includes(searchValue);
  }, []);

  return (


    <React.Fragment>
    

      <main>
      <Search searchHandler={searchHandler} />
      <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>

          

            {(searchValue === '' ? data : restaurant).map(data => (
              <Grid item key={data} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={data.imageAddress}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" align="left" component="h2" style={{fontFamily:'poppins'}}>
                    {data.restName}
                    </Typography>
                    <Typography variant="p" align="left" color="textPrimary" paragraph>
                        <div className={classes.root}>
                          <Rating
                            name="get-feedback"
                            value={data.rating}
                            precision={1}
                            readOnly
                          />
                        </div>
                    </Typography>
                    <Typography variant="p" align="left" color="textSecondary" paragraph>
                    {data.restAddress}
                    </Typography>

                   
                  </CardContent>
                  <CardActions>
                    <Button size="medium" variant="contained"  style={{backgroundColor:'#c3073f',color:'black',fontWeight: 'bold', margin:'auto',paddingLeft:'30px',paddingRight:'30px'}}>
                    <Link to={`/menu/${data.restId}`}  style={{color:"white", textDecoration: 'none'}}>Order Now</Link>
                    </Button>
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
