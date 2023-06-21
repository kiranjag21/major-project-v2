import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('xs')]:{
        display: 'block',
      },
      fontFamily: "Poppins, sans-serif",
      fontWeight:'medium',
      color: "#e7e8e8"
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    color:{
      backgroundColor:"#c3073f",
      color:'black',
      borderRadius: "4px"
    }
  }));

export default useStyles;
