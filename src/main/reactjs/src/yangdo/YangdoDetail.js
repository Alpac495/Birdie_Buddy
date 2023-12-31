import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Axios from "axios";
import Modal from '../components/Modal';
import "./YangdoDetail.css";
import ProfileImg from "../image/user60.png";
import TimeIcon from "../image/icon_time.svg";
import CardIcon from "../image/icon_card.svg";
import TextIcon from "../image/icon_text.svg";
import SettingIcon from "../image/icon_setting.svg";
import * as ncloudchat from 'ncloudchat';
import Header from '../header/Header';

function YangdoDetail(props) {

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const [dto,setDto] = useState([]);
    const {ynum, currentPage} = useParams();

    const navi = useNavigate();

    const photourl1 = process.env.REACT_APP_IMAGE1PROFILE;
    const photourl2 = process.env.REACT_APP_IMAGE60;

    const [data,setData] = useState('')

    const [unum, setUnum]=useState(0);

    const [nc, setNc] = useState(null);

    const unumchk= async ()=>{
        try {
            const res = await Axios.get("/apilogin/unumChk?unum="+unum)
            setUnum(res.data)

            const res2 = await Axios.get("/apichating/getuserinfo?unum="+res.data)
            setData(res2.data);

            const chat = new ncloudchat.Chat();
            await chat.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');
            setNc(chat);

            await chat.connect({
                id: res2.data.uemail,
                name: res2.data.unickname,
                profile: res2.data.uemail,
                customField: 'json',
            })
        } catch (error){
            console.error("error occurred: ",error)
        }
    }
    useEffect(() => {
        unumchk()
    }, [])

    const getChatInfo = async (unum, cunum) => {
        try {
            console.log("getChatInfo");
            console.log("unum1: "+unum);
            console.log("unum2: "+cunum);
            const response = await Axios.get(`/apichating/getchatinfo?unum1=${unum}&unum2=${cunum}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const disconnectChat = async () => {
            if (nc) {
                await nc.disconnect();
            }
        };

        window.addEventListener('beforeunload', disconnectChat);

        // When component unmounts, disconnect
        return () => {
            window.removeEventListener('beforeunload', disconnectChat);
            disconnectChat();
        };
    }, [nc]);

    const onChatEvent = async (cunum) => {
        if (nc) {
            try {
                const chatid = await getChatInfo(unum, cunum);
                console.log("chatid:"+chatid);
                if (chatid) {
                    // chatid != null 일 경우
                    await nc.disconnect();
                    navi(`/chating/room/${chatid}/${cunum}`);
                } else {
                    // chatid == null 일 경우
                    const newchannel = await nc.createChannel({ type: 'PUBLIC', name: String(unum) + " " + String(cunum)});
                    const newChatId = newchannel.id;
                    await Axios.post("/apichating/insertchatid", {unum, cunum, chatid: newChatId});
                    await nc.subscribe(newChatId);
                    // 채팅방으로 이동
                    await nc.disconnect();
                    navi(`/chating/room/${newChatId}/${cunum}`);
                }
            } catch (error) {
                console.error('Error creating and subscribing channel:', error);
            }
        }
    };

    useEffect(() => {
        if (dto && dto.yprice !== undefined) {
          console.log(dto.yprice.toLocaleString());
        }
      }, [dto]);


    const selectData=()=>{
        const url = `/apiyangdo/detail?num=${ynum}`;
        Axios.get(url)
            .then(res=>{
                setDto(res.data);
            })
    }

    // 현재 나이를 구하는 함수
    const calculateAge = (birthDate) => {
        const birthYear = new Date(birthDate).getFullYear();
        const currentYear = new Date().getFullYear();
        return currentYear - birthYear;
    };

    // 날짜를 원하는 형식으로 포맷팅하는 함수
    const formatWDate = (dateString) => {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear().toString();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // 1월은 0이므로 +1 해주고 두 자리로 맞추기
        const day = dateObj.getDate().toString().padStart(2, '0'); // 두 자리로 맞추기
        const hours = dateObj.getHours().toString().padStart(2, '0'); // 두 자리로 맞추기
        const minutes = dateObj.getMinutes().toString().padStart(2, '0'); // 두 자리로 맞추기

        return `${year}.${month}.${day} ${hours}:${minutes}`;
    };

    // 날짜를 원하는 형식으로 포맷팅하는 함수
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear().toString().slice(2); // 뒤의 두 자리만 가져오기
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // 1월은 0이므로 +1 해주고 두 자리로 맞추기
        const day = dateObj.getDate().toString().padStart(2, '0'); // 두 자리로 맞추기
        const dayOfWeek = dateObj.toLocaleDateString("ko-KR", { weekday: "short" }); // 요일 정보 가져오기
        
        return `${year}.${month}.${day} (${dayOfWeek})`;
    };

    
    useEffect(()=>{
        selectData();
    },[]);

    return (
        <div className="YEyangdodetailend">
            <Header/>
            <React.Fragment>
                <Modal open={modalOpen} close={closeModal} header="양도 문의">
                    <div className="YMyangdopopup">
                        <div className="YMtitle">[{dto.yplace}]</div>
                        <div className="YMtext">
                            <span className="YMtext-txt">
                            <p className="YMp">담당자 : {dto.uname}</p>
                            <p className="YMp">연락처 : {dto.uhp}</p>
                            </span>
                        </div>
                        <div className="YMtext1">전화 문의를 통해 자세한 정보 확인 바랍니다.</div>
                    </div>
                </Modal>
            </React.Fragment>

            <div className="YEyangdodetailend-child" />
            <div className="YEgreenstroke-parent">
                <div className="YEgreenstroke">
                    <div className="YEframe-parent">
                        <div className="YEwrapper">
                            <div className="YEdiv">{dto.yplace}</div>
                        </div>
                        <div className="YEframe-group">
                            <div className="YElabel-wrapper">
                                <div className="YElabel">{formatWDate(dto.ywriteday)} 등록</div>
                            </div>
                            <div className="YEgroup-wrapper">
                                <div className="YEparent">
                                    {
                                        unum !==null && unum===dto.unum?
                                        <label className='YElabelUp'
                                            onClick={()=>
                                                navi(`/yangdo/update/${dto.ynum}`)
                                            }
                                        >
                                            <div className="YEdiv1">수정</div>
                                            <img className="YEgroup-child" alt="" src={SettingIcon} />
                                        </label>:''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="YEsingle-line-item-parent">
                        <div className="YEsingle-line-item">
                            <img className="YEtime-icon" alt="" src={TimeIcon} />
                            <div className="YElabel1">{formatDate(dto.yday)} {dto.ysubject}</div>
                        </div>
                        <div className="YEsingle-line-item">
                            <img className="YEtime-icon" alt="" src={CardIcon} />
                            <div className="YElabel1">
                                {dto.yprice? dto.yprice.toLocaleString() : '가격 정보 없음'}원
                            </div>
                        </div>
                        <div className="YEsingle-line-item">
                            <img className="YEicon-note-1" alt="" src={TextIcon} />
                            <div className="YElabel1">
                                {
                                    dto.ycontent === ''?'내용 없음': dto.ycontent
                                }
                            </div>
                            <div className="YEsecondary-action" />
                        </div>
                    </div>
                    <div className="YElist-item-group-subtitle-parent">
                        <div className="YElist-item-group-subtitle">
                            <div className="YEsubtitle">
                                <div className="YElabel4">{`위약금 규정 `}</div>
                            </div>
                        </div>
                        <div className="YEsingle-line-item3">
                            <div className="YElabel1">골프장 규정에 따름</div>
                        </div>
                    </div>
                </div>
                <div className="YEframe-container">
                    <div className="YEgroup">
                        <div className="YEdiv2">양도자 정보</div>
                    </div>
                    <div className="YEflistprofile">
                        <div className="YEflistprofile1">
                            {
                                dto.uphoto == null?<img className="YEjduphoto-icon" alt="" 
                                src={ProfileImg} />:
                                <img className="YEjduphoto-icon" alt="" 
                                src={`${photourl1}${dto.uphoto}${photourl2}`} />
                            }
                            <div className="YEdiv4">
                <span className="YEtxt">
                  <p className="YEp">{dto.unickname}</p>
                  <p className="YEp1">{dto.ugender}, {calculateAge(dto.uage)}세</p>
                </span>
                            </div>
                            <div className="YErectangle-parent">
                                <div className="YEgroup-item" />
                                <div className="YEdiv5" onClick={onChatEvent.bind(null,dto.unum)}>채팅하기</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="YEgraylbtn-parent">
                    <div className="YEgraylbtn">
                        <button type='button' className="YEgraylbtn-child"
                            onClick={()=>navi(`/yangdo/list`)}>닫기</button>   
                    </div>
                    <div className="YEpopupbtn">
                        
                        {
                            unum !=null && unum==dto.unum || unum==1? 
                                <button type='button' className="YEframe"
                                    onClick={()=>{
                                        const url=`/apiyangdo/delete?num=${dto.ynum}`;
                                        window.confirm("마감 / 삭제하시겠습니까?") &&
                                        Axios.delete(url)
                                        .then((res)=>{
                                            // 목록으로 이동
                                            navi(`/yangdo/list/${currentPage}`);
                                        })
                                    }}>마감하기</button>:
                            <button type='button' className="YEframe" onClick={openModal}>양도 신청</button>
                        }
                         
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YangdoDetail;