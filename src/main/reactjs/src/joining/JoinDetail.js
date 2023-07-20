import "./JoinDetail.css";
import {useCallback, useEffect, useState} from "react";
import Axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import PartnerForm from "../components/PartnerForm";
import PortalPopup from "../components/PortalPopup";

const JoinDetail = () => {
    const {unum,jnum} = useParams('');
    const [dto,setDto]=useState({});
    const now = new Date();
    const year = now.getFullYear();
    const [confirm, setConfirm] = useState([]);
    const [sub, setSub] = useState([]);
    const [check, setCheck]=useState('');
    const [jp1gender, setJp1gender] = useState("");
    const [jp1age, setJp1age] = useState("");
    const [jp1tasu, setJp1tasu] = useState("");
    const [jcount, setJcount] = useState(1);

    const navi=useNavigate();

    //동반자 모달
    const [isPartnerFormOpen, setPartnerFormOpen] = useState(false);

    const openPartnerForm = useCallback(() => {
        setPartnerFormOpen(true);
    }, []);

    const closePartnerForm = useCallback(() => {
        setPartnerFormOpen(false);
    }, []);

    const partnerone = (jp1gender,jp1age,jp1tasu) => {
        setJp1gender(jp1gender);
        setJp1age(jp1age);
        setJp1tasu(jp1tasu);        
        setPartnerFormOpen(false);
        Axios.post("/joinmember/joinGaip", {unum, jnum, jp1gender, jp1age, jp1tasu, jcount})
                .then(res => {
                    window.location.replace(`/joining/detail/${jnum}/${unum}`)
                })
                .catch(err => {
                    console.log(err.message);
                })
    }

    const confirmlist = useCallback(() => {
        const url = "/joinmember/confirmlist?jnum="+(jnum);
        Axios.get(url)
            .then(res => {
                setConfirm(res.data);
                console.log(res.data);
            });
    }, []);

    useEffect(() => {
        confirmlist();
    }, [confirmlist]);

    const sublist = useCallback(() => {
        const url = "/joinmember/sublist?jnum="+(jnum);
        Axios.get(url)
            .then(res => {
                setSub(res.data);
                console.log(res.data);
            });
    }, []);

    useEffect(() => {
        sublist();
    }, [sublist]);

    const selectData=useCallback(()=>{
        const url="/joining/detail?jnum="+(jnum);
        Axios({
            type:'get',
            url,
        }).then(res=>{
            setDto(res.data);
        })
    },[])

    useEffect(()=>{
        selectData();
    },[selectData]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkmember = useCallback(()=>{
        const url=`/joinmember/checkmember/${unum}&${jnum}`;        
        Axios.get(url)
            .then(res=>{
                setCheck(res.data)
                console.log(res.data)
            })
            .catch(error => {
                // 오류 발생 시 처리할 로직
                console.error('오류 발생:', error)});
    }, );

    useEffect(()=>{
        checkmember();
    },[checkmember]);

    const onGaipEvent=(e)=>{
        e.preventDefault();
        if(3 - dto.jmcount === 0){
            alert("빈자리가 없습니다")
        }else{
        const confirmed = window.confirm('동반자가 있습니까? 있을경우 확인을, 없을경우 취소를 눌러주세요');
        if (confirmed) {
            setJcount(2);
            setPartnerFormOpen(true);   
        }else{
            Axios.post("/joinmember/joinGaip", {unum, jnum, jcount})
                .then(res => {
                    window.location.replace(`/joining/detail/${jnum}/${unum}`)
                })
                .catch(err => {
                    console.log(err.message);
                })
        }
        }
    }

    const onGaipCancelEvent=()=> {
        const confirmed = window.confirm('정말 취소하시겠습니까?');
        if (confirmed) {
            Axios.delete(`/joinmember/joinCancel/${unum}&${jnum}`)
                .then(res => {
                    alert("정상적으로 취소되었습니다");
                    window.location.replace(`/joining/detail/${jnum}/${unum}`)
                })
                .catch(err => {
                    console.log(err.message);
                })
             }
         };

    const onJoinCancelEvent=()=> {
        const confirmed = window.confirm('모집을 취소하시겠습니까?');
        if (confirmed) {
            Axios.delete(`/joining/joinCancel/${jnum}`)
                .then(res => {
                    alert("정상적으로 취소되었습니다");
                    window.location.replace(`/joining/list`)
                })
                .catch(err => {
                    console.log(err.message);
                })
        }
    };

    const onAcceptEvent = (unum) => {
        if(3 - dto.jmcount === 0){
            alert("빈자리가 없습니다")
        }else {
            const confirmed = window.confirm('신청을 수락하시겠습니까?');
            if (confirmed) {
                Axios.get(`/joinmember/acceptJoin/${unum}&${jnum}`)
                    .then(res => {
                        window.location.replace(`/joining/detail/${jnum}/${unum}`);
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            }
        }
    };

    


    return (
        <div className="joindetail">
            <div className="JDdiv">
            </div>
            <div className="JDdongbangroup">
                <div className="JDframe2">
                {dto.jp1gender == null ? <div className="JDuser">
                        <div className="JDavatar">
                            <div className="JDlw">동</div>
                        </div>
                        <div className="esther-howard"><b>모집자 동반인 없음</b>
                        </div>
                    </div> : (
                    <div className="JDuser">
                        <div className="JDavatar">
                            <div className="JDlw">LW</div>
                        </div>
                        <div className="esther-howard"><b>모집자 동반인1</b><br/>
                            {dto.jp1gender} / {dto.jp1age}세 / {dto.jp1tasu}타수
                        </div>
                    </div>)}
                    {dto.jp2gender == null ? null : (<div className="JDuser">
                        <div className="JDavatar">
                            <div className="JDlw">LW</div>
                        </div>
                        <div className="esther-howard"><b>모집자 동반인2</b><br/>
                            {dto.jp2gender} / {dto.jp2age}세 / {dto.jp2tasu}타수
                        </div>
                    </div>)}                                        
                </div>
            </div>
            <img className="jduphoto-icon" alt="" src="/jduphoto@2x.png" />
            <div className="JDconfirmgroup">
                <div className="JDframe">
                    {confirm.map && confirm.map((item, idx) => (
                        <div className="JDuser">
                            <div className="JDavatar">
                                <div className="JDlw">LW</div>
                            </div>
                            {item.jp1gender == null ? <div className="esther-howard"><b>{item.unickname}</b>
                                <div style={{display:'none'}}>{item.unum}</div>
                                <br/>
                                {year - (parseInt(item.uage.substring(0, 4), 10))}세 / {item.ugender} / 타수
                            </div> : (                                 
                            <div className="esther-howard"><b>{item.unickname}</b>&nbsp;(동반인/{item.jp1gender}/{item.jp1age}세/{item.jp1tasu}타)
                                <div style={{display:'none'}}>{item.unum}</div>
                                <br/>
                                {year - (parseInt(item.uage.substring(0, 4), 10))}세 / {item.ugender} / 타수
                            </div>)}
                        </div>
                    ))}
                </div>
            </div>

            <div className="JDparent">
            <div className="JDdiv0">
          <div className="JDtxt">
            <span>{`모집자 동반인( 총 `}</span>
            {dto.jp1gender && dto.jp2gender != null ? <span className="JDspan1">{2}</span> : dto.jp1gender == null ? <span className="JDspan1">{0}</span> : <span className="JDspan1">{1}</span>}
            <span>{` 명) `}</span>
          </div>
                </div>
                <div className="JDdiv1">
          <div className="JDtxt">
            <span>{`확정인원( 총 `}</span>
            {dto.jp1gender && dto.jp2gender != null ? <span className="JDspan1">{3+dto.jmcount}</span> : dto.jp1gender == null ? <span className="JDspan1">{1+dto.jmcount}</span> : <span className="JDspan1">{2+dto.jmcount}</span>}
            <span>{` 명) `}</span>
          </div>
                </div>
                <div className="JDdiv2">
          <span className="JDtxt">
            <span>{`빈자리 `}</span>
            {dto.jp1gender && dto.jp2gender != null ? <span className="JDspan1">{1-dto.jmcount}</span> : dto.jp1gender == null ? <span className="JDspan1">{3-dto.jmcount}</span> : <span className="JDspan1">{2-dto.jmcount}</span>}
          </span>
                </div>
            </div>
            <div className="JDapplygroup">
                <div className="JDdiv3">
                    <span>{`신청인원( 총 `}</span>
                    <span className="JDspan1">{dto.smcount}</span>
                    <span> 명)</span>
                </div>
                <div className="JDframe1">
                    {sub.map && sub.map((item, idx) => (
                        <div className="JDuser">
                            <div className="JDavatar">
                                <div className="JDlw">LW</div>
                            </div> 
                            {item.jp1gender == null ? <div className="esther-howard"><b>{item.unickname}</b>
                                <div style={{display:'none'}}>{item.unum}</div>&nbsp;&nbsp;
                                {dto.unum == unum ? (
                                    <button type='button' value={item.unum} className='btn btn-sm btn-success' onClick={onAcceptEvent.bind(null, item.unum)}>수락</button>
                                ) : (
                                    null
                                )}

                                <br/>
                                {year - (parseInt(item.uage.substring(0, 4), 10))}세 / {item.ugender} / 타수
                            </div> : (                                 
                            <div className="esther-howard"><b>{item.unickname}</b>&nbsp;(동반인/{item.jp1gender}/{item.jp1age}세/{item.jp1tasu}타)
                                <div style={{display:'none'}}>{item.unum}</div>&nbsp;&nbsp;
                                {dto.unum == unum ? (
                                    <button type='button' value={item.unum} className='btn btn-sm btn-success' onClick={onAcceptEvent.bind(null, item.unum)}>수락</button>
                                ) : (
                                    null
                                )}

                                <br/>
                                {year - (parseInt(item.uage.substring(0, 4), 10))}세 / {item.ugender} / 타수
                            </div>)}
                        </div>
                    ))}
                    <br/><br/><br/><br/>
                    <div className="joindetail-child" />

                    <div className="JDdiv10">
                        {dto.unum == unum ? (
                            <button type="button" onClick={onJoinCancelEvent}>모집 취소</button>
                        ) : check === 1 ? (
                            <button type="button" onClick={onGaipCancelEvent}>신청 취소</button>
                        ) : (
                            <form onClick={onGaipEvent}>
                                <input type='hidden' value={unum}/>
                                <input type='hidden' value={jnum}/>
                                <input type='hidden' value={jp1gender}/>
                                <input type='hidden' value={jp1age}/>
                                <input type='hidden' value={jp1tasu}/>
                                <input type='hidden' value={jcount}/>
                                <button type="submit">신청 하기</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <div className="jdinfo">
                <div className="JDcontent">
                    <div className="JDvalue">
                        <div className="JDdiv4">#{dto.gname}</div>
                    </div>
                </div>
                <div className="JDdefault">
                    <div className="JDdiv5">{dto.jjoinday} / {dto.jtime}</div>
                </div>
                <div className="JDinfobox-group">
                    <div className="JDcheckbox-with-label">
                        <img className="JDvector-icon" alt="" src="/vector.svg" />
                        <div className="JDdiv6">그린피 {dto.jprice}원</div>
                    </div>
                    <div className="JDcheckbox-with-label1">
                        <img className="JDvector-icon" alt="" src="/-icon-people.svg" />
                        <div className="JDdiv7">{dto.jage}</div>
                    </div>
                    <div className="JDcheckbox-with-label">
                        <img className="JDicon-file" alt="" src="/-icon-file.svg" />
                        <div className="JDdiv7">
                            <p className="JDp">{dto.jcontent}</p>
                        </div>
                    </div>
                </div>
            </div>





            <div className="JDflistprofile">
                <div className="JDflistprofile1">
                    <img className="jduphoto-icon" alt="" src="/jduphoto@2x.png" />
                    <div className="JDdiv11">
            <span className="JDtxt">
              <p className="JDp4">{dto.unickname} (모집자)</p>
              <p className="JDp5">{dto.ugender} / {year - (dto.uage && parseInt(dto.uage.substring(0, 4), 10))}세 / 타수</p>
            </span>
                    </div>
                    <div className="JDrectangle-parent">
                        <div className="JDgroup-child" />
                        <div className="JDdiv12">채팅하기</div>
                    </div>
                </div>
            </div>            
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

export default JoinDetail;
