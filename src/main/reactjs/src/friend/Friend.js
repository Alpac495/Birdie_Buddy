import React from 'react';
import {NavLink} from "react-router-dom";

function Friend(props) {
    return (
        <div>
            <div>
                <h1>친구목록</h1>
            </div>
            <div>
                <ul>
                    <li>친구1 나이&nbsp;&nbsp;<NavLink to={'/friend/detail'}><button type='button' className='btn btn-sm btn-success'>상세보기</button></NavLink></li>
                    <li>친구2 나이&nbsp;&nbsp;<NavLink to={'/friend/detail'}><button type='button' className='btn btn-sm btn-success'>상세보기</button></NavLink></li>
                    <li>친구3</li>
                    <li>친구4</li>
                    <li>친구5</li>
                </ul>
            </div>
        </div>
    );
}

export default Friend;