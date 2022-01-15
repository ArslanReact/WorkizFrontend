import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { Card, Table } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
// import images
import pdficon from "../../../assets/images/pdficon.svg";

// import component
import EstimateLoop from "./EstimateLoop";

const ViewEstimate = (props) => {
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
    // EstimatesBoxLoopArray
    return (
        <>
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="mb-4 text-start"><a href={Globalsettings.url + 'api/client/estimates/download/'+companyid+'/'+userid+'/'+ props.match.params.id} className="d-inline-block btn btn_blue paragraph_blue_bg_color"><img width="20" className="img-fluid mr-2" src={pdficon} alt="icon" /> Download</a></div>
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
                                        <EstimateLoop
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
                            <p className="m-0">Discount: {currencydata.currencydata_Array.currency_symbol}{discount} </p>
                            <hr />
                            <h4 className="fontsize20"><b>Total: </b> {currencydata.currencydata_Array.currency_symbol}{TableData.TableData_Array.total}</h4>
                        </div>
                        <p className="m-0"><strong>Note</strong>: {TableData.TableData_Array.note}</p>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default ViewEstimate;
