import React, {useEffect, useState} from 'react';
import axios from "axios";
import CryptoJS from 'crypto-js';

function Sms(props) {
    const { hp } = props;
// const signature =()=>{
//     var space = " ";				// one space
//     var newLine = "\n";				// new line
//     var method = "POST";				// method
//     var url = "/sms/v2/services/ncp:sms:kr:305198840444:birdiebuddy/messages";	// url (include query string)
//     var timestamp = String(new Date().getTime());	// current timestamp (epoch)
//     var accessKey = "";			// access key id (from portal or Sub Account)
//     var secretKey = "";			// secret key (from portal or Sub Account)
//
//     var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
//     hmac.update(method);
//     hmac.update(space);
//     hmac.update(url);
//     hmac.update(newLine);
//     hmac.update(timestamp);
//     hmac.update(accessKey);
//
//     var hash = hmac.finalize();
//
//     return hash.toString(CryptoJS.enc.Base64);
// }
//
//     const postData = {
//         "type":"SMS",
//         "from":"",
//         "content":"번호확인",
//         "messages":[
//             {
//                 "to":"",
//             }
//         ]
//     }
//
//     const headers = {
//         'Content-Type': 'application/json; charset=utf-8',
//         'x-ncp-apigw-timestamp': new Date().getTime(),
//         'x-ncp-iam-access-key': '',
//         'x-ncp-apigw-signature-v2': signature(),
//         'Access-Control-Allow-Origin' : 'localhost:3000' //****여기서 계속 오류나서 백에서 작업함.****
//     };

    return (
        <div className="FDprofile">
                <Header/>
                <div className="FDdiv">
                    <div className="FDchild" />
                </div>
                {/* <div className="FDbackprofile" /> */}
                {
                    dto.ubgphoto == null || '' ?
                        <img alt='error' className="MP2backprofile" src={back} />
                        :
                        <img alt='error' className="MP2backprofile" src={`${url2}${dto.ubgphoto}`} />
                }
                <div className="FDinfobox" />
                {/* <div className="FDmainprofile" /> */}
                {
                    dto.uphoto == null || '' ?
                        <img alt='error' className="FDmainprofile" style={{}} src={profile3} />
                        :
                        <img alt='error' className="FDmainprofile" style={{ borderRadius: '11%' }} src={`${image1}${dto.uphoto}${image2}`} />
                }
                <div className="FDdiv2">
                    <span className="FDtxt">
                        <p className="FDp">{dto.uage} {dto.ugender === "남" ? "남자" : "여자"}</p>
                        <p className="FDp">골프경력 {dto.ucareer} /&nbsp;
                            {
                                stasu == null || stasu == '' || stasu == 0 ?
                                    <span> 입력된 타수 정보가 없습니다</span> :
                                    <span>
                                        평균타수 {stasu}타
                                    </span>
                            }</p>
                    </span>
                </div>
                <div className="FDdiv3">자기소개<br/>{dto.ucontent}</div>
                <div className="FDdiv4">{dto.unickname}</div>
                <div className="FDicon-message-parent" onClick={onChatEvent.bind(null, funum)}>
                    <img className="FDicon-message" alt="" src={FDicon2} />
                    <div className="FDdiv5" >버디채팅</div>
                </div>
                <div className="FDicon-camera-parent" onClick={onMyStory}>
                    <img className="FDicon-camera" alt="" src={FDicon3} />
                    <div className="FDdiv5">버디스토리</div>
                </div>
                <div className="MP2singo-btn" onClick={handleReportClick}>
                    <div className="MP2singo-btn-child" />
                    <img className="MP2singo-btn-child" alt="" src={SingoBtn} />
                    {reportModalOpen &&
                        <ModalReport
                            reporterNickname={unum}
                            reportedNickname={dto.unum}
                            reportReason={reportReason}
                            setReportReason={setReportReason}
                            reportUser={handleReportSubmit}
                            handleClose={handleClose}
                        />
                    }
                </div>
                <div>
                    <button alt="" src={SingoBtn} onClick={handleReportClick} />신고하기
                    {reportModalOpen &&
                        <ModalReport
                            reporterNickname={unum}
                            reportedNickname={dto.unum}
                            reportReason={reportReason}
                            setReportReason={setReportReason}
                            reportUser={handleReportSubmit}
                            handleClose={handleClose}
                        />
                    }
                </div>
                {checkbuddy === 1 ? (
                    <div className="FDparent" onClick={onFriendCancelEvent}>
                        <div className="FDdiv5">버디 취소</div>
                        <img
                            className="FDicon-user-cirlce-add"
                            alt="" src={FDicon1} />
                    </div>
                ) : requestcheck.some((friend) => friend.funum == funum && friend.frequest == 2) ? (
                    <div className="FDparent" onClick={onAcceptEvent}>
                        <div className="FDdiv5">버디 요청 수락</div>
                        <img
                            className="FDicon-user-cirlce-add"
                            alt="" src={FDicon1} />
                    </div>
                ) : requestcheck.some((friend) => friend.funum == funum && friend.frequest == 1) ? (
                    <div className="FDparent" onClick={onFriendCancelEvent}>
                        <div className="FDdiv5">버디 요청 취소</div>
                        <img
                            className="FDicon-user-cirlce-add"
                            alt="" src={FDicon1} />
                    </div>
                ) : (
                    <div className="FDparent" onClick={onRequestFriendEvent}>
                        <div className="FDdiv5">버디 요청</div>
                        <img
                            className="FDicon-user-cirlce-add"
                            alt="" src={FDicon1} />
                    </div>
                )}
            </div>
    );
}

export default Sms;