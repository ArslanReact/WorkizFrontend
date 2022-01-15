import React, { useState, useEffect,useRef } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { Card, Row, Table, Modal, Button, Col, Form, FormLabel, FormGroup } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { NavLink } from "react-router-dom";
import SignatureCanvas from 'react-signature-canvas'
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
// import images
import pdficon from "../../../assets/images/pdficon.svg";
import checkicon from "../../../assets/images/checkicon.svg";
import avatarimg1 from "../../../assets/images/avatar_04.svg";
import dateFormat from 'dateformat';
// import component
import DiscussionList from "./DiscussionList";
import swal from 'sweetalert';
import DOMPurify from 'dompurify';
const ViewContract = (props) => {
    const SignatureField = useRef(null);
    const canvas = SignatureField.current;
    const clear = () => {
        canvas.clear();
    }
    const [modalShowcategory, setModalShowAssign] = React.useState(false);
    const [modalShowcategoryedit, setModalShowAssignedit] = React.useState(false);
    const [isLoading, setLoading] = useState(true);
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });
    const [discussion, setdiscussion] = useState({
        discussion_Array: []
    });
    const [contract_type, setcontract_type] = useState({
        contract_type_Array: []
    });
    const [companydata, setcompanydata] = useState({
        companydata_Array: []
    });
    const [currencydata, setcurrencydata] = useState('');
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/contracts/'+ props.match.params.id)
            .then((response) => {
                setTableData({ TableData_Array: response.data.data.contract ? response.data.data.contract : [], });
                setdiscussion({ discussion_Array: response.data.data.discussion ? response.data.data.discussion : [], });
                setcontract_type({ contract_type_Array: response.data.data.contract_type ? response.data.data.contract_type : [], });
                setcompanydata({ companydata_Array: response.data.data.global ? response.data.data.global : [], });
                setcurrencydata(response.data.data.currency);
                setLoading(false);
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, []);    
    // DiscussionListLoop_Array
    const[message,setmessage] = useState('');
    const formsubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(Globalsettings.url + 'api/client/contracts/add-discussion/'+companyid+'/'+userid+'/'+props.match.params.id,{
            "message" : message,
            "company_id" : companyid,
            "user_id" : userid,
        })
        .then((response) => {
            setdiscussion({ discussion_Array: response.data.data ? response.data.data : [], });
            toast.success("Message Send Successfully.");
            setmessage('');
            setLoading(false);
        })
        .catch((error) => {
            toast.error("Something went wrong!");
            setLoading(false);
        });
    }
    const[updatemessageid,setupdatemessageid] = useState('');
    const[updatemessage,setupdatemessage] = useState('');
    const updatesubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setModalShowAssignedit(false);
        axios.post(Globalsettings.url + 'api/client/contracts/update-discussion/'+companyid+'/'+userid+'/'+updatemessageid,{
            "messages" : updatemessage,
        })
        .then((response) => {
            setdiscussion({ discussion_Array: response.data.data ? response.data.data : [], });
            toast.success("Message Update Successfully.");
            
            setLoading(false);
        })
        .catch((error) => {
            toast.error("Something went wrong!");
            setLoading(false);
        });
    }
        // Delete 
        const DeleteMessage = (id) => {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover the deleted client data",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.get(Globalsettings.url + 'api/client/contracts/remove-discussion/'+companyid+'/'+userid+'/'+id)
                            .then(response => {
                                toast.success("Message Delete Successfully!");
                            });
                            setdiscussion({ discussion_Array: discussion.discussion_Array.filter(item => item.id !== id) });
                    } else {
                    }
                });
        }
        // Edit
        const EditMessage = (id) => {
            setLoading(true);
            
            axios.get(Globalsettings.url + 'api/client/contracts/edit-discussion/'+companyid+'/'+userid+'/'+id)
            .then(response => {
                setModalShowAssignedit(true);
                setLoading(false);
                setupdatemessageid(response.data.data.id);
                setupdatemessage(response.data.data.message);
            });
        }
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
            axios.post(Globalsettings.url + 'api/client/contracts/sign/'+companyid+'/'+userid+'/'+props.match.params.id, data).then((response) => {
                toast.success("Contract Signed Successfully");
                props.history.push(`${process.env.PUBLIC_URL}/viewcontract/`+props.match.params.id);
                setModalShowAssignedit(false);
                setLoading(false);
            });
            e.preventDefault();
        }
    return (
        <>
        <ToastContainer />
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="mb-4 d-md-flex d-block">
                <NavLink to={`${process.env.PUBLIC_URL}/client_contract`} className="d-inline-block btn btn_blue"> Back</NavLink>
                <div className="d-flex ml-auto">
                    <a href={Globalsettings.url + 'api/contracts/download/'+ props.match.params.id} className="d-inline-block btn btn_blue paragraph_blue_bg_color"><img width="20" className="img-fluid mr-2" src={pdficon} alt="icon" /> Download</a>
                    {TableData.TableData_Array.signature ?
                    <Button variant="" className="ml-2 d-inline-block btn btn_blue" disabled><img width="15" className="img-fluid mr-2" src={checkicon} alt="icon" />Signed</Button>
                    :
                    <Button variant="" onClick={() => setModalShowAssign(true)} className="ml-2 d-inline-block btn btn_blue"><img width="15" className="img-fluid mr-2" src={checkicon} alt="icon" /> Sign</Button>
                    }
                </div>
            </div>
            <Card className="card_dashboard">
                <Card.Body>
                    <Row className="align-items-start">
                        <Col xl={7} lg={6} className="mb-4 mb-lg-0">
                            <div className="filter-tabs">
                                <Tabs>
                                    <TabList>
                                        <Tab>Summary</Tab>
                                        <Tab>Discussion</Tab>
                                    </TabList>

                                    <TabPanel>
                                        <Card.Body>
                                            {<p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(TableData.TableData_Array.contract_detail) }} />}
                                        </Card.Body>
                                    </TabPanel>
                                    <TabPanel>
                                        <Card.Body>
                                            <Form className="mb-4" onSubmit={formsubmit}>
                                                <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setmessage(e.target.value)} />
                                                <Button variant="" type="submit" className="mt-3 btb btn_blue">Add Comment</Button>
                                            </Form>
                                            {discussion.discussion_Array.length > 0 ?
                                            discussion.discussion_Array.map((val) => {
                                                return (
                                                    <DiscussionList
                                                        key={val.key}
                                                        mid={val.id}
                                                        avatarimg={val.user.image_url}
                                                        title={val.user.name}
                                                        smalltitle={val.message}
                                                        paragraph={val.message}
                                                        DeleteMessage={DeleteMessage}
                                                        EditMessage={EditMessage}
                                                    />
                                                )
                                            })
                                            :
                                            <tr>
                                                <td>No Discussion Yet!</td>
                                            </tr>
                                        }
                                        </Card.Body>
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </Col>
                        <Col xl={5} lg={6} className="">
                            <h5 className="fontsize22 blue_text_color">{companydata.companydata_Array.company_name}</h5>
                            <p className="paragraph_blue_text_color mb-4">{companydata.companydata_Array.address}</p>
                            <h5 className="fontsize20 paragraph_blue_text_color blue_text_color">Contract Value: {currencydata}{TableData.TableData_Array.amount}</h5>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td># Contract Number</td>
                                        <td>{TableData.TableData_Array.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Start Date</td>
                                        <td>{dateFormat(TableData.TableData_Array.start_date,companydata.companydata_Array.date_format)}</td>
                                    </tr>
                                    <tr>
                                        <td>End Date</td>
                                        <td>{dateFormat(TableData.TableData_Array.end_date,companydata.companydata_Array.date_format)}</td>
                                    </tr>
                                    <tr>
                                        <td>Contract Type</td>
                                        <td>{contract_type.contract_type_Array.name}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {/*  */}
            <Modal show={modalShowcategory} onHide={() => setModalShowAssign(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter"> Signature & Confirmation Of Identity</Modal.Title>
                </Modal.Header>
                <Form onSubmit={signsubmit}>
                <Modal.Body className="p-0 my-4">
                        <FormGroup className="mb-3">
                            <FormLabel>First Name</FormLabel>
                            <Form.Control type="text" placeholder="Client" name="" value={firstname} onChange={(e) => setfirstname(e.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Last Name</FormLabel>
                            <Form.Control type="text" placeholder="Client" name="" value={lastname} onChange={(e) => setlastname(e.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel>Email</FormLabel>
                            <Form.Control type="email" placeholder="torp.elfrieda@hotmail.com" name="" value={email} onChange={(e) => setemail(e.target.value)} />
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

            <Modal show={modalShowcategoryedit} onHide={() => setModalShowAssignedit(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter"> Edit Discussion</Modal.Title>
                </Modal.Header>
                <Form onSubmit={updatesubmit}>
                <Modal.Body className="p-0 my-4">
                        <Form.Control as="textarea" rows={4} value={updatemessage} onChange={(e) => setupdatemessage(e.target.value)}  />
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setModalShowAssignedit(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue">Update</Button>
                </Modal.Footer>
                </Form>
            </Modal>         
        </>
    )
}
export default ViewContract;
