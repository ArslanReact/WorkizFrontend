import React, { useState, useEffect,useRef } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink, useHistory } from "react-router-dom";
import SignatureCanvas from 'react-signature-canvas';
import { ToastContainer, toast } from 'react-toastify';
import { Card, Row, Table, Modal, Button, Col, Form, FormLabel, FormGroup  } from "react-bootstrap";
import pdficon from "../../../../../assets/images/pdficon.svg";
// 
import InvoiceTableLoop from "../../Finance_Tab/Estimate_Page_Content/InvoiceTableLoop";
import InvoiceTableLoop_Array from "../../Finance_Tab/Estimate_Page_Content/InvoiceTableLoop_Array";
import LoadingOverlay from 'react-loading-overlay';
// 
import downloadicon from "../../../../../assets/images/download_1_icon.svg";
import checkicon from "../../../../../assets/images/checkicon.svg";
import crosswhite from "../../../../../assets/images/crosswhite.svg";

const Estimate_Invoice = (props) => {
    const SignatureField = useRef(null);
    const canvas = SignatureField.current;
    const history = useHistory();
    const clear = () => {
        canvas.clear();
    }
    const [modalShowcategory, setModalShowAssign] = React.useState(false);
    const [isLoading, setLoading] = useState(true);
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    const [discount, setdiscount] = useState('');
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });
    const [ItemsData, setItemsData] = useState({
        ItemsData_Array: []
    });
    const [TexData, setTexData] = useState({
        TexData_Array: []
    });
    const [ClientData, setClientData] = useState({
        ClientData_Array: []
    });
    const [companydata, setcompanydata] = useState({
        companydata_Array: []
    });
    const [currencydata, setcurrencydata] = useState({
        currencydata_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/estimates/'+ props.match.params.id)
            .then((response) => {
                setTableData({ TableData_Array: response.data.estimate ? response.data.estimate : [], });
                setItemsData({ ItemsData_Array: response.data.items ? response.data.items : [], });
                setTexData({ TexData_Array: response.data.taxes ? response.data.taxes : [], });
                setClientData({ ClientData_Array: response.data.client ? response.data.client : [], });
                setcompanydata({ companydata_Array: response.data.company ? response.data.company : [], });
                setcurrencydata({ currencydata_Array: response.data.currency ? response.data.currency : [], });
                setdiscount(response.data.discount);
                setLoading(false);
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, []);
    const[firstname, setfirstname] = useState('');
    const[lastname, setlastname] = useState('');
    const[email, setemail] = useState('');
    const signsubmit = (e) =>{
        setLoading(true);
        const data = new FormData();
        data.append('first_name', firstname);
        data.append('last_name', lastname);
        data.append('email', email);
        data.append('signature', canvas.getTrimmedCanvas().toDataURL('image/png'));
        axios.post(Globalsettings.url + 'api/estimates/accept/'+props.match.params.id, data).then((response) => {
            toast.success("Estimate Signed Successfully");
            setModalShowAssign(false);
            setLoading(false);
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/estimates`);
            }, 3000)

        });
        e.preventDefault();
    }
    const EstimateDecline = (id) => {

            setLoading(true);
            axios.get(Globalsettings.url + 'api/estimates/decline/'+ props.match.params.id)
                .then((response) => {
                    toast.success("Estimate Decline Successfully");
                    setLoading(false);
                    setTimeout(() => { 
                        history.push(`${process.env.PUBLIC_URL}/estimates`);
                    }, 3000)
                })
      
    }
    return (
        <>
        <ToastContainer />
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
        <div className='container-fluid'>
            <div className='d-xl-flex d-block mb-4 align-items-center'>
                <div className="text-start mb-3 mb-xl-0"><a href={Globalsettings.url + "api/admin/finance/estimates/download/"+props.match.params.id} className="d-inline-block btn btn_blue paragraph_blue_bg_color"><img width="20" className="img-fluid mr-2" src={pdficon} alt="icon" /> Download</a></div>
                <div className="ms-auto">
                {TableData.TableData_Array.status == 'accepted' &&
                <Button variant="" className="ml-2 d-inline-block btn btn_blue" disabled><img width="15" className="img-fluid mr-2" src={checkicon} alt="icon" />Signed</Button>}
                {TableData.TableData_Array.status == 'waiting' &&
                <><Button variant="" onClick={() => EstimateDecline(props.match.params.id)} className=" d-inline-block btn btn_blue red_bg_color"><img width="15" className="img-fluid" src={crosswhite} alt="icon" /> Decline</Button>
                <Button variant="" onClick={() => setModalShowAssign(true)} className="ml-2 d-inline-block btn btn_blue green_bg_color"><img width="15" className="img-fluid" src={checkicon} alt="icon" /> Accept</Button></>
                }
                </div>
            </div>
            <Card className="card_dashboard">
                <Card.Body>
                    <div className="d-md-flex d-block align-items-center mb-4">
                        <div className="ribbon mr-auto">{TableData.TableData_Array.status}</div>
                        <h4 className="m-0 fontsize22">{TableData.TableData_Array.original_estimate_number}</h4>
                    </div>
                    {/*  */}
                    <div className="p-4">
                        <div className="d-md-flex d-block align-items-start">
                            <div>
                                <h4 className="fontsize18">{companydata.companydata_Array.company_name}</h4>
                                <p className="fontsize14 m-0">{companydata.companydata_Array.address}</p>
                            </div>
                            <div className="ml-auto">
                                <h4 className="fontsize22 fontweightregular">To,</h4>
                                <h4 className="fontsize26 fontweightbold">{ClientData.ClientData_Array.name}</h4>
                                <p class="m-0"><b>Valid Till :</b> {TableData.TableData_Array.valid_date}</p>
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
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{val.item_name} <p className="m-0 fontsize12">{val.item_summary}</p></td>
                                            <td>{val.quantity}</td>
                                            <td>{currencydata.currencydata_Array.currency_symbol+' '+val.unit_price}</td>
                                            <td>{currencydata.currencydata_Array.currency_symbol+' '+val.amount}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        {/*  */}
                        <div className="text-end mb-4">
                            <p className="m-0">Sub Total: {currencydata.currencydata_Array.currency_symbol}{TableData.TableData_Array.sub_total}</p>
                            <p className="m-0">Discount: {currencydata.currencydata_Array.currency_symbol}{discount} </p>
                            {Object.entries(TexData.TexData_Array).length > 0 &&
                                Object.entries(TexData.TexData_Array).map(([key, val], i) => {
                                    return(
                                        <p>{key}: {currencydata.currencydata_Array.currency_symbol}{val} </p>
                                    )                  
                                })
                            }
                            <hr />
                            <h4 className="fontsize20"><b>Total: </b> {currencydata.currencydata_Array.currency_symbol}{TableData.TableData_Array.total}</h4>
                        </div>
                        <p className="m-0"><strong>Note</strong>: {TableData.TableData_Array.note}</p>
                    </div>
                </Card.Body>
            </Card>
        </div>
            <Modal show={modalShowcategory} onHide={() => setModalShowAssign(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter"> Signature & Confirmation Of Identity</Modal.Title>
                </Modal.Header>
                <Form onSubmit={signsubmit}>
                <Modal.Body className="p-0 my-4">
                        <FormGroup className="mb-3">
                            <FormLabel>First Name</FormLabel>
                            <Form.Control type="text" placeholder="" name="" required value={firstname} onChange={(e) => setfirstname(e.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Last Name</FormLabel>
                            <Form.Control type="text" placeholder="" name="" required value={lastname} onChange={(e) => setlastname(e.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Email</FormLabel>
                            <Form.Control type="email" placeholder="" required name="" value={email} onChange={(e) => setemail(e.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <div><FormLabel>Signature</FormLabel></div>
                            
                                <SignatureCanvas penColor='black' ref={SignatureField} canvasProps={{ width: 400, height: 200, className: 'sigCanvas' }}  />
                            
                            <div>
                            <Button className='btn btn_blue' variant="" onClick={clear}>
                                Clear
                            </Button>
                            </div>
                        </FormGroup>
                    
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setModalShowAssign(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue">Sign</Button>
                </Modal.Footer>
                </Form>
            </Modal> 
        </>
    )    
}

export default Estimate_Invoice;
