import React from 'react';

// 
import CurrentPakagesTableLoop from "../Billing_Page/CurrentPakagesTableLoop";
import CurrentPakagesTableLoop_Array from "../Billing_Page/CurrentPakagesTableLoop_Array";
import AnnualPakagesTableLoop from "../Billing_Page/AnnualPakagesTableLoop";
import AnnualPakagesTableLoop_Array from "../Billing_Page/AnnualPakagesTableLoop_Array";

const Pakages = () => {
    return (
        <>
            <div className="container-fluid mb-4">
                <h4 className="main_title">Pakages</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card-body">
                    <div className="table-sm-responsive clent_data_table">
                        <table className="table m-0 table-borderedless">
                            <thead className="lightbluecolorbg">
                                <tr>
                                    <th colspan="9" className="text-white fontsize18 text-center">Your Current Plan (Default)</th>
                                </tr>
                            </thead>
                            <thead className="thead-light text">
                                <tr className="text-uppercase">
                                    <th scope="col"></th>
                                    <th className="fontsize18" scope="col">Free</th>
                                    <th className="fontsize18" scope="col">Starter</th>
                                    <th className="fontsize18" scope="col">Medium</th>
                                    <th className="fontsize18" scope="col">Larger</th>
                                    <th className="fontsize18" scope="col">Free</th>
                                    <th className="fontsize18" scope="col">Starter</th>
                                    <th className="fontsize18" scope="col">Medium</th>
                                    <th className="fontsize18" scope="col">Larger</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CurrentPakagesTableLoop_Array.map((val) => {
                                    return (
                                        <CurrentPakagesTableLoop
                                            key={val.key}
                                            tdtext={val.tdtext}
                                            fontsize={val.fontsize}
                                            dataline_1={val.dataline_1}
                                            dataline_2={val.dataline_2}
                                            dataline_3={val.dataline_3}
                                            dataline_4={val.dataline_4}
                                            dataline_5={val.dataline_5}
                                            dataline_6={val.dataline_6}
                                            dataline_7={val.dataline_7}
                                            dataline_8={val.dataline_8}
                                        />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card-body">
                    <div className="table-sm-responsive clent_data_table">
                        <table className="table m-0 table-borderedless">
                            <thead className="lightbluecolorbg">
                                <tr>
                                    <th colspan="9" className="text-white fontsize18 text-center">Annual Packages</th>
                                </tr>
                            </thead>
                            <thead className="thead-light text">
                                <tr className="text-uppercase">
                                    <th scope="col"></th>
                                    <th className="fontsize18" scope="col">Free</th>
                                    <th className="fontsize18" scope="col">Starter</th>
                                    <th className="fontsize18" scope="col">Medium</th>
                                    <th className="fontsize18" scope="col">Larger</th>
                                    <th className="fontsize18" scope="col">Free</th>
                                    <th className="fontsize18" scope="col">Starter</th>
                                    <th className="fontsize18" scope="col">Medium</th>
                                    <th className="fontsize18" scope="col">Larger</th>
                                </tr>
                            </thead>
                            <tbody>
                                {AnnualPakagesTableLoop_Array.map((val) => {
                                    return (
                                        <AnnualPakagesTableLoop
                                            key={val.key}
                                            tdtext={val.tdtext}
                                            fontsize={val.fontsize}
                                            dataline_1={val.dataline_1}
                                            dataline_2={val.dataline_2}
                                            dataline_3={val.dataline_3}
                                            dataline_4={val.dataline_4}
                                            dataline_5={val.dataline_5}
                                            dataline_6={val.dataline_6}
                                            dataline_7={val.dataline_7}
                                            dataline_8={val.dataline_8}
                                        />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pakages;
