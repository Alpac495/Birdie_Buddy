import React, {useState} from 'react';
import "./App.css";
import Axios from "axios";

function Home(props) {
    const [photo, setPhoto]=useState('');
    const photourl = process.env.REACT_APP_BOARDURL;

    const onUploadEvent = (e) => {
        const uploadFile=new FormData();
        uploadFile.append("upload",e.target.files[0]);
        Axios({
            method:'post',
            url:'/upload',
            data:uploadFile,
            headers:{'Content-Type':'multipart/form-data'}
        }).then(res=>{
            setPhoto(res.data);
        })
    }



    return (
        <div className="homeBg">
            <h2>여기는 몰루입니다.</h2>
            <input type='file' onChange={onUploadEvent}/>
            <img alt={'Pk3'} src={`http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy/${photo}`} />
            <div>asdf</div>
        </div>
    );
}

export default Home;