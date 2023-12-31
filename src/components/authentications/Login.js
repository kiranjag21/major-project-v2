import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, Redirect } from 'react-router-dom';
import { useState } from "react";
import UserDataService from "../../services/UserService";
import { useHistory } from "react-router-dom";
import { setConnection, addUser } from '../redux/reduxActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Backdrop, CircularProgress } from '@material-ui/core';

const mapDispatchToProps = (dispatch) => ({
    setConnection: (data) => dispatch(setConnection(data)),
    addUser: (id) => dispatch(addUser(id))
});


const mapStateToProps = state => {
	return {
		connection: state.connection.connection,
		
	}
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    height:"50%",
  width:"50%"
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:'#c3073f',
  },
}));

export function SignIn(props) {
  const classes = useStyles();
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory()

  const loginReporter = (event) => {
    event.preventDefault();
    //   alert("hello")
    var data = {
      emailId, password
    };
    setIsLoading(true);
    UserDataService.login(data)
      .then(response => {
        setIsLoading(false);
        if (response) {

          if(response.data == 'fail') {
            alert("Invalid credentials !");
          }
          else {
            localStorage.setItem('login', JSON.stringify({ login: true, token: response.token, userId: response.data.Uid, username: response.data.Username, emailId: response.data.EmailId, address: response.data.Address }))
            props.addUser(response.data.Uid);
            history.push('/')
            props.handleLoginClose();
          }
      }
       
      })
      .catch(e => {
        setIsLoading(false);
        console.log(e);
      });

    setLogin({ login: true })
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcthr2b0L4id8NgDgtQH5HWZB2NxJt8VYeTA&usqp=CAU" className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={loginReporter}  >
          <TextField onChange={(event)=>setEmail(event.target.value)}
            variant="outlined"
            type="email"
            fullWidth
            placeholder="Email"
            name="emailId"
            required
          />
          <br></br>
          <br></br>
          <TextField onChange={(event)=>setPassword(event.target.value)}
             variant="outlined"
             fullWidth
             name="password"
             type="password"
             id="password"
             placeholder="Password"
             required
             inputProps={{maxLength :10,minLength:3,pattern: '^.{6,}$'}}
          />
          <Button

            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
          Login
          </Button>
          </form>
          <div className='text-secondary'>Dont have account?  <a role="button" style={{ cursor: 'pointer'}} className='link pointer' onClick={() => {
            props.handleLoginClose();
            props.setOpenSignup(true);
          }}>SignUp</a></div>
      </div>
      <Backdrop open={isLoading} >
  <CircularProgress color="inherit" />
</Backdrop>
    </Container>
  );
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
