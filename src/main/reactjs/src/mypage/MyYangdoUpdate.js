import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import "../yangdo/YangdoForm.css";
import Header from '../header/Header';
import searchCon from "../image/search.svg";

function MyYangdoUpdate(props) {
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

    const navi = useNavigate();
    const {ynum,currentPage} = useParams();

    const [yangdoData,setYangdoData] = useState('');

    const getData=()=>{
        const detailUrl=`/yangdo/detail?num=${ynum}&currentPage=${currentPage}`;
        Axios.get(detailUrl)
            .then(res=>{
                setYangdoData(res.data); 
            })
    }

    useEffect(()=>{
        getData();
    },[]);

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
    },[list]);

    const selectGolfjang=(e)=>{
        const selectedValue = e.target.innerText;
        setYangdoData({
            ...yangdoData,
            "yplace":selectedValue
        });
        {closeModal()}
    }

    // submit 이벤트 발생시 호출함수
    const onSubmitEvent=(e)=>{

        // 기본 이벤트를 무효화(action 호출 막기 위해서)
       e.preventDefault();

        if (!yangdoData.yplace) {
            alert("골프장을 입력해주세요.")
        }else if(!yangdoData.yprice) {
            alert("가격을 입력해주세요.")
        }else if(isNaN(yangdoData.yprice)){
            alert("숫자로만 가격을 입력해주세요.")
        }else if(!yangdoData.yday) {
            alert("예약 날짜를 입력해주세요.")
        }else if(!yangdoData.ysubject) {
            alert("예약 시간을 입력해주세요.")
        }else {

            const url = "/yangdo/update";
            Axios.post(url, yangdoData)
                .then(res => {

                    // 상세 페이지로 이동
                    navi(`/mypage/myyangdodetail/${ynum}`);
                });
        }
   }

    const goBack = () => {
        navi(-1);
    }

    return (
        <div className="yangdoform">
            <Header/>
            <React.Fragment>
                <Modal open={modalOpen} close={closeModal} header="골프장 목록">
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
                                    if(searchTerm === ""){
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
                                placeholder="골프장을 입력하세요."
                                maxLength
                                minLength
                                value={yangdoData.yplace}
                                onClick={openModal}
                                onChange={
                                    (e)=> setYangdoData({
                                        ...yangdoData,
                                        "yplace":e.target.value
                                })}
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
                                value={yangdoData.yday}
                                onChange={
                                    (e)=> setYangdoData({
                                        ...yangdoData,
                                        "yday":e.target.value
                                })}
                            />      
                        </div>
                    </div>

                    <div className="yframe-yfwrapper">
                        <div className="yfgroup">
                            <div className="yfdiv">시간</div>
                            <input className="yfemail2" type="time" 
                                maxLength 
                                minLength 
                                value={yangdoData.ysubject}
                                onChange={
                                    (e)=> setYangdoData({
                                        ...yangdoData,
                                        "ysubject":e.target.value
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="yframe-yfwrapper">
                        <div className="yfgroup">
                            <div className="yfdiv">금액</div>
                            <input
                                className="yfemail1"
                                type="text"
                                placeholder="ex) 150000"
                                maxLength
                                minLength
                                value={yangdoData.yprice}
                                onChange={
                                    (e)=> setYangdoData({
                                        ...yangdoData,
                                        "yprice":e.target.value
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="yframe-yfwrapper">
                        <div className="yfgroup">
                            <div className="yfdiv">내용</div>
                            <textarea
                                className="yfemail"
                                placeholder="내용을 입력해주세요."
                                maxLength
                                minLength
                                value={yangdoData.ycontent}
                                onChange={
                                    (e)=>setYangdoData({
                                        ...yangdoData,
                                        "ycontent":e.target.value
                                    })
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
                            type='submit' onClick={onSubmitEvent}>양도 수정
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default MyYangdoUpdate;