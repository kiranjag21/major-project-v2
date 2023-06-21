import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import ReceiptIcon from '@material-ui/icons/Receipt';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import HoverRating from './Rate';
import OrderTable from './OrderTable';
import BillTable from './Bill';
import ShowRating from './showRating';
import DeliveryHoverRating from './PostDeliveryRate';
import ShowDeliveryRating from './ShowDeliveryRate';
import { Grid } from '@material-ui/core';
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ViewOrder(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div maxwidth="sm" style={{ width:"100%", margin: '2%'}} >
      <Grid
         container
         direction="row"
         justify="center"
         alignItems="center"
      >
        <Button style={{backgroundColor:'#c3073f',color:'black',fontWeight: 'bold'}} fullWidth variant="contained" size="medium" onClick={handleClickOpen}>
          <Typography style={{color:"#e7e8e8", textDecoration: 'none'}} align="center"><ReceiptIcon/>View</Typography>
        </Button>
      </Grid>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography style={{fontFamily:"Poppins, sans-serif"}} variant="p" align="center" color="textPrimary" paragraph>
            {props.pastOrder.restName}
          </Typography>
        </DialogTitle>
          <DialogContent dividers>
          <Typography style={{fontFamily:"Poppins, sans-serif"}} variant="p" align="center" color="textSecondary" paragraph>
            Rate Restaurant :
          </Typography>
              <HoverRating restId = {props.pastOrder.restId} />
        </DialogContent>
        <DialogContent>
          <Typography style={{fontFamily:"Poppins, sans-serif"}} variant="p" align="center" color="textSecondary" paragraph>
            Past Rating:
          </Typography>
          <ShowRating restId={props.pastOrder.restId}/>
        </DialogContent>
        <DialogContent dividers>
          <Typography style={{fontFamily:"Poppins, sans-serif"}} variant="p" align="center" color="textSecondary" paragraph>
            Rate {props.pastOrder.deliveryUserName}'s service
          </Typography>
          <DeliveryHoverRating pastOrder={props.pastOrder}/>
        </DialogContent>

        <DialogContent dividers>
          <Typography style={{fontFamily:"Poppins, sans-serif"}} variant="p" align="center" color="textSecondary" paragraph>
          {props.pastOrder.deliveryUserName}'s past rating:
          </Typography>
          <ShowDeliveryRating restId={props.pastOrder.restId}/>
        </DialogContent>
        <DialogContent dividers>
            <Typography style={{fontFamily:"Poppins, sans-serif"}} align="center" variant="h5" gutterBottom>
                Your Order
            </Typography>
            <Typography style={{fontFamily:"Poppins, sans-serif"}} gutterBottom>
                <OrderTable dishes={JSON.parse(props.pastOrder.dishes)}/>
            </Typography>
            <Typography style={{fontFamily:"Poppins, sans-serif"}} gutterBottom>
               <BillTable total={props.pastOrder.total}/> 
            </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}