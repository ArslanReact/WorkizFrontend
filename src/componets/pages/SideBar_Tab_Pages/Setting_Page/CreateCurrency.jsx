import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../Globalsettings";
import axios from 'axios';
import { Form, FormLabel, Button } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
// 
import checkicon from "../../../../assets/images/checkicon.svg";

const CreateCurrency = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [currency_name, setcurrency_name] = useState('');
    const [currency_symbol, setcurrency_symbol] = useState('');
    const [currency_code, setcurrency_code] = useState('');
    const [usd_price, setusd_price] = useState('');
    const [is_cryptocurrency, setis_cryptocurrency] = useState("no");
    const [currency_position, setcurrency_position] = useState("front");
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    // Insert Lead
    const handleSubmit = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/currency/store', {
            companyid: companyid,
            currency_name: currency_name,
            is_cryptocurrency: is_cryptocurrency,
            currency_symbol: currency_symbol,
            currency_position: currency_position,
            currency_code: currency_code,
            usd_price: usd_price,
        }).then((response) => {
            setLoading(false);
            toast.success("New Currency Successfully Inserted!");
            history.push(`${process.env.PUBLIC_URL}/setting`);
        });
        evt.preventDefault();
    }        
    return (
        <>
        <ToastContainer />
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="card card_dashboard">
                    <div className="card-header pb-3">
                        <h4 className="fontsize18">Add New Currency</h4>
                    </div>
                    <Form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <Form.Group className="mb-4">
                            <FormLabel className="mb-2">Currency Name</FormLabel>
                            <Form.Control className="transparent_form h-40px" name="" type="text" required value={currency_name} onChange={(e) => setcurrency_name(e.target.value)} />
                        </Form.Group>
                        <div className="mb-4">
                            <FormLabel className="mb-2">Is Cryptocurrency?</FormLabel>
                            <div className="d-flex align-items-center">
                                <div className="mr-2">
                                    <Form.Check type="radio" name="is_cryptocurrency" aria-label="radio 1" label=" Yes" required value="yes" checked={is_cryptocurrency === "yes"} onChange={(e) => setis_cryptocurrency(e.target.value)} />
                                    
                                </div>
                                <div className="">
                                    <Form.Check type="radio" name="is_cryptocurrency" aria-label="radio 1" label=" No" required value="no" checked={is_cryptocurrency === "no"} onChange={(e) => setis_cryptocurrency(e.target.value)} />
                                    
                                </div>
                            </div>
                        </div>
                        <Form.Group className="mb-4">
                            <FormLabel className="mb-2">Currency Symbol</FormLabel>
                            <Form.Control className="transparent_form h-40px" name="" type="text" required value={currency_symbol} onChange={(e) => setcurrency_symbol(e.target.value)} />
                        </Form.Group>
                        <div className="mb-4">
                            <FormLabel className="mb-2">Currency Position?</FormLabel>
                            <div className="d-flex align-items-center">
                                <div className="mr-2">
                                    <Form.Check type="radio" name="currency_position" aria-label="radio 1" label=" Front ( Example: $1000)" required value="front" checked={currency_position === "front"} onChange={(e) => setcurrency_position(e.target.value)} />
                                </div>
                                <div>
                                    <Form.Check type="radio" name="currency_position" aria-label="radio 1" label=" Behind ( Example : 1000$)" required value="behind" checked={currency_position === "behind"} onChange={(e) => setcurrency_position(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <Form.Group className="mb-4">
                            <FormLabel className="mb-2">Currency Code</FormLabel>
                            <Form.Control className="transparent_form h-40px" name="" type="text" required value={currency_code} onChange={(e) => setcurrency_code(e.target.value)} />
                        </Form.Group>

                        {is_cryptocurrency=="yes" && 
                        <Form.Group className="mb-4">
                            <FormLabel className="mb-2">Usd Price</FormLabel>
                            <Form.Control className="transparent_form h-40px" name="" type="text" required value={usd_price} onChange={(e) => setusd_price(e.target.value)} />
                        </Form.Group>}
                        <Button type="submit" variant="" className="btn w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Save</Button>
                    </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default CreateCurrency;
