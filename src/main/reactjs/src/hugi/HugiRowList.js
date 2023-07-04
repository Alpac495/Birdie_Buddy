import React from 'react';
import './List.css';
import Avatar from '@mui/material/Avatar';
function HugiRowList(props) {
    const {uname, hcontent, hphoto} = props;
    const url = process.env.REACT_APP_BOARDURL;

    return (
        <div className="list">
            <div className="list_header">
                <Avatar className="list_avatar" alt={uname}
                        src="/static/images/avatar/1.jpg"
                        />
                <h3>{uname}</h3>s

            <img className="list_image" src={`${url}${hphoto}`} alt="" />
            <h4 className="list_text">
                <strong>{uname}</strong>
                {hcontent}
            </h4>
        </div>
        </div>
    );
}

export default HugiRowList;