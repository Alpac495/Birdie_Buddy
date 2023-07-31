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
        <div>
            <button type={'button'} onClick={'sms'}>sms인증</button>
        </div>
    );
}

export default Sms;