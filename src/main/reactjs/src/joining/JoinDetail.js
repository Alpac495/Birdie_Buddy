import "./JoinDetail.css";
import {useCallback, useEffect, useState} from "react";
import Axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
const JoinDetail = () => {
    // const unum = Number(sessionStorage.unum);
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
    const [dto,setDto]=useState({});
    const {jnum}=useParams('');
    const now = new Date();
    const year = now.getFullYear();
    const [confirm, setConfirm] = useState([]);
    const [sub, setSub] = useState([]);
    const [check, setCheck]=useState('');

    const navi=useNavigate();

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

    const checkmember=useCallback(()=>{
        const url="/joinmember/checkmember?unum="+(unum)+"&jnum="+(jnum);
        Axios.get(url)
            .then(res=>{
                setCheck(res.data)
                console.log(res.data)
            });
    }, );

    useEffect(()=>{
        checkmember();
    },[checkmember]);

    const onGaipEvent=(e)=>{
        e.preventDefault();
        if(4 - dto.jmcount === 0){
            alert("빈자리가 없습니다")
        }else{
        const confirmed = window.confirm('정말 신청하시겠습니까?');
        if (confirmed) {
            Axios.post("/joinmember/joinGaip", {unum, jnum})
                .then(res => {
                    window.location.replace(`/joining/detail/${jnum}`)
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
                    window.location.replace(`/joining/detail/${jnum}`)
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
        if(4 - dto.jmcount === 0){
            alert("빈자리가 없습니다")
        }else {
            const confirmed = window.confirm('신청을 수락하시겠습니까?');
            if (confirmed) {
                Axios.get(`/joinmember/acceptJoin/${unum}&${jnum}`)
                    .then(res => {
                        window.location.replace(`/joining/detail/${jnum}`);
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
        <span className="JDtxt">
          <p className="JDp">{dto.unickname}</p>
          <p className="JDp1">{dto.ugender=== '1' ?"남자":"여자"}, {year - (dto.uage && parseInt(dto.uage.substring(0, 4), 10))}세</p>
        </span>
            </div>
            <img className="jduphoto-icon" alt="" src="/jduphoto@2x.png" />
            <div className="JDconfirmgroup">
                <div className="JDframe">
                    {confirm.map && confirm.map((item, idx) => (
                        <div className="JDuser">
                            <div className="JDavatar">
                                <div className="JDlw">LW</div>
                            </div>
                            <div className="esther-howard"><b>{item.unickname}</b>&nbsp;(동반 1인/나이/성별)<br/>
                                {year - (parseInt(item.uage.substring(0, 4), 10))}세 / {item.ugender} / 타수
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="JDparent">
                <div className="JDdiv1">
          <span className="JDtxt">
            <span>{`확정인원( 총 `}</span>
            <span className="JDspan1">{dto.jmcount}</span>
            <span>{`명) `}</span>
          </span>
                </div>
                <div className="JDdiv2">
          <span className="JDtxt">
            <span>{`빈자리 `}</span>
            <span className="JDspan1">{4 - dto.jmcount}</span>
          </span>
                </div>
            </div>
            <div className="JDapplygroup">
                <div className="JDdiv3">
                    <span>{`신청인원( `}</span>
                    <span className="JDspan1">{dto.smcount}</span>
                    <span> 명 )</span>
                </div>
                <div className="JDframe1">
                    {sub.map && sub.map((item, idx) => (
                        <div className="JDuser">
                            <div className="JDavatar">
                                <div className="JDlw">LW</div>
                            </div>
                            <div className="esther-howard"><b>{item.unickname}</b>&nbsp;(동반 1인/나이/성별)&nbsp;<div style={{display:'none'}}>{item.unum}</div>
                                {dto.unum === unum ? (
                                    <button type='button' value={item.unum} className='btn btn-sm btn-success' onClick={onAcceptEvent.bind(null, item.unum)}>수락</button>
                                ) : (
                                    null
                                )}

                                <br/>
                                {year - (parseInt(item.uage.substring(0, 4), 10))}세 / {item.ugender} / 타수
                            </div>
                        </div>
                    ))}
                    <br/><br/><br/><br/>
                    <div className="joindetail-child" />

                    <div className="JDdiv10">
                        {dto.unum === unum ? (
                            <button type="button" onClick={onJoinCancelEvent}>모집 취소</button>
                        ) : check === 1 ? (
                            <button type="button" onClick={onGaipCancelEvent}>신청 취소</button>
                        ) : (
                            <form onClick={onGaipEvent}>
                                <input type='hidden' value={unum}/>
                                <input type='hidden' value={jnum}/>
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






            <img className="icon-golf-terrain" alt="" src="/-icon-golf-terrain.svg" />
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
        </div>
    );
};

export default JoinDetail;
