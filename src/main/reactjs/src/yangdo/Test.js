import "./YangdoList.css";
const YangdoList = () => {
  return (
    <div className="Ylyangdolist">
      <div className="Ylyangdolist-child" />
      <div className="Ylrectangle-parent">
        <div className="Ylgroup-child" />
        <div className="Yldiv">마이 양도</div>
      </div>
      <div className="Ylrectangle-group">
        <div className="Ylgroup-item" />
        <img className="Ylicon-pencil-thin" alt="" src="/-icon-pencil-thin.svg" />
      </div>
      <div className="Yldiv1">검색</div>
      <img className="Ylicon-search" alt="" src="/-icon-search.svg" />
      <div className="Ylblacklistmodalveticalframe">
        <div className="Ylgroup-parent">
          <div className="Ylrectangle-container">
            <div className="Ylgroup-inner" />
            <div className="Yldiv2">건설공제조합 세종필드 골프 클럽</div>
            <div className="Yldiv3">그린피 : 8,000원</div>
            <div className="Ylam">09:00 AM</div>
          </div>
          <div className="Ylgroup-div">
            <div className="Ylrectangle-div" />
            <img className="Ylgroup-icon" alt="" src="/group-154.svg" />
            <div className="Yldiv4">닉네임</div>
            <div className="Yldiv5">{`작성일 : `}</div>
          </div>
          <div className="Ylrectangle-parent1">
            <div className="Ylgroup-child1" />
            <div className="Yldiv6">23.07</div>
            <div className="Yldiv7">27</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YangdoList;
