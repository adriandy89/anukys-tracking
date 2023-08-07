/* eslint-disable no-unused-vars */
import React from 'react';
import { Card, Grid, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from '@mui/material/styles';
import LogoImage from './LogoImage';
import image from '../img/login-background.svg';
import image2 from '../img/login.jpg';
import AuthFooter from './AuthFooter';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  card: {
    width: theme.dimensions.sidebarWidth,
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
    borderRadius: 10,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 460,
  },
  sidebar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.primary.main,
    padding: theme.spacing(3),
    width: '100%',
    maxWidth: 460,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    boxShadow: '-2px 0px 16px rgba(0, 0, 0, 0.25)',
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(0, 0, 0, 0),
    },
  },
  form: {
    maxWidth: theme.spacing(52),
    padding: theme.spacing(5),
    width: '100%',
  },
}));

const LoginLayout = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <main className={classes.root}>
        <Paper
          className={classes.paper}
          style={{
            backgroundImage: `url(${image2})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <Card className={classes.card} elevation={12}>
            <div className={classes.sidebar}>
              <LogoImage color={theme.palette.primary.main} />
            </div>
            <br />
            <form className={classes.form}>{children}</form>
          </Card>

        </Paper>
      </main>
      <AuthFooter />

    </>
  );
};

export default LoginLayout;
