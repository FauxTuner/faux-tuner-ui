import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AppRoute from './components/AppRoute';

import Locast from './pages/Locast';
import PlutoTV from './pages/PlutoTV';
import IPTV from './pages/IPTV';
import Settings from './pages/Settings';
import Home from './pages/Home';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));


export default function App() {
  const classes = useStyles();

  return (
    <BrowserRouter basename="/web">

      <div>
        <AppBar position="static">
          <Toolbar>
            {/*
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            */}
            <Typography variant="h6" className={classes.title}>
              faux-tuner
            </Typography>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/locast">
            <AppRoute><Locast /></AppRoute>
          </Route>
          <Route path="/plutotv">
            <AppRoute><PlutoTV /></AppRoute>
          </Route>
          <Route path="/iptv">
            <AppRoute><IPTV /></AppRoute>
          </Route>
          <Route path="/settings">
            <AppRoute><Settings /></AppRoute>
          </Route>
          <Route path="/">
            <AppRoute><Home /></AppRoute>
          </Route>
        </Switch>

      </div>
    </BrowserRouter>
  );
}
