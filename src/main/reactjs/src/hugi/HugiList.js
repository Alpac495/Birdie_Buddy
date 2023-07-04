import React, {useState, useEffect} from 'react';
import RowList from "./HugiRowList";
import './Hugi.css';
import Axios from 'axios';
import {useNavigate} from "react-router-dom";
import HugiRowList from "./HugiRowList";


function HugiList(props) {

    const navi=useNavigate();

    const list=()=>{
        const url="/hugi/list"
        Axios.get(url)
            .then(res=>{
                setData(res.data);
            })
    }
    useEffect(()=>{
        list();
    },[]);

    const homeButton=(e)=>{
        navi("/");
    }
    const [data, setData] = useState([
        {
            uname: "이수근",
            hcontent: "안녕하세요",
            hphoto:
                "../image/1.png",
        },
        {
            uname: "강호동",
            hcontent: "반갑습니다",
            hphoto:
                "../image/2.png",
        },
    ]);

    return (
        <div className='hugi'>
        <div className="hugi_header">
                <button type="button" alt="" className="primary_button" onClick={homeButton} >Home</button>


        </div>
            <div className="timeline">
                {data.map((RowList) => (
                    <HugiRowList
                        uname={RowList.uname}
                        hcontent={RowList.hcontent}
                        hphoto={RowList.hphoto}
                    />
                ))}
            </div>
        </div>
    );
}

export default HugiList;