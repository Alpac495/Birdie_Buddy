// import React from 'react';
//
// function Mypage(props) {
//     return (
//         <div className="mypageprofile">
//             <div className="MPdiv">
//                 <div className="MPchild" />
//             </div>
//
//             <div className="MPbackprofile" />
//             <div className="MPinfobox" />
//             <div className="MPmainprofile" />
//             <div className="MPdiv2">
//         <span className="MPtxt">
//           <p className="MPp">1992.09.07. 서울 강남구</p>
//           <p className="MPp">골프경력 1년 평균타수 89타</p>
//         </span>
//             </div>
//             <div className="MPdiv3">안녕하세요~</div>
//             <div className="MPdiv4">닉네임</div>
//             <div className="MPwrapper">
//                 <div className="MPdiv5">프로필수정</div>
//             </div>
//             <div className="MPicon-camera-parent">
//                 <img className="MPicon-camera" alt="" src="/-icon-camera.svg" />
//                 <div className="MPdiv5">내 스토리</div>
//             </div>
//             <div className="MPgroup-parent">
//                 <div className="MPcontainer">
//                     <div className="MPdiv5">내 정보</div>
//                 </div>
//                 <img
//                     className="MPicon-profile-circle1"
//                     alt=""
//                     src="/-icon-profile-circle1.svg"
//                 />
//             </div>
//
//
//         </div>
//     );
// }
//
// export default Mypage;

import React, {useEffect, useState} from 'react';
import axios from "axios";
import './Mypage.css'
import EditIcon from '@mui/icons-material/Edit';

function Mypage(props) {

    const [unum, setUnum] = useState('');
    const [uemail, setUemail] = useState('');
    const [uname, setUname] = useState('');
    const [unickname, setUnickname] = useState('');
    const [uage, setUage] = useState('');
    const [uphoto, setUphoto] = useState('');
    const [ugender, setUgender] = useState('');
    const [uhp, setUhp] = useState('');
    const [ucontent, setUcontent] = useState('');
    const [utasuopen, setUtasuopen] = useState('');
    const [ucareer, setUcareer] = useState('');

    const getUserData = () => {
        axios.get("/login/getuser?unum=" + sessionStorage.unum)
            .then(res => {
                console.log(res.data)
                setUnum(res.data.unum);
                setUemail(res.data.uemail);
                setUname(res.data.uname);
                setUnickname(res.data.unickname);
                setUage(res.data.uage);
                setUphoto(res.data.uphoto);
                setUgender(res.data.ugender);
                setUhp(res.data.uhp);
                setUcontent(res.data.ucontent);
                setUtasuopen(res.data.utasuopen);
                setUcareer(res.data.ucareer);
            })
    }
    useEffect(() => {
        getUserData()
    }, [])
    return (
        <div className={'div1'}>
            {/*<div>*/}
            {/*    unum : {unum}<br/>*/}
            {/*    uemail : {uemail}<br/>*/}
            {/*    uname : {uname}<br/>*/}
            {/*    unickname : {unickname}<br/>*/}
            {/*    uage : {uage}<br/>*/}
            {/*    uphoto : {uphoto}<br/>*/}
            {/*    ugender : {ugender}<br/>*/}
            {/*    uhp : {uhp}<br/>*/}
            {/*    ucontent : {ucontent}<br/>*/}
            {/*    utasuopen : {utasuopen}<br/>*/}
            {/*    ucareer : {ucareer}<br/>*/}
            {/*</div>*/}
                <div className="e1_29"></div>
                <div className="e1_30"></div>
                <div className="e1_31"></div>
                <span className="e1_32">{uage}</span>
                <span className="e1_33">{ucontent}<EditIcon fontSize="small"/></span>
                <span className="e1_34">{unickname}<EditIcon fontSize="small"/></span>
                <div className="e1_35">
                    <div className="e1_36">
                        <div className="e1_37"></div>
                    </div>
                    <span className="e1_38">버디채팅</span>
                </div>
                <div className="e1_39">
                    <div className="e1_40">
                        <div className="e1_41"></div>
                    </div>
                    <span className="e1_42">버디스토리</span>
                </div>
                <div className="e1_43"><span className="e1_44">버디추가</span>
                    <div className="e1_45">
                        <div className="e1_46">
                            <div className="e1_47"></div>
                            <div className="e1_48"></div>
                            <div className="e1_49"></div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Mypage;