import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    marginLeft: '33%'
  },
});

export default function ShowDeliveryRating(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    axios.get(`http://localhost:8080/api/restaurants/rating/${props.restId}`)
        .then((rating)=>{
            setValue(rating.data.ratings)
        });
    return (
        
        <div className={classes.root}>
            <Rating
            name="get-feedback"
            value={value}
            precision={1}
            readOnly
        />
        </div>
       
    )
  
}