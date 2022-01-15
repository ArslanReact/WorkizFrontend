import React from 'react';
import { Form, Button, FormLabel } from 'react-bootstrap';

// 
import MemberData from "../../Project-Tab/TimeLogs_Page_content/MemberData";
import MemberData_Array from "../../Project-Tab/TimeLogs_Page_content/MemberData_Array";

const Log_Time = () => {
    return (
        <>
            <div className="container-fluid mb-4">
                <h4 className="main_title">Log Time</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <Form>
                    <div className="card card-body">
                        <div className="row">
                            <div className="col-xl-4 col-lg-12">
                                <div className="form-group">
                                    <FormLabel className="mb-2">Select Project*</FormLabel>
                                    <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                                        <option>select</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Form.Control>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12">
                                <div className="form-group">
                                    <FormLabel className="mb-2">Select Task*</FormLabel>
                                    <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                                        <option>select</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Form.Control>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12">
                                <div className="form-group">
                                    <FormLabel className="mb-2">Employee Name*</FormLabel>
                                    <Form.Control className="transparent_form fontsize14 h-45px" as="select">
                                        <option>select</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Form.Control>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12">
                                <div className="form-group">
                                    <FormLabel className="mb-2">Start Date</FormLabel>
                                    <Form.Control className="transparent_form h-45px" type="date" placeholder="" />
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12">
                                <div className="form-group">
                                    <FormLabel className="mb-2">End Date</FormLabel>
                                    <Form.Control className="transparent_form h-45px" type="date" placeholder="" />
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12">
                                <div className="form-group">
                                    <FormLabel className="mb-2">Start Time</FormLabel>
                                    <Form.Control className="transparent_form h-45px" type="time" placeholder="" />
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12">
                                <div className="form-group">
                                    <FormLabel className="mb-2">End Time</FormLabel>
                                    <Form.Control className="transparent_form h-45px" type="time" placeholder="" />
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12">
                                <div className="form-group">
                                    <FormLabel className="mb-2">Total Hours</FormLabel>
                                    <p className="m-0">0Hrs 0Mins</p>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12">
                                <div className="form-group">
                                    <FormLabel className="mb-2">Memo</FormLabel>
                                    <Form.Control className="transparent_form h-45px" type="text" placeholder="" />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <Button variant="" className="w-100px btn_blue">Save</Button>
                                <ul className="list-unstyled mt-4">
                                    {MemberData_Array.map((val) => {
                                        return (
                                            <MemberData
                                                key={val.key}
                                                avatarimg={val.avatarimg}
                                                title={val.title}
                                                email={val.email}
                                            />
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Log_Time;
