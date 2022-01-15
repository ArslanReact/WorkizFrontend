import React,{ useState,useEffect } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { Modal, Button, FormControl, InputGroup, Form, FormLabel } from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
// 
import ReactTimeAgo from 'react-time-ago';
import avatarimg from "../../../assets/images/avatar_01.svg";
import formtable_img from "../../../assets/images/formtable_img.svg";
import plusicon from "../../../assets/images/plusicon.svg";
import ChatListLoop from "../Chabot_Page/ChatListLoop";
import $ from "jquery";
const Chabot = () => {
    const [modalShowClientCategory, setModalShowClientCategory] = useState(false);
    const[active, setactive] = useState(false);
    const [status, setStatus] = useState(1);
    const [DpData, setDpData] = useState('');
    const [DpName, setDpName] = useState('');
    const [searchtxt,setsearchtxt] = useState('');
    const [enteredMassge, setenteredMassge] = useState('');
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;  
    var id = obj.id;  
    const [empList, setempList] = useState({
        empList_Array : []
    });
    const [adminList, setadminList] = useState({
        adminList_Array : []
    });
    const [UsersList, setUsersList] = useState({
        UsersList_Array : []
    });
    const [ChatDetails, setChatDetails] = useState({
        ChatDetails_Array : []
    });
    useEffect(() => {
        axios.get(Globalsettings.url+'api/client/user-chat/'+id+'/'+companyid)
        .then((response) =>{
            setUsersList({UsersList_Array: response.data.userList ? response.data.userList : [],});
            setChatDetails({ChatDetails_Array: response.data.chatData ? response.data.chatData : [],});
            setDpData(response.data.dpData);
            setDpName(response.data.dpName);
        })
        .catch((error) =>{
            setChatDetails({ChatDetails_Array:[]});
          //  history.push('/signin');
        });
    }, [])  
    const StartConversation = () => {
        setactive(true);
        axios.get(Globalsettings.url+'api/client/user-chat/create/'+id+'/'+companyid)
        .then((response) =>{ 
            setempList({empList_Array: response.data.data.members ? response.data.data.members : [],}); 
            setadminList({adminList_Array: response.data.data.admins ? response.data.data.admins : [],}); 
            setactive(false);
            setModalShowClientCategory(true);
            
        })
        .catch((error) =>{
          //  history.push('/signin');
        });        
        
    }
    const [message, setmessage] = useState(''); 
    const [member, setmember] = useState(''); 
    const [admin, setadmin] = useState('');
    // Send First Message
    const HandleMessageSend = (evt) => {
        var utype = '';
        if(status == 1) { utype = "employee"; }else{ utype = "admin"; }
        axios.post(Globalsettings.url + 'api/client/message-submit/'+companyid+'/'+id, { 
            companyid:companyid,
            from_user_id:id,
            user_id: member,
            message: message,
            user_type: utype,
            admin_id: admin
        }).then((response) =>{
            setUsersList({UsersList_Array: response.data.userList ? response.data.userList : [],});
            setmessage('');
            setModalShowClientCategory(false);
        });
         evt.preventDefault();   
    }    
    // Send Message
    const SendMessage = (evt) => {
        setactive(true);
        axios.post(Globalsettings.url + 'api/client/message-submit/'+companyid+'/'+id, { 
            companyid:companyid,
            from_user_id:id,
            user_id: DpData,
            message: enteredMassge,
        }).then((response) =>{
            setUsersList({UsersList_Array: response.data.userList ? response.data.userList : [],});
            var url = Globalsettings.url+'api/client/user-chat/'+id+'/'+companyid;
            setenteredMassge('');
            $.ajax({
                type: 'GET',
                url: url,
                messagePosition: '',
                data: {'userID': DpData},
                success: function (response) {
                    setChatDetails({ChatDetails_Array: response ? response : [],});
                    scrollChat();
                    setactive(false);
                }
            });
        });
         evt.preventDefault();   
    }     
    const getChatData = (iid,name,scroll="true") => {
            setDpData(iid);
            var getID = '';
            $('#errorMessage').html('');
            if (iid != "" && iid != undefined && iid != null) {
                $('.userList li a.active ').removeClass('active');
                $('#dpa_' + iid).addClass('active');
                $('#dpID').val(iid);
                getID = iid;
            } else {
                $('.userList li:first-child a').addClass('active');
                getID = $('#dpID').val();
            }

            var url = Globalsettings.url+'api/client/user-chat/'+id+'/'+companyid;

            $.ajax({
                type: 'GET',
                url: url,
                messagePosition: '',
                data: {'userID': getID},
                container: ".chats",
                success: function (response) {
                    setChatDetails({ChatDetails_Array: []});
                    setChatDetails({ChatDetails_Array: response ? response : [],});
                    scrollChat();
                }
            });
    }  
    var scroll = true;

    function scrollChat() {
        if(scroll == true) {
            $('.chat-list').stop().animate({
                scrollTop: $(".chat-list")[0].scrollHeight
            }, 800);
        }
        scroll = false;
    }
    //getting data
        // window.setInterval(function(){
        //     getChatData(DpData);
        //     /// call your function here
        // }, 10000);
    return (
        <>
        <LoadingOverlay active={active} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="row">
                    <div className="col-xl-4 col-lg-12">
                        <div className="card card-body card_dashboard h-100">
                            <Form className="transparent_form">
                                <InputGroup>
                                    <FormControl className="h-40px" placeholder="search"  onChange={e => setsearchtxt(e.target.value)} aria-describedby="basic-addon1" />
                                        <Button variant=""><img className="img-fluid" src={formtable_img} alt="" /></Button>
                                </InputGroup>
                            </Form>
                            <ul className="list-unstyled chat_nav mt-4 userList">
                                {UsersList.UsersList_Array.length > 0 ?
                                UsersList.UsersList_Array.filter(val=>{
                                    if(searchtxt == ""){
                                        return val
                                    }else if(val.name.toLowerCase().includes(searchtxt.toLowerCase())){
                                        return val
                                    }
                                }).map((val,index) => {
                                    return (
                                        <ChatListLoop
                                            key={index}
                                            avatarimg={val.image === null ? Globalsettings.url+"img/default-profile-3.png" : Globalsettings.url+"user-uploads/avatar/"+val.image }
                                            title={val.name}
                                            id={val.id}
                                            badgetext={val.rolename}
                                            badgebgcolor={
                                                                (() => {
                                                                    if (val.rolename === "admin")
                                                                    return "redcolortext badgeredbg"
                                                                    if (val.rolename === "employee")
                                                                    return "yelowcolortext badgeyellowbg"
                                                                    else
                                                                    return "greencolortext badgegreenbg"
                                                                })()
                                                        }
                                            description={val.message}
                                            timetext={val.last_message}
                                            getChatData={getChatData}
                                        />
                                    )
                                })
                                :
                                <li>No User Found!</li>
                            }
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-12">
                        <div className="card card-body card_dashboard h-100">
                            <div className="card-header p-0 pb-3 mb-3 d-xl-flex d-block align-items-center">
                                <h5 className="main_title mr-auto fontsize16 mb-3 mb-xl-0">Message</h5>
                                <Button onClick={() => StartConversation()} className="btn btn_blue" type="button" variant=""><img className="img=fluid mr-1" src={plusicon} alt="" /> Start Conversation</Button>
                            </div>
                            <div className="card-body p-0">
                                <div className="chat_box p-0">
                                    <div className="body chat_nav chat-list">
                                        {ChatDetails.ChatDetails_Array.length > 0 ? 
                                            ChatDetails.ChatDetails_Array.map((val) => {
                                                return(
                                                    <>
                                                    {val.from == id ?
                                                        <div class="outgoing d-block">
                                                            <div className="d-flex align-items-start">
                                                                <NavLink to="#" className="ml-4 avatar"><img className="img-fluid" src={val.image === null ? Globalsettings.url+"img/default-profile-3.png" : Globalsettings.url+"user-uploads/avatar/"+val.image } alt="" /></NavLink>
                                                                <div>
                                                                    <div class="bubble">
                                                                        <p>{val.message}</p>
                                                                    </div>
                                                                    <p className="m-0 paragraphcolor1text fontsize14"><ReactTimeAgo date={val.created_at} locale="en-US"/></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="incoming d-block">
                                                            <div className="d-flex align-items-start">
                                                                <NavLink to="#" className="mr-4 avatar"><img className="img-fluid" src={val.image === null ? Globalsettings.url+"img/default-profile-3.png" : Globalsettings.url+"user-uploads/avatar/"+val.image } alt="" /></NavLink>
                                                                <div>
                                                                    <div class="bubble">
                                                                        <p>{val.message}</p>
                                                                    </div>
                                                                    <p className="m-0 paragraphcolor1text fontsize14"><ReactTimeAgo date={val.created_at} locale="en-US"/></p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    }
                                                    </>
                                                )
                                            })
                                            :
                                            <div class="text-center">No Message Yet!</div>
                                        }
                                    </div>
                                    <Form onSubmit={SendMessage} className="p-0">   
                                    <div className="foot">
                                        <Form.Control type="text" className="msg p-0 mr-3 border-0" required value={enteredMassge} onChange={e => setenteredMassge(e.target.value)} placeholder="Type a message..." />
                                        <Form.Control id="dpID" value={DpData} type="hidden" />
                                        <Form.Control id="dpName" value={DpName} type="hidden" />
                                        <button type="button" type="submit" className="btn btn_blue px-3 border-radius-10 w-100px">Send</button>
                                    </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* task categor */}
            <Modal show={modalShowClientCategory} onHide={() => setModalShowClientCategory(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Start Conversation</Modal.Title>
                </Modal.Header>
                <Form onSubmit={HandleMessageSend}>
                <Modal.Body className="p-0 mt-4">
                    <div class="table-sm-responsive">
                                <>
                                <div className="mb-4 align-self-end col-4">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            
                                            <Form.Check type="radio" name="release" className="d-flex m-0 align-items-center" aria-label="radio 3" label="Employee" checked={status === 1} onClick={(e) => setStatus(1)} />
                                        </div>
                                        <div className="ml-2">
                                            <Form.Check type="radio" name="release" className="d-flex align-items-center" aria-label="radio 3" label="Admins" checked={status === 2} onClick={(e) => setStatus(2)} />
                                        </div>
                                    </div>
                                </div>
                                </>
                                {status === 1 &&
                                    <div className="form-group mb-4">
                                        <Form.Control className="transparent_form h-45px" as="select" required value={member} onChange={e => setmember(e.target.value)}>
                                            <option value="">Select Member</option>
                                            {empList.empList_Array.map((val)=>{
                                                return(
                                                    <option value={val.id}>{val.name}</option>
                                                )  
                                            })}
                                        </Form.Control>
                                    </div>
                                }
                                {status === 2 &&
                                    <div className="form-group mb-4">
                                        <Form.Control className="transparent_form h-45px" as="select" required value={admin} onChange={e => setadmin(e.target.value)}>
                                            <option value="">Select Admin</option>
                                            {adminList.adminList_Array.map((val)=>{
                                                return(
                                                    <option value={val.id}>{val.name}</option>
                                                )  
                                            })}
                                        </Form.Control>
                                    </div>
                                }   
                            <div className="form-group">
                                <FormLabel className="mb-2">Message </FormLabel>
                                <Form.Control className="transparent_form" as="textarea" rows={4} required value={message} onChange={e => setmessage(e.target.value)} />
                            </div>
                        
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setModalShowClientCategory(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                </Modal.Footer>
                </Form>
            </Modal>            
        </>
    );
}

export default Chabot;