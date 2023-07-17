import React, {useCallback, useEffect, useState} from 'react';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import Axios from "axios";
import Modal from '../components/Modal';

function YangdoDetail(props) {

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const [dto,setDto] = useState({});
    const {ynum, currentPage} = useParams();

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

    const selectData=()=>{
        const url = `/yangdo/detail?num=${ynum}`;
        Axios.get(url)
            .then(res=>{
                setDto(res.data);
            })
    }

    useEffect(()=>{
        selectData();
    },[]);

    return (
        <div>

            <React.Fragment>
                <Modal open={modalOpen} close={closeModal} header="양도 문의">
                    <div>
                        <h5>[{dto.yplace}]</h5>
                        <p>담당자 : {dto.unickname}</p>
                        <p>연락처 : {dto.uhp}</p>
                        <p>
                            전화 문의를 통해 자세한 정보
                            확인 바랍니다.
                        </p>
                    </div>
                </Modal>
            </React.Fragment>

            <b>골프장 : {dto.yplace}</b><br/>
            <b>작성자 : {dto.unickname}</b><br/>
            <b>작성일 : {dto.ywriteday}</b><br/>
            <b>가격 : {dto.yprice}</b><br/>
            <b>예약 일정 : {dto.yday}</b><br/>
            <b>예약 시간 : {dto.ysubject}</b><br/>
            <b>상세 내용 : {dto.ycontent}</b><br/>

            <button type='button' onClick={()=>navi(`/yangdo/form`)}>글쓰기</button>
            <br/>
            <button type='button' onClick={()=>navi(`/yangdo/list/${currentPage}`)}>목록</button>
            <br/>

            {
                unum !=null && unum==dto.unum?
                    <button type='button' onClick={()=>navi(`/yangdo/update/${dto.ynum}/${currentPage}`)}>
                        수정</button> :''
            }

            <br/>

            {
                unum !=null && unum==dto.unum?
                <button type='button'
                    onClick={()=>{
                        const url=`/yangdo/delete?num=${dto.ynum}`;
                        Axios.delete(url)
                        .then(res=>{
                            // 목록으로 이동
                            alert("마감 / 삭제하시겠습니까?");
                            navi(`/yangdo/list/${currentPage}`);
                        })
                }}>마감 / 삭제</button>:
                <button type='button' onClick={openModal}>양도 신청</button>
            }
        </div>
    );
}

export default YangdoDetail;