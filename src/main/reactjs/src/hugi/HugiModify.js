import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import {useNavigate, useParams} from "react-router-dom";

function HugiModify(props) {
    const { hnum } = useParams();
    const [unum, setUnum] = useState('');
    const [hlike, setHlike] = useState('');
    const [hphoto, setHphoto] = useState('');
    const [hcontent, setHcontent] = useState('');
    const [postUserNickname, setPostUserNickname] = useState('');
    const [hwriteday, setHwriteday] = useState('');


    const navi = useNavigate();
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

    // 수정 폼 제출 이벤트 핸들러 (async/await 사용)
    const onSubmitEdit = async (e) => {
        const currentDate = new Date();
        const offset = 1000 * 60 * 60 * 9
        const koreaNow = new Date((new Date()).getTime() + offset)
        const formattedDate = koreaNow.toISOString().slice(0, 19).replace('T', ' ');

        e.preventDefault();

        const dataToUpdate = {
            hnum: hnum,
            unum: unum,
            hlike: hlike,
            unickname: postUserNickname,
            hcontent: hcontent,
            hphoto: hphoto,
            hwriteday:formattedDate,
        };

        console.log('modifyData>>', dataToUpdate);
        try {
            await Axios.post('/hugi/update', dataToUpdate);
            navi('/hugi/list');
        } catch (error) {
            console.log(error);
        }
    };
    const handleClcikList = () => {
        navi('/hugi/list');
    }
    // 수정 폼이 로드될 때 원래 사진과 내용을 보여주기 위해 useEffect를 사용합니다.
    useEffect(() => {
        setHphoto(props.hphoto); // 게시물의 원래 사진을 보여줍니다.
        setHcontent(props.hcontent); // 게시물의 원래 내용을 보여줍니다.
    }, [props.hphoto, props.hcontent]);

    return (
        <div className="timeline" style={{ border: '1px solid gray', width: '100%', height: '50%', marginTop: '5px', marginBottom: '5px' }}>
            {/* 이미지 미리보기 */}
            {hphoto && <img alt="" src={`${process.env.REACT_APP_HUGI}${hphoto}`} style={{ width: '50%', margin: '10px 100px' }} value={hphoto}/>}
            <input type="file" className="form-control" onChange={onUploadEvent} />
            <br />
            <br />
            <div className="input-group">
                {/* 기존 후기 내용 */}
                <textarea className="form-control" style={{ width: '80%', resize: 'none' }} value={hcontent} onChange={(e) => setHcontent(e.target.value)} />
                {/* 파일 업로드 */}
                <br />
                {/* 수정 취소 및 수정 제출 버튼 */}
                <button type="submit" className="primary_button" onClick={onSubmitEdit}>
                    수정하기
                </button>
                <Button type="button"  autoFocus onClick={handleClcikList}>
                    취소
                </Button>
            </div>
        </div>
    );
}

export default HugiModify;
