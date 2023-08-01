import "./PartnerForm2.css";
import CloseIcon from "../image/xxx.svg";
import Button from "@mui/material/Button";
import {useState} from "react";
const PartnerForm2 = (props) => {
    const [jp1gender, setJp1gender] = useState("");
    const [jp1age, setJp1age] = useState("");
    const [jp1tasu, setJp1tasu] = useState("");
    const [jp2gender, setJp2gender] = useState("");
    const [jp2age, setJp2age] = useState("");
    const [jp2tasu, setJp2tasu] = useState("");


    const genderSelectHandler = e => {
        setJp1gender(e.currentTarget.value);
    };
    const ageinputHandler = e => {
        setJp1age(e.currentTarget.value);
    }
    const tasuinputHandler = e => {
        setJp1tasu(e.currentTarget.value);
    }

    const genderSelectHandler2 = e => {
        setJp2gender(e.currentTarget.value);
    };
    const ageinputHandler2 = e => {
        setJp2age(e.currentTarget.value);
    }
    const tasuinputHandler2 = e => {
        setJp2tasu(e.currentTarget.value);
    }

    const onSubmitEvent =()=>{
        props.propFunction(jp1gender,jp1age,jp1tasu,jp2gender,jp2age,jp2tasu)
    }

    const onCloseEvent =()=>{
        props.close()
    }
   
    
    return (
        <form onSubmit={onSubmitEvent}>
        <div className="PF2partnerform2">
          
                <div className="PF2detail-view">
                    <div className="PF2action-bar-contextual">
                        <div className="PTactions">
                            <img className="PTclose-clear" alt="" src={CloseIcon} onClick={onCloseEvent}/>
                        </div>
                        
                        <div className="PTtitle">동반자 정보 입력</div>
                    </div>    
                </div>
                <div className="PF2partnerinfo">
                    <div className="PF2radio">
                        <div className="PF2label">동반자 1 정보</div>
                        <div className="PF2div">성별</div>
                        <div className="PF2div1">
                            <label className="PF2radio-with-label">
                                <input type="radio" name="pgender" required className="PF2div2" value='남' onChange={genderSelectHandler}/>남자
                            </label>
                            <label className="PF2radio-with-label">
                                <input type="radio" name="pgender" className="PF2div2" value='여' onChange={genderSelectHandler}/>여자
                            </label>
                        </div>
                    </div>
                    <div className="PF2frame">
                        <div className="PF2tasu">
                            <div className="PF2frame1">
                                <div className="PF2tasu">
                                    <div className="PF2div4">나이</div>
                                    <input type="number" className="PF2text-field" required placeholder="나이입력" value={jp1age} onChange={ageinputHandler}/>

                                </div>
                            </div>
                            <div className="PF2div4">평균 타수</div>
                            <input type="number" className="PF2text-field" required placeholder="평균타수 숫자로 입력" value={jp1tasu} onChange={tasuinputHandler}/>

                        </div>
                    </div>
                </div>
                <div className="PF2partnerinfo">
                    <div className="PF2radio">
                        <div className="PF2label">동반자 2 정보</div>
                        <div className="PF2div">성별</div>
                        <div className="PF2div1">
                            <label className="PF2radio-with-label">
                                <input type="radio" name="p2gender" className="PF2div2" required value='남' onChange={genderSelectHandler2}/>남자
                            </label>
                            <label className="PF2radio-with-label">
                                <input type="radio" name="p2gender" className="PF2div2" value='여' onChange={genderSelectHandler2}/>여자
                            </label>
                        </div>
                    </div>
                    <div className="PF2frame">
                        <div className="PF2tasu">
                            <div className="PF2frame1">
                                <div className="PF2tasu">
                                    <div className="PF2div4">나이</div>
                                    <input  className="PF2text-field" type="number" required placeholder="나이 숫자로 입력" value={jp2age} onChange={ageinputHandler2}/>

                                </div>
                            </div>
                            <div className="PF2div4">평균 타수</div>
                            <input className="PF2text-field" type="number" required placeholder="평균 타수 숫자로 입력" value={jp2tasu} onChange={tasuinputHandler2}/>

                        </div>
                    </div>
                </div>
                <div className="PF2round-button-icon">
                   
                        <div className="PF2centered">
                            <div className="PF2icon"/>
                            <Button className="PF2label2" type='submit'>동반자 정보 저장</Button>
                        </div>
                   
                </div>
           
        </div>
        </form>
    );
};


export default PartnerForm2;
