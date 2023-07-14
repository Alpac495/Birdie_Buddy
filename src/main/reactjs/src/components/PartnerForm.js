import "./PartnerForm.css";
import CloseIcon from '@mui/icons-material/Close';
const PartnerForm = ({ onClose }) => {
    return (
        <div className="PFpartnerform">
            <div className="PFdetail-view">
                <div className="PFaction-bar-contextual">
                    <div className="PFactions">
                        <div className="PFfavorite">
                            <div className="PFicon" />
                        </div>
                        <div className="PFfavorite">
                            <div className="PFicon1" />
                        </div>
                    </div>
                    <div className="PFtitle">동반자 정보 입력</div>
                    <CloseIcon color="white" className="PFclose-clear"/>
                </div>
            </div>
            <div className="PFpartnerinfo">
                <div className="PFradio">
                    <div className="PFlabel">동반자 1 정보</div>
                    <div className="PFdiv">성별</div>
                    <div className="PFdiv1">
                        <div className="PFradio-with-label">
                            <div className="PFradio1" />
                            <div className="PFdiv2">남자</div>
                        </div>
                        <div className="PFradio-with-label">
                            <div className="PFradio2" />
                            <div className="PFdiv2">여자</div>
                        </div>
                    </div>
                </div>
                <div className="PFframe">
                    <div className="PFtasu">
                        <div className="PFframe1">
                            <div className="PFtasu">
                                <div className="PFdiv4">나이</div>
                                <div className="PFtext-field">
                                    <div className="PFdiv5">타수 입력</div>
                                </div>
                            </div>
                        </div>
                        <div className="PFdiv4">평균 타수</div>
                        <div className="PFtext-field">
                            <div className="PFdiv5">타수 입력</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="PFcta-button-1">
                <div className="PFround-button-icon">
                    <div className="PFcentered">
                        <div className="PFlabel1">동반자 정보 저장</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerForm;
