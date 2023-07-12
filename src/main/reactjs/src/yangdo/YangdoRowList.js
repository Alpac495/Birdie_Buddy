import React from 'react';
import {NavLink} from "react-router-dom";
import noimage from '../images/noimage.png';

function YangdoRowList(props) {

    const {idx,no,row,currentPage} = props;

    const smallurl1=process.env.REACT_APP_BOARDURL1;
    const smallurl2=process.env.REACT_APP_BOARDURL2;

    return (
        <div>
            <NavLink to={`/yangdo/detail/${row.ynum}/${currentPage}`}>
                {
                    row.yphoto==null?
                    <img alt='' src={noimage}
                         style={{width:'40px',height:'40px'}}/>:
                    <img alt='' src={`${smallurl1}${row.yphoto}${smallurl2}`}
                         style={{width:'40px',height:'40px'}}/>
                }
                <b>{row.ysubject}</b>
            </NavLink>
            <br/>
            <b>{row.yday}</b><br/>
            <b>{row.yplace}</b><br/>
            <b>{row.yprice}원</b><br/>
            <b>{row.unum}</b><br/>
        </div>
    );
}

export default YangdoRowList;