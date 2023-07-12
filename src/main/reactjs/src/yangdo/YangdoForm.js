import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import Modal from "../components/Modal";

function YangdoForm(props) {

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const [gname,setGname]=useState('');
    const [data,setData]=useState('');
    const [searchTerm, setSearchTerm] = useState("");

    const [ysubject, setYsubject] = useState('');
    const [ycontent,setYcontent] = useState('');
    const [yprice,setYprice] = useState('');
    const [yplace,setYplace] = useState('');
    const [yday,setYday] = useState('');

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

    // 세션 스토리지에서 저장된 unum 가져오기
    const unum = sessionStorage.unum;

    const onSubmitEvent = (e)=>{
        e.preventDefault();

        Axios.post("/yangdo/insert",{unum,ycontent,yprice,yday,ysubject,yplace})
            .then(res=>{

                // 목록으로 이동
                navi("/yangdo/list")
            })
    }


    return (
        <div>

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

            <div>
                <b>제목 : </b>
                <input type='text' required
                       onChange={
                    (e)=> setYsubject(e.target.value)
                } value={ysubject}
                />
                <br/>

                <b>내용 : </b>
                <textarea value={ycontent}
                          onChange={
                    (e)=>setYcontent(e.target.value)}></textarea>
                <br/>

                <b>가격 : </b>

                <input type='text' required
                       onChange={
                           (e)=> setYprice(e.target.value)
                       } value={yprice}
                />

                <br/>

                <b>골프장 : </b>

                <input type='text' required
                       onChange={
                           (e)=> setYplace(e.target.value)
                       } value={yplace} onClick={openModal}
                />

                <br/>

                <b>예약날짜 : </b>

                <input type='date' required
                       onChange={
                           (e)=> setYday(e.target.value)
                       } value={yday}
                />

                <br/>

                <button type='submit' onClick={onSubmitEvent}>글쓰기</button>

                <img alt='' src={`${photoUrl}${yphoto}`} style={{width:'200px'}}/>

            </div>
        </div>
    );
}

export default YangdoForm;