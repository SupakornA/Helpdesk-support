import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UpdateIcon from '@mui/icons-material/Update';
import { useState } from "react";
import {Link} from "react-router-dom"
import './navbar.css'
export default function NavBar() {
    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        window.location = "./"
        }
    const [showMenu,setShowMenu] = useState(false)
    const toggleMenu = ()=>setShowMenu(!showMenu)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={toggleMenu}/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Helpdesk support
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>    
      <div className="dash">
            <aside>
                <nav className={showMenu ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-item" onClick={toggleMenu}>
                    
                    <li className="menu-text">
                        <Link to="/home" className="menu-bar">
                            <HomeIcon/><span>Home ticket</span>
                        </Link>
                    </li>
                    <li className="menu-text">
                        <Link to="/create" className="menu-bar">
                            <AddBoxIcon/><span>Create</span>
                        </Link>
                    </li>
                    <li className="menu-text">
                        <Link to="/edit" className="menu-bar">
                            <UpdateIcon/><span>Update</span>
                        </Link>
                    </li>
                </ul>
                </nav>
            </aside>
        </div>
    </Box>
        
  );
}