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
export default function DeliveryHoverRating(props) {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback1"
        value={value}
        precision={1}
        onChange={(event, newValue) => {
          setValue(newValue);
          const data = props.pastOrder;
          data.rating = newValue;
          axios({
            method: 'POST',
            url: `http://localhost:8080/api/deliveryusers/ratedelivery`,
            data: data
          })
          .then((response) => {
           })
         .catch((error) => console.log(error));
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
    </div>
  );
}