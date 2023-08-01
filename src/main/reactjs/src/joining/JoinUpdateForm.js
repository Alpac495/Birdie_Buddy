import "./JoinUpdateForm.css";
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import Axios from 'axios';
import Modal from '../components/Modal';
import PartnerForm from "../components/PartnerForm";
import PortalPopup from "../components/PortalPopup";
import PartnerForm2 from "../components/PartnerForm2";
import JoinDetail from "./JoinDetail";
import Header from "../header/Header";


const JoinUpdateForm = () => {
    const {unum,jnum} = useParams('');    
    const [dto,setDto]=useState({});    
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
    const [jucount, setJucount] = useState("");
    
    const navi=useNavigate();

    const selectData=useCallback(()=>{
        const url="/apijoining/detail?jnum="+(jnum);
        Axios({
            type:'get',
            url,
        }).then(res=>{
            setDto(res.data);
            setJprice(res.data.jprice);
            setJage(res.data.jage);
            setJcontent(res.data.jcontent);
            setJucount(res.data.jucount);
            setJp1gender(res.data.jp1gender);
            setJp1age(res.data.jp1age);
            setJp1tasu(res.data.jp1tasu);
            setJp2gender(res.data.jp2gender);
            setJp2age(res.data.jp2age);
            setJp2tasu(res.data.jp2tasu);
        })
    },[])

    useEffect(()=>{
        selectData();
    },[selectData]);


    const onSubmitEvent=(e)=>{
        e.preventDefault();
        const jp1genderValue = noPartnerInputRef.current && noPartnerInputRef.current.checked ? "" : jp1gender;
        const jp1ageValue = noPartnerInputRef.current && noPartnerInputRef.current.checked ? "" : jp1age;
        const jp1tasuValue = noPartnerInputRef.current && noPartnerInputRef.current.checked ? "" : jp1tasu;
        const jp2genderValue = noPartnerInputRef.current && noPartnerInputRef.current.checked || onePartnerInputRef.current.checked ? "" : jp2gender;
        const jp2ageValue = noPartnerInputRef.current && noPartnerInputRef.current.checked || onePartnerInputRef.current.checked ? "" : jp2age;
        const jp2tasuValue = noPartnerInputRef.current && noPartnerInputRef.current.checked || onePartnerInputRef.current.checked ? "" : jp2tasu;
        const jucountValue = noPartnerInputRef.current && noPartnerInputRef.current.checked ? "1" : jucount;
        Axios.post("/apijoining/update",{
            jnum,jcontent,jjoinday,gname,jprice, jtime, jage, 
            jp1gender: jp1genderValue, jp1age: jp1ageValue, jp1tasu: jp1tasuValue,
             jp2gender: jp2genderValue, jp2age: jp2ageValue, jp2tasu: jp2tasuValue, jucount: jucountValue
            })
            .then(res=>{
                // onMakerEvent()
                alert("정상적으로 수정되었습니다")
                //목록으로 이동
                navi(`/joining/detail/${jnum}`)
            })
    }

    //동반자 모달
    const [isPartnerForm2Open, setPartnerForm2Open] = useState(false);
    const [isPartnerFormOpen, setPartnerFormOpen] = useState(false);
    const noPartnerInputRef = useRef(null);
    const onePartnerInputRef = useRef(null);

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
    console.log(jprice)

    return (
        <div className="ujoinform">
            <Header/>
            <form>
            <div className="jregister" />
            <div className="uframe-parent">
                <div className="uframe-container">
                    <div className="ujparent">
                        
                        <div className="jdiv">연령대</div>
                        <select className="jforminput" required onChange={(e)=>setJage(e.target.value)}>
                            <option disabled hidden selected>{jage}</option>
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

                        <div className="jdiv">그린피 (단위 원)</div>
                        <input className="jforminput1" type="number"  required step={10000} 
                               value={jprice} onChange={(e)=>setJprice(e.target.value)} maxLength minLength />
                    </div>
                    <div className="jparent2">
                        <div className="jdiv">조인설명</div>
                        <input className="jforminput5" type="text"  required 
                               value={jcontent} onChange={(e)=>setJcontent(e.target.value)} maxLength minLength />
                    </div>
                </div>
            </div>
            <div className="joinupdateform-child" />
                <div className="jdiv1">#동반자 정보 변경을 원하지 않을 경우<br/>선택하지마세요.</div><br/>
                <div className="updatejdiv7"><div onClick={onSubmitEvent} className="JDdiv10btn">조인 수정하기</div></div>
                <label className="juradio-button-setonon">
                    <input type='radio' name='partner' ref={noPartnerInputRef} className="jdiv31"/>동반자 없음
                </label>
                <label className="juradio-button-setoffon" onClick={openPartnerForm2}>
                    <input type='radio' name='partner' className="jdiv31"/>동반자 2명
                </label>
                <label className="juradio-button-setoffon1" onClick={openPartnerForm}>
                    <input type='radio' name='partner' ref={onePartnerInputRef} className="jdiv31"/>동반자 1명
                </label>
                
                <input type='hidden' value={jp1gender}/>
                <input type='hidden' value={jp1age}/>
                <input type='hidden' value={jp1tasu}/>
                <input type='hidden' value={jp2gender}/>
                <input type='hidden' value={jp2age}/>
                <input type='hidden' value={jp2tasu}/>
                <input type='hidden' value={jucount}/>
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


export default JoinUpdateForm;
