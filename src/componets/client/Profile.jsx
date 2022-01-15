import React, { useState, useEffect } from 'react';
import Globalsettings from "../Globalsettings";
import axios from 'axios';
import { NavLink, useHistory } from "react-router-dom";
import { Form, Row, Col, Card, FormGroup, Button, FormLabel,InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
// 
import checkicon from "../../assets/images/checkicon.svg";
import avatarprofile from "../../assets/images/avatar_dummy.svg";
import eye from "../../assets/images/eye.svg";
import hideeye from "../../assets/images/eye_half.svg";
const Profile = () => {

        const history = useHistory();
        const [isLoading, setLoading] = useState(false);
        //Profile Input
        const [profilename, setprofilename] = useState('');
        const [profileemail, setprofileemail] = useState('');
        const [profilepass, setprofilepass] = useState('');
        const [profileadrress, setprofileadrress] = useState('');
        const [emailnotification, setemailnotification] = useState('');
        const [profileimage, setprofileimage] = useState('');
        const [shippingadrress, setshippingadrress] = useState('');
        const [companyname, setcompanyname] = useState('');
        const [website, setwebsite] = useState('');
        const [mobile, setmobile] = useState('');
        const handleChangeEmailNotification = e => {
            const value = e.target.value;
            setemailnotification(value);
        };
        const [selectedProfileImage, setSelectedProfileImage] = useState('');
        const ProfileimageChange = (e) => {
            if (e.target.files && e.target.files.length > 0) {
                setSelectedProfileImage(e.target.files[0]);
            }
        }
    const onPasswordClickShow= (e) => {
        var x=document.getElementById("pass");
        var y=document.getElementById("imgpass");
        if(x.type==="password")
        {
            x.type="text";
            y.src=eye;
        }else{
            x.type="password";
            y.src=hideeye;
        }
      }
      const [selectedImage, setselectedImage] = useState('');
      const imageChange = (e) => {
          if (e.target.files && e.target.files.length > 0) {
            setselectedImage(e.target.files[0]);
          }
      }
        // Load Data
        let obj = JSON.parse(localStorage.getItem('data'));
        var companyid = obj.company_id;
        var userid = obj.id;
        useEffect(async () => {
            await axios.get(Globalsettings.url + 'api/client/profile/' + companyid+'/'+userid)
                .then((response) => {
                    setprofilename(response.data.data.userDetail.name);
                    setprofileemail(response.data.data.userDetail.email);
                    setprofilepass('');
                    setprofileadrress(response.data.data.clientDetail.address);
                    setemailnotification(response.data.data.userDetail.email_notifications);
                    setprofileimage(response.data.data.userDetail.image_url);
                    setmobile(response.data.data.userDetail.mobile);
                    setshippingadrress(response.data.data.clientDetail.shipping_address);
                    setcompanyname(response.data.data.clientDetail.company_name);
                    setwebsite(response.data.data.clientDetail.website);
                    //toast.success("Profile Updated Successfully");
                })
                .catch((error) => {
                    toast.error("Server Error");
                });
        }, [])

            // Update Profile Settings
    const SubmitProfileSettings = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('name', profilename);
        data.append('email', profileemail);
        data.append('email_notifications', emailnotification);
        data.append('password', profilepass);
        data.append('address', profileadrress);
        data.append('website', website);
        data.append('company_name', companyname);
        data.append('shipping_address', shippingadrress);
        data.append('mobile', mobile);
        data.append('image', selectedProfileImage);
        axios.post(Globalsettings.url + 'api/client/profile/'+companyid+'/'+ userid, data).then((response) => {
            toast.success("Profile Settings Successfully Updated!");
            localStorage.setItem("data", JSON.stringify(response.data.data.userDetail));
            setLoading(false);
            setTimeout(() => { 
                window.location.reload();
            }, 3000)
        });
        evt.preventDefault();
    }      
    return (
        <>
             <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <h5 className="mb-3 fontsize20 blackcolortext">Update Profile Info</h5>
            <Card className="card_dashboard">
                <Card.Body>
                    <Form onSubmit={SubmitProfileSettings}>
                        <Row>
                            <Col xl={6} lg={6} className="col-12 mb-3">
                                <FormGroup className="m-0">
                                    <FormLabel className="mb-2">Your Name</FormLabel>
                                    <Form.Control className="h-40px transparent_form" type="text" required value={profilename} onChange={e => setprofilename(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col xl={6} lg={6} className="col-12 mb-3">
                                <FormGroup className="m-0">
                                    <FormLabel className="mb-2">Your Email</FormLabel>
                                    <Form.Control className="h-40px transparent_form" type="email" required value={profileemail} onChange={e => setprofileemail(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col xl={6} lg={6} className="col-12 mb-3">
                                <FormLabel className="mb-2">Password</FormLabel>
                                <InputGroup className="mb-0">
                                    <Form.Control
                                    id="pass"
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                    value={profilepass} onChange={e => setprofilepass(e.target.value)}
                                    
                                    />
                                    <InputGroup.Text id="basic-addon1" className="transparent_bg" onClick={onPasswordClickShow}><img id="imgpass" className="img-fluid" src={hideeye} width="23" alt="" /></InputGroup.Text>
                                </InputGroup>
                                <small>Leave blank to keep your current password.</small>
                            </Col>
                            <Col xl={6} lg={6} className="col-12 mb-3">
                                <FormGroup className="m-0">
                                    <FormLabel className="mb-2">Your Mobile Number</FormLabel>
                                    <Form.Control className="h-40px transparent_form" type="phone" value={mobile} onChange={e => setmobile(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col xl={12} lg={12} className="col-12 mb-3">
                                <FormGroup className="m-0">
                                    <FormLabel className="mb-2">Your Address</FormLabel>
                                    <Form.Control as="textarea" rows={3} required value={profileadrress} onChange={e => setprofileadrress(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col xl={12} lg={12} className="col-12 mb-3">
                                <FormGroup className="m-0">
                                    <FormLabel className="mb-2">Shipping Address</FormLabel>
                                    <Form.Control as="textarea" rows={3} required value={shippingadrress} onChange={e => setshippingadrress(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col xl={6} lg={6} className="col-12 mb-3">
                                <FormGroup className="m-0">
                                    <FormLabel className="mb-2">Company Name</FormLabel>
                                    <Form.Control className="h-40px transparent_form" type="text" required value={companyname} onChange={e => setcompanyname(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col xl={6} lg={6} className="col-12 mb-3">
                                <FormGroup className="m-0">
                                    <FormLabel className="mb-2">Website</FormLabel>
                                    <Form.Control type="text" className="h-40px transparent_form"   required value={website} onChange={e => setwebsite(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col xl={6} lg={6} className="col-12 mb-3">
                                <FormGroup className="m-0">
                                    <FormLabel className="mb-2">Email Notifications</FormLabel>
                                    <div className='d-flex align-items-center'>
                                        <Form.Check type="radio" className="mr-3" label="Enable" onChange={handleChangeEmailNotification} checked={emailnotification === "1"} name="formHorizontalRadios" id="formHorizontalRadios3" />
                                        <Form.Check type="radio" label="Disable" onChange={handleChangeEmailNotification} checked={emailnotification === "0"} name="formHorizontalRadios" id="formHorizontalRadios3" />
                                    </div>

                                </FormGroup>
                            </Col>
                            <div className="col-xl-3 mb-4">
                                    <div className="p-3 border-radius-15 bodycolorbg">
                                        <div className="mb-3 p-2 bg-white text-center">
                                            {(() => {
                                                if (selectedProfileImage) {
                                                    return (
                                                        <img width="160" className="img-thumnail" src={URL.createObjectURL(selectedProfileImage)} alt="" />
                                                    )
                                                } else {
                                                    return (
                                                        <img width="160" className="img-thumnail" src={profileimage}  alt="" />
                                                    )
                                                }
                                            })()}
                                        </div>
                                        <Form.Control
                                            className="w-100px "
                                            type="file"
                                            id="inputGroupFile01"
                                            label="Upload Boundary File"
                                            custom
                                            onChange={ProfileimageChange}
                                        />
                                    </div>
                                </div>                            
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

export default Profile;
