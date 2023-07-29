import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ModalReport from './ModalReport';
import { useParams } from 'react-router-dom';
import "./Report.css";
import Header from "../header/Header";

const Report = () => {
    const [reportCount, setReportCount] = useState(0);
    const [reportedUsers, setReportedUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 10;

    const { unum } = useParams();

    const fetchReportData = async () => {
        try {
            const responseUsers = await Axios.get(`/report/getreport?runum=${unum}&page=${currentPage}&limit=${reportsPerPage}`);
            setReportedUsers(responseUsers.data);

            const responseCount = await Axios.get(`/report/getcount?runum=${unum}`);
            setReportCount(responseCount.data);
            console.log('Report Count: ', responseCount.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchReportData();
    }, [currentPage]);

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleBlacklist = async () => {
        try {
            await Axios.post('/api/blacklist', { unum: selectedUser.unum });
            fetchReportData();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding user to blacklist:', error);
        }
    }

    return (
        <div className="DLdecllist">
            <div className={"header"}><Header/></div>
            <div className="DLrectangle-parent">
                <div className="DLgroup-child" />
                <div className="DLwrapper">
                    <div className="DLdiv">신고 내역</div>
                </div>
            </div>
            <div className="DLparent">
                <div className="DLdiv1">번호</div>
                <div className="DLdiv2">피신고자</div>
                <div className="DLdiv3">신고자</div>
                <div className="DLdiv4">신고 날짜</div>
                <div className="DLgroup-item" />
            </div>
            {reportedUsers.map((user, index) => (
                <div key={index} className="DLgroup" onClick={() => handleRowClick(user)}>
                    <div className="DLdiv5">{index + 1}</div>
                    <div className="DLdiv6">{user.runum}</div>
                    <div className="DLdiv7">{user.unum}</div>
                    <div className="DLdiv8">
                        {
                            new Date(user.rwriteday).getFullYear() + '-' +
                            ('0' + (new Date(user.rwriteday).getMonth() + 1)).slice(-2) + '-' +
                            ('0' + new Date(user.rwriteday).getDate()).slice(-2)
                        }
                    </div>
                    <div className="DLgroup-inner" />
                </div>
            ))}
            <div className="DLdiv9">
                {Array(Math.ceil(reportCount / reportsPerPage)).fill().map((_, index) => (
                    <button key={index} onClick={() => handlePageClick(index + 1)}>{index + 1}</button>
                ))}
            </div>
            {isModalOpen && selectedUser && (
                <ModalReport
                    reporterNickname={selectedUser.unum}
                    reportedNickname={selectedUser.runum}
                    reportReason={selectedUser.reason}
                    handleClose={handleClose}
                    handleBlacklist={handleBlacklist}
                />
            )}
        </div>
    );
};

export default Report;
