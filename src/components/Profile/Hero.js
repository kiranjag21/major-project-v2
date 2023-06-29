import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RoomIcon from '@material-ui/icons/Room';
import axios from 'axios';
import AccountBoxIcon from '@material-ui/icons/AccountBox';


const useStyles = makeStyles((theme) => ({

    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
      maxWidth:'100%'
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
    large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    }
}));

export default function HeroUnit() {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [useraddress, setAddress] = useState('');
    const [useremail, setEmail] = useState('');

    useEffect(()=>{
        const fetchUsers = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/users/user/${JSON.parse(localStorage.getItem('login')).userId}`);
                setUsername(response.data.Username);
                setAddress(response.data.Address);
                setEmail(response.data.EmailId);
            } catch(e){
            }
        };
        fetchUsers();
    },[])
    return(
        <React.Fragment>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="xs">
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <AccountBoxIcon fontSize='large'/><br></br>
                        </Grid>
                        <Typography style={{fontFamily:"Poppins, sans-serif",maxWidth:'md'}} variant="h4" align="center" color="textPrimary" gutterBottom>
                        {username}
                        </Typography>
                        <Typography style={{fontFamily:"Poppins, sans-serif"}} variant="p" align="center" color="textSecondary" paragraph>
                        <RoomIcon/> 
                        {useraddress}
                        </Typography>
                        <Typography  style={{fontFamily:"cursive",maxWidth:'md'}} variant="p" align="center" color="textSecondary" paragraph>
                        {useremail}
                        </Typography>
                    </Container>
                </div>
            </main>
        </React.Fragment>
    )
}