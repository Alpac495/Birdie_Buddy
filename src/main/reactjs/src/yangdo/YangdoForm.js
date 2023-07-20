import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import Modal from "../components/Modal";
import "./YangdoForm.css";

function YangdoForm(props) {

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const [data,setData]=useState('');
    const [searchTerm, setSearchTerm] = useState("");

    const [ysubject, setYsubject] = useState('');
    const [ycontent,setYcontent] = useState('');
    const [yprice,setYprice] = useState('');
    const [yplace,setYplace] = useState('');
    const [yday,setYday] = useState('');

    const navigate = useNavigate();

    const list=useCallback(()=>{
        const url="/golfjang/list";
        Axios.get(url)
            .then(res=>{
                setData(res.data);
                console.log(res.data)
            })
    },[]);

    const selectGolfjang=(e)=>{
        const selectedValue = e.target.innerText;
        setYplace(selectedValue);
        {closeModal()}
    }

    useEffect(()=>{
        list();
    },[list])

    const navi = useNavigate();

    const [unum, setUnum]=useState(0);
    const unumchk=()=>{
        Axios.get("/login/unumChk?unum="+unum)
            .then(res=>{
                setUnum(res.data);
            })
    }
    useEffect(() => {
        unumchk()
    }, [])

    const onSubmitEvent = (e)=>{
        e.preventDefault();

        if (!yplace) {
            alert("골프장을 입력해주세요.")
        }else if(!yprice) {
            alert("가격을 입력해주세요.")
        }else if(isNaN(yprice)){
            alert("숫자로만 가격을 입력해주세요.")
        }else if(!yday) {
            alert("예약 날짜를 입력해주세요.")
        }else if(!ysubject) {
            alert("예약 시간을 입력해주세요.")
        }else{
            Axios.post("/yangdo/insert", {unum, ycontent, yprice, yday, ysubject, yplace})
                .then(res => {

                    // 목록으로 이동
                    navi("/yangdo/list/1")
                });
        }
    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className="yangdoform">
        <div className="joinform">
            <div className="parent">
            <div className="div">내용</div>
            <input
                className="email"
                type="text"
                placeholder=""
                maxLength
                minLength
            />
            </div>
            <div className="frame-parent">
            <div className="frame-group">
                <div className="group">
                <div className="div">골프장</div>
                <input
                    className="email1"
                    type="text"
                    placeholder=""
                    maxLength
                    minLength
                />
                </div>
                <div className="group">
                <div className="div">날짜</div>
                <input
                    className="email2"
                    type="text"
                    placeholder=""
                    maxLength
                    minLength
                />
                </div>
                <div className="group">
                <div className="div">시간</div>
                <input className="email2" type="text" maxLength minLength />
                </div>
            </div>
            <div className="frame-wrapper">
                <div className="group">
                <div className="div">금액</div>
                <input
                    className="email1"
                    type="text"
                    placeholder=""
                    maxLength
                    minLength
                />
                </div>
            </div>
            </div>
            <div className="logo-ex" />
            <div className="btngroup">
            <div className="graylbtn">
                <div className="graylbtn-child" />
                <div className="div5">닫기</div>
            </div>
            <div className="popupbtn">
                <div className="frame">
                <div className="div6">양도 신청</div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default YangdoForm;