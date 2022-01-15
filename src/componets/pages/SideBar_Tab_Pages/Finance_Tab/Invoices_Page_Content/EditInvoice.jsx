import React from 'react';
import { NavLink } from "react-router-dom"
import { Form, Modal, InputGroup, Button, FormControl, FormLabel } from "react-bootstrap";

// 
import TexModalTableLoop from "../../Finance_Tab/Invoices_Page_Content/TexModalTableLoop";
import TexModalTableLoop_Array from "../../Finance_Tab/Invoices_Page_Content/TexModalTableLoop_Array";

// 
import checkicon_img from "../../../../../assets/images/checkicon.svg";
import coggimg from "../../../../../assets/images/cogimg.svg";
import tootipicon from "../../../../../assets/images/tootipicon.svg";

const EditInvoice = () => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <div className="container-fluid mb-4">
                <h4 className="main_title fontsize18">Update Invoice</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <Form>
                    <div className="card card_dashboard card-body">
                        <div className="row">
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Invoice #</FormLabel>
                                <InputGroup className="mb-0 d-flex">
                                    <InputGroup.Text id="basic-addon1">INV#0</InputGroup.Text>
                                    <FormControl readOnly
                                        className="transparent_form h-50px"
                                        placeholder="xcvxvxcv#005"
                                    />
                                </InputGroup>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Project</FormLabel>
                                <Form.Control className="transparent_form h-50px" as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Company Name</FormLabel>
                                <Form.Control type="text" className="transparent_form h-50px" readOnly placeholder="Runte Inc" />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Invoice Date</FormLabel>
                                <Form.Control type="date" className="transparent_form h-50px" placeholder="" />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Due Date</FormLabel>
                                <Form.Control type="date" className="transparent_form h-50px" placeholder="" />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Currency</FormLabel>
                                <Form.Control className="transparent_form h-50px" as="select">
                                    <option>$(USD)</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Status</FormLabel>
                                <Form.Control className="transparent_form h-50px" as="select">
                                    <option>Paid</option>
                                    <option>Unpaid</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2 d-flex">Show Shipping Address
                                    <div className="mytooltip">
                                        <span className="ml-2"><img className="img-fluid" src={tootipicon} alt="" /></span>
                                        <span className="tooltip-content5">
                                            <p className="fontsize12 m-0">Show Shipping Address in invoices show view and pdf files.</p>
                                        </span>
                                    </div>
                                </FormLabel>
                                <div className="button m-0 top-0" id="button-1">
                                    <input type="checkbox" className="checkbox" />
                                    <div className="knobs"></div>
                                    <div className="layer"></div>
                                </div>
                            </div>
                            <div className="col-lg-12 mb-4">
                                <div className="responsive-table">
                                    <table className="table data_table_profile table-borderless m-0">
                                        <thead>
                                            <th>Item</th>
                                            <th>Hsn/Sac</th>
                                            <th>Qty/Hrs</th>
                                            <th>Unit Price</th>
                                            <th>Tax <NavLink onClick={() => setModalShow(true)} to="#" className=""><img width="15" className="img-fluid" src={coggimg} alt="" /></NavLink></th>
                                            <th>Amount</th>
                                        </thead>
                                        <tbody>
                                            <tr className="d-revert badge badgegreenbg">
                                                <td colspan="6">No log-Time Found</td>
                                            </tr>
                                        </tbody>
                                        <tbody>
                                            <tr>
                                                <td colspan="6">
                                                    <table className="table table-borderless m-0">
                                                        <tbod>
                                                            <tr>
                                                                <td>Sub Total</td>
                                                                <td>0.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Discount</td>
                                                                <td>
                                                                    <tr>
                                                                        <td><Form.Control type="text" className="transparent_form h-50px" placeholder="" /></td>
                                                                        <td><Form.Control type="text" className="transparent_form h-50px" placeholder="" /></td>
                                                                    </tr>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Total</td>
                                                                <td>0.00</td>
                                                            </tr>
                                                        </tbod>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Note</FormLabel>
                                <Form.Control className="transparent_form" as="textarea" rows={5} />
                            </div>
                            <div className="col-xl-12">
                                <Button variant="" className="btn_blue"><img className="mr-2" src={checkicon_img} alt="formtable_img" /> Save</Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default EditInvoice;

// task category modal
function MyVerticallyCenteredModal(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Tax</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 mb-2">
                <Form>
                    <div className="table-sm-responsive">
                        <table className="table m-0 table-borderless">
                            <thead>
                                <th>ID</th>
                                <th>Tex Name</th>
                                <th>Rate %</th>
                            </thead>
                            <tbody>
                                {TexModalTableLoop_Array.map((val) => {
                                    return (
                                        <TexModalTableLoop
                                            key={val.key}
                                            countnumber={val.countnumber}
                                            name={val.name}
                                            number={val.number}
                                        />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="row mt-4">
                        <div className="col-xl-6 col-lg-12">
                            <Form.Label className="mb-2">Tax Name</Form.Label>
                            <Form.Control type="text" name="" className="transparent_form h-40px" placeholder="" />
                        </div>
                        <div className="col-xl-6 col-lg-12">
                            <Form.Label className="mb-2">Rate %</Form.Label>
                            <Form.Control type="number" name="" className="transparent_form h-40px" placeholder="" />
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="mr-2" src={checkicon_img} alt="formtable_img" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}