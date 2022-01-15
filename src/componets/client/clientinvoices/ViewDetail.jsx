import React, { useState, useEffect } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { Card, Form, FormGroup, FormLabel, Button, Modal, Dropdown, Table } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

// import images
import pdficon from "../../../assets/images/pdficon.svg";
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
// import component
import InvoiceLoop from "./InvoiceLoop";
import dateFormat from 'dateformat';
import DOMPurify from 'dompurify';
import $ from "jquery";
const ViewDetail = (props) => {
    const [isLoading, setLoading] = useState(true);
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    const [Paymentradio, setPaymentradio] = useState(1);
    // 
    const [modalShowcategory, setModalShowAssign] = React.useState(false);
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });
    const [ItemsData, setItemsData] = useState({
        ItemsData_Array: []
    });
    const [invoiceSettingData, setinvoiceSettingData] = useState({
        invoiceSettingData_Array: []
    });
    const [ClientData, setClientData] = useState({
        ClientData_Array: []
    });
    const [clientdetailsData, setclientdetailsData] = useState({
        clientdetailsData_Array: []
    });
    const [globaldata, setglobaldata] = useState({
        globaldata_Array: []
    });
    const [currencydata, setcurrencydata] = useState({
        currencydata_Array: []
    });
    const [offline_invoice_payment, setoffline_invoice_payment] = useState({
        offline_invoice_payment_Array: []
    });
    const [methods, setmethods] = useState({
        methods_Array: []
    });
    const [paidAmount, setpaidAmount] = useState('');
    const [amountDue, setamountDue] = useState('');
    const [invoiceid, setinvoiceid] = useState('');
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/client/invoices/show/'+companyid+'/'+userid+'/'+ props.match.params.id)
            .then((response) => {
                setTableData({ TableData_Array: response.data.data.invoice ? response.data.data.invoice : [], });
                setItemsData({ ItemsData_Array: response.data.data.items ? response.data.data.items : [], });
                setinvoiceSettingData({ invoiceSettingData_Array: response.data.data.invoiceSetting ? response.data.data.invoiceSetting : [], });
                setClientData({ ClientData_Array: response.data.data.client ? response.data.data.client : [], });
                setclientdetailsData({ clientdetailsData_Array: response.data.data.clientdetails ? response.data.data.clientdetails : [], });
                setglobaldata({ globaldata_Array: response.data.data.global ? response.data.data.global : [], });
                setcurrencydata({ currencydata_Array: response.data.data.currency ? response.data.data.currency : [], });
                setoffline_invoice_payment({ offline_invoice_payment_Array: response.data.data.offline_invoice_payment ? response.data.data.offline_invoice_payment : [], });
                setmethods({ methods_Array: response.data.data.methods ? response.data.data.methods : [], });
                setpaidAmount(response.data.data.paidAmount);
                setamountDue(response.data.data.amountDue);
                setinvoiceid(response.data.data.invoice.id);
                setLoading(false);
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, []);

    const [selectedImage, setselectedImage] = useState('');
    const [desc, setdesc] = useState('');
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setselectedImage(e.target.files[0]);
        }
    }
    const slipsubmit = (e) => {
        setLoading(true);
        const data = new FormData();
        data.append('slip', selectedImage);
        data.append('description', desc);
        data.append('offline_id', $("input[name=offlineMethod]").val());
        data.append('invoice_id', invoiceid);
        axios.post(Globalsettings.url + 'api/client/invoices/offline-payment-submit/'+companyid+'/'+userid, data).then((response) => {
            toast.success("Slip Uploaded Successfully");
            window.location.reload();
        })            
        .catch((error) => {
            toast.success("Slip Uploaded Successfully");
            window.location.reload();
        });
        e.preventDefault();        
        
    }
    return (
        <>
        <ToastContainer/>
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="mb-4 text-start"><a href={Globalsettings.url + 'api/invoice/download/'+ props.match.params.id} className="d-inline-block btn btn_blue paragraph_blue_bg_color"><img width="20" className="img-fluid mr-2" src={pdficon} alt="icon" /> Download</a></div>
            <Card className="card_dashboard mb-3">
                <Card.Body>
                    <div className="d-md-flex d-block align-items-center mb-4">
                        <div className="ribbon mr-auto">{TableData.TableData_Array.status}</div>
                        <h4 className="m-0 fontsize22">{invoiceSettingData.invoiceSettingData_Array.invoice_prefix}{TableData.TableData_Array.original_invoice_number}</h4>
                    </div>
                    {/*  */}
                    <div className="p-4">
                        <div className="d-md-flex d-block align-items-start">
                            <div>
                                <h4 className="fontsize18">{globaldata.globaldata_Array.company_name}</h4>
                                <p className="fontsize14 m-0">{globaldata.globaldata_Array.address}</p>
                            </div>
                            <div className="ml-auto">
                                <h4 className="fontsize22 fontweightregular">To,</h4>
                                <h4 className="fontsize26 fontweightbold">{ClientData.ClientData_Array.name}</h4>
                                <p class="m-0"><b>Address :</b> {clientdetailsData.clientdetailsData_Array.address}</p>
                                <p class="m-0"><b>Invoice Date :</b> {dateFormat(TableData.TableData_Array.issue_date,globaldata.globaldata_Array.date_format)}</p>
                                <p class="m-0"><b>Due Date :</b> {dateFormat(TableData.TableData_Array.due_date,globaldata.globaldata_Array.date_format)}</p>
                            </div>
                        </div>
                        {/*  */}
                        <Table responsive="sm" className="mb-4">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Item</th>
                                    <th>QTY/HRS	</th>
                                    <th>Unit Price</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ItemsData.ItemsData_Array.map((val,index) => {
                                    return (
                                        <InvoiceLoop
                                            key={index}
                                            countnumber={index+1}
                                            name={val.item_name}
                                            smallname={val.item_summary}
                                            time={val.quantity}
                                            unitprice={currencydata.currencydata_Array.currency_symbol+' '+val.unit_price}
                                            price={currencydata.currencydata_Array.currency_symbol+' '+val.amount}
                                        />
                                    )
                                })}
                            </tbody>
                        </Table>
                        {/*  */}
                        <div className="text-end mb-4">
                            <p className="m-0">Sub Total: {currencydata.currencydata_Array.currency_symbol}{TableData.TableData_Array.sub_total}</p>
                            <p className="m-0">Discount: {currencydata.currencydata_Array.currency_symbol}{TableData.TableData_Array.discount} </p>
                            <hr />
                            <h4 className="fontsize20"><b>Total: </b> {currencydata.currencydata_Array.currency_symbol}{TableData.TableData_Array.total}</h4>
                            <p className="m-0">Amount Paid: {currencydata.currencydata_Array.currency_symbol}{paidAmount}</p>
                            <p className="m-0">Amount Due: {currencydata.currencydata_Array.currency_symbol}{amountDue} </p>
                        </div>
                        <p className="m-0"><strong>Note</strong>: {TableData.TableData_Array.note}</p>
                    </div>
                </Card.Body>
            </Card>
            <Card className="card_dashboard mb-3">
                <Card.Body>
                    <div className="d-flex align-items-center">
                        <Form.Check checked={Paymentradio === 1} onClick={(e) => setPaymentradio(1)} className="m-0 mr-4" id="formHorizontalRadiosOnline" name="radioonline" type="radio" label="Online" aria-label="radio 1" />
                        <Form.Check checked={Paymentradio === 2} onClick={(e) => setPaymentradio(2)} className="m-0" id="formHorizontalRadiosOffline" name="radioonline" type="radio" label="Offline" aria-label="radio 1" />
                    </div>
                    {Paymentradio === 1 &&
                        <Dropdown className="mt-3">
                            <Dropdown.Toggle variant="" className="btn btn_blue" id="dropdown-basic">Pay Now</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#">Pay via Paypal </Dropdown.Item>
                                <Dropdown.Item href="#"> Pay via Paystack</Dropdown.Item>
                                <Dropdown.Item href="#"> Pay via Mollie</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                    {Paymentradio === 2 &&
                        <div className="mt-3">
                            {methods.methods_Array.length > 0 &&
                            methods.methods_Array.map((val,index) => {
                                return(
                                    <>
                                    <Form.Check className="m-0 mb-1" checked={index === 0}  id="formHorizontalRadiosDfdfdf" name="offlineMethod" value={val.id} type="radio" label={val.name} aria-label="radio 1" />
                                    <p>{<p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(val.description) }} />}</p>
                                    </>
                                )
                            })
                            }
                            <Button variant="" onClick={() => setModalShowAssign(true)} className="btn btn_blue py-1 px-2">Upload Reciepts</Button>
                        </div>
                    }
                </Card.Body>
            </Card>
            {/*  */}
            <Card className="card_dashboard mb-3">
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>OFFLINE PAYMENT METHOD</th>
                                <th>STATUS</th>
                                <th>DESCRIPTION</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                        {offline_invoice_payment.offline_invoice_payment_Array.length > 0 ?   
                        offline_invoice_payment.offline_invoice_payment_Array.map((val,index) => {    
                            return (<tr>
                                <td>{index+1}</td>
                                <td>{val.payment_method.name}</td>
                                <td>
                                    {
                                        (() => {
                                            if (val.status == 'pending')
                                                return <span class="badge bg-warning">{val.status}</span>
                                            if (val.status == 'approve')
                                                return <span class="badge bg-success">{val.status}</span>
                                            if (val.status == 'reject')
                                                return <span class="badge bg-danger">{val.status}</span>
                                        })()
                                    }
                                </td>    
                                <td>{val.description}</td>
                                <td><a class="btn btn_blue" target="_blank" href={val.slip}>View Slip</a></td>
                            </tr>
                            )
                        })
                        :
                        <tr>
                            <td colSpan="5" className='text-center'>No Record Found!</td>
                        </tr>
                    }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            {/*  */}
            <Modal show={modalShowcategory} onHide={() => setModalShowAssign(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter"> Payment details</Modal.Title>
                </Modal.Header>
                <Form onSubmit={slipsubmit}>
                <Modal.Body className="p-0 my-4">
                        <FormGroup className="mb-3">
                            <FormLabel className="" for="inputGroupFile02">Slip</FormLabel>
                            <Form.Control type="file" className="form-control" id="inputGroupFile02" onChange={imageChange}  />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={desc} onChange={(e) => setdesc(e.target.value)} />
                        </FormGroup>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setModalShowAssign(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                </Modal.Footer>
                </Form>
            </Modal>

        </>
    )
}
export default ViewDetail;
