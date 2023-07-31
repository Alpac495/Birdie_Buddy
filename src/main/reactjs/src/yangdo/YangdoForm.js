import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import Modal from "../components/Modal";
import "./YangdoForm.css";
import Header from '../header/Header';

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
        }else if(yprice == 0){
            alert("1원 이상의 가격을 입력해주세요")
        }else if(!yday) {
            alert("예약 날짜를 입력해주세요.")
        }else if(!ysubject) {
            alert("예약 시간을 입력해주세요.")
        }else{
            Axios.post("/yangdo/insert", {unum, ycontent, yprice, yday, ysubject, yplace})
                .then(res => {

                    // 목록으로 이동
                    navi("/yangdo/list")
                });
        }
    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className="yangdoform">
            <div className="header"><Header/></div>
            <React.Fragment>
                <Modal open={modalOpen} close={closeModal} header="골프장 목록">
                    <div>
                        <input className="joinsearch"
                               type="text"
                               placeholder="   검색                                                         🔎"
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

            <div className="yform">

                <div className="yframe-yfparent">
                    <div className="yframe-yfwrapper">
                        <div className="yfgroup">
                            <div className="yfdiv">골프장</div>
                            <input
                                className="yfemail1"
                                type="text"
                                //placeholder=""
                                maxLength
                                minLength
                                onChange={
                                    (e)=> setYplace(e.target.value)
                                } value={yplace} onClick={openModal}
                            />
                        </div>
                    </div>

                    <div className="yframe-yfwrapper">
                        <div className="yfgroup">
                            <div className="yfdiv">날짜</div>
                            <input
                                className="yfemail2"
                                type="date"
                                //placeholder=""
                                maxLength
                                minLength
                                onChange={
                                    (e)=> setYday(e.target.value)
                                } value={yday}
                            />
                        </div>
                    </div>

                    <div className="yframe-yfwrapper">
                        <div className="yfgroup">
                            <div className="yfdiv">시간</div>
                            <input className="yfemail2" type="time" maxLength minLength 
                                onChange={
                                    (e)=> setYsubject(e.target.value)
                                } value={ysubject}
                            />
                        </div>
                    </div>

                    <div className="yframe-yfwrapper">
                        <div className="yfgroup">
                            <div className="yfdiv">금액</div>
                            <input
                                className="yfemail1"
                                type="text"
                                //placeholder=""
                                maxLength
                                minLength
                                onChange={
                                    (e)=> setYprice(e.target.value)
                                } value={yprice}
                            />
                        </div>
                    </div>

                    <div className="yframe-yfwrapper">
                        <div className="yfgroup">
                            <div className="yfdiv">내용</div>
                            <textarea
                                className="yfemail"
                                // placeholder=""
                                maxLength
                                minLength
                                value={ycontent}
                                onChange={(e)=>setYcontent(e.target.value)
                                }></textarea>
                        </div>
                    </div>

                </div>

                <div className="yflogo-ex" />

                <div className="yfbtngroup">
                    <div className="yfgraylbtn">

                        <button className="yfgraylbtn-child"
                            type='button' onClick={goBack}>닫기
                        </button>
                    </div>
                
                    <div className="yfpopupbtn">
                        <button className="yframe"
                            type='submit' onClick={onSubmitEvent}>양도 작성
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default YangdoForm;