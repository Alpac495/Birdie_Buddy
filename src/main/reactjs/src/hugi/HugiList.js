import React, {useState, useEffect} from 'react';
import './Hugi.css';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';
import HugiRowList from './HugiRowList';
import InfiniteScroll from "react-infinite-scroll-component";
import logo from "../images/logo.png";
import Footer from "../footer/Footer";

function HugiList(props) {
    const [unum, setUnum] = useState('');
    const [userNum, setUserNum] = useState('');
    const [hphoto, setHphoto] = useState('');
    const [hcontent, setHcontent] = useState('');
    const [hlike, setHlike] = useState('');
    const [uphoto, setUphoto] = useState('');
    const [Unickname, setUnickname] = useState();
    const [hugiData, setHugiData] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [selectedFileName, setSelectedFileName] = useState('');
    const url = process.env.REACT_APP_HUGI;
    const navi = useNavigate();

    const [page, setPage] = useState(1);
    //무한스크롤
    const fetchMoreData = () => {
        setLoading(true);
        Axios.get(`/hugi/list?page=${page}&size=10`) // 페이지 당 10개의 아이템을 요청하도록 수정
            .then((res) => {
                setHugiData((prevItems) => [...prevItems, ...res.data]);
                setPage((prevPage) => prevPage + 1);
                setUnickname(res.data.Unickname);
                setUserNum(res.data.unum);
                setUphoto(res.data.uphoto);
                setLoading(false);
            })
            .catch((error) => {
                console.error("데이터를 더 가져오는 중 오류 발생:", error);
                setLoading(false);
            });
    };
    useEffect(() => {
        fetchMoreData();
    }, []);

// unum 유무 확인 후 설정하는 함수
    const unumchk = () => {
        Axios.get("/login/unumChk")
            .then(res => {
                setUnum(res.data);
            });
    }
    useEffect(() => {
        unumchk()
    }, []);

// 컴포넌트 마운트 시 후기 데이터와 유저 정보 가져오기
    useEffect(() => {
        // refreshHugiData();

        getUser();
    }, []);


    const getUser = () => {
        Axios.get(`/hugi/getUser?unum=${unum}`)
            .then((res) => {
                //console.log("unum>>"+unum);// Success!
                setUnickname(res.data.unickname);
                setUserNum(res.data.unum);
                fetchMoreData(res.data);
                setLoading(false); // 요청이 완료되면 로딩 상태 변경
            })
            .catch((error) => {
                // console.log(error);
                setLoading(false); // 에러 발생 시에도 로딩 상태 변경
            });
    };

// 전체 후기 데이터 가져오기 (async/await 사용) list
//     const refreshHugiData = async () => {
//         try {
//             const res = await Axios.get("/hugi/list");
//             setUnickname(res.data.Unickname);
//             setUserNum(res.data.unum);
//             setUphoto(res.data.uphoto);
//             setHugiData(res.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };


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
            uphoto: uphoto,
            hlike: hlike,
            hcontent: hcontent,
            hphoto: hphoto || '',
            hwriteday: formattedDate,
        };

        try {
            await Axios.post('/hugi/insert', dataToSend);
            setHphoto('');
            setHcontent('');
            setLoading(true); // 로딩 상태를 true로 설정하여 다시 데이터를 불러올 수 있도록 함
            fetchMoreData();
            window.location.reload(); // 페이지 새로고침
        } catch (error) {
            console.log(error);
        }
    };

    // 홈 버튼 클릭 이벤트 핸들러
    const homeButton = () => {
        navi('/');
    };
    // 내 후기 보기 버튼 클릭 이벤트 핸들러
    const Myhugis = () => {
        navi(`/hugi/list/${unum}`);
    };

    // 파일 선택 시 파일명 업데이트 함수
    const onFileChange = (e) => {
        const fileName = e.target.value.split('\\').pop(); // 파일명 추출
        setSelectedFileName(fileName); // 파일명 상태 업데이트
    };
    const onclickLoad = () => {
        window.scrollTo({top: 0, behavior: "smooth" });
       fetchMoreData();
    };
    return (
        <div className="hugi">
            <div className="hugi_header">
                <div className="hugi__headerWrapper">
                    <button type="button" alt="" className="primary_button" onClick={homeButton}>
                        Home
                    </button>
                    <button type="button" alt="" className="primary_button_hugis" onClick={Myhugis}>
                        MyHugis
                    </button>
                </div>

            </div>
            {unum !== 0 && (
                <details className="details_Timeline">
                    <summary>게시물 작성하기</summary>
                    <div className="timeline" style={{
                        border: '1px solid lightgrey',
                        borderRadius: '5px',
                        width: '100%',
                        height: '50%',
                        marginTop: '5px',
                        marginBottom: '5px',
                        padding: '10px'
                    }}>
                        {/*<input type="file" className="form-control" onChange={onUploadEvent}/>*/}
                        <img alt="" src={`${url}${hphoto}`} style={{width: '50%', margin: '10px 100px'}}/>
                        <div className="filebox">
                            <input className="upload-name" value={selectedFileName || "첨부파일"} placeholder="첨부파일"
                                   readOnly/>
                            <label htmlFor="file">파일찾기</label>
                            <input type="file" id="file" onChange={(e) => {
                                onUploadEvent(e);
                                onFileChange(e);
                            }}/>
                        </div>
                        <br/>
                        <div className="input-group">
            <textarea
                className="form-control"
                style={{width: '80%', resize: "none"}}
                value={hcontent}
                onChange={(e) => setHcontent(e.target.value)}
            ></textarea>
                            <button type="submit" className="primary_button" style={{width: '20%'}}
                                    onClick={onSubmitEvent}>
                                작성
                            </button>
                        </div>
                    </div>
                </details>

            )}
            <InfiniteScroll
                dataLength={hugiData.length}
                next={fetchMoreData}
                hasMore={true}
                loader={loading ? ( // 로딩 상태에 따른 메시지 표시
                    <div className="spinner-border text-primary" style={{marginLeft: "140px", overflow: "none"}}></div>
                ) : (
                    null
                )}
                endMessage={<Footer />} // Display Footer when the end is reached
            >
                <div className="timeline">
                    {hugiData &&
                        hugiData.map((hugiData) => (
                            <HugiRowList
                                key={hugiData.hnum}
                                hnum={hugiData.hnum}
                                unum={hugiData.unum}
                                Unickname={hugiData.Unickname}
                                uphoto={hugiData.uphoto}
                                hcontent={hugiData.hcontent}
                                hphoto={hugiData.hphoto}
                                hlike={hugiData.hlike}
                                hwriteday={hugiData.hwriteday}
                                // refreshHugiData={refreshHugiData}
                                getUser={getUser}
                                fetchMoreData={fetchMoreData}
                            />
                        ))}
                    {hugiData.length > 0 &&(
                    //<img src={logo} alt={'logo'} style={{width:"350px",height:"120px"}} onClick={onclickLoad}></img>
                    <Footer/>
                    )}
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default HugiList;
