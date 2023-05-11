import React, {Fragment} from 'react';
import {withRouter} from './withRouter'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

//
import { Route, Routes } from 'react-router-dom';
//
import Home from './ui/Home';




const drawerWidth = 240;

function AppComponent(props) {


  return (




          <Box
            sx={{ display: 'flex', justifyContent:'center' }}
            component="main"
          >
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Box>

  );
}
export const App = withRouter(AppComponent);
