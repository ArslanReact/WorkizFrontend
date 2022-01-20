import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { Form, FormLabel, Button } from "react-bootstrap";
import { NavLink,useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
const Create_Label = (props) => {
        // get company id from session
        let obj = JSON.parse(localStorage.getItem('data'));
        var companyid = obj.company_id;
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [address, setAddress] = useState('');
    const [colorbox, setcolorbox] = useState('#000000');
    function setaddress123(a) { setAddress(a); setcolorbox(a); }
    const [name, setname] = useState('');
    const [desc, setdesc] = useState('');
    const [labelid, setlabelid] = useState('');
    useEffect(() => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/tasklabel/edit/'+props.match.params.id)
            .then((response) => {
                setname(response.data.tasklabel.label_name);
                setdesc(response.data.tasklabel.description);
                setcolorbox(response.data.tasklabel.color);
                setlabelid(response.data.tasklabel.id);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.error("Something Went wrong!");
            });
    }, []); 
    const FormSubmit = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/tasklabel/update/'+labelid, {
            label_name: name,
            description: desc,
            color: colorbox,
            company_id: companyid,
        }).then((response) => {
            toast.success("Task Label Successfully Updated!");
            setLoading(false);
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/task_label`);
            }, 3000);
        })
        .catch((error) => {
            setLoading(true);
            toast.error("Something went wrong!")
        });
        evt.preventDefault();
    }  
    return (
        <>
                <ToastContainer />
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <h4 className="main_title">Update Label</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card-body">
                    <Form onSubmit={FormSubmit}>
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <Form.Label className="mb-2">Label Name*</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="text" required value={name} onChange={(e) => setname(e.target.value)} />
                        </div>
                        <div className="col-lg-6 mb-4">
                            <Form.Label className="mb-2">Description</Form.Label>
                            <Form.Control className="h-50px border_lightparagraphcolor_1 border-radius-15" type="text" required value={desc} onChange={(e) => setdesc(e.target.value)} />
                        </div>
                    </div>
                    <div className="">
                        <FormLabel className="mb-2">Color*</FormLabel>
                        <div className="d-flex align-items-center mb-2">
                            <Form.Control className="transparent_form h-40px mr-3" type="text" name="" required value={colorbox} onChange={(e) => setcolorbox(e.target.value)} />
                            <div className="ml-auto p-3 border-radius-5" value={colorbox} style={{ background: colorbox }}></div>
                        </div>
                        <small>Choose any color. Or you can choose one of the suggested colors below.</small>
                        <div className="suggest-colors my-4">
                            <NavLink onClick={() => setaddress123('#000000')} style={{ background: "#000000" }} to="#"></NavLink>
                            <NavLink onClick={() => setaddress123('#3546AB')} style={{ background: "#3546AB" }} to="#"></NavLink>
                            <NavLink onClick={() => setaddress123('#FFBB54')} style={{ background: "#FFBB54" }} to="#"></NavLink>
                            <NavLink onClick={() => setaddress123('#7590FE')} style={{ background: "#7590FE" }} to="#"></NavLink>
                            <NavLink onClick={() => setaddress123('#727ec4')} style={{ background: "#727ec4" }} to="#"></NavLink>
                            <NavLink onClick={() => setaddress123('#FC6098')} style={{ background: "#FC6098" }} to="#"></NavLink>
                            <NavLink onClick={() => setaddress123('#58D7FF')} style={{ background: "#58D7FF" }} to="#"></NavLink>
                            <NavLink onClick={() => setaddress123('#00A389')} style={{ background: "#00A389" }} to="#"></NavLink>
                        </div>
                        <Button variant="" type="submit" className="btn_blue mr-2">Update</Button>
                    </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Create_Label;
