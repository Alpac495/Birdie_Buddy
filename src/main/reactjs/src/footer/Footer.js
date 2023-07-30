import React from 'react';
import "./Footer.css";
import logo from "../images/logo.png"

function Footer(props) {
    return (
        <div className={'buddy_footer'}>
                <div><img alt='' src={logo}/></div>
                <div>
                    <p>서울 강남구 강남대로94길 20, 삼오빌딩 6층</p>
                    <p>사업자등록번호 : 111-22-3333</p>
                    <p>문의 : 02-3532-3333 | 팩스 : 02-6112-3754</p>
                </div>
        </div>
    );
}

export default Footer;