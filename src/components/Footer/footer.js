import React from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from './footer.style';


import Link from '@material-ui/core/Link';

function Copyright() {
  const classes =useStyles();
    return (
      <Typography className={classes.typo} variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="#FoodzApp">
          Foodiezz
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  export default function Footer()
  {
    const classes = useStyles();
      return (
        <div className="fixed-footer">
        <React.Fragment >
          <footer className={classes.footer}>
            <Typography className={classes.typo} variant="h5" align="center" gutterBottom>
               Foodiezz
            </Typography>
            <Typography className={classes.typo} variant="subtitle1" align="center" color="textSecondary" component="p">
               Explore the food with us !
            </Typography>
            <Copyright />
            <ul class="social mb-0 list-inline mt-3">
                <li class="list-inline-item"><a href="#" class="social-link"><em class="fa fa-facebook-f" style={{color:'#e7e8e8',fontSize:'20px'}}></em></a></li>
                <li class="list-inline-item"><a href="#" class="social-link"><em class="fa fa-twitter"style={{color:'#e7e8e8',fontSize:'20px'}}></em></a></li>
                <li class="list-inline-item"><a href="#" class="social-link"><em class="fa fa-instagram"style={{color:'#e7e8e8',fontSize:'20px'}}></em></a></li>
                <li class="list-inline-item"><a href="#" class="social-link"><em class="fa fa-linkedin"style={{color:'#e7e8e8',fontSize:'20px'}}></em></a></li>
              </ul>
          </footer>
        </React.Fragment>
        </div>
      )
  }
