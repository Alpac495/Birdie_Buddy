import React, { useState } from 'react';
import Header from "../header/Header";
import Axios from "axios";
import "./RankingList.css";

function RankList(props) {
    const [ranking, setRanking] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    return (
        <div>
            <Header/>
            <div className="ranking_listwrap" onClick={handleBackgroundClick}>
                <div className="ranking_topper">
                    <div>랭킹 리스트</div>
                    <div>
                        <button type="button" onClick={openModal}>스코어 입력</button>
                    </div>
                </div>

                <div className="ranking_list">
                    <table>
                        <thead>
                        <tr>
                            <th>등수</th>
                            <th>이름</th>
                            <th>평균타수</th>
                            <th>골프장명</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>응애</td>
                            <td>53523</td>
                            <td>응애노스DB</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {isOpen && (
                    <div className="modal_background">
                        <div className={`ranking_modal ${isOpen ? "open" : ""}`}>
                            <div className="rankingmodal_content">
                                <h2>Modal Title</h2>
                                <select>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RankList;