import React, { useState } from 'react';

function Bot(props) {
    const [messages, setMessages] = useState([]);
    const apiUrl = 'https://cfsfiehygx.apigw.ntruss.com/custom/v1/11008/5a5ad3926f00f299369d8947dbde9e7b217a950bed8d45eff49a80e35dac4891'; // 클로바 챗봇 API 엔드포인트 URL
    const apiKey = 'Z29IT1NGbXh1Y1FBS1d1cHpTT2l5dlRRanVRTGl6YUI='; // 클로바 챗봇 API 인증 키

    const sendMessage = async (userInput) => {
        // API 요청 데이터 생성
        const requestData = {
            message: {
                text: userInput
            }
        };

        try {
            // 클로바 챗봇 API 호출
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-NCP-APIGW-API-KEY-ID': apiKey
                },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();

            // 응답 처리
            const botResponse = data.message.text;

            // 채팅창에 응답 추가
            setMessages([...messages, { text: botResponse, isUser: false }]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUserInput = (e) => {
        e.preventDefault();
        const userInput = e.target.value;
        sendMessage(userInput);
        e.target.value = ''; // 입력 필드 초기화
    };

    //setMessages((prevMessages) => [...prevMessages, { text: botResponse, isUser: false }]);


    return (
        <div>
            <div className="chatbox">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={message.isUser ? 'user-message' : 'bot-message'}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleUserInput}>
                <input type="text" placeholder="Type your message" />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Bot;