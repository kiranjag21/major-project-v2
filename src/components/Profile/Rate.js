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
export default function HoverRating(props) {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        onChange={(event, newValue) => {
          setValue(newValue);

          axios({
            method: 'POST',
            url: `https://majorproject-server.onrender.com/api/restaurants/rating/${props.restId}`,
            data: {
              userId: JSON.parse(localStorage.getItem('login')).userId,
              rating: newValue
            }
          })
          .then((response) => {
            
           })
         .catch((error) =>{throw error});
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
     
    </div>
  );
}