import React, { useEffect, useState } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import "./Header.css";
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink, useNavigate} from "react-router-dom";
import AnnouncementIcon from '@mui/icons-material/Announcement';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PersonIcon from '@mui/icons-material/Person';
import no from "../images/logo.png"
import user from "../images/default_golf.png"
import Axios from 'axios';


function Header(props) {
    const navigate = useNavigate();

    const [sideBar, setSideBar] = useState(false);
    const [userData, setUserData]=useState([]);
    const [unum, setUnum] = useState(0);
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;
    const navi = useNavigate();


    const toggleDrawer = (open) => (event) => {
        setSideBar(open);
    };

    const unumchk=()=>{
        Axios.get("/login/unumChk")
        .then(res=> {
            setUnum(res.data);
            const url="/main/userdata?unum="+res.data;
            Axios.get(url)
            .then(res=>{
                setUserData(res.data);
            })
        });
    }
    useEffect(() => {
        unumchk();
    }, []);

    function handleClick() {
        // 페이지 이동을 처리하는 로직 작성
        // 예시로 '/' 경로로 이동하는 경우
        navigate('/'); // 페이지 이동
    }

    const chkLogin=()=>{
        if(unum===0){
            alert("먼저 로그인해 주세요");
            navi("/login/login");
        }
    }

    // const getUserData()=

    const list = () => (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
            {unum === 0 ? (
                <div className="side_profile">
                    <div className='side_go_login'>
                        <NavLink to="/login/login" className={'side_login'}>로그인해 주세요</NavLink>
                    </div>
                </div>
            ) : (
                // unum이 0이 아닌 경우에는 userData에 따라 유저 정보를 표시
                userData && userData.length > 0 ? (
                    userData.map((item, idx) => (
                        <div key={idx} className="side_profile">
                            <div>
                            {item.uphoto != null ? (
                                <img alt="프로필 사진" src={`${image1}${item.uphoto}${image2}`} />
                                ) : (
                                <img alt="프로필 사진" src={user} />
                            )}
                            </div>
                            <div>{item.uname}</div>
                        </div>
                    ))
                ) : null
            )}
                
            </List>
            <Divider style={{height:'2px'}}/>
            <List onClick={chkLogin}>
                {[
                    { text: '공지사항', path: '/notice', icon: <AnnouncementIcon style={{ color: '#1F4337' }} />, marginLeft: '20px' },
                    { text: '스코어 작성', path: '/score/form', icon: <EditIcon style={{ color: '#1F4337' }} />, marginLeft: '20px' }
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
            <List onClick={chkLogin}>
                {[
                    { text: '조인', path: '/joining/alllist', icon: <PeopleIcon style={{ color: '#1F4337' }} />, marginLeft: '20px' },
                    { text: '양도', path: '/yangdo/list', icon: <TransferWithinAStationIcon style={{ color: '#1F4337' }} />, marginLeft: '20px'},
                    { text: '랭킹', path: '/score/list', icon: <TrendingUpIcon style={{ color: '#1F4337' }} />, marginLeft: '20px'},
                    { text: '후기', path: '/hugi/list', icon: <RateReviewIcon style={{ color: '#1F4337' }} />, marginLeft: '20px'},
                    { text: '마이페이지', path: '/mypage/main', icon: <PersonIcon style={{ color: '#1F4337' }} />, marginLeft: '20px'},
                    { text: '채팅 리스트', path: `/chating/${unum}`, icon: <PersonIcon style={{ color: '#1F4337' }} />, marginLeft: '20px'}
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
                <MenuIcon style={{color:'#1F4337'}} />

              
            </div>
            <Drawer
                anchor={'left'}
                open={sideBar}
                onClose={toggleDrawer(false)}
                PaperProps={{ style: { width: '200px',
                                    backgroundColor: '#F8F5F0',
                                                    } }}
            >
                {list()}
            </Drawer>
            <div className='header_logo'>
                <img style={{height:'80px'}} alt="" src={no} onClick={handleClick}/>
            </div>
            


            


           
        </div>
    );
}

export default Header;