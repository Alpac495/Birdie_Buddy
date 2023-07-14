import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Axios from "axios";
import Modal from '../components/Modal';

function YangdoUpdate(props) {

    
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

       const url="/yangdo/update";
       Axios.post(url,yangdoData)
       .then(res=>{
           
           // 상세 페이지로 이동
           navi(`/yangdo/detail/${ynum}/${currentPage}`);
       })

   }

    return (
        <div>

            <React.Fragment>
                <Modal open={modalOpen} close={closeModal} header="골프장 목록">
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
                <b>골프장 : </b>
                <input type='text' required
                       value={yangdoData.yplace}
                       onClick={openModal}
                       onChange={
                           (e)=> setYangdoData({
                               ...yangdoData,
                               "yplace":e.target.value
                           })}
                        />
                <br/>

                <b>가격 : </b>
                <input type='text' required
                       value={yangdoData.yprice}
                       onChange={
                           (e)=> setYangdoData({
                               ...yangdoData,
                               "yprice":e.target.value
                           })}/>
                <br/>

                <b>예약날짜 : </b>
                <input type='date' required
                       value={yangdoData.yday}
                       onChange={
                           (e)=> setYangdoData({
                               ...yangdoData,
                               "yday":e.target.value
                           })}/>
                <br/>

                <b>시간 : </b>
                <input type='time' required
                       value={yangdoData.ysubject}
                       onChange={
                           (e)=> setYangdoData({
                               ...yangdoData,
                               "ysubject":e.target.value
                           })}/>
                <br/>

                <b>내용 : </b>
                <textarea value={yangdoData.ycontent}
                          onChange={
                              (e)=>setYangdoData({
                                  ...yangdoData,
                                  "ycontent":e.target.value
                              })}></textarea>
                <br/>

                <button type='submit' onClick={onSubmitEvent}>수정</button>

            </div>
        </div>
    );
}

export default YangdoUpdate;