import React, { useState } from 'react';
import "./Header.css";
import menu from "../image/🦆 icon _menu.svg";
import logo from "../image/logo_main.svg";
import bell from "../image/🦆 icon _notification.svg";
import user from "../image/🦆 icon _profile circle.svg";
import Sidebar from "./Sidebar.tsx";

function Header(props) {


    return (
        <div>
            <div className="logo_parent">
                <img className="icon-menu" alt="" src={menu} onClick={''} />
                <div className="logo_main"><img className="mlogo" alt="" src={logo} /></div>
                <img className="icon-notification" alt="" src={bell} /> <img className="icon-profile-circle" alt="" src={user} />
            </div>
            <Sidebar/>
        </div>
    );
}

export default Header;