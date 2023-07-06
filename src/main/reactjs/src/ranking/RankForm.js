import "./RankForm.css";
import Header from "../header/Header";
import SearchIcon from '@mui/icons-material/Search';


const RankForm = () => {
    return (
        <div className="rankform">
            <Header/>
            <div className="frame-parent">
                <div className="frame-group">
                    <div className="parent">
                        <div className="div">골프장명 </div>
                        <input
                            className="email"
                            type="text"
                            placeholder="Enter your name"
                            maxLength
                            minLength
                        />
                    </div>
                    <div className="parent">
                        <div className="div">전반코스</div>
                        <input
                            className="email1"
                            type="text"
                            placeholder="Enter your email address"
                            maxLength
                            minLength
                        />
                    </div>
                    <div className="parent">
                        <div className="div">후반코스</div>
                        <input className="email2" type="text" maxLength minLength />
                    </div>
                </div>
                <div className="frame-container">
                    <div className="parent">
                        <div className="div">티타임</div>
                        <input
                            className="email"
                            type="text"
                            placeholder=""
                            maxLength
                            minLength
                        />
                    </div>
                    <div className="parent1">
                        <div className="div">티</div>
                        <input
                            className="email2"
                            type="text"
                            placeholder="Enter your email address"
                            maxLength
                            minLength
                        />
                    </div>
                </div>
            </div>
            <div className="rankform-child" />
            <div className="div7">가입하기</div>
        </div>
    );
};

export default RankForm;
