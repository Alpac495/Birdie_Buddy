import "./FriendList.css";
import React from 'react';
const FriendList = (props) => {
    const {idx,item}=props;
    return (
        <div className="friendlist">
            <div className="friendlist-child" />
            <div className="friendlist-item" />
            <div className="flist">
                <div className="flist-child" />
                <div className="flist-item" />
                <b className="b">{item.name}</b>
                <div className="div">여 30</div>
                <div className="div1">{idx+1}평균타수 : 8.0</div>
            </div>
            <div className="flist-line" />

        </div>
    );
};

export default FriendList;
