import React, {useEffect, useState} from 'react';
import axios from "axios";
import './MypageUpdate.css';

function MypageUpdate(props) {
    const [unum,setUnum]=useState('');
    const [uemail,setUemail]=useState('');
    const [uname,setUname]=useState('');
    const [unickname,setUnickname]=useState('');
    const [uage,setUage]=useState('');
    const [uphoto,setUphoto]=useState('');
    const [ugender,setUgender]=useState('');
    const [uhp,setUhp]=useState('');
    const [ucontent,setUcontent]=useState('');
    const [utasuopen,setUtasuopen]=useState('');
    const [ucareer,setUcareer]=useState('');

    const getUserData =()=>{
        axios.get("/login/getuser?unum="+sessionStorage.unum)
            .then(res=>{
                console.log(res.data)
                setUnum(res.data.unum);
                setUemail(res.data.uemail);
                setUname(res.data.uname);
                setUnickname(res.data.unickname);
                setUage(res.data.uage);
                setUphoto(res.data.uphoto);
                setUgender(res.data.ugender);
                setUhp(res.data.uhp);
                setUcontent(res.data.ucontent);
                setUtasuopen(res.data.utasuopen);
                setUcareer(res.data.ucareer);
            })
    }
    useEffect(()=>{
        getUserData()
    },[])
    return (
        <div>
            
        </div>
    );
}

export default MypageUpdate;