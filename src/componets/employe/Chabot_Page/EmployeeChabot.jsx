import React from 'react';
import { NavLink } from "react-router-dom";
import { Modal, Button, FormControl, InputGroup, Form, FormLabel } from "react-bootstrap";

// 
import plusicon from "../../../assets/images/plusicon.svg";
import avatarimg from "../../../assets/images/avatar_01.svg";
import face from "../../../assets/images/face.svg";
import filechoose from "../../../assets/images/filechoose.svg";
import formtable_img from "../../../assets/images/formtable_img.svg";
import avatarimg1 from "../../../assets/images/avatar_02.svg";
import clockicon from "../../../assets/images/watchicon.svg";
// 
import ChatListLoop from "../../employe/Chabot_Page/ChatListLoop";

const Chabot = () => {
    const [modalShowClientCategory, setModalShowClientCategory] = React.useState(false);
    // ChatListLoop_Array
    const ChatListLoop_Array = [
        {
            key: "0",
            avatarimg: avatarimg,
            title: "Timothy Sims",
            badgetext: "Employee",
            badgebgcolor: "yelowcolortext badgeyellowbg",
            description: "Okk. I got it i will do it other some time and let you know",
            timetext: "Today | 05:30 PM",
            clockicon: clockicon,
        },
        {
            key: "1",
            avatarimg: avatarimg1,
            title: "Jennifer Markus",
            badgetext: "Client",
            badgebgcolor: "greencolortext badgegreenbg",
            description: "Okk. I got it i will do it other some time and let you know",
            timetext: "Today | 05:30 PM",
            clockicon: clockicon,
        },
        {
            key: "2",
            avatarimg: avatarimg,
            title: "Timothy Sims",
            badgetext: "Employee",
            badgebgcolor: "yelowcolortext badgeyellowbg",
            description: "Okk. I got it i will do it other some time and let you know",
            timetext: "Today | 05:30 PM",
            clockicon: clockicon,
        },
    ]
    return (
        <>
            <div className="container-fluid mb-4">
                <div className="row">
                    <div className="col-xl-4 col-lg-12">
                        <div className="card card-body px-2">
                            <Form className="transparent_form">
                                <InputGroup>
                                    <FormControl className="h-40px" placeholder="search" aria-describedby="basic-addon1" />
                                    <Button variant=""><img className="img-fluid" src={formtable_img} alt="" /></Button>
                                </InputGroup>
                            </Form>
                            <ul className="list-unstyled chat_nav h-100 mt-4">
                                {ChatListLoop_Array.map((val) => {
                                    return (
                                        <ChatListLoop
                                            key={val.key}
                                            avatarimg={val.avatarimg}
                                            title={val.title}
                                            badgetext={val.badgetext}
                                            badgebgcolor={val.badgebgcolor}
                                            description={val.description}
                                            timetext={val.timetext}
                                            clockicon={val.clockicon}
                                        />
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-12">
                        <div className="card">
                            <div className="card-header d-flex align-items-center">
                                <h5 className="main_title mr-auto fontsize16">Message</h5>
                                <Button onClick={() => setModalShowClientCategory(true)} className="btn btn_blue" type="button" variant=""><img className="img=fluid mr-1" src={plusicon} alt="" /> Start Conversation</Button>
                            </div>
                            <div className="card-body">
                                <div className="chat_box">
                                    <div className="body">
                                        <div className="incoming">
                                            <div className="d-flex align-items-start">
                                                <NavLink to="#" className="mr-4"><img className="img-fluid" src={avatarimg} alt="" /></NavLink>
                                                <div>
                                                    <div class="bubble">
                                                        <p>Hey, Father's Day is coming up..</p>
                                                    </div>
                                                    <p className="m-0 paragraphcolor1text fontsize14">04:30 PM</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="outgoing">
                                            <div className="d-flex align-items-start">
                                                <NavLink to="#" className="ml-4"><img className="img-fluid" src={avatarimg} alt="" /></NavLink>
                                                <div>
                                                    <div class="bubble">
                                                        <p>Well you should get your Dad a cologne. Here smell it. Oh wait! ...</p>
                                                    </div>
                                                    <p className="m-0 paragraphcolor1text fontsize14">04:30 PM</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="typing">
                                            <div className="bubble">
                                                <div className="ellipsis dot_1"></div>
                                                <div className="ellipsis dot_2"></div>
                                                <div className="ellipsis dot_3"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="foot">
                                        <button type="file" className="btn pl-0"><img className="img-fluid" src={filechoose} alt="" /></button>
                                        <FormControl type="text" className="msg p-0 mr-3" placeholder="Type a message..." />
                                        <button type="button" className="btn ml-3"><img className="img-fluid" src={face} alt="" /></button>
                                        <button type="submit" className="btn btn_blue px-3 border-radius-10 w-100px">Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModalClientCategory
                show={modalShowClientCategory}
                onHide={() => setModalShowClientCategory(false)}
            />
        </>
    );
}

export default Chabot;

// Client Category modal
function MyVerticallyCenteredModalClientCategory(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Start Conversation</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 mt-4">
                <div class="table-sm-responsive">
                    <Form>
                        <div className="form-group">
                            <FormLabel className="mb-2">Choose Member </FormLabel>
                            <Form.Control className="transparent_form h-45px" as="select">
                                <option>Adell Franck</option>
                            </Form.Control>
                        </div>
                        <div className="form-group">
                            <FormLabel className="mb-2">Message </FormLabel>
                            <Form.Control className="transparent_form" as="textarea" rows={4} />
                        </div>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue">Save</Button>
            </Modal.Footer>
        </Modal>
    );
}