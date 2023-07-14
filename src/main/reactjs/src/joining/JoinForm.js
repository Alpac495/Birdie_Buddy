import "./Joining.css";
import React, {useCallback, useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import Modal from '../components/Modal';
import PartnerForm from "../components/PartnerForm";
import PortalPopup from "../components/PortalPopup";
import PartnerForm2 from "../components/PartnerForm2";


const JoinForm = (props) => {

    const [jcontent,setJcontent]=useState('');
    const [jjoinday,setJoinday]=useState('');
    const [gname,setGname]=useState('');
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
        Axios.post("/joining/insert",{unum,jcontent,jjoinday,gname,jprice, jtime, jage})
            .then(res=>{
                // onMakerEvent()
                alert("정상적으로 생성되었습니다")
                //목록으로 이동
                navi("/joining/list/")
            })
    }

    // const onMakerEvent=()=>{
    //         Axios.post("/joining/joinMaker", {unum, jnum})
    //             .then(res => {
    //
    //             })
    //             .catch(err => {
    //                 console.log(err.message);
    //             })
    // }

    const selectGolfjang=(e)=>{
        const selectedValue = e.target.innerText;
        setGname(selectedValue);
        {closeModal()}
    }
    //동반자 모달
    const [isPartnerForm2Open, setPartnerForm2Open] = useState(false);
    const [isPartnerFormOpen, setPartnerFormOpen] = useState(false);

    const openPartnerForm2 = useCallback(() => {
        setPartnerForm2Open(true);
    }, []);

    const closePartnerForm2 = useCallback(() => {
        setPartnerForm2Open(false);
    }, []);

    const openPartnerForm = useCallback(() => {
        setPartnerFormOpen(true);
    }, []);

    const closePartnerForm = useCallback(() => {
        setPartnerFormOpen(false);
    }, []);


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
                                    <span onClick={selectGolfjang}><li>{item.gname}</li><br/></span>
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
                        <input className="jforminput" type="search" placeholder="골프장을 검색하세요                          🔎" onClick={openModal}
                               value={gname} onChange={(e)=>setGname(e.target.value)} required maxLength minLength />
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
                        {/*<input className="jforminput" type="text"  required placeholder="원하는 조인 멤버의 연령대를 입력하세요"*/}
                        {/*       value={jage} onChange={(e)=>setJage(e.target.value)} maxLength minLength />*/}
                        <select className="jforminput" required onChange={(e)=>setJage(e.target.value)}>
                            <option disabled hidden selected>원하는 연령대를 선택하세요</option>
                            <option value={"연령무관"}>연령무관</option>
                            <option value={"20대만"}>20대만</option>
                            <option value={"30대만"}>30대만</option>
                            <option value={"40대이상"}>40대이상</option>
                            <option value={"20~30대"}>20~30대</option>
                            <option value={"30~40대"}>30~40대</option>
                            <option value={jage} hidden></option>
                        </select>
                    </div>
                    <div className="jparent1">

                        <div className="jdiv">그린피 (직접입력 또는 만원 단위 조절)</div>
                        <input className="jforminput1" type="number"  required step={10000} placeholder={"10000"}
                               value={jprice} onChange={(e)=>setJprice(e.target.value)} maxLength minLength />
                    </div>
                    <div className="jparent2">
                        <div className="jdiv">조인설명</div>
                        <input className="jforminput5" type="text"  required placeholder="조인에 대한 간단한 설명을 입력하세요"
                               value={jcontent} onChange={(e)=>setJcontent(e.target.value)} maxLength minLength />
                    </div>
                </div>
            </div>
            <div className="joinform-child" />
                <div className="jdiv7"><button type='submit'>조인 만들기</button></div>
                <label className="jradio-button-setonon">
                    <input type='radio' name='partner' className="jdiv31"/>동반자 없음
                </label>
                <label className="jradio-button-setoffon" onClick={openPartnerForm2}>
                    <input type='radio' name='partner' className="jdiv31"/>동반자 2명
                </label>
                <label className="jradio-button-setoffon1" onClick={openPartnerForm}>
                    <input type='radio' name='partner' className="jdiv31"/>동반자 1명
                </label>
            </form>

            {isPartnerForm2Open && (
                <PortalPopup
                    overlayColor="rgba(113, 113, 113, 0.3)"
                    placement="Centered"
                    onOutsideClick={closePartnerForm2}
                >
                    <PartnerForm2 onClose={closePartnerForm2} />
                </PortalPopup>
            )}
            {isPartnerFormOpen && (
                <PortalPopup
                    overlayColor="rgba(113, 113, 113, 0.3)"
                    placement="Centered"
                    onOutsideClick={closePartnerForm}
                >
                    <PartnerForm onClose={closePartnerForm} />
                </PortalPopup>
            )}
        </div>
            );
        };


export default JoinForm;
