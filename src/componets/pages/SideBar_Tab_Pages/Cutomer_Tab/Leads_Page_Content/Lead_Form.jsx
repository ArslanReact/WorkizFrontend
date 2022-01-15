import React from 'react';
import { Button, Form, FormLabel } from 'react-bootstrap';

//
import copyframeicon from "../../../../../assets/images/copyframeicon.svg";
import checkicon from "../../../../../assets/images/checkicon.svg";

//
import LeadFormDataTable from "../../Cutomer_Tab/Leads_Page_Content/LeadFormDataTable";
import LeadFormDataTable_Array from "../../Cutomer_Tab/Leads_Page_Content/LeadFormDataTable_Array";

const Lead_Form = () => {
    return (
        <>
            <div className="container-fluid mb-4">
                <h4 className="main_title">Lead Form</h4>
            </div>
            {/*  */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-6 col-lg-12">
                        <div className="card card_dashboard card-body p-3">
                            <div className="table-sm-responsive mb-4 clent_data_table">
                                <table className="table m-0">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Field</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {LeadFormDataTable_Array.map((val) => {
                                            return (
                                                <LeadFormDataTable
                                                    key={val.key}
                                                    countnumber={val.countnumber}
                                                    fieldname={val.fieldname}
                                                    notyes={val.notyes}
                                                />
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {/*  */}
                            <h4 className="main_title">Iframe Code Snippet</h4>
                            <blockquote className="blockquote mt-3">
                                <p className="mb-0">A well-known quote, contained in a blockquote element.</p>
                                <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                            </blockquote>
                            <Button variant="" type="button" className="btn_blue"><img className="img-fluid mr-2" src={copyframeicon} alt="" /> Copy Iframe</Button>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12">
                        <div className="card card_dashboard card-body">
                            <h4 className="main_title mb-4">Preview</h4>
                            <Form>
                                <div className="form-group mb-3">
                                    <FormLabel className="mb-2">Name</FormLabel>
                                    <Form.Control type="text" className="h-45px transparent_form" name="" placeholder="" />
                                </div>
                                <div className="form-group mb-3">
                                    <FormLabel className="mb-2">Email</FormLabel>
                                    <Form.Control type="email" className="h-45px transparent_form" name="" placeholder="" />
                                </div>
                                <div className="form-group mb-3">
                                    <FormLabel className="mb-2">Company Name</FormLabel>
                                    <Form.Control type="text" className="h-45px transparent_form" name="" placeholder="" />
                                </div>
                                <div className="form-group mb-3">
                                    <FormLabel className="mb-2">Website</FormLabel>
                                    <Form.Control type="text" className="h-45px transparent_form" name="" placeholder="" />
                                </div>
                                <div className="form-group mb-3">
                                    <FormLabel className="mb-2">Address</FormLabel>
                                    <Form.Control type="text" className="h-45px transparent_form" name="" placeholder="" />
                                </div>
                                <div className="form-group mb-3">
                                    <FormLabel className="mb-2">Mobile</FormLabel>
                                    <Form.Control type="number" className="h-45px transparent_form" name="" placeholder="" />
                                </div>
                                <div className="form-group mb-3">
                                    <FormLabel className="mb-2">Message</FormLabel>
                                    <Form.Control className="transparent_form" as="textarea" rows={5} />
                                </div>
                                <Button variant="" type="button" className="btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="" /> Save</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Lead_Form;
