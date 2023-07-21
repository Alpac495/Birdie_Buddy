import React, {useState, useEffect} from 'react';
import './Hugi.css';
import Axios from 'axios';
import {useNavigate, Link, useParams} from 'react-router-dom';
import HugiRowList from './HugiRowList';
import MyHugiRowList from "./MyHugiRowList";


function MyHugiList(props) {
    const {unum} =useParams();
    // const [unum,setUnum]=useState('');
    const [userNum,setUserNum]=useState('');
    const [hphoto, setHphoto] = useState('');
    const [hcontent, setHcontent] = useState('');
    const [hlike, setHlike] = useState('');
    const [Unickname, setUnickname] = useState();
    const [myHugiData, setMyHugiData] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [selectedFileName, setSelectedFileName] = useState('');
    const url = process.env.REACT_APP_HUGI;
    const navi = useNavigate();
// unum 유무 확인 후 설정하는 함수
    const unumchk=()=>{
        Axios.get("/login/unumChk")
            .then(res=> {
                setUserNum(res.data);
            });
    }
    useEffect(() => {
        unumchk()
        refreshHugiData2();
    }, [])

// 컴포넌트 마운트 시 후기 데이터와 유저 정보 가져오기
    useEffect(() => {
        getUser();
        refreshHugiData2();
    }, [unum]); // unum이 변경되면 해당 unum에 대한 데이터를 다시 가져옴

// unum이 변경되면 사용자의 후기 데이터 갱신
//     useEffect(() => {
//         if(unum) {
//             refreshHugiData2();
//         }
//     },[unum]);


    const getUser = () => {
        Axios.get(`/hugi/getUser?unum=${unum}`)
            .then((res) => {
                //console.log("unum>>"+unum);// Success!
                setUnickname(res.data);
                setLoading(false); // 요청이 완료되면 로딩 상태 변경
            })
            .catch((error) => {
                // console.log(error);
                setLoading(false); // 에러 발생 시에도 로딩 상태 변경
            });
    };
// 사용자의 후기 데이터 가져오기 (async/await 사용)
    const refreshHugiData2 = async () => {
        try {
            const res = await Axios.get(`/hugi/mylist/${unum}`);
            setMyHugiData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

// 파일 업로드 이벤트 핸들러 (async/await 사용)
    const onUploadEvent = async (e) => {
        const uploadFile = new FormData();
        uploadFile.append('upload', e.target.files[0]);
        try {
            const res = await Axios.post('/hugi/upload', uploadFile);
            setHphoto(res.data);
        } catch (error) {
            console.log(error);
        }
    };

// 게시물 작성 이벤트 핸들러 (async/await 사용)
    const onSubmitEvent = async (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        if (!hcontent) {
            alert('글을 입력해주세요.');
            return;
        }

        const dataToSend = {
            unum: unum,
            Unickname: Unickname,
            hlike: 0,
            hcontent: hcontent,
            hphoto: hphoto || '',
            hwriteday: formattedDate,
        };
            // console.log("usN>>"+unum);
        try {
            await Axios.post('/hugi/insert', dataToSend);
            navi(`/hugi/list/${userNum}`);
            refreshHugiData2();
            setHphoto('');
            setHcontent('');
        } catch (error) {
            console.log(error);
        }
    };

    // 홈 버튼 클릭 이벤트 핸들러
    const homeButton = () => {
        navi('/');
    };
    // 내 후기 보기 버튼 클릭 이벤트 핸들러
    // 전체 후기 보기 버튼 클릭 이벤트 핸들러
    const AllHugis = () =>{
        navi('/hugi/list');
    };

    // 파일 선택 시 파일명 업데이트 함수
    const onFileChange = (e) => {
        const fileName = e.target.value.split('\\').pop(); // 파일명 추출
        setSelectedFileName(fileName); // 파일명 상태 업데이트
    };
    return (
        <div className="hugi">
            <div className="hugi_header">
                <div className="hugi__headerWrapper">
                    <button type="button" alt="" className="my_primary_button" onClick={homeButton}>
                        Home
                    </button>
                    <button type="button" alt="" className="my_primary_button_hugis" onClick={AllHugis}>
                        AllHugis
                    </button>
                </div>
                {loading ? ( // 로딩 상태에 따른 메시지 표시
                    <div className="spinner-border text-primary" style={{marginLeft:"30px"}}></div>
                ) : (
                    null
                )}
            </div>
            {userNum !==0 && (
                <details className="details_Timeline">
                    <summary style={{backgroundColor:"RGB(252 243 168)"}}>게시물 작성하기</summary>
                    <div className="timeline" style={{
                        border: '1px solid lightgrey',
                        borderRadius:'5px',
                        width: '100%',
                        height: '50%',
                        marginTop: '5px',
                        marginBottom: '5px',
                        padding:'10px'
                    }}>
                        {/*<input type="file" className="form-control" onChange={onUploadEvent}/>*/}
                        <img alt="" src={`${url}${hphoto}`} style={{width: '50%', margin: '10px 100px'}}/>
                        <div className="filebox">
                            <input className="upload-name" value={selectedFileName || "첨부파일"} placeholder="첨부파일" readOnly />
                            <label htmlFor="file" style={{backgroundColor:"RGB(252 243 168)"}}>파일찾기</label>
                            <input type="file" id="file" onChange={(e) => { onUploadEvent(e); onFileChange(e); }} />
                        </div>
                        <br/>
                        <div className="input-group">
            <textarea
                className="form-control"
                style={{width: '80%', resize: "none"}}
                value={hcontent}
                onChange={(e) => setHcontent(e.target.value)}
            ></textarea>
                            <button type="submit" className="my_primary_button" style={{width: '20%'}}
                                    onClick={onSubmitEvent}>
                                작성
                            </button>
                        </div>
                    </div>
                </details>

            )}

                <div className="timeline">
                    {myHugiData &&
                        myHugiData.map((rowData) => (
                            <MyHugiRowList
                                key={rowData.hnum}
                                hnum={rowData.hnum}
                                unum={rowData.unum}
                                Unickname={rowData.Unickname}
                                hcontent={rowData.hcontent}
                                hphoto={rowData.hphoto}
                                hwriteday={rowData.hwriteday}
                                refreshHugiData2={refreshHugiData2}
                                getUser={getUser}
                            />
                        ))}
                </div>
        </div>
    );
}

export default MyHugiList;
