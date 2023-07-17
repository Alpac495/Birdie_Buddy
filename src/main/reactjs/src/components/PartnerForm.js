import "./PartnerForm.css";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
const PartnerForm = ({ onClose }) => {
    return (
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
                    <div className="PFlabel">동반자 1 정보</div>
                    <div className="PFdiv">성별</div>
                    <div className="PFdiv1">
                        <label className="PFradio-with-label">
                            <input type="radio" name="pgender" className="PFdiv"/>남자
                        </label>
                        <label className="PFradio-with-label">
                            <input type="radio" name="pgender" className="PFdiv2"/>여자
                        </label>
                    </div>
                </div>
                <div className="PFframe">
                    <div className="PFtasu">
                        <div className="PFframe1">
                            <div className="PFtasu">
                                <div className="PFdiv4">나이</div>
                                <input type="number" className="PFtext-field" placeholder="나이 숫자로 입력"/>
                            </div>
                        </div>
                        <div className="PFdiv4">평균 타수</div>
                        <input type="number" className="PFtext-field" placeholder="평균타수 숫자로 입력"/>
                    </div>
                </div>
            </div>
            <div className="PFcta-button-1">
                <div className="PFround-button-icon">
                    <div className="PFcentered">
                        <Button className="PFlabel1">동반자 정보 저장</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerForm;
