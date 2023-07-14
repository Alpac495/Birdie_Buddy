import "./RankForm.css";
import Header from "../header/Header";
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";
import Button from "@mui/material/Button";


const RankForm = () => {
    const [n,setN]=useState(1);

    const [s, setS] = useState([
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ]);
    const [p, setP] = useState([
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ]);
    const [h, setH] = useState([
        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18
    ]);

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

    const minusPar = () => {
        const updatedP = [...p];
        updatedP[n - 1] = updatedP[n - 1] - 1;
        setP(updatedP);
    };
    const plusPar = () => {
        const updatedP = [...p];
        updatedP[n - 1] = updatedP[n - 1] + 1;
        setP(updatedP);
    };


    const minusHole = () => {
        if(n===1){
            alert("첫번째 홀입니다")
            return;
        }
        setN(prevN => prevN - 1);
    };
    const plusHole = () => {
        if(n===18){
            alert("마지막 홀입니다")
            return;
        }
        setN(prevN => prevN + 1);
    };
    return (
        <div className="rankform">
            <Header/>
            <table className={'scoretable'}>
                <tbody>
                <tr>
                    <td className={'firsttd'}>HOLE</td>
                    {h.slice(0,9).map((hole, index) => (
                        <td key={index} className={n === index + 1 ? 'tdbg' : ''}>
                            {hole}
                        </td>
                    ))}
                </tr>
                <tr>
                    <td className={'firsttd'}>PAR</td>
                    {p.slice(0,9).map((par, index) => (
                        <td key={index} className={n === index + 1 ? 'tdbg' : ''}>
                            {par}
                        </td>
                    ))}
                </tr>
                <tr>
                    <td className={'firsttd'}>SCORE</td>
                    {s.slice(0,9).map((score, index) => (
                        <td key={index} className={n === index + 1 ? 'tdbg' : ''}>
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
                    {h.slice(9,18).map((hole, index) => (
                        <td key={index} className={n === index + 10 ? 'tdbg' : ''}>
                            {hole}
                        </td>
                    ))}
                </tr>
                <tr>
                    <td className={'firsttd'}>PAR</td>
                    {p.slice(9,18).map((par, index) => (
                        <td key={index} className={n === index + 10 ? 'tdbg' : ''}>
                            {par}
                        </td>
                    ))}
                </tr>
                <tr>
                    <td className={'firsttd'}>SCORE</td>
                    {s.slice(9,18).map((score, index) => (
                        <td key={index} className={n === index + 10 ? 'tdbg' : ''}>
                            {score}
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
            <hr style={{height:'3px', backgroundColor:'lightgray', margin:'30px 0'}}/>
            <div className={'ranking_btnwrap'}>
                <div className={'ranking_hole'}>
                    <Button onClick={minusHole} variant="outlined" size="large">
                        prev hole
                    </Button>
                    {n}번홀
                    <Button onClick={plusHole} variant="outlined" size="large">
                        next hole
                    </Button>
                </div>
                <div className={'ranking_par'}>
                    <Button onClick={minusPar} variant="outlined" size="large">
                        p-
                    </Button>
                    <Button onClick={plusPar} variant="outlined" size="large">
                        p+
                    </Button>
                </div>
                <div className={'ranking_score'}>
                    <Button onClick={minusScore} variant="outlined" size="large">
                        s-
                    </Button>
                    <Button onClick={plusScore} variant="outlined" size="large">
                        s+
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RankForm;
