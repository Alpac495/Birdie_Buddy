import React, { useState } from 'react';
import Axios from 'axios';
import {useNavigate} from "react-router-dom";

function HugiModify(props) {
    const [hphoto, setHphoto] = useState(props.hphoto);
    const [hcontent, setHcontent] = useState(props.hcontent);
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
        e.preventDefault();
        const dataToUpdate = {
            hnum: props.hnum,
            unum: props.unum,
            Unickname: props.Unickname,
            hlike: props.hlike,
            hcontent: hcontent,
            hphoto: hphoto,
            hwriteday: props.hwriteday,
        };

        try {
            await Axios.post('/hugi/update', dataToUpdate);

        } catch (error) {
            console.log(error);
        }
    };
    const handleClcikList = () => {
        navi('/hugi/list');
    }

    return (
        <div className="timeline" style={{ border: '1px solid gray', width: '100%', height: '50%', marginTop: '5px', marginBottom: '5px' }}>
            {/* 이미지 미리보기 */}
            {hphoto && <img alt="" src={`${process.env.REACT_APP_HUGI}${hphoto}`} style={{ width: '50%', margin: '10px 100px' }} />}
            <input type="file" className="form-control" onChange={onUploadEvent} />
            <br />
            <br />
            <div className="input-group">
                {/* 기존 후기 내용 */}
                <textarea className="form-control" style={{ width: '80%', resize: 'none' }} value={hcontent} onChange={(e) => setHcontent(e.target.value)} />
                {/* 파일 업로드 */}
                <br />
                {/* 수정 취소 및 수정 제출 버튼 */}
                <button type="submit" className="primary_button" style={{ width: '50%' }} onClick={onSubmitEdit}>
                    수정하기
                </button>
                <button type="button" className="primary_button" style={{ width: '50%' }} onClick={handleClcikList}>
                    취소
                </button>
            </div>
        </div>
    );
}

export default HugiModify;
