import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../Globalsettings";
import axios from 'axios';
import { NavLink, useHistory } from "react-router-dom";
import { Form, Button, Modal, FormLabel } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
import LoadingOverlay from 'react-loading-overlay';
// 
import checkicon from "../../../../assets/images/checkicon.svg";
import cogiconimg from "../../../../assets/images/cogimg.svg";

const EditInventory = (props) => {
    const history = useHistory();
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    const [isLoading, setLoading] = useState(false);
    // Company

    // Product Category
    const [prodcatShow, setprodcatShow] = useState(false);
    const handleProdCatClose = () => setprodcatShow(false);
    const handleProdCatShow = () => setprodcatShow(true);
    const [ProdCatNameInput, setProdCatNameInput] = useState('');
    // Product Sub Category
    const [modalShowProductSubCategory, setmodalShowProductSubCategory] = useState(false);
    const handlemodalShowProductSubCategoryClose = () => setmodalShowProductSubCategory(false);
    const handlemodalShowProductSubCategoryShow = () => setmodalShowProductSubCategory(true);
    const [ProdSubCatNameInput, setProdSubCatNameInput] = useState('');
    const [ProdSubMainCatNameInput, setProdSubMainCatNameInput] = useState('');
    // Tax Model
    const [modalShowTax, setModalShowTax] = useState(false);
    const handlemodalShowTaxClose = () => setModalShowTax(false);
    const handlemodalShowTaxShow = () => setModalShowTax(true);
    const [TaxNameInput, setTaxNameInput] = useState('');
    const [TaxRateInput, setTaxRateInput] = useState('');

    // input State 
    const [prodname, setprodname] = useState('');
    const [prodprice, setprodprice] = useState('');
    const [proddescription, setproddescription] = useState('');
    const [prodpurchaseallow, setprodpurchaseallow] = useState(false);
    const [prodcat, setprodcat] = useState('');
    const [prodsubcat, setprodsubcat] = useState('');
    const [prodtax, setprodtax] = useState('');
    // Pre Load Data
    const [pcat, setpcat] = useState({
        pcat_Array: []
    });
    const [psubcat, setpsubcat] = useState({
        psubcat_Array: []
    });
    const [ptax, setptax] = useState({
        ptax_Array: []
    });
    // Load Data
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/products/edit/'+companyid+'/'+userid+'/'+props.match.params.id)
            .then((response) => {
                setpcat({ pcat_Array: response.data.data.categories ? response.data.data.categories : [], });
                setpsubcat({ psubcat_Array: response.data.data.subCategories ? response.data.data.subCategories : [], });
                setptax({ ptax_Array: response.data.data.taxes ? response.data.data.taxes : [], });
                setprodname(response.data.data.product.name);
                setprodprice(response.data.data.product.price);
                setproddescription(response.data.data.product.description);
                setprodcat(response.data.data.product.category_id);
                setprodsubcat(response.data.data.product.sub_category_id);
                setprodtax(response.data.data.product.tax);
                if(response.data.data.product.allow_purchase == 1){
                    setprodpurchaseallow(true);
                }
            })
            .catch((error) => {

            });
    }, [])
    //Insert Prod cat
    const SubmitPcatform = (evt) => {
        const updated = axios.post(Globalsettings.url + 'api/admin/productCategory', {
            category_name: ProdCatNameInput,
            company_id: companyid
        })
        .then((response) => {
            toast.success("Product Category Successfully Inserted!");
            setprodcatShow(false);
            setpcat({ pcat_Array: response.data.data ? response.data.data : [], });
            setProdCatNameInput('');
        })
        .catch((error) => {
            toast.error("went wrong");
        });
        evt.preventDefault();
    }
    //Insert Prod Sub Cat
    const SubmitProdSubCat = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/productSubCategory', {
            category: ProdSubMainCatNameInput,
            sub_category_name: ProdSubCatNameInput,
            company_id: companyid
        })
        .then((response) => {
            toast.success("Product Sub Category Successfully Inserted!");
            setmodalShowProductSubCategory(false);
            setpsubcat({ psubcat_Array: response.data.data ? response.data.data : [], });
            setProdSubMainCatNameInput('');
            setProdSubCatNameInput('');
        })
        .catch((error) => {
            toast.error("went wrong");
        });
        evt.preventDefault();
    }
    //Insert Tax
    const SubmitTaxForm = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/taxes/store', {
            tax_name: TaxNameInput,
            rate_percent: TaxRateInput,
        })
        .then((response) => {
            toast.success("Tax Successfully Inserted!");
            setModalShowTax(false);
            setptax({ ptax_Array: response.data.data ? response.data.data : [], });
            setTaxNameInput('');
            setTaxRateInput('');
        })
        .catch((error) => {
            toast.error("went wrong");
        });
        evt.preventDefault();
    }

    // Insert Inventory
    const handleSubmit = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/products/update/'+companyid+'/'+userid+'/'+props.match.params.id, {
            name: prodname,
            price: prodprice,
            tax: prodtax,
            description: proddescription,
            purchase_allow: prodpurchaseallow,
            category_id: prodcat,
            sub_category_id: prodsubcat,
        }).then((response) => {
            toast.success("Inventory Successfully Updated!");
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/inventory`);
            }, 3000)
        });
        evt.preventDefault();
    }

    // Delete Product Cat
    const DeleteProductCat = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted product category data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/productCategory/destroy/' + id)
                        .then(response => {
                            swal("Product Category Delete Successfully!", {
                                icon: "success",
                            });
                        });
                    setpcat({ pcat_Array: pcat.pcat_Array.filter(item => item.id !== id) });
                } else {
                }
            });
    }
    // Delete Product Cat
    const DeleteProductSubCat = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted product sub category data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/productSubCategory/destroy/' + id)
                        .then(response => {
                            swal("Product Sub Category Delete Successfully!", {
                                icon: "success",
                            });
                        });
                    setpsubcat({ psubcat_Array: psubcat.psubcat_Array.filter(item => item.id !== id) });
                } else {
                }
            });
    }

    const GetSubCatByMainCatId = (id) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/getsubcatofprod/'+id)
            .then(response => {
                setLoading(false);
                setpsubcat({ psubcat_Array: response.data.subCategories ? response.data.subCategories : [], });
            });
    }
    return (
        <>
            <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <h4 className="main_title mb-4">Update Inventory</h4>
                <div className="card card_dashboard card-body">
                    <Form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <Form.Group className="m-0">
                                    <Form.Label className="mb-2">Name*</Form.Label>
                                    <Form.Control type="text" required className="transparent_form h-45px" value={prodname} onChange={e => setprodname(e.target.value)} placeholder="" />
                                </Form.Group>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <Form.Group className="m-0">
                                    <Form.Label className="mb-2">Price</Form.Label>
                                    <Form.Control type="text" required className="transparent_form h-45px" value={prodprice} onChange={e => setprodprice(e.target.value)} placeholder="" />
                                    <small>Insert price without currency code.</small>
                                </Form.Group>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <Form.Group className="m-0">
                                    <Form.Label className="mb-2">Product Category <NavLink onClick={() => handleProdCatShow(true)} to="#" className=""><img width="15" className="img-fluid ml-2" src={cogiconimg} alt="" /></NavLink></Form.Label>
                                    <Form.Control required className="transparent_form h-50px" as="select" value={prodcat} onChange={e => {setprodcat(e.target.value); GetSubCatByMainCatId(e.target.value)}}>
                                        <option value="">Select Category</option>
                                        {pcat.pcat_Array.map((val) => {
                                            return (
                                                <option value={val.id}>{val.category_name}</option>
                                            )
                                        })}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <Form.Group className="m-0">
                                    <Form.Label className="mb-2">Product Sub Category <NavLink onClick={() => handlemodalShowProductSubCategoryShow(true)} to="#" className=""><img width="15" className="img-fluid ml-2" src={cogiconimg} alt="" /></NavLink></Form.Label>
                                    <Form.Control required className="transparent_form h-50px" as="select" value={prodsubcat} onChange={e => setprodsubcat(e.target.value)}>
                                        <option value="">Select Category</option>
                                        {psubcat.psubcat_Array.map((val) => {
                                            return (
                                                <option value={val.category_id}>{val.category_name}</option>
                                            )
                                        })}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <Form.Group className="m-0">
                                    <Form.Label className="mb-2">Tax <NavLink onClick={() => handlemodalShowTaxShow(true)} to="#" className=""><img width="15" className="img-fluid ml-2" src={cogiconimg} alt="" /></NavLink></Form.Label>
                                    <Form.Control required className="transparent_form h-50px" readOnly as="select" value={prodtax} onChange={e => setprodtax(e.target.value)}>
                                        <option value="">Select Category</option>
                                        {ptax.ptax_Array.map((val) => {
                                            return (
                                                <option value={val.id}>{val.tax_name}</option>
                                            )
                                        })}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <Form.Group className="m-0">
                                    <Form.Label className="mb-2">Description</Form.Label>
                                    <Form.Control required className="transparent_form" as="textarea" value={proddescription} onChange={e => setproddescription(e.target.value)} rows={5} />
                                </Form.Group>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-3">Purchase Allow</FormLabel>
                                <Form.Check className="fontsize14 fontweightregular" label="Purchase Allow" type="checkbox" checked={prodpurchaseallow} onChange={() => setprodpurchaseallow(!prodpurchaseallow)} />
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <div className="btn-group">
                                    <Button type="submit" variant="" className="w-100px btn btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Update</Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
            {/* */}
            <Modal show={prodcatShow} onHide={handleProdCatClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Product Category</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitPcatform}>
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
                                    {pcat.pcat_Array.map((val, index) => {
                                        let pcnumber = index + 1;
                                        return (
                                            <tr>
                                                <td>{pcnumber}</td>
                                                <td>{val.category_name}</td>
                                                <td><NavLink to="#" onClick={() => DeleteProductCat(val.id)} className="border_lightredcolor_1 py-1 px-3 redcolortext fontsize14">Remove</NavLink></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                            <FormLabel className="mb-2">Category Name</FormLabel>
                            <Form.Control className="transparent_form h-45px" type="text" value={ProdCatNameInput} onChange={e => setProdCatNameInput(e.target.value)} placeholder="" />

                        </div>
                    </Modal.Body>
                    <Modal.Footer className="p-0">
                        <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={handleProdCatClose}>Close</Button>
                        <Button variant="" type="submit" className="w-100px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* */}
            <Modal show={modalShowProductSubCategory} onHide={handlemodalShowProductSubCategoryClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Product Sub Category</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitProdSubCat}>
                    <Modal.Body className="p-0 my-4">
                        <div className="table-sm-responsive">
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Sub Category Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {psubcat.psubcat_Array.map((val, index) => {
                                        let pscnumber = index + 1;
                                        return (
                                            <tr>
                                                <td>{pscnumber}</td>
                                                <td>{val.category_name}</td>
                                                <td><NavLink to="#" onClick={() => DeleteProductSubCat(val.id)} className="border_lightredcolor_1 py-1 px-3 redcolortext fontsize14">Remove</NavLink></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                            <div className="form-group">
                                <FormLabel className="mb-2">Sub Category Name</FormLabel>
                                <Form.Control className="transparent_form h-45px" type="text" value={ProdSubCatNameInput} onChange={e => setProdSubCatNameInput(e.target.value)} placeholder="" />
                            </div>
                            <div className="form-group">
                                <FormLabel className="mb-2">Sub Category Name</FormLabel>
                                <Form.Control className="transparent_form h-50px" as="select" value={ProdSubMainCatNameInput} onChange={e => setProdSubMainCatNameInput(e.target.value)}>
                                    <option>Select Category</option>
                                    {pcat.pcat_Array.map((val) => {
                                        return (
                                            <option value={val.id}>{val.category_name}</option>
                                        )
                                    })}
                                </Form.Control>
                            </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer className="p-0">
                        <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={handlemodalShowProductSubCategoryClose}>Close</Button>
                        <Button variant="" type="submit" className="w-100px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* */}
            <Modal show={modalShowTax} onHide={handlemodalShowTaxClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Tax</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitTaxForm}>
                    <Modal.Body className="p-0 my-4">
                        <div className="table-sm-responsive">
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tax Name</th>
                                        <th> Rate %</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ptax.ptax_Array.map((val, index) => {
                                        let ptaxnumber = index + 1;
                                        return (
                                            <tr>
                                                <td>{ptaxnumber}</td>
                                                <td>{val.tax_name}</td>
                                                <td>{val.rate_percent}</td>
                                                <td><NavLink to="#" className="border_lightredcolor_1 py-1 px-3 redcolortext fontsize14">Remove</NavLink></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                            <div className="form-group">
                                <FormLabel className="mb-2">Tax Name</FormLabel>
                                <Form.Control className="transparent_form h-45px" value={TaxNameInput} onChange={e => setTaxNameInput(e.target.value)} type="text" placeholder="" />
                            </div>
                            <div className="form-group">
                                <FormLabel className="mb-2">Rate %</FormLabel>
                                <Form.Control className="transparent_form h-45px" value={TaxRateInput} onChange={e => setTaxRateInput(e.target.value)} type="text" placeholder="" />
                            </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer className="p-0">
                        <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={handlemodalShowTaxClose}>Close</Button>
                        <Button variant="" type="submit" className="w-100px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default EditInventory;