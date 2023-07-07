import React from 'react';
import Header from "../header/Header";
import Axios from "axios";

function RankList(props) {

    Axios.get()
    return (
        <div>
            <Header/>
            <button type={'button'}>스코어 입력</button>
            <div className={'ranking_list'}>


            </div>
        </div>
    );
}

export default RankList;