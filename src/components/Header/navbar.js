import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import SignIn from '../authentications/Login';
import SignUp from '../authentications/signUp';
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeUser, disconnect } from '../redux/reduxActions';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AssignmentSharpIcon from '@material-ui/icons/AssignmentSharp';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import useStyles from './navbar.style';

const mapStateToProps = state => {
  return {
    connection: state.connection.connection,
		auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => ({
  removeUser: () => dispatch(removeUser()),
  disconnect: () => dispatch(disconnect())
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function NavBar(props) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleLoginOpen = () => {
    props.setOpenLogin(true);
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleSignupOpen = () => {
    props.setOpenSignup(true);
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleLoginClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    props.setOpenLogin(false);
  };
  const handleSignupClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    props.setOpenSignup(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('login');
    if (props.connection !== null) {
      props.removeUser();
      props.connection.pusher.disconnect();
      props.disconnect();
    }
    setAnchorEl(null);
    handleMobileMenuClose();
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      >
      {
        localStorage.getItem('login') !== null ? <div>
          <Link to={'/profile'} style={{color:'Black'}}><MenuItem onClick={handleMenuClose} style={{ fontFamily: "Poppins, sans-serif" }}>Profile</MenuItem></Link>
          <MenuItem onClick={handleLogout} style={{ fontFamily: "Poppins, sans-serif" }}>LogOut</MenuItem>
        </div>
          : <div>
            <MenuItem onClick={handleSignupOpen} style={{ fontFamily: "Poppins, sans-serif" }}>Sign Up </MenuItem>
            <MenuItem onClick={handleLoginOpen} style={{ fontFamily: "Poppins, sans-serif" }}>Login </MenuItem>
          </div>
      }

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={handleProfileMenuOpen} style={{ fontFamily: "Poppins, sans-serif" }}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <Dialog
        open={props.openLogin}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleLoginClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent >
          <SignIn handleLoginClose={handleLoginClose} setOpenSignup={props.setOpenSignup}/>
        </DialogContent>
      </Dialog>

      <Dialog
        open={props.openSignup}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleSignupClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent >
          <SignUp handleSignupClose={handleSignupClose} />
        </DialogContent>
      </Dialog>

      <div className={classes.grow}>
      <AppBar className={classes.color} position="relative">
                  <Toolbar>
            <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Typography className={classes.title} variant="h4" noWrap>
                Foodiezz
              </Typography>
            </Link>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {
                localStorage.getItem('login') !== null ?
                  <Link to={'/cart'} style={{ color: 'white', textDecoration: 'none' }} >
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                      <Badge color="secondary">
                      <ShoppingCartOutlinedIcon style={{ marginTop: '15%' }} />
                      </Badge>
                    </IconButton>
                  </Link>
                  : null
              }


              <Typography variant="h6" className={classes.title} style={{ marginTop: '4%' }}>
                {
                  localStorage.getItem('login') !== null ?
                    <span>Welcome, &nbsp; {JSON.parse(localStorage.getItem('login')).username}</span>
                    : null
                }
              </Typography>
              {
                localStorage.getItem('login') !== null ? null
                  :<div style={{marginTop:'3%'}}>
                    <IconButton
                    onClick={handleLoginOpen}>
                    <VpnKeyIcon style={{ fill: "#e7e8e8"}}></VpnKeyIcon>
                  </IconButton>
                  <IconButton
                    onClick={handleSignupOpen}>
                   <AssignmentSharpIcon style={{ fill: "#e7e8e8"}}></AssignmentSharpIcon>
                  </IconButton>
                  </div>
              }
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                style={{color:'white'}}
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>

             {
                localStorage.getItem('login') !== null ?
                  <Link to={'/cart'} style={{ color: 'white', textDecoration: 'none' }} >
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                      <Badge color="secondary">
                        <ShoppingCartOutlinedIcon style={{ marginTop: '15%' }} />
                      </Badge>
                    </IconButton>
                  </Link>
                  : null
              }
              {
                localStorage.getItem('login') !== null ? null
                  :<div style={{marginTop:'3%'}}>
                    <IconButton
                    onClick={handleLoginOpen}>
                    <VpnKeyIcon style={{ fill: "#e7e8e8"}}></VpnKeyIcon>
                  </IconButton>
                  <IconButton
                    onClick={handleSignupOpen}>
                   <AssignmentSharpIcon style={{ fill: "#e7e8e8"}}></AssignmentSharpIcon>
                  </IconButton>
                  </div>
              }

              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                style={{marginTop:'3%',color:'white'}}
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </div>

  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
