import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../Globalsettings";
import axios from 'axios';
import { Form, Row, Col, Card, FormGroup, Button, FormLabel,InputGroup } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { NavLink, useHistory } from "react-router-dom";
// 
import checkicon from "../../../../assets/images/checkicon.svg";
const EditFaqs = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const[title, settitle] = useState('');
    const[description, setdescription] = useState('');
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var uid = obj.id;
    var companyid = obj.company_id;
    useEffect(() => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/adminfaqs/edit/' + companyid + '/' + uid)
            .then((response) => {
                settitle(response.data.data.faqs.title);
                setdescription(response.data.data.faqs.description);
                setLoading(false);
            })
            .catch((error) => {
                toast.error('somthing went wrong');
            });
    }, []);
    const faqssubmit = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('title', title);
        data.append('description', description);
        data.append('company_id', companyid);
        axios.post(Globalsettings.url + 'api/admin/adminfaqs/update', data).then((response) => {
            toast.success("Faqs Successfully Updated!");
            setLoading(false);
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/faq_admin`);
            }, 3000)
        });
        evt.preventDefault();
    }
    return (
        <>
            <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <h5 className="mb-3 fontsize20 blackcolortext">Update Admin Faqs</h5>
            <Card className="card_dashboard">
                <Card.Body>
                    <Form onSubmit={faqssubmit}>
                        <Row>
                            <Col xl={12} lg={12} className="col-12 mb-3">
                                <FormGroup className="m-0">
                                    <FormLabel className="mb-2">Faq Title</FormLabel>
                                    <Form.Control className="h-40px transparent_form" type="text" value={title} onChange={(e) => settitle(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col xl={12} lg={12} className="col-12 mb-3">
                                <FormGroup className="m-0">
                                    <FormLabel className="mb-2">Details Description</FormLabel>
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
                                </FormGroup>
                            </Col>                           
                            <Col xl={12} className="col-12">
                                <Button variant="" type="submit" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" />  Update</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default EditFaqs;
