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
    const [unum, setUnum] = useState('');
    const [Unickname,setUnickname]=useState();
    const [hugiData, setHugiData] = useState([]);

    const url = process.env.REACT_APP_BOARDURL;
    const navi = useNavigate();
    const isLoggedIn = sessionStorage.getItem('unum') !== null;

    useEffect(() => {
        refreshHugiData();
        getUser();
    }, []);

    const getUser = () => {
        Axios.get("/hugi/getUser?unum=" + sessionStorage.unum)
            .then((res) => {
                setUnickname(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const refreshHugiData = () => {
        Axios.get(`/hugi/list`)
            .then((res) => {
                setHugiData(res.data);
                setUnickname(res.data.Unickname);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onUploadEvent = (e) => {
        const uploadFile = new FormData();
        uploadFile.append('upload', e.target.files[0]);
        Axios.post('/hugi/upload', uploadFile)
            .then((res) => {
                setHphoto(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onSubmitEvent = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        if (!hcontent) {
            alert('글을 입력해주세요.');
            return;
        }

        const dataToSend = {
            unum:sessionStorage.unum,
            Unickname:Unickname,
            hlike: 0,
            hcontent: hcontent,
            hphoto: hphoto || '',
            hwriteday: formattedDate,
        };

        Axios.post('/hugi/insert', dataToSend)
            .then((res) => {
                navi('/hugi/list');
                refreshHugiData();
                setHphoto('');
                setHcontent('');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const homeButton = () => {
        navi('/');
    };
    const Myhugis = () =>{

    };
    return (
        <div className="hugi">
            <div className="hugi_header">
                <div className="hugi__headerWrapper">
                    <button type="button" alt="" className="primary_button" onClick={homeButton}>
                        Home
                    </button>
                    <button type="button" alt="" className="primary_button" onClick={Myhugis}>
                        MyHugis
                    </button>
                </div>
                {sessionStorage.unum ? (
                    <b className="CommentNickname">
                        {Unickname}님이 접속중입니다.
                    </b>
                ) : (
                    <b className="CommentNickname">
                        Guest님이 접속중입니다.
                    </b>
                )}
            </div>
            {isLoggedIn && (
                <details className="details_Timeline">
                    <summary>게시물 작성하기</summary>
                <div className="timeline" style={{ border: '1px solid gray', width: '100%', height: '50%', marginTop: '5px', marginBottom: '5px' }}>
                    <input type="file" className="form-control" onChange={onUploadEvent} />
                    <img alt="" src={`${url}${hphoto}`} style={{ width: '50%', margin: '10px 100px' }} />
                    <br />
                    <br />
                    <div className="input-group">
            <textarea
                className="form-control"
                style={{ width: '80%',resize:"none"}}
                value={hcontent}
                onChange={(e) => setHcontent(e.target.value)}
            ></textarea>
                        <button type="submit" className="primary_button" style={{ width: '20%' }} onClick={onSubmitEvent}>
                            작성
                        </button>
                    </div>
                </div>
                </details>
            )}
            <div className="timeline">
                {
                    hugiData &&
                    hugiData.map((rowData) => (
                    <HugiRowList
                        key={rowData.hnum}
                        hnum={rowData.hnum}
                        unum={rowData.unum}
                        Unickname={rowData.Unickname}
                        hcontent={rowData.hcontent}
                        hphoto={rowData.hphoto}
                        hwriteday={rowData.hwriteday}
                        refreshHugiData={refreshHugiData}
                        getUser={getUser}
                    />
                ))}
            </div>
        </div>
    );
}

export default HugiList;
