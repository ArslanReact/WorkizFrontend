import React, { useEffect, useState } from 'react';
import { NavLink,useHistory } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../../../node_modules/react-tabs/style/react-tabs.css";

// 
import CalendarJanuary from "../../Hr_Tab/Holiday_Page_Content/CalendarJanuary";
import CalendarJanuary_Array from "../../Hr_Tab/Holiday_Page_Content/CalendarJanuary_Array";
// 
import plusicon from "../../../../../assets/images/plusicon.svg";
import calendaricon from "../../../../../assets/images/calendaricon.svg";
import checkicon_img from "../../../../../assets/images/checkicon.svg";
import DOMPurify from 'dompurify';


const Holiyday = (props) => {
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    const history = useHistory();
    const [AddHoliday, setAddHoliday] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [date, setdate] = useState('');
    const [occasion, setoccasion] = useState('');
    const [HolidayData, setHolidayData] = useState({
        HolidayData_Array: []
    });
    const [MonthsData, setMonthsData] = useState({
        MonthsData_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/holidays/view-holiday/2022/' + companyid)
            .then((response) => {
                setHolidayData();
                setHolidayData({ HolidayData_Array: response.data.view ? response.data.view : [], });
                setMonthsData({ MonthsData_Array: response.data.months ? response.data.months : [], });
            });
    },[])
    const handleSubmit = (evt) => {
       
        axios.post(Globalsettings.url + 'api/admin/holidays/store', {
            date: date,
            occasion: occasion,
        })
        .then((response) => {
            toast.success("Holiday Successfully Added!");
            setAddHoliday(false)
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/holiyday`);
            }, 3000)
        })
        .catch((error) => {
            toast.error("Somthing Went Wrong!");
        });
        evt.preventDefault();
    }
    return (
        <>
            <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-flex align-items-center">
                    <h4 className="main_title">Holiday List Of 2022</h4>
                    <div className="ml-auto">
                        <NavLink to={`${process.env.PUBLIC_URL}/calendar_leaves`} className="btn btn_blue whitecolorbg blackcolortext mr-3"><img className="img-fluid mr-2" src={calendaricon} alt="" /> View on Calendar</NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-block d-xl-flex align-items-center">
                        <div className="ml-auto">
                            <NavLink onClick={() => setAddHoliday(true)} to="#" className="btn btn_blue"><img className="img-fluid mr-2" src={plusicon} alt="" /> Add Holiday</NavLink>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="calendar_react_tabs mt-4">
                        <Tabs>
                            <div className="row">
                                <div className="col-xl-3 col-lg-12">
                                    <TabList className="react-tabs__tab-list">
                                        {MonthsData.MonthsData_Array.map((val) => 
                                        {
                                            return(
                                                <Tab><img className="img-fluid mr-2" src={calendaricon} alt="" />{val}</Tab>
                                            );
                                        })}

                                    </TabList>
                                </div>
                                <div className="col-xl-9 col-lg-12">
                                    {MonthsData.MonthsData_Array.map((val) => 
                                        {
                                            return(
                                                <TabPanel>
                                                    <div className="table-responsive data_table_profile">
                                                        <h4 className="fontsize22 mb-4 blackcolortext">{val}</h4>
                                                        <table className="table m-0">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">#</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col">Occasion</th>
                                                                    <th scope="col">Day</th>
                                                                    <th scope="col">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {Object.keys(HolidayData.HolidayData_Array).map(function(key,index) {
                                                                if(key == val){
                                                                    
                                                                    return (
                                                                        Object.keys(key).map(function(vall) {
                                                                            return(

                                                                                <tr>
                                                                                    <td>{vall}</td>
                                                                                    <td>{props.datetext}</td>
                                                                                    <td>{props.Occasiontext}</td>
                                                                                    <td>{props.daytext}</td>
                                                                                    <td className="dropdown dropdown_table">
                                                                                        <NavLink to="#" role="button" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={props.iconimg} alt="" /></NavLink>
                                                                                        <div className="dropdown-menu dropdown-menu-right">
                                                                                            <ul className="list-unstyled">
                                                                                                <li><NavLink to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={props.deleteiconimg} alt="" /> Delete</NavLink></li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>          
                                                                            )
                                                                        })
                                                                    )
                                                                }

                                                            })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </TabPanel>
                                            );
                                    })}
                                </div>
                            </div>
                        </Tabs>                  
                </div>
            </div>
            {/* task categor */}
            <Modal show={AddHoliday} onHide={() => setAddHoliday(false)} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Add Holiday</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body className="p-0 my-4">
                        <div className="table-sm-responsive">
                            <table className="table table-borderless m-0" id="testTable">
                                <tbody>
                                    <tr>
                                        <td >
                                            <Form.Control className="transparent_form" type="date" required value={date} onChange={e => setdate(e.target.value)} />
                                        </td>
                                        <td ><Form.Control className="transparent_form" type="text" required value={occasion} onChange={e => setoccasion(e.target.value)} /></td>
                                    </tr>
                                </tbody>
                                {/* <div className="btn-group mt-4">
                                <Button variant="" className="js-add-row btn mr-3 btn_blue"><img className="img-fluid mr-2" src={plusicon} alt="" /> Add Item</Button>
                                <Button variant="" className="js-del-row btn btn_blue"><img className="img-fluid mr-2" src={plusicon} alt="" /> Remove Item</Button>
                            </div> */}
                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="p-0">
                        <Button variant="" className="graycolorbg fontsize14" onClick={() => setAddHoliday(false)}>Close</Button>
                        <Button variant="" type="submit" className="btn_blue"><img className="mr-2" src={checkicon_img} alt="formtable_img" /> Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default Holiyday;