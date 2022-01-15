import React, { useState, useEffect} from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink,useHistory } from "react-router-dom";
import { Button, Form, FormLabel } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import dateFormat from "dateformat";
// 
import checkicon_img from "../../../../../assets/images/checkicon.svg";


const EditPayment = (props) => {
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');
    const [amount, setamount] = useState('');
    const [payon, setpayon] = useState('');
    const [projectid, setprojectid] = useState('');
    const [currencyid, setcurrencyid] = useState('');
    const [paymentgateway, setpaymentgateway] = useState('');
    const [transid, settransid] = useState('');
    const [remarks, setremarks] = useState('');
    const [status, setstatus] = useState('');
    const [CurrencyData, setCurrencyData] = useState({
        CurrencyData_Array: []
    });
    const [ProjectsData, setProjectsData] = useState({
        ProjectsData_Array: []
    });
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    }
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/finance/payments/edit/' + companyid+'/'+userid+'/'+props.match.params.id)
            .then((response) => {
                setCurrencyData({ CurrencyData_Array: response.data.data.currencies ? response.data.data.currencies : [], });
                setProjectsData({ ProjectsData_Array: response.data.data.projects ? response.data.data.projects : [], });
                setprojectid(response.data.data.payment.project_id);
                setcurrencyid(response.data.data.payment.currency_id);
                setpaymentgateway(response.data.data.payment.gateway);
                settransid(response.data.data.payment.transaction_id);
                setremarks(response.data.data.payment.remarks);
                setamount(response.data.data.payment.amount);
                setpayon(dateFormat(response.data.data.payment.padi_on,'yyyy-mm-dd'));
                setstatus(response.data.data.payment.status);
                setLoading(false);

            });
    }, []);
    const paymentsubmit = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('project_id', projectid);
        data.append('paid_on', payon);
        data.append('currency_id', currencyid);
        data.append('amount', amount);
        data.append('gateway', paymentgateway);
        data.append('transaction_id', transid);
        data.append('remarks', remarks);
        data.append('bill', selectedImage);
        data.append('status', status);
        axios.post(Globalsettings.url + 'api/admin/finance/payments/update/' + companyid+'/'+userid+'/'+props.match.params.id, data).then((response) => {
            toast.success("Payment Updated Successfully!");
            setLoading(false);
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/payments`);
            }, 3000)
        });
        evt.preventDefault();
    }
    return (
        <>
            <ToastContainer />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <h4 className="main_title">Update Payments</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card-body">
                    <Form onSubmit={paymentsubmit}>
                        <div className="row">
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Select Project</FormLabel>
                                <Form.Select className="transparent_form h-45px" aria-label="Default select example" required value={projectid} onChange={e => setprojectid(e.target.value)}>
                                    <option value="">Select Project</option>
                                    {ProjectsData.ProjectsData_Array.map((val, index) => {
                                        return (
                                            <option value={val.id} key={index}>{val.project_name}</option>
                                        )
                                    })}
                                </Form.Select>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Paid On</FormLabel>
                                <Form.Control className="transparent_form h-45px" type="date" required value={payon} onChange={e => setpayon(e.target.value)} />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Currency</FormLabel>
                                <Form.Select className="transparent_form h-45px" aria-label="Default select example" required value={currencyid} onChange={e => setcurrencyid(e.target.value)}>
                                    <option value="">Select Currency</option>
                                    {CurrencyData.CurrencyData_Array.map((val, index) => {
                                        return (
                                            <option value={val.id} key={index}>({val.currency_name}) - {val.currency_symbol}</option>
                                        )
                                    })}
                                </Form.Select>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Amount</FormLabel>
                                <Form.Control className="transparent_form h-45px" type="text" required value={amount} onChange={e => setamount(e.target.value)} />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Payment Gateway</FormLabel>
                                <Form.Control className="transparent_form h-45px" type="text" required value={paymentgateway} onChange={e => setpaymentgateway(e.target.value)} />
                                <small>Paypal, Authorize.net, Stripe, Bank Transfer, Cash or others.</small>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Transaction Id</FormLabel>
                                <Form.Control className="transparent_form h-45px" type="text" required value={transid} onChange={e => settransid(e.target.value)} />
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Receipt</FormLabel>
                                <Form.Group controlId="formFile" className="mb-0">
                                    <Form.Control type="file"  onChange={imageChange} />
                                </Form.Group>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Remark</FormLabel>
                                <Form.Control as="textarea" className="transparent_form" required value={remarks} onChange={e => setremarks(e.target.value)} rows={5} />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Status</FormLabel>
                                <Form.Select className="transparent_form h-45px" aria-label="Default select example" required value={status} onChange={e => setstatus(e.target.value)}>
                                    <option value="">Select Status</option>
                                    <option value="complete">Complete</option>
                                    <option value="pending">Pending</option>
                                    
                                </Form.Select>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <Button variant="" type="submit" className="btn_blue"><img className="mr-2" src={checkicon_img} alt="formtable_img" /> Update</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default EditPayment;
