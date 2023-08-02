import React from 'react';
import "./Footer.css";
import footerlogo from "../image/footerlogo.svg";

function Footer(props) {
    return (
        <div className="FFrectangle-parent">
            <div className="FFgroup-child" />
            <div className="FFdiv">
                <span className="FFtxt">
                <p className="FFp">서울 강남구 강남대로94길 20, 삼오빌딩 6층</p>
                <p className="FFp">사업자등록번호 : 111-22-3333</p>
                <p className="FFp2">문의 : 02-3532-3333 | 팩스 : 02-6112-3754</p>
                </span>
            </div>
            <img className="FFbirdie-buddy" alt="" src={footerlogo} />
        </div>
    );
}

export default Footer;