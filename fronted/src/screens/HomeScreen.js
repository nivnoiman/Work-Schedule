import React, { useEffect } from 'react';
import { Table, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'react-uuid'
import { getAllSchedulesAction } from '../actions/scheduleActions';
import Paginate from '../components/Paginate';


const HomeScreen = ({ match }) => {

    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
    const setDay = (dayNumber) => {
        if (schedules[0]) {
            const dayWord = new Date(Number(new Date(schedules[0].date).getFullYear()), Number(new Date(schedules[0].date).getMonth()), Number(dayNumber)).getDay()
            return days[dayWord]
        } else return null
    }

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    const getSchedules = useSelector(state => state.getSchedules);
    const { schedules, pages, page } = getSchedules;

    const downloadJson = (objectData) => {
        let filename = "export.json";
        let contentType = "application/json;charset=utf-8;";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            var a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    useEffect(() => {
        dispatch(getAllSchedulesAction(pageNumber))
    }, [dispatch, pageNumber])


    return (
        <>
            <Row style={{ 'direction': 'rtl' }}>
                <Link
                    className='btn btn-primary my-3'
                    to={userInfo ? '/myshifts' : '/login?redirect=myshifts'}>
                    המשמרות שלי
                    </Link>
                <Link
                    className='btn btn-success my-3'
                    to={userInfo ? '/submitshifts' : '/login?redirect=submitshifts'}>
                    הגשת משמרות
                    </Link>
            </Row>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>רענון</th>
                        <th>משמרת לילה 22:00-6:00</th>
                        <th>משמרת צהריים 14:00-22:00</th>
                        <th>משמרת בוקר 06:00-14:00:00</th>
                        <th>תאריך</th>
                        <th>יום בשבוע</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td className='shiftTD'>
                            <p>אחמ"ש</p>
                            <p>מאבטח 2</p>
                        </td>
                        <td className='shiftTD'>
                            <p>אחמ"ש</p>
                            <p>מאבטח 2</p>
                        </td>
                        <td className='shiftTD'>
                            <p>אחמ"ש</p>
                            <p>מאבטח 2</p>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    {schedules &&
                        schedules[0].shifts.map((day, index) => (
                            <tr key={uuid()}>
                                <td>
                                    {day.trainings.map((p, index) => <p key={uuid()} className='ml-3' style={{ 'display': 'inline-block' }}>{index > 0 ? ',' : null} {p}</p>)}
                                </td>
                                <td className='shiftTD'>
                                    <p>{day.evening[0] || ''}</p>
                                    <p>{day.evening[1] || ''}</p>
                                </td>
                                <td className='shiftTD'>
                                    <p>{day.afternoon[0]}</p>
                                    <p>{day.afternoon[1]}</p>
                                </td>
                                <td className='shiftTD'>
                                    <p>{day.morning[0]}</p>
                                    <p>{day.morning[1]}</p>
                                </td>
                                <td>{`${new Date(schedules[0].date).getDate() + index}/${new Date(schedules[0].date).getMonth() + 1}/${new Date(schedules[0].date).getFullYear()}`}</td>
                                <td>{setDay(new Date(schedules[0].date).getDate() + index)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            {(userInfo && userInfo.isAdmin) && <Button onClick={() => downloadJson(schedules[0].shifts)}>הורד סידור</Button>}
            <Paginate pages={pages} page={page} />

        </>
    )
}

export default HomeScreen
