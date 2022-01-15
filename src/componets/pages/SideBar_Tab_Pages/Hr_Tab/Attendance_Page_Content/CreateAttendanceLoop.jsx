import React from 'react';
import { FormLabel, Form, Button } from 'react-bootstrap';

const CreateAttendanceLoop = (props) => {
    if (props.badge === "Present") {
        return (
            <>
                <div className="card card_dashboard card-body mb-3 p-2">
                    <div className="table-sm-responsive">
                        <table className="table m-0 table-borderless">
                            <tbody>
                                <tr>
                                    <td className="d-flex align-items-center">
                                        <img className="img-fluid mr-3" src={props.avatarimg} alt="" />
                                        <div>
                                            <h4 className="fontsize14 mb-1 blackcolortext mb-2">{props.title} <span className={"px-3 py-1 border-radius-100 ml-2 " + props.badgebg}>{props.badge}</span></h4>
                                            <span className="greencolortext">{props.badgetext}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="form-group">
                                                <Button type="button" variant="" className="w-100px btn btn_blue">Save</Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
    else if (props.badge === "Absent") {
        return (
            <>
                <div className="card card_dashboard card-body mb-3 p-2">
                    <div className="table-sm-responsive">
                        <table className="table m-0 table-borderless">
                            <tbody>
                                <tr>
                                    <td className="d-flex align-items-center">
                                        <img className="img-fluid mr-3" src={props.avatarimg} alt="" />
                                        <div>
                                            <h4 className="fontsize14 mb-1 blackcolortext mb-2">{props.title} <span className={"px-3 py-1 border-radius-100 ml-2 " + props.badgebg}>{props.badge}</span></h4>
                                            <span className="greencolortext">{props.badgetext}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-group mb-3">
                                            <FormLabel className="mb-2">{props.label_text_In}</FormLabel>
                                            <Form.Control type="time" className="transparent_form form-control h-45px" placeholder="" />
                                        </div>
                                        <div className="form-group">
                                            <FormLabel className="mb-2">{props.label_text_Out}</FormLabel>
                                            <Form.Control type="time" className="transparent_form form-control h-45px" placeholder="" />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-group mb-3">
                                            <FormLabel className="mb-2">{props.label_text_In_Ip}</FormLabel>
                                            <Form.Control type="text" className="transparent_form form-control h-45px" placeholder="111.119.187.9" />
                                        </div>
                                        <div className="form-group">
                                            <FormLabel className="mb-2">{props.label_text_Out_Ip}</FormLabel>
                                            <Form.Control type="text" className="transparent_form form-control h-45px" placeholder="111.119.187.9" />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="form-group mr-4">
                                                <FormLabel className="mb-2">{props.label_text_Late}</FormLabel>
                                                <div className="button " id="button-1">
                                                    <input type="checkbox" className="checkbox" />
                                                    <div className="knobs"></div>
                                                    <div className="layer"></div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <FormLabel className="mb-2">{props.label_text_workingfrom}</FormLabel>
                                                <Form.Control type="text" className="transparent_form form-control h-45px" placeholder="Office" />
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="form-group mr-4">
                                                <FormLabel className="mb-2">{props.label_text_halfday}</FormLabel>
                                                <div className="button " id="button-1">
                                                    <input type="checkbox" className="checkbox" />
                                                    <div className="knobs"></div>
                                                    <div className="layer"></div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <Button type="button" variant="" className="w-100px btn btn_blue">Save</Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

export default CreateAttendanceLoop;
