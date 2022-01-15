import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// 
import "../../../../../../node_modules/react-tabs/style/react-tabs.css";


// 
import plusicon from "../../../../../assets/images/plusicon.svg";
import calendaricon from "../../../../../assets/images/calendaricon.svg";
import checkicon_img from "../../../../../assets/images/checkicon.svg";
import DOMPurify from 'dompurify';


const Holiyday = (props) => {
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    const [AddHoliday, setAddHoliday] = useState(false);
    const [HolidayData, setHolidayData] = useState('');
    const [date, setdate] = useState('');
    const [occasion, setoccasion] = useState('');
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/holidays/view-holiday/2021/' + companyid)
            .then((response) => {
                setHolidayData(response.data.view);
            });
    })
    const handleSubmit = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/holidays/store', {
            date: date,
            occasion: occasion,
        })
            .then((response) => {
                toast.success("Holiday Successfully Updated!");
                setAddHoliday(false)
                axios.get(Globalsettings.url + 'api/admin/holidays/view-holiday/2021/' + companyid)
                    .then((response) => {
                        setHolidayData(response.data.view);
                    });
            })
            .catch((error) => {
            });
        evt.preventDefault();
    }
    return (
        <>
            <ToastContainer closeButton={true} position="top-right" />
            <div className="container-fluid mb-4">
                <div className="d-flex align-items-center">
                    <h4 className="main_title">Holiday List Of 2021</h4>
                    <div className="ml-auto">
                        <NavLink to={`${process.env.PUBLIC_URL}/calendar_leaves`} className="btn btn_blue whitecolorbg blackcolortext mr-3"><img className="img-fluid mr-2" src={calendaricon} alt="" /> View on Calendar</NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-block d-xl-flex align-items-center">
                        <div className="d-flex align-items-center mb-3 mb-xl-0">
                            <label className="w-100px blackcolortext fontsize16 fontweightregular">Show</label>
                            <select className="transparent_form form-control">
                                <option>10</option>
                                <option>20</option>
                                <option>30</option>
                            </select>
                            <label className="w-100px ml-3 blackcolortext fontsize16 fontweightregular">Entries</label>
                        </div>
                        <div className="ml-auto">
                            <NavLink onClick={() => setAddHoliday(true)} to="#" className="btn btn_blue"><img className="img-fluid mr-2" src={plusicon} alt="" /> Add Holiday</NavLink>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="calendar_react_tabs mt-4">
                    {<div className="row" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(HolidayData) }} />}
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