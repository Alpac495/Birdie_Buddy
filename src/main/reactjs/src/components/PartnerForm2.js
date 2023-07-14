import "./PartnerForm2.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
const PartnerForm2 = ({ onClose }) => {
    return (
        <div className="PF2partnerform2">
            <div className="PF2frame-parent">
                <div className="PF2detail-view">
                    <div className="PF2action-bar-contextual">
                        <div className="PF2favorite">
                            <CloseIcon color="white" className="PF2icon1"/>
                        </div>
                    </div>
                    <div className="PF2title">동반자 정보 입력
                    </div>
                </div>
                <div className="PF2partnerinfo">
                    <div className="PF2radio">
                        <div className="PF2label1">동반자 1 정보</div>
                        <div className="PF2div">성별</div>
                        <div className="PF2div1">
                            <label className="PF2radio-with-label">
                                <input type="radio" name="pgender" className="PF2div2"/>남자
                            </label>
                            <label className="PF2radio-with-label">
                                <input type="radio" name="pgender" className="PF2div2"/>여자
                            </label>
                        </div>
                    </div>
                    <div className="PF2frame">
                        <div className="PF2tasu">
                            <div className="PF2frame1">
                                <div className="PF2tasu">
                                    <div className="PF2div4">나이</div>
                                    <input type="number" className="PF2text-field" placeholder="나이입력"/>

                                </div>
                            </div>
                            <div className="PF2div4">평균 타수</div>
                            <input type="number" className="PF2text-field" placeholder="타수입력"/>

                        </div>
                    </div>
                </div>
                <div className="PF2partnerinfo">
                    <div className="PF2radio">
                        <div className="PF2label1">동반자 2 정보</div>
                        <div className="PF2div">성별</div>
                        <div className="PF2div1">
                            <label className="PF2radio-with-label">
                                <input type="radio" name="pgender" className="PF2div2"/>남자
                            </label>
                            <label className="PF2radio-with-label">
                                <input type="radio" name="pgender" className="PF2div2"/>여자
                            </label>
                        </div>
                    </div>
                    <div className="PF2frame">
                        <div className="PF2tasu">
                            <div className="PF2frame1">
                                <div className="PF2tasu">
                                    나이
                                    <input  className="PF2text-field" type="number" placeholder="나이 숫자로 입력"/>

                                </div>
                            </div>
                            <div className="PF2div4">평균 타수</div>
                            <input className="PF2text-field" type="number" placeholder="평균 타수 숫자로 입력"/>

                        </div>
                    </div>
                </div>
                <div className="PF2cta-button-1">
                    <div className="PF2round-button-icon">
                        <div className="PF2centered">
                            <Button className="PF2label2">동반자 정보 저장</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default PartnerForm2;
