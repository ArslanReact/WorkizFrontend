import React,{useState} from 'react';
import { Form, Row, Col, Card, FormGroup, Button, FormLabel,InputGroup } from "react-bootstrap";

// 
import checkicon from "../assets/images/checkicon.svg";
import avatarprofile from "../assets/images/avatar_dummy.svg";
import eye from "../assets/images/eye.svg";
import hideeye from "../assets/images/eye_half.svg";
const AProfile = () => {
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
    return (
        <>
            <h5 className="mb-3 fontsize20 blackcolortext">Update Profile Info</h5>
            <Card className="card_dashboard">
                <Card.Body>
                    <Form>
                        <Row>
                            <Col xl={6} lg={6} className="col-12 mb-3">
                                <FormGroup className="m-0">
                                    <FormLabel className="mb-2">Your Name</FormLabel>
                                    <Form.Control className="h-40px transparent_form" type="text" name="" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xl={6} lg={6} className="col-12 mb-3">
                                <FormGroup className="m-0">
                                    <FormLabel className="mb-2">Your Email</FormLabel>
                                    <Form.Control className="h-40px transparent_form" type="email" name="" placeholder="" />
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
                                    />
                                    <InputGroup.Text id="basic-addon1" className="transparent_bg" onClick={onPasswordClickShow}><img id="imgpass" className="img-fluid" src={hideeye} width="23" alt="" /></InputGroup.Text>
                                </InputGroup>
                                <small>Leave blank to keep your current password.</small>
                            </Col>
                            <Col xl={6} lg={6} className="col-12 mb-3">
                                <FormGroup className="m-0">
                                    <FormLabel className="mb-2">Your Mobile Number</FormLabel>
                                    <Form.Control className="h-40px transparent_form" type="phone" name="" placeholder="" />
                                </FormGroup>
                            </Col>
                            <Col xl={12} lg={12} className="col-12 mb-3">
                                <FormGroup className="m-0">
                                    <FormLabel className="mb-2">Your Address</FormLabel>
                                    <Form.Control as="textarea" rows={3} />
                                </FormGroup>
                            </Col>
                            <Col xl={6} lg={6} className="col-12 mb-3">
                                <FormGroup className="m-0">
                                    <FormLabel className="mb-2">Gender</FormLabel>
                                    <Form.Control name="" className="h-40px transparent_form" as="select">
                                        <option>Mail</option>
                                        <option>Femail</option>
                                    </Form.Control>
                                </FormGroup>
                            </Col>
                            <Col xl={6} lg={6} className="col-12 mb-3">
                                <FormGroup className="m-0">
                                    <FormLabel className="mb-2">Email Notifications</FormLabel>
                                    <div className='d-flex align-items-center'>
                                        <Form.Check type="radio" className="mr-3" label="Enable" name="formHorizontalRadios" id="formHorizontalRadios3" />
                                        <Form.Check type="radio" label="Disable" name="formHorizontalRadios" id="formHorizontalRadios3" />
                                    </div>

                                </FormGroup>
                            </Col>
                            <div className="col-xl-3 mb-4">
                                    <div className="p-3 border-radius-15 bodycolorbg">
                                        <div className="mb-3 p-2 bg-white text-center">
                                            {(() => {
                                                if (selectedImage) {
                                                    return (
                                                        <img width="160" className="img-thumnail" src={URL.createObjectURL(selectedImage)} alt="" />
                                                    )
                                                } else {
                                                    return (
                                                        <img width="160" className="img-thumnail" src="" alt="" />
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
                                            onChange={imageChange}
                                        />
                                    </div>
                                </div>                            
                            <Col xl={12} className="col-12">
                                <Button variant="" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" />  Update</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default AProfile;
