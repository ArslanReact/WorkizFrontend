import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../Globalsettings";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Toggle from 'react-toggle';
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { Form, Button, FormLabel, InputGroup, FormControl,Modal } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from 'sweetalert';
// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../../node_modules/react-tabs/style/react-tabs.css";
import invisible from "../../../../assets/images/invisible.svg";
import openeye from "../../../../assets/images/open-eye.svg";
// 
import OfflinePaymentCredentials from "../../../pages/SideBar_Tab_Pages/Setting_Page/OfflinePaymentCredentials";
import eyeicon from "../../../../assets/images/eye.svg";
import backicon from "../../../../assets/images/arrowleft.svg";
import ckeckimgicon from "../../../../assets/images/checkicon.svg";

const PaymentCredentials = () => {
    const [modalShowEditMethod, setModalShowEditMethod] = useState(false);
    const [modalShowAgent, setModalShowAgent] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [credentialid, setcredentialid] = useState(0);
    const [paypal_client_id, setpaypal_client_id] = useState('');
    const [paypal_secret, setpaypal_secret] = useState('');
    const [paypal_mode, setpaypal_mode] = useState('');
    const [paypal_status, setpaypal_status] = useState(false);

    const [stripe_client_id, setstripe_client_id] = useState('');
    const [stripe_secret, setstripe_secret] = useState('');
    const [stripe_webhook_secret, setstripe_webhook_secret] = useState('');
    const [stripe_status, setstripe_status] = useState(false);

    const [razorpay_key, setrazorpay_key] = useState('');
    const [razorpay_secret, setrazorpay_secret] = useState('');
    const [razorpay_webhook_secret, setrazorpay_webhook_secret] = useState('');
    const [razorpay_status, setrazorpay_status] = useState(false);

    const [paystack_client_id, setpaystack_client_id] = useState('');
    const [paystack_secret, setpaystack_secret] = useState('');
    const [paystack_merchant_email, setpaystack_merchant_email] = useState('');
    const [paystack_status, setpaystack_status] = useState(false);

    const [mollie_api_key, setmollie_api_key] = useState('');
    const [mollie_status, setmollie_status] = useState(false);

    const [authorize_api_login_id, setauthorize_api_login_id] = useState('');
    const [authorize_transaction_key, setauthorize_transaction_key] = useState('');
    const [authorize_environment, setauthorize_environment] = useState('');
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/settings/payment-gateway-credential/' + companyid)
            .then((response) => {
                setcredentialid(response.data.credentials.id);
                setpaypal_client_id(response.data.credentials.paypal_client_id);    
                setpaypal_secret(response.data.credentials.paypal_mode);    
                setpaypal_mode(response.data.credentials.paypal_secret);  
                if (response.data.credentials.paypal_status === 'active') {
                    setpaypal_status(true);
                }     
            })
            .catch((error) => {
                //  history.push('/signin');
            });
    }, [])

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/settings/payment-gateway-credential/update/'+credentialid,{
            company_id: companyid,
            paypal_client_id: paypal_client_id,
            paypal_secret: paypal_secret,
            paypal_mode: paypal_mode,
            paypal_status: paypal_status,
            stripe_client_id: stripe_client_id,
            stripe_webhook_secret: stripe_webhook_secret,
            razorpay_key: razorpay_key,
            razorpay_secret: razorpay_secret,
            razorpay_webhook_secret: razorpay_webhook_secret,
            razorpay_status: razorpay_status,
            paystack_client_id: paystack_client_id,
            paystack_secret: paystack_secret,
            paystack_merchant_email: paystack_merchant_email,
            paystack_status: paystack_status,
            mollie_api_key: mollie_api_key,
            mollie_status: mollie_status,
            authorize_api_login_id: authorize_api_login_id,
            authorize_transaction_key: authorize_transaction_key,
            authorize_environment: authorize_environment
        })
        .then((response) => {
            setLoading(false);
            toast.success("Payment setting updated successfully.");
        }); 
    }
    const[Method, setMethod] = useState('');
    const[description, setdescription] = useState('');
    const[updatemethodname, setupdatemethodname] = useState('');
    const[updatemethodid, setupdatemethodid] = useState('');
    const[updatedescription, setupdatedescription] = useState('');
    const[updatestatus, setupdatestatus] = useState('');
    const [methodlist, setmethodlist] = useState({
        methodlist_Array: []
    });
    const PaymentOfflineDetails = () => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/settings/offline-payment-setting/'+companyid)
        .then((response) => {
            setmethodlist({ methodlist_Array: response.data.offlinemethodlist ? response.data.offlinemethodlist : [], });
            setLoading(false);
        }); 
    }
    const submitofflinemethod = (evt) => {
        evt.preventDefault();
        setLoading(true);
        if(description == ""){
            toast.error("Please Enter Description Must.");
            setLoading(false);
        }else{
            setModalShowEditMethod(false);
            axios.post(Globalsettings.url + 'api/admin/settings/offline-payment-setting/store',{
                company_id: companyid,
                name: Method,
                description: description,
            })
            .then((response) => {   
                toast.success("Offilne New Payment setting added successfully.");
                axios.get(Globalsettings.url + 'api/admin/settings/offline-payment-setting/'+companyid)
                .then((response) => {
                    setmethodlist({ methodlist_Array: response.data.offlinemethodlist ? response.data.offlinemethodlist : [], });
                    setLoading(false);
                }); 
            }); 
        }
    }
    const submitupdateofflinemethod = (evt) => {
        evt.preventDefault();
        setLoading(true);
        setModalShowAgent(false);
        axios.post(Globalsettings.url + 'api/admin/settings/offline-payment-setting/update/'+updatemethodid,{
            name: updatemethodname,
            description: updatedescription,
            status: updatestatus,
        })
        .then((response) => {
            axios.get(Globalsettings.url + 'api/admin/settings/offline-payment-setting/'+companyid)
            .then((response) => {    
                toast.success("Offilne New Payment setting updated successfully.");
                setmethodlist({ methodlist_Array: response.data.offlinemethodlist ? response.data.offlinemethodlist : [], });
                setLoading(false);
            }); 

        }); 
    }
    // Delete Method
    const Deletemethod = (id) => {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover the deleted method data",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.get(Globalsettings.url + 'api/admin/settings/offline-payment-setting/destroy/' + id)
                            .then(response => {
                                swal("Method Delete Successfully!", {
                                    icon: "success",
                                });
                            });
                        setmethodlist({ methodlist_Array: methodlist.methodlist_Array.filter(item => item.id !== id) });
                    } else {
                    }
                });
    }
    // Update Method
    const Updatemethod = (id) => {
        setLoading(true);
        setupdatemethodid(id);
        axios.get(Globalsettings.url + 'api/admin/settings/offline-payment-setting/edit/'+id)
        .then((response) => {
            setupdatemethodname(response.data.data.name);
            setupdatedescription(response.data.data.description);
            setupdatestatus(response.data.data.status);
            setLoading(false);
            setModalShowAgent(true);
        }); 
    }

    //
    const onpaypalidClickShow = (e) => {
        var x = document.getElementById("paypal_client_id");
        var y = document.getElementById("paypal_client_idimg");
        if (x.type === "password") {
            x.type = "text";
            y.src = openeye;
        } else {
            x.type = "password";
            y.src = invisible;
        }
    }
    const onpaypalsecretClickShow = (e) => {
        var x = document.getElementById("paypal_secret");
        var y = document.getElementById("paypal_secretimg");
        if (x.type === "password") {
            x.type = "text";
            y.src = openeye;
        } else {
            x.type = "password";
            y.src = invisible;
        }
    }
    const onstripe_secretClickShow = (e) => {
        var x = document.getElementById("stripe_secret");
        var y = document.getElementById("stripe_secretimg");
        if (x.type === "password") {
            x.type = "text";
            y.src = openeye;
        } else {
            x.type = "password";
            y.src = invisible;
        }
    }
    const onstripe_webhook_secretClickShow = (e) => {
        var x = document.getElementById("stripe_webhook_secret");
        var y = document.getElementById("stripe_webhook_secretimg");
        if (x.type === "password") {
            x.type = "text";
            y.src = openeye;
        } else {
            x.type = "password";
            y.src = invisible;
        }
    }

    const onrazorpay_secretClickShow = (e) => {
        var x = document.getElementById("razorpay_secret");
        var y = document.getElementById("razorpay_secretimg");
        if (x.type === "password") {
            x.type = "text";
            y.src = openeye;
        } else {
            x.type = "password";
            y.src = invisible;
        }
    }
    const onrazorpay_webhook_secretClickShow = (e) => {
        var x = document.getElementById("razorpay_webhook_secret");
        var y = document.getElementById("razorpay_webhook_secretimg");
        if (x.type === "password") {
            x.type = "text";
            y.src = openeye;
        } else {
            x.type = "password";
            y.src = invisible;
        }
    }

    const onpaystack_secretClickShow = (e) => {
        var x = document.getElementById("paystack_secret");
        var y = document.getElementById("paystack_secretimg");
        if (x.type === "password") {
            x.type = "text";
            y.src = openeye;
        } else {
            x.type = "password";
            y.src = invisible;
        }
    }
    const onauthorize_api_login_idClickShow = (e) => {
        var x = document.getElementById("authorize_api_login_id");
        var y = document.getElementById("authorize_api_login_idimg");
        if (x.type === "password") {
            x.type = "text";
            y.src = openeye;
        } else {
            x.type = "password";
            y.src = invisible;
        }
    }

    const onauthorize_transaction_keyClickShow = (e) => {
        var x = document.getElementById("authorize_transaction_key");
        var y = document.getElementById("authorize_transaction_keyimg");
        if (x.type === "password") {
            x.type = "text";
            y.src = openeye;
        } else {
            x.type = "password";
            y.src = invisible;
        }
    }
    return (
        <>
            <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="react_tabs_block">
                    <Tabs>
                        <div className="row">
                            <div className="col-xl-3">
                                <div className="card card_dashboard card-body">
                                    <TabList className="react-tabs__tab-list">
                                        <li className=""><NavLink to={`${process.env.PUBLIC_URL}/setting`} className="w-100 bodycolorbg d-flex align-items-center"><img className="img-fluid mr-2" src={backicon} alt="backicon" /> Back</NavLink></li>
                                        <Tab eventKey="Online">Online Payment Credentials</Tab>
                                        <Tab eventKey="Offline" onClick={() => PaymentOfflineDetails()}>Offline Payment Method</Tab>
                                    </TabList>
                                </div>
                            </div>
                            <div className="col-xl-9">
                            <Form onSubmit={handleSubmit}>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">Payment Credentials</h4>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-4 pb-3">
                                                <h4 className="fontsize18">Online Payment Credentials</h4>
                                            </div>
                                            {/*  */}
                                            <Tabs className="inner_tabs">
                                                <TabList className="d-flex justify-content-between react-tabs__tab-list">
                                                    <Tab eventKey="Paypal">Paypal</Tab>
                                                    <Tab eventKey="Stripe">Stripe</Tab>
                                                    <Tab eventKey="Razorpay">Razorpay</Tab>
                                                    <Tab eventKey="Paystack">Paystack</Tab>
                                                    <Tab eventKey="Mollie">Mollie</Tab>
                                                    <Tab eventKey="Authorize">Authorize.net</Tab>
                                                    <Tab eventKey="Transfer">Bank Transfer</Tab>
                                                    <Tab eventKey="Cash">By Cash</Tab>
                                                </TabList>
                                                <TabPanel>
                                                    <div className="card-body">
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Paypal Client Id</FormLabel>
                                                            <InputGroup className="d-flex">
                                                                <FormControl type="password" id="paypal_client_id" required value={paypal_client_id} onChange={(e) => setpaypal_client_id(e.target.value)} className="transparent_form h-40px border_graycolor_1" placeholder="" />
                                                                <InputGroup.Text id="inputGroup-sizing-default" onClick={onpaypalidClickShow}><img id="paypal_client_idimg" width="20" className="img-fluid" src={invisible} alt="eyeicon" /></InputGroup.Text>
                                                            </InputGroup>
                                                        </div>
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Paypal Secret</FormLabel>
                                                            <InputGroup className="d-flex">
                                                                <FormControl type="password" id="paypal_secret" required value={paypal_secret} onChange={(e) => setpaypal_secret(e.target.value)} className="transparent_form h-40px border_graycolor_1" placeholder="" />
                                                                <InputGroup.Text id="inputGroup-sizing-default" onClick={onpaypalsecretClickShow}><img id="paypal_secretimg" width="20" className="img-fluid" src={invisible} alt="eyeicon" /></InputGroup.Text>
                                                            </InputGroup>
                                                        </div>
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Select environment</FormLabel>
                                                            <Form.Control className="transparent_form h-40px" as="select" required value={paypal_mode} onChange={(e) => setpaypal_mode(e.target.value)}>
                                                                <option value="sandbox">Sandbox</option>
                                                                <option value="live">Live</option>
                                                            </Form.Control>
                                                        </div>
                                                        <div className="mb-4">
                                                            <p className="mb-2 paragraphcolor1text">Webhook URL</p>
                                                            <p className="mb-2 paragraphcolor1text">{Globalsettings.url+"verify-ipnRL"}</p>
                                                            <p className="mb-0 blusecolortext">(Add this webhook url on your paypal app settings.)</p>
                                                        </div>
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Paypal Status</FormLabel>
                                                            <div>
                                                            <Toggle checked={paypal_status} name='burritoIsReady' onChange={(e) => setpaypal_status(!paypal_status) } />
                                                            </div>
                                                        </div>
                                                        <Button variant="" type="submit" className="w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="ckeckimgicon" /> Save</Button>
                                                    </div>
                                                    
                                                </TabPanel>
                                                <TabPanel>
                                                    <div className="card-body">
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Publishable Key</FormLabel>
                                                            <Form.Control className="transparent_form h-40px" type="text" value={stripe_client_id} onChange={(e) => setstripe_client_id(e.target.value)} />
                                                        </div>
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Stripe Secret</FormLabel>
                                                            <InputGroup className="d-flex">
                                                                <FormControl type="password" id="stripe_secret" className="transparent_form h-40px border_graycolor_1" value={stripe_secret} onChange={(e) => setstripe_secret(e.target.value)} />
                                                                <InputGroup.Text id="inputGroup-sizing-default" onClick={onstripe_secretClickShow}><img id="stripe_secretimg" width="20"  className="img-fluid" src={invisible} alt="eyeicon" /></InputGroup.Text>
                                                            </InputGroup>
                                                        </div>
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Stripe Webhook Secret</FormLabel>
                                                            <InputGroup className="d-flex">
                                                                <FormControl type="password" id="stripe_webhook_secret" className="transparent_form h-40px border_graycolor_1" value={stripe_webhook_secret} onChange={(e) => setstripe_webhook_secret(e.target.value)} />
                                                                <InputGroup.Text id="inputGroup-sizing-default" onClick={onstripe_webhook_secretClickShow}><img id="stripe_webhook_secretimg" width="20" className="img-fluid" src={invisible} alt="eyeicon" /></InputGroup.Text>
                                                            </InputGroup>
                                                        </div>
                                                        <div className="mb-4">
                                                            <p className="mb-2 paragraphcolor1text">Webhook URL</p>
                                                            <p className="mb-2 paragraphcolor1text">{Globalsettings.url+"verify-ipnRL"}</p>
                                                            <p className="mb-0 blusecolortext">(Add this webhook url on your paypal app settings.)</p>
                                                            <p className="mb-0 blusecolortext">(You should add event "invoice.payment_failed", "invoice.payment_succeeded", "payment_intent.succeeded" and "payment_intent.payment_failed" while creating webhook.)</p>
                                                        </div>
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Stripe Status</FormLabel>
                                                            <div>
                                                                <Toggle checked={stripe_status} onChange={(e) => setstripe_status(!stripe_status) } />
                                                            </div>
                                                        </div>
                                                        <Button variant="" type="submit" className="w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="ckeckimgicon" /> Save</Button>
                                                    </div>
                                                </TabPanel>
                                                <TabPanel>
                                                    <div className="card-body">
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Razorpay Key</FormLabel>
                                                            <Form.Control className="transparent_form h-40px" type="text" value={razorpay_key} onChange={(e) => setrazorpay_key(e.target.value)} />
                                                        </div>
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Razorpay Secret Key</FormLabel>
                                                            <InputGroup className="d-flex">
                                                                <FormControl type="password" id="razorpay_secret" className="transparent_form h-40px border_graycolor_1" value={razorpay_secret} onChange={(e) => setrazorpay_secret(e.target.value)} />
                                                                <InputGroup.Text id="inputGroup-sizing-default" onClick={onrazorpay_secretClickShow}><img id="razorpay_secretimg" width="20" className="img-fluid" src={invisible} alt="eyeicon" /></InputGroup.Text>
                                                            </InputGroup>
                                                        </div>
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Razorpay Webhook Secret Key</FormLabel>
                                                            <InputGroup className="d-flex">
                                                                <FormControl type="password" id="razorpay_webhook_secret" className="transparent_form h-40px border_graycolor_1" value={razorpay_webhook_secret} onChange={(e) => setrazorpay_webhook_secret(e.target.value)} />
                                                                <InputGroup.Text id="inputGroup-sizing-default" onClick={onrazorpay_webhook_secretClickShow}><img id="razorpay_webhook_secretimg" width="20" className="img-fluid" src={invisible} alt="eyeicon" /></InputGroup.Text>
                                                            </InputGroup>
                                                        </div>
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Razorpay Status</FormLabel>
                                                            <div>
                                                                <Toggle checked={razorpay_status} onChange={(e) => setrazorpay_status(!razorpay_status) } />
                                                            </div>
                                                        </div>
                                                        <Button variant="" type="submit" className="w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="ckeckimgicon" /> Save</Button>
                                                    </div>
                                                </TabPanel>
                                                <TabPanel>
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-xl-6 col-lg-12">
                                                                <Form.Group>
                                                                    <FormLabel className="mb-2">Paystack Key</FormLabel>
                                                                    <Form.Control className="transparent_form h-40px" type="text" value={paystack_client_id} onChange={(e) => setpaystack_client_id(e.target.value)} />
                                                                </Form.Group>
                                                            </div>
                                                            <div className="col-xl-6 col-lg-12">
                                                                <FormLabel className="mb-2">Paystack Secret Key</FormLabel>
                                                                <InputGroup className="d-flex">
                                                                    <FormControl type="password" id="paystack_secret" className="transparent_form h-40px border_graycolor_1 " value={paystack_secret} onChange={(e) => setpaystack_secret(e.target.value)} />
                                                                    <InputGroup.Text id="inputGroup-sizing-default" onClick={onpaystack_secretClickShow}><img id="paystack_secretimg" width="20" className="img-fluid" src={invisible} alt="eyeicon" /></InputGroup.Text>
                                                                </InputGroup>
                                                            </div>
                                                            <div className="col-xl-6 col-lg-12">
                                                                <Form.Group>
                                                                    <FormLabel className="mb-2">Paystack Merchant Email</FormLabel>
                                                                    <Form.Control className="transparent_form h-40px" type="text" value={paystack_merchant_email} onChange={(e) => setpaystack_merchant_email(e.target.value)} />
                                                                </Form.Group>
                                                            </div>
                                                            <div className="col-xl-6 col-lg-12">
                                                                <FormLabel className="mb-2">Razorpay Status</FormLabel>
                                                                <div>
                                                                    <Toggle checked={paystack_status} onChange={(e) => setpaystack_status(!paystack_status) } />
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-6 col-lg-12">
                                                                <p className="mb-2 paragraphcolor1text">Webhook URL</p>
                                                                <p className="mb-2 paragraphcolor1text">{Globalsettings.url+"verify-ipnRL"}</p>
                                                                <p className="mb-0 blusecolortext">(Add this webhook url on your paystack app settings. )</p>
                                                            </div>
                                                            <div className="col-xl-6 col-lg-12">
                                                                <p className="mb-2 paragraphcolor1text">Webhook URL</p>
                                                                <p className="mb-2 paragraphcolor1text">{Globalsettings.url+"callback"}</p>
                                                                <p className="mb-0 blusecolortext">(Add this callback url on your paystack app settings. )</p>
                                                            </div>
                                                            <Button variant="" type="submit" className="w-100px h-40px mt-4 btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="ckeckimgicon" /> Save</Button>
                                                        </div>
                                                    </div>
                                                </TabPanel>
                                                <TabPanel>
                                                    <div className="card-body">
                                                        <div className="mb-4">
                                                            <Form.Group>
                                                                <FormLabel className="mb-2">Mollie Api Key</FormLabel>
                                                                <Form.Control className="transparent_form h-40px" type="text" value={mollie_api_key} onChange={(e) => setmollie_api_key(e.target.value)} />
                                                            </Form.Group>
                                                        </div>
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Mollie Status</FormLabel>
                                                            <div>
                                                                <Toggle checked={mollie_status} onChange={(e) => setmollie_status(!mollie_status) } />
                                                            </div>
                                                        </div>
                                                        <Button variant="" type="submit" className="w-100px h-40px mt-4 btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="ckeckimgicon" /> Save</Button>
                                                    </div>
                                                </TabPanel>
                                                <TabPanel>
                                                    <div className="card-body">
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Authorize Api Login Id</FormLabel>
                                                            <InputGroup className="d-flex">
                                                                <FormControl type="password" id="authorize_api_login_id" className="transparent_form h-40px border_graycolor_1" value={authorize_api_login_id} onChange={(e) => setauthorize_api_login_id(e.target.value)} />
                                                                <InputGroup.Text id="inputGroup-sizing-default" onClick={onauthorize_api_login_idClickShow}><img id="authorize_api_login_idimg" width="20" className="img-fluid" src={invisible} alt="eyeicon" /></InputGroup.Text>
                                                            </InputGroup>
                                                        </div>
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Authorize Transaction Key</FormLabel>
                                                            <InputGroup className="d-flex">
                                                                <FormControl type="password" id="authorize_transaction_key" className="transparent_form h-40px border_graycolor_1" value={authorize_transaction_key} onChange={(e) => setauthorize_transaction_key(e.target.value)} />
                                                                <InputGroup.Text id="inputGroup-sizing-default" onClick={onauthorize_transaction_keyClickShow}><img id="authorize_transaction_keyimg" width="20" className="img-fluid" src={invisible} alt="eyeicon" /></InputGroup.Text>
                                                            </InputGroup>
                                                        </div>
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Select environment</FormLabel>
                                                            <Form.Control className="transparent_form h-40px" as="select" value={authorize_environment} onChange={(e) => setauthorize_environment(e.target.value)}>
                                                                <option value="sandbox">Sandbox</option>
                                                                <option value="live">Live</option>
                                                            </Form.Control>
                                                        </div>
                                                        <div className="mb-4">
                                                            <FormLabel className="mb-2">Authorize.net Status</FormLabel>
                                                            <div>
                                                                <Toggle checked={mollie_status} onChange={(e) => setmollie_status(!mollie_status) } />
                                                            </div>
                                                        </div>
                                                        <Button variant="" type="submit" className="w-100px h-40px mt-4 btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="ckeckimgicon" /> Save</Button>
                                                    </div>
                                                </TabPanel>
                                            </Tabs>
                                        </div>
                                    </TabPanel>
                                </Form>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">Payment Method</h4>
                                        <div className="card card_dashboard card-body">
                                        <div className="card-header d-flex align-items-center mb-4 pb-3">
                                            <h4 className="fontsize18">Offline Payment Credentials</h4>
                                            <Button onClick={() => setModalShowEditMethod(true)} type="button" className="ml-auto btn_blue h-40px" variant="">Add Method</Button>
                                        </div>
                                        <div className="table-sm-responsive clent_data_table mb-4">
                                            <table className="table m-0">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Method</th>
                                                        <th scope="col">Description</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {methodlist.methodlist_Array.map((val, index) => {
                                                        let number = index + 1;
                                                        return (
                                                            <OfflinePaymentCredentials
                                                                key={index}
                                                                countnumber={number}
                                                                omid={val.id}
                                                                methodname={val.name}
                                                                description={val.description}
                                                                badgebgcolor={val.status == 'yes' ? "greencolortext badgegreenbg" : "redcolortext badgeredbg"}
                                                                status={val.status == 'yes' ? "Active" : "Inactive"}
                                                                Deletemethod={Deletemethod}
                                                                Updatemethod={Updatemethod}
                                                            />
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>   
                                        </div>                                     
                                    </TabPanel>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </div>
            <Modal show={modalShowEditMethod} onHide={() => setModalShowEditMethod(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Add New Offline Payment Method</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitofflinemethod}>
                <Modal.Body className="p-0 mt-3">
                    <Form.Group>
                        <FormLabel className="mb-2">Method</FormLabel>
                        <Form.Control type="text" className="h-45px transparent_form" value={Method} required onChange={(e) => setMethod(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <FormLabel className="mb-2">Description</FormLabel>
                        <CKEditor
                                editor={ClassicEditor}
                                data={description}
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setdescription(data);
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px h-40px graycolorbg fontsize14 border_bodycolor_0" onClick={() => setModalShowEditMethod(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="" /> Save</Button>
                </Modal.Footer>
                </Form>
            </Modal>


            {/*  */}
            <Modal show={modalShowAgent} onHide={() => setModalShowAgent(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Update Offline Payment Method</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitupdateofflinemethod}>
                <Modal.Body className="p-0 mt-3">
                    <Form.Group>
                        <FormLabel className="mb-2">Method</FormLabel>
                        <Form.Control type="text" className="h-40px transparent_form" required value={updatemethodname} onChange={(e) => setupdatemethodname(e.target.value)} />
                        <Form.Control type="hidden" value={updatemethodid} onChange={(e) => setupdatemethodid(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <FormLabel className="mb-2">Description</FormLabel>
                        <CKEditor
                                editor={ClassicEditor}
                                data={updatedescription}
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setupdatedescription(data);
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            />
                    </Form.Group>
                    <Form.Group>
                        <FormLabel className="mb-2">Status</FormLabel>
                        <Form.Control className="h-40px transparent_form" as="select" value={updatestatus} required onChange={(e) => setupdatestatus(e.target.value)}>
                            <option value="yes">Active</option>
                            <option value="no">Inactive</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px h-40px graycolorbg fontsize14 border_bodycolor_0" onClick={() => setModalShowAgent(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="" /> Save</Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default PaymentCredentials;
