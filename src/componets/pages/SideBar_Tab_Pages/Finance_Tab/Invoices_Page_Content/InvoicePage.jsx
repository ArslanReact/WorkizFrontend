import React from 'react';
import { NavLink } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

// 
import TopBoxesLoop from "../../Finance_Tab/Invoices_Page_Content/TopBoxesLoop";
import TopBoxes_Array from "../../Finance_Tab/Invoices_Page_Content/TopBoxes_Array";
import InvoiceTableLoop from "../../Finance_Tab/Invoices_Page_Content/InvoiceTableLoop";
import InvoiceTableLoop_Array from "../../Finance_Tab/Invoices_Page_Content/InvoiceTableLoop_Array";


// 
import download_icon from "../../../../../assets/images/download_1_icon.svg";

const Invoice_Page = () => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <div className="container-fluid mb-4">
                <div className="d-flex align-items-center">
                    <h4 className="main_title">Invoices</h4>
                    <div className="btn-group ml-auto">
                        <NavLink to="#" className="btn btn_blue bg-white blackcolortext mr-2"><img className="img-fluid mr-1" src={download_icon} alt="" /> Download Pdf</NavLink>
                        <NavLink onClick={() => setModalShow(true)} to="#" className="btn btn_blue mr-2"> View Payments</NavLink>
                        <NavLink to="#" className="btn lightbluecolorbg whitecolortext fontsize14" data-toggle="dropdown"> Copy Payens Link </NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid top-boxes mb-5">
                <div className="row">
                    {TopBoxes_Array.map((val) => {
                        return (
                            <TopBoxesLoop
                                key={val.key}
                                iconimg={val.iconimg}
                                altburger={val.altburger}
                                toptitle={val.toptitle}
                                classnth={val.classnth}
                                topnumber={val.topnumber}
                            />
                        )
                    })}
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="d-flex invoice_content">
                    <div className="">
                        <Button type="button" className="fontsize16 px-4 text-white border-radius-100 yelowcolorbg" variant="">Unpaid</Button>
                        <h6 className="invoice_title">Worksuite Demo Company</h6>
                        <p className="fontsize18 blackcolortext">4868 Ben Street Lansing Michigan 48906</p>
                    </div>
                    <div className="ml-auto text-right">
                        <h4 className="fontsize20 mb-3 blackcolortext"><strong>Invoice:</strong>  INV#040</h4>
                        <h4 className="fontsize20 mb-3 blackcolortext"> TO</h4>
                        <h4 className="fontsize36 mb-3 blackcolortext"> Destini Streich</h4>
                        <p className="fontsize16 mb-2 blackcolortext"><strong>Address:</strong> 95265 Neal Dale Suite 850 New Daishaborough, NE 23443</p>
                        <p className="fontsize16 mb-2 blackcolortext"><strong>Invoice Date:</strong> 15-03-2021</p>
                        <p className="fontsize16 mb-2 blackcolortext"><strong>Due Date:</strong> 21-03-2021</p>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card-body">
                    <div className="table-sm-responsive clent_data_table">
                        <table className="table m-0">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">items</th>
                                    <th scope="col">Hsn/Sac	</th>
                                    <th scope="col">Qty/Hrs	</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {InvoiceTableLoop_Array.map((val) => {
                                    return (
                                        <InvoiceTableLoop
                                            key={val.key}
                                            countnumber={val.countnumber}
                                            itemsnumber={val.itemsnumber}
                                            hsnsac_text={val.hsnsac_text}
                                            qty_text={val.qty_text}
                                            unitprice={val.unitprice}
                                            price={val.price}
                                        />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="text-right">
                    <p className="fontsize16 mb-2 blackcolortext">Sub Total: $2033</p>
                    <h4 className="fontsize36 mb-3 blackcolortext"> <strong>Total:</strong> $2033</h4>
                    <p className="fontsize16 mb-2 blackcolortext">Amount Paid: $0</p>
                    <p className="fontsize16 mb-2 redcolortext">Amount Due: $2033</p>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card-body">
                    <div className="table-sm-responsive clent_data_table">
                        <table className="table m-0">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Payment Method</th>
                                    <th scope="col">Paid On</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="4">No data found!</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default Invoice_Page;

// task category modal
function MyVerticallyCenteredModal(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Payment details</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 mb-2">
                <div className="table-sm-responsive">
                    <p>Payment details not found.</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal>
    );
}