import React, { useEffect, useState } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import "./Header.css";
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from "react-router-dom";
import AnnouncementIcon from '@mui/icons-material/Announcement';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import no from "../images/logo.png";
import profile3 from "../image/profile90x90.png";
import Axios from 'axios';
import axios from 'axios';


function Header(props) {
    const navigate = useNavigate();

    const [sideBar, setSideBar] = useState(false);
    const [userData, setUserData] = useState([]);
    const [unum, setUnum] = useState(0);
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;
    const navi = useNavigate();
    const [ublacklist, setUblacklist] = useState(0);


    const toggleDrawer = (open) => (event) => {
        if (ublacklist !== 0) {
            alert("블랙리스트로 등록된 사용자는 사이트 이용이 불가합니다. \n관리자에게 문의하여 해제 후 이용해주세요.")
            return;
        }
        setSideBar(open);
    };

    const unumchk = () => {
        Axios.get("/apilogin/unumChk")
            .then(res => {
                setUnum(res.data);
                if (res.data != 0) {
                    axios.get("/apilogin/getUserInfo")
                        .then(res => {
                            console.log("data"+res.data)
                            setUnum(res.data.unum);
                            setUblacklist(res.data.ublacklist)
                            console.log("blacklist:"+ublacklist)
                        })
                }
                const url = "/apimain/userdata?unum=" + res.data;
                Axios.get(url)
                    .then(res => {
                        setUserData(res.data);
                    })
            });
    }
    useEffect(() => {
        unumchk();
    }, []);
    useEffect(() => {
        // Update unum whenever userData changes (i.e., after login or logout)
        setUnum(userData.length > 0 ? userData[0].unum : 0);
    }, [userData]);

    function handleClick() {
        // 페이지 이동을 처리하는 로직 작성
        // 예시로 '/' 경로로 이동하는 경우
        if (ublacklist === 0) {
            navigate('/birdie_buddy'); // 페이지 이동
        } else {
            alert("블랙리스트로 등록된 사용자는 사이트 이용이 불가합니다. \n관리자에게 문의하여 해제 후 이용해주세요.")
            return;
        }

    }

    const chkLogin = () => {
        if (unum === 0) {
            alert("먼저 로그인해 주세요");
            navi("/login/login");
            window.history.pushState(null, null, "/"); // 브라우저의 주소를 메인 페이지로 변경
            window.onpopstate = function (event) {
                // 뒤로가기 버튼을 눌렀을 때 처리할 로직
                navigate("/birdie_buddy"); // 메인 페이지로 이동
            };
        }
    }
    const handleLogout = () => {
        Axios.get("/apilogin/logout")
            .then(res => {
                navi('/birdie_buddy');
                unumchk();
                alert("로그아웃 되었습니다.");
                window.location.reload();
            });
    };
    const handleGoAdmin = () => {
        navi('/admin/userlist');
    }

    const list = () => (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {unum === 0 ? (
                    <NavLink to="/login/login" className={'side_login'}>
                        <div className="side_profile">
                            <div>
                                <img alt='' src={profile3} />
                            </div>
                            <div>로그인 해주세요</div>
                        </div>
                    </NavLink>
                ) : (
                    // unum이 0이 아닌 경우에는 userData에 따라 유저 정보를 표시
                    userData && userData.length > 0 ? (
                        userData.map((item, idx) => (
                            <div key={idx} className="side_profile" onClick={() => navi(`/mypage/mypage/${unum}`)}>
                                <div>
                                    {item.uphoto != null ? (
                                        <img alt="프로필 사진" src={`${image1}${item.uphoto}${image2}`} />
                                    ) : (
                                        <img alt="프로필 사진" src={profile3} />
                                    )}
                                </div>
                                <div>{item.unickname}</div>
                            </div>
                        ))
                    ) : null
                )}

            </List>
            <Divider style={{ height: '2px' }} />
            <List onClick={chkLogin}>
                {[
                    { text: '공지사항', path: '/admin/noticeList', icon: <AnnouncementIcon style={{ color: '#1F4337' }} />, marginLeft: '20px' },
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
            <Divider style={{ height: '2px' }} />
            <List onClick={chkLogin}>
                {[
                    { text: '조인', path: '/joining/alllist', icon: <PeopleIcon style={{ color: '#1F4337' }} />, marginLeft: '20px' },
                    { text: '양도', path: '/yangdo/list', icon: <TransferWithinAStationIcon style={{ color: '#1F4337' }} />, marginLeft: '20px' },
                    { text: '랭킹', path: '/score/list', icon: <TrendingUpIcon style={{ color: '#1F4337' }} />, marginLeft: '20px' },
                    { text: '스토리', path: '/hugi/list', icon: <RateReviewIcon style={{ color: '#1F4337' }} />, marginLeft: '20px' },
                    { text: '채팅 리스트', path: `/chating/${unum}`, icon: <ForumOutlinedIcon style={{ color: '#1F4337' }} />, marginLeft: '20px' },
                    { text: '마이페이지', path: `/mypage/setting`, icon: <PersonIcon style={{ color: '#1F4337' }} />, marginLeft: '20px' }
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
            {
                unum !== 1 ? '' :
                    <button style={{ marginLeft: '13px', marginBottom: '20px', backgroundColor: '#F8F5F0' }} type='button' onClick={() => handleGoAdmin()}> <ManageAccountsIcon style={{ color: '#1F4337' }} />&nbsp;&nbsp;&nbsp; 관리자 게시판</button>
            }

            {
                unum === 0 ? '' :
                    <button style={{ marginLeft: '13px', backgroundColor: '#F8F5F0' }} type='button' onClick={() => handleLogout()}> <LogoutIcon style={{ color: '#1F4337' }} />&nbsp;&nbsp;&nbsp; 로그아웃</button>
            }
        </Box>
    );

    return (
        <div className="header_wrap">
            <div className="header_menuicon" onClick={toggleDrawer(true)}>
                <MenuIcon style={{ color: '#1F4337' }} />


            </div>
            <Drawer
                anchor={'left'}
                open={sideBar}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    style: {
                        width: '200px',
                        backgroundColor: '#F8F5F0',
                    }
                }}
            >
                {list()}
            </Drawer>
            <div className='header_logo'>
                <img style={{ height: '80px' }} alt="" src={no} onClick={handleClick} />
            </div>







        </div>
    );
}

export default Header;