import React, { useState, useEffect,useMemo} from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { NavLink, useHistory } from "react-router-dom";
import { Form, Button, FormLabel } from "react-bootstrap"
// import images
import checkicon from "../../../assets/images/checkicon.svg";
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
const Employee_AddExpenses = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');
    const [projectid, setprojectid] = useState('');
    const [currencyid, setcurrencyid] = useState('');
    const [itemname, setitemname] = useState('');
    const [price, setprice] = useState('');
    const [purchasefrom, setpurchasefrom] = useState('');
    const [purchasedate, setpurchasedate] = useState('');
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;

    const [CurrencyData, setCurrencyData] = useState({
        CurrencyData_Array: []
    });
    const [ProjectsData, setProjectsData] = useState({
        ProjectsData_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/member/finance/create/' + companyid+'/'+userid)
            .then((response) => {
                setCurrencyData({ CurrencyData_Array: response.data.data.currencies ? response.data.data.currencies : [], });
                setProjectsData({ ProjectsData_Array: response.data.data.projects ? response.data.data.projects : [], });
                setLoading(false);

            });
    }, []);

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    }
    // Submit
    const SubmitExpense = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('project_id', projectid);
        data.append('currency_id', currencyid);
        data.append('item_name', itemname);
        data.append('price', price);
        data.append('purchase_from', purchasefrom);
        data.append('purchase_date', purchasedate);
        data.append('bill', selectedImage);
        axios.post(Globalsettings.url + 'api/member/finance/store/' + companyid+'/'+userid, data).then((response) => {
            toast.success("Expanse Added Successfully!");
            setLoading(false);
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/finance_expanses`);
            }, 3000)
        });
        evt.preventDefault();
    }    
    return (
        <>
        <ToastContainer closeButton={true} position="top-right" />
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <h4 className="main_title">Add Expense</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <Form onSubmit={SubmitExpense}>
                        <div className="row">
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Project</FormLabel>
                                <Form.Select className="transparent_form h-45px" aria-label="Default select example" required value={projectid} onChange={e => setprojectid(e.target.value)}>
                                    <option value="">Select Project</option>
                                    {ProjectsData.ProjectsData_Array.map((val, index) => {
                                        return (
                                            <option value={val.id} key={index}>{val.project_name}</option>
                                        )
                                    })}
                                </Form.Select>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Currency</FormLabel>
                                <Form.Select className="transparent_form h-45px" aria-label="Default select example" required value={currencyid} onChange={e => setcurrencyid(e.target.value)}>
                                    <option value="">Select Currenct</option>
                                    {CurrencyData.CurrencyData_Array.map((val, index) => {
                                        return (
                                            <option value={val.id} key={index}>({val.currency_name}) - {val.currency_symbol}</option>
                                        )
                                    })}
                                </Form.Select>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Item Name <span className="star">*</span></FormLabel>
                                <Form.Control className="transparent_form h-45px" type="text" required value={itemname} onChange={e => setitemname(e.target.value)} placeholder="" />
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Price <span className="star">*</span></FormLabel>
                                <Form.Control className="transparent_form h-45px" type="text" required value={price} onChange={e => setprice(e.target.value)} placeholder="" />
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Purchased From <span className="star">*</span></FormLabel>
                                <Form.Control className="transparent_form h-45px" type="text" required value={purchasefrom} onChange={e => setpurchasefrom(e.target.value)} placeholder="" />
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Purchase Date <span className="star">*</span></FormLabel>
                                <Form.Control className="transparent_form h-45px" type="date" required value={purchasedate} onChange={e => setpurchasedate(e.target.value)} placeholder="" />
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Invoice</FormLabel>
                                <Form.Group controlId="formFile" className="mb-0">
                                    <Form.Control type="file" required onChange={imageChange} />
                                </Form.Group>
                            </div>
                            <div className="col-xl-12 col-lg-12 text-start">
                                <div className="btn-group">
                                    <Button type="submit" variant="" className="btn btn_blue w-100px"><img className="img-fluid mr-2" src={checkicon} alt="" /> Save</Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Employee_AddExpenses;
