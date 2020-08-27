import React, { useCallback } from 'react';
import { useHistory } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


export default function NavMenu() {
  const history = useHistory();

  const navigate = useCallback((pathname, search) => {
    console.log(pathname);
    history.push(pathname);
  }, [history]);

  return (
    <List component="nav" aria-label="main mailbox folders">
      <ListItem button onClick={() => navigate('/')}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => navigate('/locast')}>
        <ListItemText primary="Locast" />
      </ListItem>
      <ListItem button onClick={() => navigate('/plutotv')}>
        <ListItemText primary="Pluto.tv" />
      </ListItem>
      <ListItem button onClick={() => navigate('/iptv')}>
        <ListItemText primary="IPTV & Custom Streams" />
      </ListItem>
      <ListItem button onClick={() => navigate('/settings')}>
        <ListItemText primary="Settings" />
      </ListItem>
    </List>
  )
}
