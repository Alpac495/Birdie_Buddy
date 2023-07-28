import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Report = () => {
    const [reportCount, setReportCount] = useState(0);
    const [reportedUsers, setReportedUsers] = useState([]);
    const [reportedUserFilter, setReportedUserFilter] = useState('');

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
                    <th>신고자</th>
                    <th>피신고자</th>
                    <th>신고사유</th>
                    <th>신고일자</th>
                </tr>
                </thead>
                <tbody>
                {reportedUsers.map((user, index) => (
                    <tr key={index}>
                        <td>{user.unum}</td>
                        <td>{user.runum}</td>
                        <td>{user.reason}</td>
                        <td>{user.rwriteday}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Report;
