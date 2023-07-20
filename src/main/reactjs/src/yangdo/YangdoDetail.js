import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Axios from "axios";
import Modal from '../components/Modal';
import "./YangdoDetail.css";

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

    useEffect(() => {
        // API 요청 등을 통해 데이터를 가져오고 설정하는 로직
        // ...
      
        if (dto && dto.yprice !== undefined) {
          console.log(dto.yprice.toLocaleString());
        }
      }, [dto]);


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
        <div className="yangdodetail">

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


            <div className="YDDgreenlbtn">
                <div className="YDDgreenlbtn1">
                    <div className="YDDgreenlbtn-child" />
                    
                    {
                        unum !=null && unum==dto.unum?
                        <button type='button' className="YDDdiv"
                            onClick={()=>{
                                const url=`/yangdo/delete?num=${dto.ynum}`;
                                Axios.delete(url)
                                .then(res=>{
                                    // 목록으로 이동
                                    alert("마감 / 삭제하시겠습니까?");
                                    navi(`/yangdo/list/${currentPage}`);
                                })
                        }}>마감 / 삭제</button>:
                        <button type='button' className="YDDdiv" onClick={openModal}>양도 신청</button>
                    }
                    
                </div>
            </div>
            <div className="YDDjdinfo">
                    <div className="YDDdiv1">{dto.yplace}</div>
                <div className="YDDsingle-line-item">
                    <div className="YDDlabel">{dto.ywriteday} 등록</div>
                </div>
                <div className="YDDcontent-area">
                    <div className="YDDsingle-line-item1">
                        <img className="YDDicon" alt="" src="/time.svg" />
                        <div className="YDDlabel1">{dto.yday} {dto.ysubject}</div>
                    </div>
                    <div className="YDDsingle-line-item1">
                        <img className="YDDicon" alt="" src="/payment.svg" />
                        <div className="YDDlabel1">{dto.yprice? dto.yprice.toLocaleString() : '가격 정보 없음'}원</div>

                    </div>
                    <div className="YDDsingle-line-item1">
                        <div className="YDDicon" />
                        <div className="YDDlabel1">{dto.ycontent}</div>
                    </div>
                    <div className="YDDsettings-3">
                        <div className="YDDlist-item-group-subtitle" />
                        <div className="YDDsingle-line-item4" />
                        <div className="YDDlist-item-group-subtitle" />
                        <div className="YDDselection-control-list-item" />
                        <div className="YDDsingle-line-item5">
                            <img className="YDDicon" alt="" src="/time1.svg" />
                            <div className="YDDlabel1">{`2023.07.12 17:37 `}</div>
                            <img className="YDDicon" alt="" src="/secondary-action.svg" />
                        </div>
                        <div className="YDDsingle-line-item4" />
                        <div className="YDDsingle-line-item4" />
                        <div className="YDDlist-item-group-subtitle2">
                            <div className="YDDsubtitle">
                                <div className="YDDlabel5">{`위약금 규정 `}</div>
                            </div>
                        </div>
                        <div className="YDDsingle-line-item8">
                            <div className="YDDlabel1">골프장 규정에 따름</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="YDDflistprofile">
                <div className="YDDflistprofile1">
                    <img className="YDDjduphoto-icon" alt="" src="/jduphoto@2x.png" />
                    <div className="YDDdiv2">
            <span className="YDDtxt">
              <p className="YDDp">{dto.unickname}</p>
              <p className="YDDp1">{dto.ugender}, {dto.uage}</p>
            </span>
                    </div>
                    <div className="YDDrectangle-parent">
                        <div className="YDDgroup-child" />
                        <div className="YDDdiv3">채팅하기</div>
                    </div>
                </div>
            </div>
            <div className="YDDparent">
                <div className="YDDdiv4">양도자 정보
                <div className="YDDdiv5">신고하기</div>
                </div>
            </div>
        </div>
    );
}

export default YangdoDetail;