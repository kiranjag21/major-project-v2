import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
    marginLeft: '33%'
  },
});

export default function ShowRating(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/restaurants/rating/${props.restId}`)
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