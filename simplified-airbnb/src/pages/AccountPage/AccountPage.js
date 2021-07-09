import React, { useState, useEffect } from 'react';
import './AccountPage.css';
import { useSelector, shallowEqual } from 'react-redux'
import axios from 'axios';
import moment from 'moment';
import { Route } from 'react-router-dom'
import AccountSideBar from './AccountSideBar';
import Bookings from './Bookings';
import ChangePassword from './ChangePassword'

function AccountPage(props){

    const token = useSelector(state => state.auth.token, shallowEqual);

    const [ pastBookings, setPastBookings ] = useState([])
    const [ upcomingBookings, setUpcomingBookings ] = useState([])


    useEffect(()=>{
        const accountUrl = `${window.apiHost}/users/getBookings`;
        const data = {
            token: token,
        }
        const fetchAccountData = async()=>{
            const resp = await axios.post(accountUrl,data);
            console.log(resp.data);
            let pastBookings = []
            let upcomingBookings = [];
            resp.data.forEach(booking => {
                const today = moment(); //get today's date so we know what is past and what is future
                const checkOutDate = moment(booking.checkOut);
                const diffDays = checkOutDate.diff(today,"days");
                if(diffDays < 0){
                    pastBookings.push(booking);
                }else{
                    upcomingBookings.push(booking);
                }
            });

            setPastBookings(pastBookings)
            setUpcomingBookings(upcomingBookings)
        };
        fetchAccountData();
    },[])


    return(
        <div className="account container-fluid">
            <AccountSideBar />
            <div className="row">
                <div className="col s8 offset-s3">
                    <Route exact path="/account" render={()=>
                        <h1>Choose what you'd like to do from the left!</h1>
                    } />
                    <Route exact path="/account/reservations/confirmed" render={()=>
                        <Bookings type="upcoming" bookings={upcomingBookings} token={token} />
                    } />
                    <Route exact path="/account/reservations/past">
                        <Bookings type="past" bookings={pastBookings} />
                    </Route>
                    <Route exact path="/account/change-pass" component={ChangePassword} />
                </div>
            </div>
        </div>
    )
}

export default AccountPage;