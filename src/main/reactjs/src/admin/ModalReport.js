import React from 'react';
import './ModalReport.css';

function ModalReport({ reporterNickname, reportedNickname, reportReason, handleClose, handleBlacklist }) {
    return (
        <div className="SDsingodetail">
            <div className="SDsingo">
                <div className="SDsingodetailbar">
                    <div className="SDtitle">신고 상세보기</div>
                    <div className="SDclose-clear" />
                </div>
            </div>
            <div className="SDsingoinfo">
                <div className="SDframe">
                    <div className="SDsingogroup">
                        <div className="SDframe1">
                            <div className="SDsingogroup">
                                <div className="SDdiv">신고자</div>
                                <div className="SDtext-field">
                                    <div className="SDdiv1">{reporterNickname}</div>
                                </div>
                            </div>
                        </div>
                        <div className="SDframe1">
                            <div className="SDsingogroup">
                                <div className="SDdiv">피신고자</div>
                                <div className="SDtext-field">
                                    <div className="SDdiv1">{reportedNickname}</div>
                                </div>
                            </div>
                        </div>
                        <div className="div">신고 내용</div>
                        <div className="text-field">
                            <div className="div1">
                                {reportReason}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="SGpopupbtn">
                <div className="SGframe3">
                    <div className="SGdiv6" onClick={handleClose}>확인</div>
                    <div className="SGdiv6" onClick={handleBlacklist}>블랙리스트로</div>
                </div>
            </div>
        </div>
    );
}

export default ModalReport;