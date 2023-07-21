import "./RankForm.css";
import "../header/Header.css";
import Header from "../header/Header";
import {useCallback, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Modal from '../components/Modal';
import axios from "axios";


const RankForm = () => {
    const [n, setN] = useState(1);

    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [gname, setGname] = useState('');
    const [data, setData] = useState('');
    const [unum, setUnum] = useState(0);
    const list = () => {
        const url = "/golfjang/list";
        axios.get(url)
            .then(res => {
                setData(res.data);
            });
    };
    const unumchk=()=>{
        axios.get("/login/unumChk?unum="+unum)
            .then(res=>{
                console.log(res.data)
                setUnum(res.data);
            })
    }

    useEffect(() => {
        list();
        unumchk();
    }, []);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const selectGolfjang = (e, idx) => {
        console.log(idx)
        setGname(e.target.innerText);
        setGnum(idx+1)
        axios.get('/score/getGpar?gnum=' + (idx + 1))
            .then(res => {
                console.log(res.data)
                const gdata = res.data[0];
                const updatedP = [...p];
                for (let i = 1; i <= 18; i++) {
                    const j = `g${i}`;
                    if (gdata.hasOwnProperty(j)) {
                        updatedP[i - 1] = gdata[j];
                    }
                }
                setP(updatedP);
                console.log(updatedP)
            })
        {
            closeModal()
        }
    }

    const saveScore = () => {
        if(gnum==''){
            alert("골프장을 선택해 주세요")
            return;
        }
        axios.post('/score/saveScore', {s, unum, gnum})
            .then(res => {
                alert("일단 성공")
            })
            .catch(error=>{
                console.log(error);
            })
    }

    const [s, setS] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]);
    const [p, setP] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]);
    const [h, setH] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18
    ]);
    const [gnum, setGnum] = useState('');


    const minusScore = () => {
        const updatedS = [...s];
        updatedS[n - 1] = updatedS[n - 1] - 1;
        setS(updatedS);
    };
    const plusScore = () => {
        const updatedS = [...s];
        updatedS[n - 1] = updatedS[n - 1] + 1;
        setS(updatedS);
    };

    const minusHole = () => {
        if (n === 1) {
            alert("첫번째 홀입니다")
            return;
        }
        setN(prevN => prevN - 1);
    };
    const plusHole = () => {
        if (n === 18) {
            alert("마지막 홀입니다")
            return;
        }
        setN(prevN => prevN + 1);
    };

    return (
        <div className="rankform">
            <div>
                <Header/>
            </div>
            <button className="select_golf" onClick={openModal}>골프장선택</button>{gname}
            <Modal open={modalOpen} close={closeModal} header="골프장 선택">
                <div>
                    <input style={{marginLeft: '20px'}}
                           type="text"
                           placeholder="검색"
                           onChange={(e) => {
                               setSearchTerm(e.target.value);
                           }}/>
                    <br/><br/>
                    <ul>
                        {
                            data.map &&
                            data.filter((val) => {
                                if (searchTerm == "") {
                                    return val
                                } else if (val.gname.includes(searchTerm)) {
                                    return val
                                }
                            }).slice(0, 5).map((item, idx) =>
                                <span onClick={(e) => {
                                    selectGolfjang(e, idx)
                                }}><li>{item.gname}</li><br/></span>
                            )}
                    </ul>
                </div>
            </Modal>
            <table className={'scoretable'}>
                <tbody>
                <tr>
                    <td className={'firsttd'}>HOLE</td>
                    {h.slice(0, 9).map((hole, index) => (
                        
<td key={index} className={n === index + 1 ? 'tdbg numpad' : 'numpad'}>
                            {hole}
                        </td>
                    ))}
                </tr>
                <tr>
                    <td className={'firsttd'}>PAR</td>
                    {p.slice(0, 9).map((par, index) => (
                        
                    <td key={index} className={n === index + 1 ? 'tdbg numpad' : 'numpad'}>
                            {par}
                        </td>
                    ))}
                </tr>
                <tr>
                    <td className={'firsttd'}>SCORE</td>
                    {s.slice(0, 9).map((score, index) => (
                        
                        <td key={index} className={n === index + 1 ? 'tdbg numpad' : 'numpad'}>
                            {score}
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
            <br/>
            <table className={'scoretable'}>
                <tbody>
                <tr>
                    <td className={'firsttd'}>HOLE</td>
                    {h.slice(9, 18).map((hole, index) => (
                        <td key={index} className={n === index + 10 ? 'tdbg' : ''}>
                            {hole}
                        </td>
                    ))}
                </tr>
                <tr>
                    <td className={'firsttd'}>PAR</td>
                    {p.slice(9, 18).map((par, index) => (
                        <td key={index} className={n === index + 10 ? 'tdbg' : ''}>
                            {par}
                        </td>
                    ))}
                </tr>
                <tr>
                    <td className={'firsttd'}>SCORE</td>
                    {s.slice(9, 18).map((score, index) => (
                        <td key={index} className={n === index + 10 ? 'tdbg' : ''}>
                            {score}
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
            <hr style={{height: '3px', backgroundColor: 'rgba(0, 0, 0, 0)', margin: '10px 0'}}/>
            <div className={'ranking_btnwrap'}>
                <div className={'ranking_hole'}>
                    <button onClick={minusHole}>
                        prev hole
                    </button>
                    <div className="current_hole">{n}번홀</div>
                    <button onClick={plusHole}>
                        next hole
                    </button>
                </div>
                <div className={'ranking_score'}>
                    <button onClick={minusScore}>
                        s-
                    </button>
                    <div className="current_hole" >score</div>
                    <button onClick={plusScore}>
                        s+
                    </button>
                </div>
                <div>
                    <button className="rank_save" onClick={() => {
                        saveScore()
                    }}>저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RankForm;
