import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../Globalsettings";
import axios from 'axios';
import { Form, FormLabel, Button } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory,NavLink } from 'react-router-dom';
// 
import checkicon from "../../../../assets/images/checkicon.svg";
import refresh from "../../../../assets/images/refresh-button-blue.svg";
import $ from "jquery";
const EditCurrency = (props) => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [currency_name, setcurrency_name] = useState('');
    const [currency_symbol, setcurrency_symbol] = useState('');
    const [currency_code, setcurrency_code] = useState('');
    const [usd_price, setusd_price] = useState('');
    const [exchange_rate, setexchange_rate] = useState('');
    const [curstatus, setcurstatus] = useState('');
    const [is_cryptocurrency, setis_cryptocurrency] = useState("no");
    const [currency_position, setcurrency_position] = useState("front");
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/currency/edit/'+props.match.params.id)
            .then((response) => {
                setcurrency_name(response.data.currencydata.currency_name);
                setcurrency_symbol(response.data.currencydata.currency_symbol);
                setcurrency_position(response.data.currencydata.currency_position);
                setis_cryptocurrency(response.data.currencydata.is_cryptocurrency);
                setcurrency_code(response.data.currencydata.currency_code);
                setexchange_rate(response.data.currencydata.exchange_rate);
                setusd_price(response.data.currencydata.usd_price);
                setcurstatus(response.data.currencydata.status);
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, [])
    // Insert Lead
    const handleSubmit = (evt) => {
       setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/currency/update/'+props.match.params.id+'/'+companyid, {
            companyid: companyid,
            currency_name: currency_name,
            is_cryptocurrency: is_cryptocurrency,
            currency_symbol: currency_symbol,
            currency_position: currency_position,
            currency_code: currency_code,
            usd_price: usd_price,
            exchange_rate: exchange_rate,
            status: curstatus,
        }).then((response) => {
            setLoading(false);
            toast.success("Currency Successfully Updated!");
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/setting`);
            }, 3000)
        });
        evt.preventDefault();
    }        
    const fetchexchangerate = (currencyid) => {
        var url = Globalsettings.url + 'api/admin/currency/exchange-rate/'+currencyid;
        $.ajax({
            url: url,
            type: "GET",
            data: {currencyCode: currencyid},
            success: function (response) {
                setexchange_rate(response);
            }
        })
    }
    return (
        <>
        <ToastContainer />
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="card card_dashboard">
                    <div className="card-header pb-3">
                        <h4 className="fontsize18">Update Currency</h4>
                    </div>
                    <Form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <Form.Group className="mb-4">
                            <FormLabel className="mb-2">Currency Name</FormLabel>
                            <Form.Control className="transparent_form h-40px" name="" type="text" required value={currency_name} onChange={(e) => setcurrency_name(e.target.value)} />
                        </Form.Group>
                        <div className="mb-4">
                            <FormLabel className="mb-2">Is Cryptocurrency?</FormLabel>
                            <div className="d-flex">
                                <div className="d-flex mr-5 mb-2">
                                    <Form.Check type="radio" name="is_cryptocurrency" aria-label="radio 1" required value="yes" checked={is_cryptocurrency === "yes"} onChange={(e) => setis_cryptocurrency(e.target.value)} />
                                    <FormLabel>Yes</FormLabel>
                                </div>
                                <div className="d-flex mb-2">
                                    <Form.Check type="radio" name="is_cryptocurrency" aria-label="radio 1" required value="no" checked={is_cryptocurrency === "no"} onChange={(e) => setis_cryptocurrency(e.target.value)} />
                                    <FormLabel>No</FormLabel>
                                </div>
                            </div>
                        </div>
                        <Form.Group className="mb-4">
                            <FormLabel className="mb-2">Currency Symbol</FormLabel>
                            <Form.Control className="transparent_form h-40px" name="" type="text" required value={currency_symbol} onChange={(e) => setcurrency_symbol(e.target.value)} />
                        </Form.Group>
                        <div className="mb-4">
                            <FormLabel className="mb-2">Currency Position?</FormLabel>
                            <div className="d-flex">
                                <div className="d-flex mr-5 mb-2">
                                    <Form.Check type="radio" name="currency_position" aria-label="radio 1" required value="front" checked={currency_position === "front"} onChange={(e) => setcurrency_position(e.target.value)} />
                                    <FormLabel>Front ( Example: $1000)</FormLabel>
                                </div>
                                <div className="d-flex mb-2">
                                    <Form.Check type="radio" name="currency_position" aria-label="radio 1" required value="behind" checked={currency_position === "behind"} onChange={(e) => setcurrency_position(e.target.value)} />
                                    <FormLabel>Behind ( Example : 1000$)</FormLabel>
                                </div>
                            </div>
                        </div>
                        <Form.Group className="mb-4">
                            <FormLabel className="mb-2">Currency Code</FormLabel>
                            <Form.Control className="transparent_form h-40px" name="" id="currency_code" type="text" required value={currency_code} onChange={(e) => setcurrency_code(e.target.value)} />
                        </Form.Group>

                        {is_cryptocurrency=="no" && 
                        <Form.Group className="mb-4">
                            <FormLabel className="mb-2">Usd Price</FormLabel>
                            <Form.Control className="transparent_form h-40px" name="" type="text" required value={usd_price} onChange={(e) => setusd_price(e.target.value)} />
                        </Form.Group>}
                        {is_cryptocurrency=="yes" && 
                        <Form.Group className="mb-4">
                            <FormLabel className="mb-2">Exchange Rate</FormLabel>
                            <Form.Control className="transparent_form h-40px" name="" type="text" required value={exchange_rate} onChange={(e) => setexchange_rate(e.target.value)} />
                            <div className="mt-2">
                                <NavLink to="#" onClick={() => fetchexchangerate(currency_code)}><img src={refresh} width="15" alt="" /> Fetch latest exchange rate</NavLink>
                            </div>
                        </Form.Group>}

                        <Form.Group className="mb-4">
                                <Form.Control as="select" className="transparent_form fontsize14 h-45px" name="curstatus" value={curstatus} onChange={e => setcurstatus(e.target.value)} required>
                                    <option value="enable">Enable</option>
                                    <option value="disable">Disable</option>
                                </Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="" className="btn w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Save</Button>
                    </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default EditCurrency;
