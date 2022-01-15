import React from 'react';
import { NavLink, } from "react-router-dom";
import { Modal, Form, Button, FormLabel } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

// 
import ActivityData from "../../Hr_Tab/Attendance_Page_Content/ActivityData";
import ActivityData_Array from "../../Hr_Tab/Attendance_Page_Content/ActivityData_Array";

const SummaryTabData = (props) => {
    const [Checkk, setCheckk] = React.useState(false);
    const [Cross, setCross] = React.useState(false);
    return (
        <>
            <tr>
                <td>
                    <NavLink to={`${process.env.PUBLIC_URL}/employee_detail`} className="w-100px text_decoration_none d-flex align-items-center">
                        <img className="img-fluid mr-2" src={props.avatarimg} alt="" />
                        <h4 className="fontsize14 blackcolortext">{props.title}</h4>
                    </NavLink>
                </td>
                <td><NavLink onClick={() => setCheckk(true)} to="#" className=""><img width="10" className="img-fluid" src={props.checkimg} alt="" /></NavLink></td>
                <td><NavLink onClick={() => setCross(true)} to="#" className=""><img width="10" className="img-fluid" src={props.crossiconimg} alt="" /></NavLink></td>
                <td><NavLink to="#" className=""><img width="10" className="img-fluid" src={props.checkimg} alt="" /></NavLink></td>
                <td><NavLink to="#" className=""><img width="10" className="img-fluid" src={props.crossiconimg} alt="" /></NavLink></td>
                <td><NavLink to="#" className=""><img width="10" className="img-fluid" src={props.checkimg} alt="" /></NavLink></td>
                <td><NavLink to="#" className=""><img width="10" className="img-fluid" src={props.checkimg} alt="" /></NavLink></td>
                <td><NavLink onClick={() => setCross(true)} to="#" className=""><img width="10" className="img-fluid" src={props.stariconimg} alt="" /></NavLink></td>
                <td><NavLink to="#" className=""><img width="10" className="img-fluid" src={props.checkimg} alt="" /></NavLink></td>
                <td><NavLink to="#" className=""><img width="10" className="img-fluid" src={props.checkimg} alt="" /></NavLink></td>
                <td><NavLink to="#" className=""><img width="10" className="img-fluid" src={props.checkimg} alt="" /></NavLink></td>
                <td><NavLink to="#" className=""><img width="10" className="img-fluid" src={props.crossiconimg} alt="" /></NavLink></td>
                <td><NavLink to="#" className=""><img width="10" className="img-fluid" src={props.checkimg} alt="" /></NavLink></td>
                <td><NavLink to="#" className=""><img width="10" className="img-fluid" src={props.checkimg} alt="" /></NavLink></td>
                <td><NavLink to="#" className=""><img width="10" className="img-fluid" src={props.checkimg} alt="" /></NavLink></td>
                <td><NavLink to="#" className=""><img width="10" className="img-fluid" src={props.crossiconimg} alt="" /></NavLink></td>
                <td>{props.dash}</td>
                <td>{props.dash}</td>
                <td>{props.dash}</td>
                <td>{props.dash}</td>
                <td>{props.dash}</td>
                <td>{props.dash}</td>
                <td>{props.dash}</td>
                <td>{props.dash}</td>
                <td>{props.dash}</td>
                <td>{props.dash}</td>
                <td>{props.dash}</td>
                <td>{props.dash}</td>
                <td>{props.dash}</td>
                <td>{props.dash}</td>
                <td>{props.dash}</td>
                <td>{props.dash}</td>
                <td><NavLink to="#" className="w-100px greencolortext">{props.totaldate}</NavLink></td>
            </tr>
            {/* task categor */}
            <MyVerticallyCenteredModalCheckk
                show={Checkk}
                onHide={() => setCheckk(false)}
            />
            {/* task categor */}
            <MyVerticallyCenteredModalCross
                show={Cross}
                onHide={() => setCross(false)}
            />
        </>
    )
}

export default SummaryTabData;

// Checkk modal
function MyVerticallyCenteredModalCheckk(props) {
    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">presence details</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <div className="row">
                    <div className="col-xl-6 col-lg-12 mb-4 mb-lg-0">
                        <h4 className="fontsize16 mb-4 blackcolortext">presence 03-04-2021</h4>
                        <p className="m-0 tolightredcolorbg py-2 px-3 border-radius-10">Clock <br />05:30 PM</p>
                        <div className="my-3 text-center w-100px mx-auto">
                            <CircularProgressbar
                                value={props.percentage_update}
                                text={`0.0 hrs`}
                                styles={buildStyles({
                                    rotation: 0.50,
                                    textSize: '18px',
                                    fontWeight: 'bold',
                                    pathTransitionDuration: 0.5,
                                    textColor: `#3546AB`,
                                    trailColor: `#F4EFE7`,
                                })}
                            />
                        </div>
                        <p className="m-0 tolightredcolorbg py-2 px-3 border-radius-10">Clock <br />05:30 PM</p>
                    </div>
                    <div className="col-xl-6 col-lg-12 mb-4 mb-lg-0">
                        <h4 className="mb-3 fontsize14 blackcolortext">Activity</h4>
                        <ul className="list-unstyle boxes-style3">
                            {ActivityData_Array.map((val) => {
                                return (
                                    <ActivityData
                                        key={val.key}
                                        clocktext={val.clocktext}
                                        timetext={val.timetext}
                                        clockimg={val.clockimg}
                                        editimg={val.editimg}
                                        deleteimg={val.deleteimg}
                                    />
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

// Cross modal
function MyVerticallyCenteredModalCross(props) {
    return (
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Attendance Mark <span className="ml-2 px-3 py-1 redcolorbg fontsize12 border-radius-100 text-white">Absent</span></Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
                <Form>
                    <div className="row align-items-center">
                        <div className="col-xl-5 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Clock In</FormLabel>
                            <Form.Control type="time" className="transparent_form h-50px" placeholder="" />
                        </div>
                        <div className="col-xl-5 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Clock In</FormLabel>
                            <Form.Control type="text" className="transparent_form h-50px" placeholder="111.119.187.25" />
                        </div>
                        <div className="col-xl-2 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Toggle</FormLabel>
                            <div className="button m-0" id="button-1">
                                <input type="checkbox" className="checkbox" />
                                <div className="knobs"></div>
                                <div className="layer"></div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Clock Out</FormLabel>
                            <Form.Control type="time" className="transparent_form h-50px" placeholder="111.119.187.25" />
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Clock Out IP</FormLabel>
                            <Form.Control type="text" className="transparent_form h-50px" placeholder="111.119.187.25" />
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Toggle</FormLabel>
                            <div className="button m-0" id="button-1">
                                <input type="checkbox" className="checkbox" />
                                <div className="knobs"></div>
                                <div className="layer"></div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-12 mb-4">
                            <FormLabel className="mb-2">Working From</FormLabel>
                            <Form.Control type="text" className="transparent_form h-50px" placeholder="office" />
                        </div>
                        <div className="col-xl-12">
                            <Button type="button" variant="" className="w-100px btn btn_blue">Save</Button>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}