import React, { useState, useEffect } from 'react';
import './Hugi.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HugiRowList from './HugiRowList';

function HugiList(props) {
    const [hphoto, setHphoto] = useState('');
    const [hcontent, setHcontent] = useState('');
    const [hlike, setHlike] = useState('');
    const [hwriteday, setHwriteday] = useState('');
    const [hnum, setHnum] = useState('');

    const url = process.env.REACT_APP_BOARDURL;
    const navi = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 여부
    const [unum, setUnum] = useState(null); // unum 상태 추가
    const [hugiData, setHugiData] = useState([]);

    useEffect(() => {
        // 세션에 로그인 정보가 있는지 확인하는 로직
        const loginStatus = sessionStorage.getItem('isLoggedIn');
        checkLoginStatus();

        // 세션에서 unum 정보 가져오기
        const storedUnum = sessionStorage.getItem('unum');
        setUnum(storedUnum);
    }, []);
    useEffect(() => {
        Axios.get('/hugi/list')
            .then((res) => {
                setHugiData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        refreshHugiData(); // 컴포넌트가 마운트된 후에 refreshHugiData 함수 호출
    }, []);

    const refreshHugiData = () => {
        Axios.get('/hugi/list')
            .then((res) => {
                setHugiData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const checkLoginStatus = () => {
        // 세션에 로그인 정보가 있는지 확인하는 로직을 구현합니다.
        // 예를 들어, 서버 API를 호출하여 로그인 상태를 확인하는 방법이 있습니다.
        Axios.get('/api/checkLoginStatus')
            .then((res) => {
                if (res.data.isLoggedIn) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //파일 업로드
    const onUploadEvent = (e) => {
        const uploadFile = new FormData();
        uploadFile.append('upload', e.target.files[0]);
        Axios({
            method: 'post',
            url: '/hugi/upload',
            data: uploadFile,
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then((res) => {
            setHphoto(res.data);
            refreshHugiData(); // 파일 업로드 후 목록을 다시 불러오기
        })
            .catch((error) => {
                console.log(error);
            });
    };
    const onSubmitEvent = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
        const dataToSend = {
            hnum: hnum || '',
            unum: unum || '',
            hlike: hlike ||'',
            hcontent: hcontent || '',
            hphoto: hphoto || '',
            hwriteday: formattedDate
        };

        Axios.post('/hugi/insert', dataToSend, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                // 데이터 전송 성공 시 목록으로 이동
                navi('/hugi/list');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const homeButton = (e) => {
        navi('/');
    };

    const [data, setData] = useState([
        {
            uname: '이수근',
            hwriteday: '2023-07-04 17:34',
            hcontent: '안녕하세요',
            hphoto: '',
        },
        {
            uname: '강호동',
            hwriteday: '2023-07-04 17:34',
            hcontent: '반갑습니다',
            hphoto: '',
        },
        {
            uname: '이승기',
            hwriteday: '2023-07-04 17:34',
            hcontent: '안녕하세요?',
            hphoto: '',
        },
    ]);

    return (
        <div className="hugi">
            <div className="hugi_header">
                <div className="app__headerWrapper">
                    <button type="button" alt="" className="primary_button" onClick={homeButton}>
                        Home
                    </button>
                </div>
            </div>
            {unum && (
                // 로그인 상태일 때만 해당 컴포넌트가 보이도록 설정
                <div
                    className="timeline"
                    style={{ border: '1px solid gray', width: '100%', height: '100%', marginTop: '5px', marginBottom: '5px' }}
                >
                    <input type="file" className="form-control" onChange={onUploadEvent} />
                    <img alt="" src={`${url}${hphoto}`} style={{ width: '50%', margin: '10px 100px' }} value={hphoto}/>
                    <br />
                    <br />
                    <div className="input-group">
            <textarea
                className="form-control"
                style={{ width: '80%' }}
                value={hcontent}
                onChange={(e) => setHcontent(e.target.value)}
            ></textarea>
                        <button type="submit" className="primary_button" style={{ width: '20%' }} onClick={onSubmitEvent}>
                            작성
                        </button>
                    </div>
                </div>
            )}
            <div className="timeline">
                {hugiData.map((rowData) => (
                    <HugiRowList
                        key={rowData.hnum}
                        uname={rowData.unum}
                        hcontent={rowData.hcontent}
                        hphoto={rowData.hphoto}
                        hwriteday={rowData.hwriteday}
                        refreshHugiData={refreshHugiData}
                    />
                ))}
            </div>
        </div>
    );
}

export default HugiList;
