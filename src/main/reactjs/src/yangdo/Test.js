import "./Test.css";
const PasswordSearch2 = () => {
  return (
    <div className="PC3passwordsearch2">
      <div className="PC3div">
        <ul className="PC3ul">
          <li className="PC3li">
            회원님의 비밀번호는 운영자도 알 수 없도록 암호화 되어 있습니다.
          </li>
          <li className="PC3li">따라서 새로운 비밀번호를 등록하셔야 합니다.</li>
          <li className="PC3li">영문/숫자/특수문자 조합으로 8~16자, 대소문자 구분</li>
        </ul>
      </div>
      <div className="PC3rectangle-parent">
        <div className="PC3group-child" />
        <div className="PC3div1">비밀번호 변경하기</div>
      </div>
      <div className="PC3group-parent">
        <div className="PC3rectangle-group">
          <div className="PC3group-item" />
          <div className="PC3div2">새로운 비밀번호를 입력하세요.</div>
        </div>
        <div className="PC3div3">새로운 비밀번호</div>
      </div>
      <div className="PC3parent">
        <div className="PC3div4">비밀번호 재확인</div>
        <div className="PC3rectangle-container">
          <div className="PC3group-item" />
          <div className="PC3div2">새로운 비밀번호를 한번 더 입력하세요.</div>
        </div>
      </div>
      <div className="PC3birdie-buddy">Birdie Buddy</div>
      <div className="PC3passwordsearch2-child" />
      <div className="PC3group">
        <div className="PC3div6">비밀번호 변경</div>
        <img className="PC3icon-arrow-left" alt="" src="/-icon-arrow-left.svg" />
      </div>
    </div>
  );
};

export default PasswordSearch2;
