import React, {useEffect, useState} from 'react';
import Header from "../header/Header";
import Axios from "axios";
import "./RankingList.css";
import Footer from "../footer/Footer";
import {Link} from "react-router-dom";

function RankList(props) {
    const [rankingList, setRankingList]=useState([]);
    const [unum, setUnum]=useState(0);
    
   /* const unumchk=()=>{
        Axios.get("/login/unumChk?unum="+unum)
            .then(res=>{
                setUnum(res.data);
            })
    }
    useEffect(() => {
        unumchk()
    }, [])*/


    const getRankingList=()=>{
        Axios.get("/score/list")
            .then(res=>{
                setRankingList(res.data);
            })
    }


    return (
        <div className={''}>
            <Header/>
            <div className="ranking_listwrap" >
                <div className="my_ranking">
                    
                  
                </div>
           
                <hr style={{height:'3px', backgroundColor:'lightgray'}}/>

                <div className="ranking_list">
                   <div className='ranking_bar1'>

                   </div>

                   <div className='ranking_bar2'>
                        
                   </div>

                   <div className='ranking_bar3'>
                        
                   </div>

                   <div className='ranking_bar'>
                        
                   </div>

                   <div className='ranking_bar'>
                        
                    </div>

                </div>
            </div>
            <Footer/>
            </div>


    );
}

export default RankList;