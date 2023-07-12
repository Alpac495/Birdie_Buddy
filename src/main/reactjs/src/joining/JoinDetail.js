import "./JoinDetail.css";
import {useCallback, useEffect, useState} from "react";
import Axios from "axios";
import {useParams} from "react-router-dom";
const JoinDetail = () => {
    const unum = Number(sessionStorage.unum);
    const [dto,setDto]=useState({});
    const {jnum}=useParams('');
    const now = new Date();
    const year = now.getFullYear();
    const [confirm, setConfirm] = useState([]);
    const [sub, setSub] = useState([]);
    const [check, setCheck]=useState('');

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

    return (
        <div className="joindetail">
            <div className="JDdiv">
        <span className="JDtxt">
          <p className="JDp">{dto.unickname}</p>
          <p className="JDp1">{dto.ugender=== '1' ?"남자":"여자"}, {year - (dto.uage && parseInt(dto.uage.substring(0, 4), 10))}세</p>
        </span>
            </div>
            <img className="jduphoto-icon" alt="" src="/jduphoto@2x.png" />
            <div className="confirmgroup">
                <div className="JDframe">
                    {confirm.map && confirm.map((item, idx) => (
                    <div className="JDuser">
                        <div className="JDavatar">
                            <div className="JDlw">LW</div>
                        </div>
                        <div className="esther-howard">{item.unickname}</div>
                    </div>
                    ))}
                </div>
            </div>
            <div className="JDparent">
                <div className="JDdiv2">
          <span className="JDtxt">
            <span>{`확정인원( 총 `}</span>
            <span className="JDspan">{dto.jmcount}</span>
            <span>{`명 )`}</span>
          </span>
                </div>
                <div className="JDdiv3">
          <span className="JDtxt">
            <span>{`빈자리 `}</span>
            <span className="JDspan">{4 - dto.jmcount}</span>
          </span>
                </div>
            </div>
            <div className="JDapplygroup">
                <div className="JDdiv4">
                    <span>{`신청인원( `}</span>
                    <span className="JDspan">{dto.smcount}</span>
                    <span> 명 )</span>
                </div>
                <div className="JDframe1">
                    {sub.map && sub.map((item, idx) => (
                        <div className="JDuser">
                            <div className="JDavatar">
                                <div className="JDlw">LW</div>
                            </div>
                            <div className="esther-howard">{item.unickname}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
            </div>
            <div className="jdinfo">
                <div className="JDcontent">
                    <div className="JDvalue">
                        <div className="JDdiv5">#{dto.gname}</div>
                    </div>
                </div>
                <div className="JDdefault">
                    <b className="JDb">{dto.jjoinday} / {dto.jtime}</b>
                </div>
                <div className="JDdiv6">
                    <p className="JDp">그린피 {dto.jprice}원</p>
                    <p className="JDp1">{dto.jage}</p>
                    <p className="JDp1">{dto.jcontent}</p>
                </div>
            </div>

            <div className="joindetail-child" />
            <div className="JDDrectangle-parent">
                <div className="JDgroup-child" />
                <div className="JDdiv8">채팅하기</div>
            </div>
            <div className="joindetail-item" />
            <div className="JDdiv9">
                {dto.unum === unum ? (
                    <button type="button">모집 취소</button>
                ) : check === 1 ? (
                    <button type="button">신청 취소</button>
                ) : (
                    <button type="button">신청 하기</button>
                )}
            </div>


        </div>
    );
};

export default JoinDetail;
