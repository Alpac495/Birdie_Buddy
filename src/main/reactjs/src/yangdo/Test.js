import "./Test.css";
import Back from "../image/Back.svg";
import hidelogo from "../image/hidelogo.svg";


const PhonenumberChange = () => {
  return (
    <div className="CCphonenumberchange">
      <div className="CCrectangle-parent">
        <div className="CCgroup-child" />
        <div className="CCdiv">휴대폰 번호 변경하기</div>
      </div>
      <img className="CCbirdie-buddy" alt="" src={hidelogo} />
      <div className="CCphonenumberchange-child" />
      <div className="CCphonenumberchange-item" />
      <div className="CCparent">
        <div className="CCdiv1">휴대폰 번호 변경</div>
        <img className="CCicon-arrow-left" alt="" src={Back} />
      </div>
      <div className="CCgroup">
        <div className="CCdiv2">새로운 휴대폰 번호</div>
        <div className="CCrectangle-group">
          <div className="CCgroup-item" />
          <div className="CCdiv3">공백 또는 ‘-’ 없이 숫자로 입력해주세요.</div>
          <div className="CCgroup-inner" />
          <div className="CCdiv4">발송</div>
        </div>
      </div>
      <div className="CCcontainer">
        <div className="CCdiv5">인증 번호</div>
        <div className="CCrectangle-group">
          <div className="CCgroup-item" />
          <div className="CCdiv3">인증 번호를 입력하세요.</div>
          <div className="CCgroup-inner" />
          <div className="CCdiv4">확인</div>
        </div>
      </div>
      <div className="CCdiv8">변경할 휴대폰 번호 인증을 해주세요.</div>
    </div>
  );
};

export default PhonenumberChange;
