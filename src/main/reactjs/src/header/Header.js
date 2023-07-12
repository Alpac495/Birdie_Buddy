import React, { useState } from 'react';
import { Box, Divider,  Drawer,  List, ListItem, ListItemButton,ListItemText } from '@mui/material';
import "./Header.css";
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../image/logo_main.svg";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function Header(props) {

    const [sideBar,setSideBar] = useState(false);

    const toggleDrawer =
        (open) =>
            (event) => {
                setSideBar(open);
            };

    const list = () => (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>

                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );


    return (
        <div className="header_wrap">
            <div className="header_menuicon" onClick={toggleDrawer(true)}>
                <MenuIcon/>
            </div>
            <Drawer
                anchor={'left'}
                open={sideBar}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>

                <img className="mlogo" alt="" src={logo} />

            <div className="header_usermenu">
                <AccountCircleOutlinedIcon/>
            </div>
        </div>
    );
}

export default Header;