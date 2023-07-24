import React, { useState } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import "./Header.css";
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../image/logo_main.svg";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {NavLink, useNavigate} from "react-router-dom";
import AnnouncementIcon from '@mui/icons-material/Announcement';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PersonIcon from '@mui/icons-material/Person';
import no from "../images/nooooo.jpg"


function Header(props) {
    const navigate = useNavigate();

    const [sideBar, setSideBar] = useState(false);

    const toggleDrawer = (open) => (event) => {
        setSideBar(open);
    };

    function handleClick() {
        // 페이지 이동을 처리하는 로직 작성
        // 예시로 '/' 경로로 이동하는 경우
        navigate('/'); // 페이지 이동
    }

    // const getUserData()=

    const list = () => (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <div className='side_profile'>
                    <img alt='' src={no}/><div>김똘똘 님</div>
                </div>
            </List>
            <Divider style={{height:'2px'}}/>
            <List>
                <h6 style={{ marginLeft: '15px' }}>여기는 중요부</h6>
                {[
                    { text: '공지사항', path: '/notice', icon: <AnnouncementIcon />, marginLeft: '20px' },
                    { text: '스코어 작성', path: '/score/form', icon: <EditIcon />,marginLeft: '20px' }
                ].map(({ text, path, icon, marginLeft }) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton component={NavLink} to={path} activeClassName="active">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {icon}
                                <ListItemText primary={text} style={{ marginLeft }} />
                            </div>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider style={{height:'2px'}} />
            <List>
                {[
                    { text: '조인', path: '/joining/list', icon: <PeopleIcon />, marginLeft: '20px' },
                    { text: '양도', path: '/yangdo/list', icon: <TransferWithinAStationIcon />, marginLeft: '20px' },
                    { text: '랭킹', path: '/score/list', icon: <TrendingUpIcon />, marginLeft: '20px' },
                    { text: '후기', path: '/hugi/list', icon: <RateReviewIcon />, marginLeft: '20px' },
                    { text: '마이페이지', path: '/mypage/main', icon: <PersonIcon />, marginLeft: '20px' }
                ].map(({ text, path, icon, marginLeft }) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton component={NavLink} to={path} activeClassName="active">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {icon}
                                <ListItemText primary={text} style={{ marginLeft }} />
                            </div>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div className="header_wrap">
            <div className="header_menuicon" onClick={toggleDrawer(true)}>
                <MenuIcon />
            </div>
            <Drawer
                anchor={'left'}
                open={sideBar}
                onClose={toggleDrawer(false)}
                PaperProps={{ style: { width: '200px' } }}
            >
                {list()}
            </Drawer>


            <img className="mlogo" alt="" src={logo} onClick={handleClick}/>


            <div className="header_usermenu">
                <AccountCircleOutlinedIcon />
            </div>
        </div>
    );
}

export default Header;