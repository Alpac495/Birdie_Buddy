import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import "./Score.css";

function Score(props) {
    const [data, setData] = useState([]);
    const [h, setH] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18
    ]);
    const unumchk = () => {
        axios.get("/apilogin/unumChk")
            .then(res => {
                axios.get("/apiscore/myScoreList?unum=" + res.data)
                    .then(res => {
                        setData(res.data);
                    })
            })
    }

    useEffect(() => {
        unumchk();
    }, [])

    return (
        <div>
            {
                data && data.map((item, idx) => (
                    <div>
                        작성일:{item.swriteday} <br/>
                        골프장 : {item.gname}
                        <table className={'my_scoretable'}>
                            <tbody>
                                <tr>
                                    <td className={'my_my_firsttd'}>HOLE</td>
                                    {Array.from({ length: 9 }, (_, index) => (
                                        <td key={index} className={'my_numpad'}>
                                            {index + 1}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className={'my_my_firsttd'}>PAR</td>
                                    {Array.from({ length: 9 }, (_, index) => (
                                        <td key={index} className={'my_numpad'}>
                                            {item['g' + (index + 1)]}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className={'my_my_firsttd'}>SCORE</td>
                                    {Array.from({ length: 9 }, (_, index) => (
                                        <td key={index} className={'my_numpad'}>
                                            {item['h' + (index + 1)]}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                        <br/>
                        <table className={'my_scoretable'}>
                            <tbody>
                                <tr>
                                    <td className={'my_firsttd'}>HOLE</td>
                                    {Array.from({ length: 9 }, (_, index) => (
                                        <td key={index + 9} className={'my_numpad'}>
                                            {index + 10}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className={'my_firsttd'}>PAR</td>
                                    {Array.from({ length: 9 }, (_, index) => (
                                        <td key={index + 9} className={'my_numpad'}>
                                            {item['g' + (index + 10)]}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className={'my_firsttd'}>SCORE</td>
                                    {Array.from({ length: 9 }, (_, index) => (
                                        <td key={index + 9} className={'my_numpad'}>
                                            {item['h' + (index + 10)]}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                        <hr/>
                    </div>
                ))
            }
        </div>
    );
}

export default Score;
