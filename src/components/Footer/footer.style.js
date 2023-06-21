import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

    footer: {
      backgroundColor:'#c3073f',
      padding: theme.spacing(3),
      bottom:0,
      clear:"both",
      left:0,
      right:0,
      zIndex:-2,
      marginBottom:-4000,
      marginTop:160,
      borderRadius:"4px",
      position:"static",
      color:'#e7e8e8',
      fontFamily:"Poppins, sans-serif",

      },
      typo:{
        fontFamily:"Poppins, sans-serif",
        color:'#e7e8e8'
      },
  }));


  export default useStyles;
