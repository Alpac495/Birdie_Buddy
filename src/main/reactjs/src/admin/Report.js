import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ModalReport from './ModalReport'; // 모달 컴포넌트를 임포트합니다.

const Report = () => {
    const [reportCount, setReportCount] = useState(0);
    const [reportedUsers, setReportedUsers] = useState([]);
    const [reportedUserFilter, setReportedUserFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchReportData = async () => {
        try {
            const responseCount = await Axios.get('/report/gettotalcount');
            setReportCount(responseCount.data);

            const responseUsers = await Axios.get('/report/getallreport');
            setReportedUsers(responseUsers.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchReportData();
    }, []);

    const handleFilterChange = (e) => {
        setReportedUserFilter(e.target.value);
    };

    const fetchReportedUser = async () => {
        try {
            const responseUsers = reportedUserFilter !== '' ?
                await Axios.get(`/report/getreport?runum=${reportedUserFilter}`) :
                await Axios.get('/report/getallreport');
            setReportedUsers(responseUsers.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchReportedUser();
    };

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div>
            <h1>신고 내역</h1>
            <p>Total Reports: {reportCount}</p>
            <form onSubmit={handleFilterSubmit}>
                <label htmlFor="filter">Filter by Reported User Number: </label>
                <input type="text" id="filter" value={reportedUserFilter} onChange={handleFilterChange} />
                <button type="submit">Filter</button>
            </form>
            <table>
                <thead>
                <tr>
                    <th>번호</th>
                    <th>신고자</th>
                    <th>피신고자</th>
                    <th>신고일자</th>
                </tr>
                </thead>
                <tbody>
                {reportedUsers.map((user, index) => (
                    <tr key={index} onClick={() => handleRowClick(user)}>
                        <td>{user.rnum}</td>
                        <td>{user.unum}</td>
                        <td>{user.runum}</td>
                        <td>{user.rwriteday}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {isModalOpen && selectedUser && (
                <ModalReport
                    reporterNickname={selectedUser.unum}
                    reportedNickname={selectedUser.runum}
                    reportReason={selectedUser.reason}
                    handleClose={handleClose}
                />
            )}
        </div>
    );
};

export default Report;