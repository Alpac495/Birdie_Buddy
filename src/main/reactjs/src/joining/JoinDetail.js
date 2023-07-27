import iconSend from "../image/icon_yangdo.svg";
import "./JoinDetail.css";
// import { useState, useCallback } from "react";
// import PopupModal from "../components/PopupModal";
// import PortalPopup from "../components/PortalPopup";
// import "./ChatDetail.css";
const ChatDetail = () => {
//   const [isPopupModalOpen, setPopupModalOpen] = useState(false);

//   const openPopupModal = useCallback(() => {
//     setPopupModalOpen(true);
//   }, []);

//   const closePopupModal = useCallback(() => {
//     setPopupModalOpen(false);
//   }, []);

  return (
    <>
      <div className="CDchatdetail">
        <div className="CDparent">
          <div className="CDdiv3">출력부분은 알아서 하세요</div>
          <div className="CDflist-line" />
        </div>
        <input className="CDemail" type="text" placeholder="Enter your name" />
        <div className="CDcta-button-1">
          <div className="CDround-button-icon">
            <div className="CDcentered">
              <div className="label">채팅방 종료하기</div>
            </div>
          </div>
        </div>
        <div className="CDchatdetail-child">보내기</div>
      </div>
      {/* {isPopupModalOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePopupModal}
        >
          <PopupModal onClose={closePopupModal} />
        </PortalPopup>
      )} */}
    </>
  );
};

export default ChatDetail;
