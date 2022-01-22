import React,{useState,useEffect} from 'react';
import Globalsettings from "../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { Badge } from "react-bootstrap";
// img import
import notificationimg from "../../assets/images/profileimg.jpg";

const ViewAllNotification = () => {
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/show-all-client-notifications/'+ companyid+'/'+userid)
            .then((response) => {
                setTableData({ TableData_Array: response.data.data.unreadNotification ? response.data.data.unreadNotification : [], });
            })
    }, []); 
    return (
        <>
            <div className="header_dashboard">
                <div className="mailbox w-100">
                    <div className="list__item row">
                        {TableData.TableData_Array.length > 0 ?
                            TableData.TableData_Array.map((val) => {
                                return(
                                    <div className='col-12'>
                                    <NavLink to="#" className="d-flex align-items-center body_bg_color border-radius-10 w-100 p-3">
                                        <div className="mr-auto d-flex align-items-center">
                                            <p className="m-0"><img width="30" src={notificationimg} alt="notificationimg" className="user-image" /></p>
                                            <div className="ml-2">
                                                <h4 className="mb-0">Ross Gellar</h4>
                                                <p className="m-0">posted a photo on your wall.</p>
                                            </div>
                                        </div>
                                        <Badge variant="" className="blue_bg_color">Read</Badge>
                                    </NavLink>
                                    </div>
                                )
                            })
                            : 
                            <div className="text-center p-2">No Notification Yet!</div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewAllNotification;
