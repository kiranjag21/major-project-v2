import { makeStyles } from '@material-ui/core/styles';
const Use = makeStyles((theme) => ({
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
    },
    root: {
      width: 200,
      display: 'flex',
      alignItems: 'center',
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
      maxWidth:'100%',     
       marginLeft:'100px',


    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
     media: {
      height: 0,
      paddingTop: '56.25%', // 16:9,
      marginTop:'30'
    }

  }));
  
  const styles =
  {
    media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
  }
    };
export default Use;