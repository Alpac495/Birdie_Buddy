import React from 'react';
import { useNavigate } from 'react-router-dom';

function AccountSetting(props) {
    const navi = useNavigate();
    return (
        <div>
            <div className="MPSsingle-line-item">
                <img className="account-icon" alt="" src="/info.svg" />
                <div className="MPSlabel1" onClick={()=>navi('/login/taltae')}>회원탈퇴</div>
            </div>
            <div className="MPSsingle-line-item">
                <img className="account-icon" alt="" src="/info.svg" />
                <div className="MPSlabel1" onClick={()=>navi('/login/passchange')} >비밀번호 변경</div>
            </div>
            <div className="MPSsingle-line-item">
                <img className="account-icon" alt="" src="/info.svg" />
                <div className="MPSlabel1" onClick={()=>navi('/login/hpchange')} >번호변경</div>
            </div>
        </div>
    );
}

export default AccountSetting;