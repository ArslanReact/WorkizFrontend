import React, { useState } from 'react';
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import { DateRange } from 'react-date-range';
import { NavLink } from 'react-router-dom';

// 
import cogimg from "../../../../../assets/images/cogimg.svg";
import plusicon from "../../../../../assets/images/plusicon.svg";

const Add_Proposal = () => {
    const [modalShowTax, setModalShowTax] = React.useState(false);
    const [state, setState] = useState([{ startDate: new Date(), endDate: null, key: 'selection' }]);
    return (
        <>
            <div className="container-fluid mb-4">
                <h4 className="main_title"> Add Proposal Info</h4>
            </div>
            {/*  */}
            <Form>
                <div className="container-fluid mb-4">
                    <div className="card card_dashboard card-body">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 mb-4 mb-lg-0">
                                <FormLabel className="mb-2">Lead</FormLabel>
                                <Form.Control className="transparent_form h-45px" name="" type="text" readOnly placeholder="" />
                            </div>
                            <div className="col-xl-4 col-lg-4 mb-4 mb-lg-0">
                                <FormLabel className="mb-2">Currency</FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select">
                                    <option>$(USD)</option>
                                    <option>$(USD)</option>
                                    <option>$(USD)</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl-4 col-lg-4 mb-4 mb-lg-0">
                                <FormLabel className="mb-2">Valid Till</FormLabel>
                                <DateRange className="w-100"
                                    editableDateInputs={true}
                                    onChange={item => setState([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={state}
                                />
                            </div>
                            <div className="col-xl-12 col-lg-4 mb-4">
                                <FormLabel className="mb-2">Note</FormLabel>
                                <Form.Control className="transparent_form" as="textarea" rows={3} />
                            </div>
                            <div className="col-xl-12 col-lg-4 mb-4 mb-lg-0">
                                {['checkbox'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-0">
                                        <Form.Check className="fontsize14 fontweightregular" inline label="Require customer signature for approval" type={type} id={`inline-${type}-1`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <Form id="testForm">
                        <div className="table-sm-responsive">
                            <table className="table table-border" id="testTable">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Hsn/Sac</th>
                                        <th>Qty/Hrs</th>
                                        <th>Unit Price</th>
                                        <th>Tax <NavLink onClick={() => setModalShowTax(true)} to="#" className=""><img className="img-fluid ml-2" width="15" src={cogimg} alt="" /></NavLink></th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td width="250">
                                            <Form.Control className="transparent_form" type="text" placeholder="" />
                                        </td>
                                        <td width="250"><Form.Control className="transparent_form" type="text" placeholder="" /></td>
                                        <td width="250"><Form.Control className="transparent_form" type="number" placeholder="" /></td>
                                        <td width="250"><Form.Control className="transparent_form" type="text" placeholder="" /></td>
                                        <td width="250">
                                            <Form.Control className="transparent_form" as="select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                            </Form.Control>
                                        </td>
                                        <td width="100">0.00</td>
                                    </tr>
                                </tbody>
                                <div className="btn-group mt-4">
                                    <Button variant="" className="js-add-row btn mr-3 btn_blue"><img className="img-fluid mr-2" src={plusicon} alt="" /> Add Item</Button>
                                    <Button variant="" className="js-del-row btn btn_blue"><img className="img-fluid mr-2" src={plusicon} alt="" /> Remove Item</Button>
                                </div>
                            </table>
                        </div>
                    </Form>
                </div>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModalTax
                show={modalShowTax}
                onHide={() => setModalShowTax(false)}
            />
        </>
    )
}

export default Add_Proposal;

// Tax modal
function MyVerticallyCenteredModalTax(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Tax</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <div className="table-sm-responsive">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tax Name</th>
                                <th>Rate</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="3">No task category found.</td>
                            </tr>
                        </tbody>
                    </table>
                    <Form>
                        <div className="d-flex no-gutters">
                            <div className="col-xl-6 pr-xl-3">
                                <FormLabel className="mb-2">Choose Agents*</FormLabel>
                                <Form.Control className="transparent_form h-45px" name="" type="text" placeholder="" />
                            </div>
                            <div className="col-xl-6">
                                <FormLabel className="mb-2">Rate%</FormLabel>
                                <Form.Control className="transparent_form h-45px" name="" type="text" placeholder="" />
                            </div>
                        </div>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="graycolorbg w-100px fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="btn_blue w-100px">Save</Button>
            </Modal.Footer>
        </Modal >
    );
}