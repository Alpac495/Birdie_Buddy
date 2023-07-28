import React, {useState, useEffect} from 'react';
import './Hugi.css';
import Axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom';
import MyHugiRowList from "./MyHugiRowList";
import Footer from "../footer/Footer";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../header/Header";


function MyHugiList(props) {
    const {unum} =useParams();
    // const [unum,setUnum]=useState('');
    const [userNum,setUserNum]=useState('');
    const [hphoto, setHphoto] = useState('');
    const [hcontent, setHcontent] = useState('');
    const [hlike, setHlike] = useState('');
    const [uphoto,setUphoto]=useState('');
    const [Unickname, setUnickname] = useState();
    const [myHugiData, setMyHugiData] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [selectedFileName, setSelectedFileName] = useState('');
    const url = process.env.REACT_APP_HUGI;
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedPreviews, setSelectedPreviews] = useState([]);
    const navi = useNavigate();
    const [page, setPage] = useState(1);
    //무한스크롤
    useEffect(() => {
        fetchMoreData();
    }, []);
    const fetchMoreData = () => {
        setLoading(true);
        Axios.get(`/hugi/mylist/${unum}?page=${page}&size=10`) // 페이지 당 10개의 아이템을 요청하도록 수정
            .then((res) => {
                setMyHugiData((prevItems) => [...prevItems, ...res.data]);
                setPage((prevPage) => prevPage + 1);
                setUnickname(res.data.Unickname);
                setUphoto(res.data.uphoto);
                setUserNum(res.data.unum);
                setLoading(false);
            })
            .catch((error) => {
                // console.error("데이터를 더 가져오는 중 오류 발생:", error);
                setLoading(false);
            });
    };


// unum 유무 확인 후 설정하는 함수
    const unumchk=()=>{
        Axios.get("/login/unumChk")
            .then(res=> {
                setUserNum(res.data);
            });
    }
    useEffect(() => {
        unumchk();
    }, [])

// 컴포넌트 마운트 시 후기 데이터와 유저 정보 가져오기
    useEffect(() => {
        getUser();
    }, []); // unum이 변경되면 해당 unum에 대한 데이터를 다시 가져옴

    const getUser = () => {
        Axios.get(`/hugi/getUser/${unum}`)
            .then((res) => {
                //console.log("unum>>"+unum);// Success!
                setUnickname(res.data);
                setUserNum(res.data.unum);
                setLoading(false); // 요청이 완료되면 로딩 상태 변경
            })
            .catch((error) => {
                // console.log(error);
                setLoading(false); // 에러 발생 시에도 로딩 상태 변경
            });
    };
// 사용자의 후기 데이터 가져오기 (async/await 사용)
//     const refreshHugiData2 = async () => {
//         try {
//             const res = await Axios.get(`/hugi/mylist/${unum}`);
//             setMyHugiData(res.data);
//             setUphoto(res.data.uphoto);
//         } catch (error) {
//             console.log(error);
//         }
//     };

// 이전 코드에서 수정한 부분 (onUploadEvent 함수)
    const onUploadEvent = async (e) => {
        const files = Array.from(e.target.files); // 선택된 파일들을 배열로 변환
        const uploadFiles = new FormData();

        // 선택된 파일들을 FormData에 추가
        files.forEach((file, index) => {
            uploadFiles.append(`upload${index}`, file); // 서버에서도 배열을 처리할 수 있도록 upload0, upload1, ... 형식으로 추가
        });

        try {
            const res = await Axios.post('/hugi/upload', uploadFiles);
            setHphoto(res.data); // 서버로부터 받아온 사진 URL을 단일 문자열로 설정

            // 파일 이름 출력을 위해 선택된 파일 이름들을 저장
            const selectedFileNames = files.map((file) => file.name);
            // console.log("선택된 파일 이름들:", selectedFileName);
        } catch (error) {
            // console.log(error);
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
        if (selectedFiles.length === 0) {
            alert('파일을 선택해주세요.');
            return;
        }
        const dataToSend = {
            unum: unum,
            Unickname: Unickname,
            uphoto: uphoto,
            hlike: hlike,
            hcontent: hcontent,
            hphoto: hphoto || [],
            hwriteday: formattedDate,
        };

        try {
            // 여러 파일 업로드 처리
            const uploadFiles = new FormData();
            selectedFiles.forEach((file) => uploadFiles.append('upload', file));
            const res = await Axios.post('/hugi/upload', uploadFiles);
            dataToSend.hphoto = res.data; // 서버로부터 받아온 여러 파일의 URL을 dataToSend에 설정

            await Axios.post('/hugi/insert', dataToSend);
            setHcontent('');
            setSelectedFiles([]); // 파일 선택 초기화
            setSelectedPreviews([]); // 파일 미리보기 초기화
            setLoading(true); // 로딩 상태를 true로 설정하여 다시 데이터를 불러올 수 있도록 함
            window.location.reload(); // 페이지 새로고침
        } catch (error) {
            // console.log(error);
        }
    };
// 파일 선택 시 파일 정보와 미리보기 이미지 업데이트 함수
    const onFileChange = (e) => {
        const files = e.target.files;
        const fileArray = Array.from(files).map((file) => {
            const previewUrl = URL.createObjectURL(file);
            return { file, previewUrl, name: file.name }; // Include the name of each file in the fileArray
        });

        // Limit the number of selected files to 6
        const maxFiles = 6;
        const selectedFilesLimited = fileArray.slice(0, maxFiles);

        setSelectedFiles(selectedFilesLimited.map((file) => file.file));
        setSelectedPreviews(selectedFilesLimited.map((file) => file.previewUrl));

        // Set the selected file names
        const selectedFileNames = selectedFilesLimited.map((file) => file.name);
        setSelectedFileName(selectedFileNames.join(", ")); // Join the names with a comma and update the state
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

    // // 파일 선택 시 파일명 업데이트 함수
    // const onFileChange = (e) => {
    //     const fileName = e.target.value.split('\\').pop(); // 파일명 추출
    //     setSelectedFileName(fileName); // 파일명 상태 업데이트
    // };
    const onclickLoad = () => {
        window.scrollTo({top: 0, behavior: "smooth" });
        fetchMoreData();
    };
    return (
        <div className="HG_hugi1">
            <div className="HG_hugi_header">
                <div className="HG_hugi_headerWrapper">
                    <Header/>
                </div>
            </div>
            <div className="HG_hugi2">
            {userNum !== 0 && (
                <details className="HG_details_Timeline">
                    <summary style={{backgroundColor:"#48685E",color:"#eefaea"}}>게시물 작성하기</summary>
                    <div style={{
                        zIndex:'99',
                        background:'white',
                        border: '1px solid lightgrey',
                        borderRadius: '5px',
                        width: '100%',
                        height: '50%',
                        marginTop:'38px',
                        padding: '10px'
                    }}>
                        {/*<input type="file" className="form-control" onChange={onUploadEvent}/>*/}
                        {selectedPreviews.map((previewUrl, index) => (
                            <img key={index} alt={`미리보기${index}`} src={previewUrl} style={{width: '150px',height:'150px',margin:"5px 5px",float:"left"}}/>
                        ))}
                        <div className="filebox">
                            <input className="upload-name" style={{width:"65%",backgroundColor:"#fafafa" }}
                                   value={selectedFileName || "첨부파일"} placeholder="첨부파일" readOnly/>
                            <label htmlFor="file" style={{width:"35%",backgroundColor:"#48685E"}}>파일찾기</label>
                            <input type="file" id="file" multiple="multiple" onChange={(e) => { onUploadEvent(e); onFileChange(e); }} />
                        </div>
                        <br/>
                        <div className="input-group">
            <textarea
                className="form-control"
                style={{width: '80%', resize: "none",backgroundColor:"#fafafa"}}
                value={hcontent}
                onChange={(e) => setHcontent(e.target.value)}
            ></textarea>
                            <button type="submit" className="my_HG_button" style={{width: '20%',height:"62px"}}
                                    onClick={onSubmitEvent}>
                                작성
                            </button>
                        </div>
                    </div>
                </details>

            )}
            <InfiniteScroll
                dataLength={myHugiData.length}
                next={fetchMoreData}
                hasMore={myHugiData.length > 0}
                loader={loading ? ( // 로딩 상태에 따른 메시지 표시
                    <div className="spinner-border text-primary" style={{marginLeft: "140px", overflow: "none"}}></div>
                ) : (
                    null
                )}
                endMessage={// Display Footer when the end is reached
                    myHugiData.length === 0 && !loading ? (
                        <div className="HG_footer-message">작성된 게시물이 없습니다</div>
                    ) : (
                        <Footer />
                    )
                } // Display Footer when the end is reached
            >
                <div className="HG_timeline">
                    {myHugiData &&
                        myHugiData.map((hugiData) => (
                            <MyHugiRowList
                                key={hugiData.hnum}
                                hnum={hugiData.hnum}
                                unum={hugiData.unum}
                                Unickname={hugiData.Unickname}
                                uphoto={hugiData.uphoto}
                                hcontent={hugiData.hcontent}
                                hphoto={hugiData.hphoto}
                                hwriteday={hugiData.hwriteday}
                                getUser={getUser}
                                fetchMoreData={fetchMoreData}
                            />
                        ))}
                    {myHugiData.length > 0 && !loading && (
                        //<img src={logo} alt={'logo'} style={{width:"350px",height:"120px"}} onClick={onclickLoad}></img>
                        <Footer/>
                    )}
                </div>
            </InfiniteScroll>
        </div>
        </div>
    );
}

export default MyHugiList;
