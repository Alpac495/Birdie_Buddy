import React from 'react';
import './List.css';
import Avatar from '@mui/material/Avatar';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';
import {useNavigate} from "react-router-dom";
function HugiRowList(props) {
    const {uname, hcontent, hphoto,hwriteday} = props;
    // const url = process.env.REACT_APP_BOARDURL;
    const navi=useNavigate();
    const DetailButton=(e)=>{
        navi("/hugi/detail");
    }

    return (
        <div className="list">
            <div className="list_header">
                <Avatar className="list_avatar" alt={uname}
                        src="/static/images/avatar/1.jpg"
                        />
                <h5>{uname}</h5>
            </div>
            <div style={{textAlign:"right"}}>
            <span>{hwriteday}</span>
            </div>
            {/*<img className="list_image" src={`${url}${hphoto}`} alt="" />*/}
            <img className="list_image" src={process.env.PUBLIC_URL +"/image/1.png"} alt="" />
            <h5 className="list_text">
                &nbsp;&nbsp;
                {hcontent}
            </h5>
                <MessageIcon style={{width:"25px",margin:"10px 10px",cursor:"pointer"}} onClick={DetailButton}/>

        </div>
    );
}

export default HugiRowList;