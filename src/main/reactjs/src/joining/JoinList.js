import React from 'react';
import {NavLink} from "react-router-dom";

function JoinList(props) {
    return (
        <div>
            <div>
                <h1>조인목록</h1>
            </div>
            <div>
                <ul>
                    <li>조인&nbsp;&nbsp;<NavLink to={'/join/form'}><button type='button' className='btn btn-sm btn-success'>조인신청하기</button></NavLink></li>
                    
                </ul>
            </div>
        </div>
    );
}

export default JoinList;