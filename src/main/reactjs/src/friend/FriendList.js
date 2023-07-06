import React from 'react';
import "./Friend.css";

function FriendList(props) {

    const {idx,item} = props;

    return (
        <div>
            <div className="rectangle-parent">
                <div className="group-child" />
                <div className="group-item" />
                <b className="frlb">{item.uname}</b>
                <div className="frldiv2">{item.ugender} {item.uage}</div>
                <div className="frldiv3">평균타수 : 8.0</div>
            </div>
            <div className="friend-inner" /><br/>
        </div>
    );
}

export default FriendList;