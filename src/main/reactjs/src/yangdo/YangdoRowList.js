import React from 'react';
import {NavLink} from "react-router-dom";
import noimage from '../images/noimage.png';

function YangdoRowList(props) {

    const {idx,no,row,currentPage} = props;

    return (
        <div>
            <NavLink to={`/yangdo/detail/${row.ynum}/${currentPage}`}>
                <b>{row.yplace}</b><br/>
            </NavLink>
            <b>{row.yday}</b><br/>
            <b>{row.ysubject}</b><br/>
            <b>{row.yprice}원</b><br/>
            <b>{row.unum}</b><br/>
        </div>
    );
}

export default YangdoRowList;