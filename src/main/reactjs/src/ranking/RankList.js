import React, {useState} from 'react';
import Header from "../header/Header";
import Axios from "axios";

function RankList(props) {
    const [ranking, setRanking]=useState([]);

    return (
        <div>
            <Header/>
            <div className={'ranking_listwrap'}>
                <div>랭킹 리스트</div> <button type={'button'}>스코어 입력</button>
                <div className={'ranking_list'}>
                    {

                    }
                </div>
            </div>
        </div>
    );
}

export default RankList;