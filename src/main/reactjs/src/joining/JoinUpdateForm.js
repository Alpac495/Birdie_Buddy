import "./JoinUpdateForm.css";
import React, {useCallback, useEffect, useState} from 'react';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import Axios from 'axios';
import Modal from '../components/Modal';
import PartnerForm from "../components/PartnerForm";
import PortalPopup from "../components/PortalPopup";
import PartnerForm2 from "../components/PartnerForm2";
import JoinDetail from "./JoinDetail";


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
    
    console.log(jnum)
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    // const [modalOpen, setModalOpen] = useState(false);
    // const openModal = () => {
    //     setModalOpen(true);
    // };
    // const closeModal = () => {
    //     setModalOpen(false);
    // };

    const navi=useNavigate();
    
    // const [data,setData]=useState('');
    // const list=useCallback(()=>{
    //     const url="/golfjang/list";
    //     Axios.get(url)
    //         .then(res=>{
    //             setData(res.data);
    //             console.log(res.data)
    //         })
    // },[]);

    // useEffect(()=>{
    //     list();
    // },[list])

    // const [searchTerm, setSearchTerm] = useState("");

    const selectData=useCallback(()=>{
        const url="/joining/detail?jnum="+(jnum);
        Axios({
            type:'get',
            url,
        }).then(res=>{
            setDto(res.data);
            setJprice(res.data.jprice);
            setJage(res.data.jage);
            setJcontent(res.data.jcontent);
            setJucount(res.data.jucount);
        })
    },[])

    useEffect(()=>{
        selectData();
    },[selectData]);


    const onSubmitEvent=(e)=>{
        e.preventDefault();
        Axios.post("/joining/update",{jnum,jcontent,jprice, jage, jp1gender, jp1age, jp1tasu, jp2gender, jp2age, jp2tasu, jucount})
            .then(res=>{
                // onMakerEvent()
                alert("정상적으로 수정되었습니다")
                //목록으로 이동
                navi(`/joining/detail/${jnum}/${unum}`)
            })
    }

    // const selectGolfjang=(e)=>{
    //     const selectedValue = e.target.innerText;
    //     setGname(selectedValue);
    //     {closeModal()}
    // }
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

    // const originalData = (jprice,jage,jcontent) => {
    //     setJprice(jprice);
    //     setJage(jage);
    //     setJcontent(jcontent);
    // }

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

            {/* <React.Fragment>
                <Modal open={modalOpen} close={closeModal} header="Modal heading">
                    <div>
                        <input style={{marginLeft:'50px'}}
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
            </React.Fragment> */}
            <form onSubmit={onSubmitEvent}>
            <div className="jregister" />
            <div className="uframe-parent">
                {/* <div className="frame-group">
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
                </div> */}
                <div className="uframe-container">
                    <div className="ujparent">
                        <div className="jdiv1">#하기 내용 전체 재입력이 필요합니다.<br/>
                        #동반자가 있을 경우 동반자 정보도 <br/>&nbsp;&nbsp;반드시! 재입력 해주세요.</div><br/>
                        <div className="jdiv">연령대</div>
                        {/*<input className="jforminput" type="text"  required placeholder="원하는 조인 멤버의 연령대를 입력하세요"*/}
                        {/*       value={jage} onChange={(e)=>setJage(e.target.value)} maxLength minLength />*/}
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
                <div className="updatejdiv7"><button type='submit'>조인 수정하기</button></div>
                <label className="juradio-button-setonon">
                    <input type='radio' name='partner' className="jdiv31"/>동반자 없음
                </label>
                <label className="juradio-button-setoffon" onClick={openPartnerForm2}>
                    <input type='radio' name='partner' className="jdiv31"/>동반자 2명
                </label>
                <label className="juradio-button-setoffon1" onClick={openPartnerForm}>
                    <input type='radio' name='partner' className="jdiv31"/>동반자 1명
                </label>
                
                <input type='hidden' value={jp1gender}/>
                <input type='hidden' value={jp1age}/>
                <input type='hidden' value={jp1tasu}/>
                <input type='hidden' value={jp2gender}/>
                <input type='hidden' value={jp2age}/>
                <input type='hidden' value={jp2tasu}/>
                <input type='hidden' value={jucount}/>
            </form>
            {/* <JoinDetail propFunction={originalData} /> */}
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
