import React from 'react';
import { Form, InputGroup, Button, FormControl, FormLabel } from "react-bootstrap";

// 
import checkicon_img from "../../../../../assets/images/checkicon.svg";

const Create_Invoice = () => {
    return (
        <>
            <div className="container-fluid mb-4">
                <h4 className="main_title fontsize18">Create Invoice</h4>
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
                                    <FormControl readOnly className="transparent_form h-50px" placeholder="42" />
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
                                <FormLabel className="mb-2">Time Log From</FormLabel>
                                <Form.Control type="date" className="transparent_form h-50px" placeholder="" />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Time Log To</FormLabel>
                                <Form.Control type="date" className="transparent_form h-50px" placeholder="" />
                            </div>
                            <div className="col-lg-12 mb-4">
                                <div className="responsive-table">
                                    <table className="table data_table_profile table-borderless m-0">
                                        <thead>
                                            <th>Item</th>
                                            <th>Hsn/Sac</th>
                                            <th>Qty/Hrs</th>
                                            <th>Unit Price</th>
                                            <th>Tax</th>
                                            <th>Amount</th>
                                        </thead>
                                        <p className="text-center">No log-Time Found</p>
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
        </>
    )
}

export default Create_Invoice;
