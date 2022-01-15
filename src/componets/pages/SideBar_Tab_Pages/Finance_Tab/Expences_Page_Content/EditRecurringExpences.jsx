import React, { useState, useEffect} from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink,useHistory } from "react-router-dom"
import { Button, Form, Modal, FormLabel } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// 


// 
import checkicon_img from "../../../../../assets/images/checkicon.svg";
import cogiconimg from "../../../../../assets/images/cogimg.svg";

const EditRecurringExpences = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [ecatname, setecatname] = React.useState('');
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');
    const [description, setdescription] = useState('');
    const [memberid, setmemberid] = useState('');
    const [catid, setcatid] = useState('');
    const [projectid, setprojectid] = useState('');
    const [currencyid, setcurrencyid] = useState('');
    const [itemname, setitemname] = useState('');
    const [price, setprice] = useState('');
    const [purchasefrom, setpurchasefrom] = useState('');
    const [purchasedate, setpurchasedate] = useState('');
    const [billing_cycle, setbilling_cycle] = useState('');
    const [rotation, setrotation] = useState('');
    const [day_of_week, setday_of_week] = useState('');
    const [day_of_month, setday_of_month] = useState('');
    const [status, setstatus] = useState('');
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;

    const [Memberdata, setMemberdata] = useState({
        Memberdata_Array: []
    });
    const [Categorydata, setCategorydata] = useState({
        Categorydata_Array: []
    });
    const [CurrencyData, setCurrencyData] = useState({
        CurrencyData_Array: []
    });
    const [ProjectsData, setProjectsData] = useState({
        ProjectsData_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/expenses-recurring/edit/' + companyid+'/'+userid+'/'+props.match.params.id)
            .then((response) => {
                setMemberdata({ Memberdata_Array: response.data.data.employees ? response.data.data.employees : [], });
                setCurrencyData({ CurrencyData_Array: response.data.data.currencies ? response.data.data.currencies : [], });
                setCategorydata({ Categorydata_Array: response.data.data.categories ? response.data.data.categories : [], });
                setProjectsData({ ProjectsData_Array: response.data.data.projects ? response.data.data.projects : [], });
                setmemberid(response.data.data.expense.user_id);
                setcatid(response.data.data.expense.category_id);
                if(response.data.data.expense.description != null){
                    setdescription(response.data.data.expense.description);
                }
                setcatid(response.data.data.expense.category_id);
                setprojectid(response.data.data.expense.project_id);
                setcurrencyid(response.data.data.expense.currency_id);
                setitemname(response.data.data.expense.item_name);
                setprice(response.data.data.expense.price);
                setrotation(response.data.data.expense.rotation);
                setbilling_cycle(response.data.data.expense.billing_cycle);
                setday_of_week(response.data.data.expense.day_of_week);
                setday_of_month(response.data.data.expense.day_of_month);
            
                setLoading(false);

            });
    }, []);

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    }
    const GetProject = (uid) => {
        axios.get(Globalsettings.url + 'api/admin/finance/expenses/getprojectbyemp/' + companyid+'/'+userid+'/'+uid)
        .then((response) => {
            setProjectsData({ ProjectsData_Array: response.data.data.projects ? response.data.data.projects : [], });
        });
    }
    // Submit
    const SubmitExpense = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('user_id', memberid);
        data.append('description', description);
        data.append('category_id', catid);
        data.append('project_id', projectid);
        data.append('currency_id', currencyid);
        data.append('item_name', itemname);
        data.append('price', price);
        data.append('bill', selectedImage);
        data.append('rotation', rotation);
        data.append('billing_cycle', billing_cycle);
        data.append('day_of_week', day_of_week);
        data.append('day_of_month', day_of_month);
        axios.post(Globalsettings.url + 'api/admin/expenses-recurring/upadte/' + companyid+'/'+userid+'/'+props.match.params.id, data).then((response) => {
            toast.success("Expense Recurring Updated Successfully!");
            setLoading(false);
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/expences_recurring`);
            }, 3000)
        });
        evt.preventDefault();
    }       
    
    
    //Insert Expense cat
    const SubmitExpensecatform = (evt) => {
        setModalShow(false);
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/expenses/expenseCategory/store-cat/' + companyid+'/'+userid, {
            category_name: ecatname,
            company_id: companyid
        })
            .then(response => {
                toast.success("Expense Category Successfully Inserted!");
                setLoading(false);
                setecatname('');
                setCategorydata({ Categorydata_Array: response.data.data ? response.data.data : [], });
            });
        evt.preventDefault();
    }
    // Delete Expense Cat
    const  DeleteExpenseCat = (id) => {
        axios.get(Globalsettings.url + 'api/admin/expenses/expenseCategory/destroy/' + companyid+'/'+userid+'/'+ id)
            .then(response => {
                toast.success("Expense Category Delete Successfully");
                setCategorydata({ Categorydata_Array: Categorydata.Categorydata_Array.filter(item => item.id !== id) });
                setCategorydata({ Categorydata_Array: response.data.data.categories ? response.data.data.categories : [], });
            });
    }
    return (
        <>
            <ToastContainer />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <h4 className="main_title"> Expenses Recurring</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card-body">
                    <h4 className="main_title fontsize18 mb-4"> Add Expenses</h4>
                    <Form onSubmit={SubmitExpense}>
                        <div className="row">
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Item Name*</FormLabel>
                                <Form.Control className="transparent_form h-45px" type="text" required value={itemname} onChange={e => setitemname(e.target.value)} placeholder="" />
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Expense Category <NavLink onClick={() => setModalShow(true)} to="#" className="ml-2"><img width="15" className="img-fluid" src={cogiconimg} alt="" /></NavLink></FormLabel>
                                <Form.Select className="transparent_form h-45px" aria-label="Default select example" required value={catid} onChange={e => {setcatid(e.target.value); GetProject(e.target.value)}}>
                                    <option value="">Select Category</option>
                                    {Categorydata.Categorydata_Array.map((val, index) => {
                                        return (
                                            <option value={val.id} key={index}>{val.category_name}</option>
                                        )
                                    })}
                                </Form.Select>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
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
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Choose Member</FormLabel>
                                <Form.Select className="transparent_form h-45px" aria-label="Default select example" required value={memberid} onChange={e => {setmemberid(e.target.value); GetProject(e.target.value)}}>
                                    <option value="">Select Member</option>
                                    {Memberdata.Memberdata_Array.map((val, index) => {
                                        return (
                                            <option value={val.id} key={index}>{val.name}</option>
                                        )
                                    })}
                                </Form.Select>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Project</FormLabel>
                                <Form.Select className="transparent_form h-45px" aria-label="Default select example" required value={projectid} onChange={e => setprojectid(e.target.value)}>
                                    <option value="">Select Project</option>
                                    {ProjectsData.ProjectsData_Array.map((val, index) => {
                                        return (
                                            <option value={val.project.id} key={index}>{val.project.project_name}</option>
                                        )
                                    })}
                                </Form.Select>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Price*</FormLabel>
                                <Form.Control className="transparent_form h-45px" type="text" required value={price} onChange={e => setprice(e.target.value)} placeholder="" />
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
                                <FormLabel className="mb-2">Billing Frequency</FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select" required value={rotation} onChange={e => setrotation(e.target.value)}>
                                    <option value="">Select Frequency</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">quarterly</option>
                                    <option value="half-yearly">Half-Yearly</option>
                                    <option value="annually">Annually</option>
                                </Form.Control>
                            </div>
                            
                            {rotation == 'weekly' &&
                                <div className="col-xl-6 col-lg-12 mb-4">
                                    <FormLabel className="mb-2">Day Of Week</FormLabel>
                                    <Form.Control className="transparent_form h-45px" as="select" required value={day_of_week} onChange={e => setday_of_week(e.target.value)}>
                                            <option value="">Select</option>
                                            <option value="1">Sunday</option>
                                            <option value="2">Monday</option>
                                            <option value="3">Tuesday</option>
                                            <option value="4">Wednesday</option>
                                            <option value="5">Thursday</option>
                                            <option value="6">Friday</option>
                                            <option value="7">Saturday</option>
                                    </Form.Control>
                                </div>
                            }
                            {rotation != 'weekly' &&
                            <div className="col-xl-6 col-lg-12 mb-4">     
                                <FormLabel className="mb-2">Day Of Month</FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select" required value={day_of_month} onChange={e => setday_of_month(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                </Form.Control>    
                                </div>                        
                            }
                            
                            
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Billing Cycle</FormLabel>
                                <Form.Control className="transparent_form h-45px" type="text" required value={billing_cycle} onChange={e => setbilling_cycle(e.target.value)} />
                                <small>Set -1 for infinite expenses</small>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Invoice</FormLabel>
                                <Form.Group controlId="formFile" className="mb-0">
                                    <Form.Control type="file" onChange={imageChange} />
                                </Form.Group>
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <Button variant="" type="submit" className="w-100px mr-2 btn_blue"><img className="mr-2" src={checkicon_img} alt="formtable_img" /> Save</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
            {/* task categor */}
            <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Add Expense Category</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitExpensecatform}>
                <Modal.Body className="p-0 my-4">
                    <div className="table-sm-responsive">
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Category Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Categorydata.Categorydata_Array.length > 0 &&
                                Categorydata.Categorydata_Array.map((val, index) => {
                                    let number = index + 1;
                                    return (
                                        <tr>
                                            <td>{number}</td>
                                            <td>{val.category_name}</td>
                                            <td><NavLink to="#" onClick={(e) => DeleteExpenseCat(val.id)} className="border_lightredcolor_1 py-1 px-3 redcolortext fontsize14">Remove</NavLink></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>          
                        <FormLabel className="mb-2">Add Category Name</FormLabel>
                        <Form.Control className="transparent_form h-45px" type="text" required value={ecatname} onChange={e => setecatname(e.target.value)}  />
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={() => setModalShow(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                </Modal.Footer>
                </Form>
            </Modal>    
        </>
    )
}

export default EditRecurringExpences;