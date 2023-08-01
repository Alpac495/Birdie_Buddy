import "./JoinForm.css";
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import Modal from '../components/Modal';
import PartnerForm from "../components/PartnerForm";
import PortalPopup from "../components/PortalPopup";
import PartnerForm2 from "../components/PartnerForm2";
import Header from "../header/Header";
import searchCon from "../image/search.svg";

const JoinForm = (props) => {

    const [jcontent,setJcontent]=useState('');
    const [jjoinday,setJoinday]=useState('');
    const [gname,setGname]=useState('');
    const [jprice,setJprice]=useState('');
    const [jtime,setJtime]=useState('');
    const [jage,setJage]=useState('');
    const [jp1gender, setJp1gender] = useState("");
    const [jp1age, setJp1age] = useState("");
    const [jp1tasu, setJp1tasu] = useState("");
    const [jp2gender, setJp2gender] = useState("");
    const [jp2age, setJp2age] = useState("");
    const [jp2tasu, setJp2tasu] = useState("");
    const [jucount, setJucount] = useState("1");

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const navi=useNavigate();

    const [unum, setUnum]=useState(0);
    const unumchk=()=>{
        Axios.get("/apilogin/unumChk?unum="+unum)
            .then(res=>{
                setUnum(res.data);
            })
    }
    useEffect(() => {
        unumchk()
    }, [])
    console.log(unum)
    const [data,setData]=useState('');
    const list=useCallback(()=>{
        const url="/apigolfjang/list";
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
        // 동반자 없음이 선택되어 있을 경우 값에 빈 문자열("") 할당
        const jp1genderValue = noPartnerInputRef.current && noPartnerInputRef.current.checked ? "" : jp1gender;
        const jp1ageValue = noPartnerInputRef.current && noPartnerInputRef.current.checked ? "" : jp1age;
        const jp1tasuValue = noPartnerInputRef.current && noPartnerInputRef.current.checked ? "" : jp1tasu;
        const jp2genderValue = noPartnerInputRef.current && noPartnerInputRef.current.checked ? "" : jp2gender;
        const jp2ageValue = noPartnerInputRef.current && noPartnerInputRef.current.checked ? "" : jp2age;
        const jp2tasuValue = noPartnerInputRef.current && noPartnerInputRef.current.checked ? "" : jp2tasu;
        const jucountValue = noPartnerInputRef.current && noPartnerInputRef.current.checked ? "1" : jucount;
        Axios.post("/apijoining/insert",{
            unum,jcontent,jjoinday,gname,jprice, jtime, jage, 
            jp1gender: jp1genderValue, jp1age: jp1ageValue, jp1tasu: jp1tasuValue,
             jp2gender: jp2genderValue, jp2age: jp2ageValue, jp2tasu: jp2tasuValue, jucount: jucountValue})
            .then(res=>{
                // onMakerEvent()
                alert("정상적으로 생성되었습니다")
                //목록으로 이동
                navi(`/joining/alllist`)
            })
    }

    const selectGolfjang=(e)=>{
        const selectedValue = e.target.innerText;
        setGname(selectedValue);
        {closeModal()}
    }
    //동반자 모달
    const [isPartnerForm2Open, setPartnerForm2Open] = useState(false);
    const [isPartnerFormOpen, setPartnerFormOpen] = useState(false);
    const noPartnerInputRef = useRef(null);

    const openPartnerForm2 = useCallback(() => {
        setPartnerForm2Open(true);
    }, []);

    const closePartnerForm2 = useCallback(() => {
        setPartnerForm2Open(false);
        if (noPartnerInputRef.current) {
            noPartnerInputRef.current.checked = true;
        }
    }, []);

    const openPartnerForm = useCallback(() => {
        setPartnerFormOpen(true);
    }, []);

    const closePartnerForm = useCallback(() => {
        setPartnerFormOpen(false);
        if (noPartnerInputRef.current) {
            noPartnerInputRef.current.checked = true;
        }
    }, []);

    const partnerone = (jp1gender,jp1age,jp1tasu) => {
        setJp1gender(jp1gender);
        setJp1age(jp1age);
        setJp1tasu(jp1tasu);
        setJucount(2);
        setPartnerFormOpen(false);
    }
    const partnertwo = (jp1gender,jp1age,jp1tasu,jp2gender,jp2age,jp2tasu) => {
        setJp1gender(jp1gender);
        setJp1age(jp1age);
        setJp1tasu(jp1tasu);
        setJp2gender(jp2gender);
        setJp2age(jp2age);
        setJp2tasu(jp2tasu);
        setJucount(3);
        setPartnerForm2Open(false);
    }

    
    return (
        <div className="JFjoinform">
            <div className="header"><Header/></div>
            <React.Fragment>
                <Modal open={modalOpen} close={closeModal} header="골프장 검색">
                    <div>
                        <div>
                            <input className="joinsearch"
                                type="text"
                                placeholder=" 검색"
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                }}/> 
                            <img className="YFsearch" alt="" src={searchCon}/>
                        </div>
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
            
                
                    <div className="JFframe">
                        <div className="JFdiv1">
                        <div className="JFdiv2">골프장</div>
                        </div>
                        <input className="JFemail" type="search" placeholder="골프장을 입력하세요" onClick={openModal}
                               value={gname} onChange={(e)=>setGname(e.target.value)} required maxLength minLength />
                    </div>
                    <div className="JFframe1">
                        <div className="JFdiv1">날짜</div>
                        <input className="JFemail" type="date" placeholder="조인 날짜를 입력하세요"
                               value={jjoinday} onChange={(e)=>setJoinday(e.target.value)} required maxLength minLength />
                    </div>
                    <div className="JFframe2">
                        <div className="JFdiv1">시간</div>
                        <input className="JFemail" type="time" placeholder={"조인 시간을 입력하세요"}
                               value={jtime} onChange={(e)=>setJtime(e.target.value)} required maxLength minLength />
                    </div>
                
                
                    <div className="JFframe3">
                        <div className="JFdiv1">연령대</div>
                        {/*<input className="jforminput" type="text"  required placeholder="원하는 조인 멤버의 연령대를 입력하세요"*/}
                        {/*       value={jage} onChange={(e)=>setJage(e.target.value)} maxLength minLength />*/}
                        <select className="JFemail" required onChange={(e)=>setJage(e.target.value)}>
                            <option disabled hidden selected value="">원하는 연령대를 선택하세요</option>
                            <option value={"연령무관"}>연령무관</option>
                            <option value={"20대만"}>20대만</option>
                            <option value={"30대만"}>30대만</option>
                            <option value={"40대이상"}>40대이상</option>
                            <option value={"20~30대"}>20~30대</option>
                            <option value={"30~40대"}>30~40대</option>
                            <option value={jage} hidden></option>
                        </select>
                    </div>
                    <div className="JFframe4">

                        <div className="JFdiv1">그린피 (단위 원)</div>
                        <input className="JFemail2" type="number"  required step={10000} placeholder={"ex) 150000"}
                               value={jprice} onChange={(e)=>setJprice(e.target.value)} maxLength minLength />
                    </div>
                    <div className="JFframe5">
                        <div className="JFdiv1">조인설명</div>
                        <input className="JFemail" type="text"  required placeholder="조인에 대한 간단한 설명을 입력하세요"
                               value={jcontent} onChange={(e)=>setJcontent(e.target.value)} maxLength minLength />
                    </div>
                
           
                <label className="jradio-button-setonon">
                    <input type='radio' name='partner' className="jdiv31" ref={noPartnerInputRef} required/>동반자 없음
                </label>
                <label className="jradio-button-setoffon" onClick={openPartnerForm2}>
                    <input type='radio' name='partner' className="jdiv31"/>동반자 2명
                </label>
                <label className="jradio-button-setoffon1" onClick={openPartnerForm}>
                    <input type='radio' name='partner' className="jdiv31"/>동반자 1명
                </label>

            <div className="JFlbtn">
                    <div className="JFlbtn-child" />               
                <button type='submit' className="JFdiv21">조인 만들기</button>
            </div>        

                <input type='hidden' value={jp1gender}/>
                <input type='hidden' value={jp1age}/>
                <input type='hidden' value={jp1tasu}/>
                <input type='hidden' value={jp2gender}/>
                <input type='hidden' value={jp2age}/>
                <input type='hidden' value={jp2tasu}/>
            </form>

            {isPartnerForm2Open && (
                <PortalPopup
                    overlayColor="rgba(113, 113, 113, 0.3)"
                    placement="Centered"
                    onOutsideClick={closePartnerForm2}
                    
                >
                    <PartnerForm2 props={closePartnerForm2} propFunction={partnertwo}/>
                </PortalPopup>
            )}
            {isPartnerFormOpen && (
                <PortalPopup
                    overlayColor="rgba(113, 113, 113, 0.3)"
                    placement="Centered"
                    onOutsideClick={closePartnerForm}
                >
                    <PartnerForm props={closePartnerForm} propFunction={partnerone} />
                </PortalPopup>
            )}
        </div>
            );
        };


export default JoinForm;
