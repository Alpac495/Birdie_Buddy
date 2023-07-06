import React, {useState, useEffect} from 'react';
import RowList from "./HugiRowList";
import './Hugi.css';
import Axios from 'axios';
import {useNavigate} from "react-router-dom";
import HugiRowList from "./HugiRowList";



function HugiList(props) {
    const [hlike,setHlike]=useState('');
    const [hwriteday,setHwriteday]=useState('');
    const [hphoto,setHphoto]=useState('');
    const [hcontent,setHcontent]=useState('');
    const navi=useNavigate();

    //파일 업로드
    const onUploadEvent=(e)=>{
        const uploadFile=new FormData();
        uploadFile.append("upload",e.target.files[0]);
        Axios({
            method:'post',
            url:'/hugi/upload',
            data:uploadFile,
            headers:{'Content-Type':'multipart/form-data'}
        }).then(res=>{
            setHphoto(res.data);
        });
    }

    const homeButton=(e)=>{
        navi("/");
    }

    const [data, setData] = useState([
        {
            uname: "이수근",
            hwriteday:"2023-07-04 17:34",
            hcontent: "안녕하세요",
            hphoto:
                "/image/1.png",
        },
        {
            uname: "강호동",
            hwriteday:"2023-07-04 17:34",
            hcontent: "반갑습니다",
            hphoto:
                "/image/2.png",
        },
        {
            uname: "이승기",
            hwriteday:"2023-07-04 17:34",
            hcontent: "안녕하세요?",
            hphoto:
                "/image/2.png",
        },
    ]);

    return (
        <div className='hugi'>
        <div className="hugi_header">
            <div className="app__headerWrapper">
                <button type="button" alt="" className="primary_button" onClick={homeButton} >Home</button>
            </div>
        </div>
            <div>
                <div style={{width:"450px",height:"100px",border:"1px solid gray",marginLeft:"840px",marginBottom:"10px"}}>
                    컨탠츠내용 + 사진 + 미리보기
                </div>
            <div className="timeline">
                {data.map((RowList) => (
                    <HugiRowList
                        uname={RowList.uname}
                        hwriteday={RowList.hwriteday}
                        hcontent={RowList.hcontent}
                        hphoto={RowList.hphoto}
                    />
                ))}
            </div>
            </div>

        </div>
    );
}

export default HugiList;