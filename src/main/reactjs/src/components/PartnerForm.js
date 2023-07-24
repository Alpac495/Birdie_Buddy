import "./PartnerForm.css";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import React, {useState} from 'react';
const PartnerForm = ( props ) => {
    const [jp1gender, setJp1gender] = useState("");
    const [jp1age, setJp1age] = useState("");
    const [jp1tasu, setJp1tasu] = useState("");
    console.log(jp1gender,jp1age,jp1tasu)
    const genderSelectHandler = e => {
        setJp1gender(e.currentTarget.value);
    };
    const ageinputHandler = e => {
        setJp1age(e.currentTarget.value);
    }
    const tasuinputHandler = e => {
        setJp1tasu(e.currentTarget.value);
    }

    const onSubmitEvent =()=>{
        props.propFunction(jp1gender,jp1age,jp1tasu)
    }

    return (
        <form onSubmit={onSubmitEvent}>
        <div className="PFpartnerform">
            <div className="PFdetail-view">
                <div className="PFaction-bar-contextual">
                    <div className="PFfavorite">
                        <CloseIcon color="white" className="PFicon1"/>
                    </div>
                </div>
                    <div className="PFtitle">동반자 정보 입력

                </div>
            </div>

            <div className="PFpartnerinfo">
                <div className="PFradio">
                    <div className="PFlabel">동반자 정보</div>
                    <div className="PFdiv">성별</div>
                    <div className="PFdiv1">
                        <label className="PFradio-with-label">
                            <input type="radio" name="pgender" required className="PFdiv" value='남' onChange={genderSelectHandler}/>남자
                        </label>
                        <label className="PFradio-with-label">
                            <input type="radio" name="pgender" className="PFdiv2" value='여' onChange={genderSelectHandler}/>여자
                        </label>
                    </div>
                </div>
                <div className="PFframe">
                    <div className="PFtasu">
                        <div className="PFframe1">
                            <div className="PFtasu">
                                <div className="PFdiv4">나이</div>
                                <input type="number" className="PFtext-field" required placeholder="나이 숫자로 입력" value={jp1age} onChange={ageinputHandler}/>
                            </div>
                        </div>
                        <div className="PFdiv4">평균 타수</div>
                        <input type="number" className="PFtext-field" required placeholder="평균타수 숫자로 입력" value={jp1tasu} onChange={tasuinputHandler}/>
                    </div>
                </div>
            </div>
            <div className="PFcta-button-1">
                <div className="PFround-button-icon">
                    <div className="PFcentered">
                        <Button className="PFlabel1" type='submit'>동반자 정보 저장</Button>
                    </div>
                </div>
            </div>
        </div>
        </form>
    );
};

export default PartnerForm;
