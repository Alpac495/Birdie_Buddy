import React from 'react';
import './ModalReport.css';

function ModalReport({ reporterNickname, reportedNickname, reportReason, setReportReason, reportUser, handleClose }) {
    const handleConfirm = async () => {
        await reportUser(); // 신고 제출
        handleClose(); // 모달 닫기
    };

    return (
        <div className="SGsingoform">
            <div className="SGsingoformbar">
                <div className="SGsingobar">
                    <div className="SGtitle">신고하기</div>
                </div>
            </div>
            <div className="SGsingoinfo">
                <div className="SGframe">
                    <div className="SGsingogroup">
                        <div className="SGframe1">
                            <div className="SGsingogroup">
                                <div className="SGdiv">신고자</div>
                                <div className="SGtext-field">
                                    <div className="SGdiv1">{reporterNickname}</div>
                                </div>
                            </div>
                        </div>
                        <div className="SGframe1">
                            <div className="SGsingogroup">
                                <div className="SGdiv">피신고자</div>
                                <div className="SGtext-field">
                                    <div className="SGdiv1">{reportedNickname}</div>
                                </div>
                            </div>
                        </div>
                        <div className="SGdiv">신고 사유</div>
                        <div className="SGtext-field">
                            <textarea
                                className="SGdiv1"
                                value={reportReason}
                                placeholder={"신고 사유를 50자 이내로 작성해주세요"}
                                onChange={(e) => setReportReason(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="SGpopupbtn">
                <div className="SGflframe">
                    <div className="SGdiv6" onClick={handleConfirm}>확인</div>
                </div>
                <div className="SGframe3">
                    <div className="SGdiv6" onClick={handleClose}>취소</div>
                </div>
            </div>
        </div>
    );
}

export default ModalReport;
