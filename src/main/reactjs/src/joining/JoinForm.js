import "./Joining.css";
import React, {useCallback, useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import mlogo from '../image/logo_main.svg';
import imenu from '../image/🦆 icon _menu.svg';
import ialarm from '../image/🦆 icon _notification.svg';
import imypage from '../image/🦆 icon _profile circle.svg';
import Modal from '../components/Modal';


const JoinForm = (props) => {

    const [jcontent,setJcontent]=useState('');
    const [jjoinday,setJoinday]=useState('');
    const [gnum,setGnum]=useState('');
    const [jprice,setJprice]=useState('');
    const [jtime,setJtime]=useState('');
    const [jage,setJage]=useState('');

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const navi=useNavigate();

    const unum=sessionStorage.unum;
    const [data,setData]=useState('');
    const list=useCallback(()=>{
        const url="/golfjang/list";
        Axios.get(url)
            .then(res=>{
                setData(res.data);
                console.log(res.data)
            })
    },[]);

    useEffect(()=>{
        list();
    },[list])

    const [searchTerm, setSearchTerm] = useState("");


    const onSubmitEvent=(e)=>{
        e.preventDefault();
        Axios.post("/joining/insert",{jcontent,jjoinday,gnum,jprice, jtime, jage})
            .then(res=>{
                alert("신청되었습니다")
                //목록으로 이동
                navi("/joining/list/")
            })
    }

    const selectGolfjang=(e)=>{

    }


    return (
        <div className="joinform">
            <React.Fragment>
                <Modal open={modalOpen} close={closeModal} header="Modal heading">
                    <div>
                        <input style={{marginLeft:'20px'}}
                            type="text"
                            placeholder="검색"
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}/>
                        <br/><br/>
                        <ul>
                            {
                                data.map &&
                                data.filter((val)=>{
                                    if(searchTerm == ""){
                                        return val
                                    }else if(val.gname.includes(searchTerm)){
                                        return val
                                    }
                                }).map((item,idx) =>
                                    <span onClick={selectGolfjang}><li>{item.gname}</li></span>
                            )}
                        </ul>
                    </div>
                </Modal>
            </React.Fragment>
            <form onSubmit={onSubmitEvent}>
            <div className="jregister" />
            <div className="frame-parent">
                <div className="frame-group">
                    <div className="jparent">
                        <div className="jdiv">
                           골프장검색</div>
                        <input className="jforminput" type="search" placeholder="골프장을 검색하세요                            🔎" onClick={openModal}
                               value={gnum} onChange={(e)=>setGnum(e.target.value)} required maxLength minLength />
                    </div>
                    <div className="jparent">
                        <div className="jdiv">날짜</div>
                        <input className="jforminput1" type="date" placeholder="조인 날짜를 입력하세요"
                               value={jjoinday} onChange={(e)=>setJoinday(e.target.value)} required maxLength minLength />
                    </div>
                    <div className="jparent">
                        <div className="jdiv">시간</div>
                        <input className="jforminput1" type="time" placeholder={"조인 시간을 입력하세요"}
                               value={jtime} onChange={(e)=>setJtime(e.target.value)} required maxLength minLength />
                    </div>
                </div>
                <div className="frame-container">
                    <div className="jparent">
                        <div className="jdiv">연령대</div>
                        <input className="jforminput" type="text"  required placeholder="원하는 조인 멤버의 연령대를 입력하세요"
                               value={jage} onChange={(e)=>setJage(e.target.value)} maxLength minLength />
                    </div>
                    <div className="jparent1">
                        <div className="jdiv">금액</div>
                        <input className="jforminput1" type="text"  required placeholder="그린피 예상금액을 입력하세요"
                               value={jprice} onChange={(e)=>setJprice(e.target.value)} maxLength minLength />
                    </div>
                    <div className="jparent2">
                        <div className="jdiv">조인설명</div>
                        <input className="jforminput5" type="text"  required placeholder="조인에 대한 간단한 설명을 입력하세요"
                               value={jcontent} onChange={(e)=>setJcontent(e.target.value)} maxLength minLength />
                    </div>
                </div>
            </div>
            <div className="logo-parent">
                <div className="logo_main">
                    <img className="mlogo" alt="" src={mlogo} style={{display: "flex", alignItems: "center"}} />
                </div>
                <img className="icon-menu" alt="" src={imenu} />
                <img className="icon-notification" alt="" src={ialarm} />
                <img className="icon-profile-circle" alt="" src={imypage} />
            </div>
            <div className="joinform-child" />
            <div className="jdiv7">조인 만들기</div>
            </form>
        </div>);


};


export default JoinForm;
