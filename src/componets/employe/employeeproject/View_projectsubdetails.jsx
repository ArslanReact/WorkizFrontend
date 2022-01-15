import React,{useState,useEffect,useMemo} from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import { Form, Button, Accordion, FormLabel, Modal, FormControl, InputGroup,Nav } from "react-bootstrap";
// 
import dateFormat from 'dateformat';
import DiscussionDataLoop_Array from "../../pages/SideBar_Tab_Pages/Project-Tab/ManageJob_Page_content/DiscussionDataLoop_Array";
import chaticon from "../../../assets/images/chaticon.svg";
const View_Sub_Detail = (props) => {
    const [isLoading, setLoading] = useState(true);
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var uid = obj.id;
    var companyid = obj.company_id;
    const [discussionReplies, setdiscussionReplies] = useState({
        discussionReplies_Array: []
    });
    const [discussion, setdiscussion] = useState({
        discussion_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/member/projects/discussion-replies/'+props.match.params.id+'/'+props.match.params.idd+'/'+ companyid + '/' + uid)
            .then((response) => {
                setdiscussionReplies({ discussionReplies_Array: response.data.data.discussionReplies ? response.data.data.discussionReplies : [], });
                setdiscussion({ discussion_Array: response.data.data.discussion ? response.data.data.discussion : [], });
                setLoading(false);
            })
            .catch((error) => {
                //history.push('/signin');
            });
    }, [companyid, uid]);
    const [modalShowReply, setmodalShowReply] = React.useState(false);
    const [replydiscussion, setreplydiscussion] = useState('');
    const ShowReply = () =>{
        setmodalShowReply(true);
    }  
    const replysubmit = (evt) =>{
        setmodalShowReply(false);
        setLoading(true);
        axios.post(Globalsettings.url + 'api/member/projects/discussion-reply/store/'+ companyid + '/' + uid,{
            discussion_id: props.match.params.idd,
            description: replydiscussion,
            userid : uid
        })
            .then((response) => {
                toast.success("Reply Added Successfully")
                setdiscussionReplies({ discussionReplies_Array: response.data.data.discussionReplies ? response.data.data.discussionReplies : [], });
                setdiscussion({ discussion_Array: response.data.data.discussion ? response.data.data.discussion : [], });
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
               toast.error("went wrong!");
            });
            evt.preventDefault();
    }  

    return (
        <>
        <ToastContainer/>
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-flex align-items-center">
                    <h4 className="main_title">{discussion.discussion_Array.title} Discussion </h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to={`${process.env.PUBLIC_URL}/view_projectdetails/`+props.match.params.id} className="btn w-100px btn_blue mr-3"> Back</NavLink>
                        <NavLink to="#" onClick={ShowReply} className="btn w-100px btn_blue lightbluecolorbg"> Reply</NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid">
                <div className="card card_dashboard car-body">
                    <div className="table-sm-responsive clent_data_table">
                        <table className="table m-0 table-borderless">
                            <tbody>
                                {discussionReplies.discussionReplies_Array.map((val) => {
                                    return (
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <p className="m-0 mr-3"><img className="img-fluid avatar" src={val.user.image_url} alt="" /></p>
                                                    <div className="">
                                                    <p className="m-0 paragraphcolor1text fontsize14"><NavLink to="#" className="text_decoration_none badge blusecolortext mr-2 badgebluebg">{val.user.name}</NavLink> {dateFormat(val.last_reply_at,'dd-mm-yyyy hh:mm')}</p>
                                                        <p className="mb-1">{val.body}</p>
                                                        
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*  */}
            {/* Reply Modal */}
            <Modal show={modalShowReply} onHide={() => setmodalShowReply(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">New Discussion</Modal.Title>
                </Modal.Header>
                <Form onSubmit={replysubmit}>
                <Modal.Body className="p-0 my-4">
                        <div className="form-group m-0">
                            <FormLabel className="mb-2">Description</FormLabel>
                            <Form.Control
                                as="textarea"
                                placeholder=""
                                style={{ height: '200px' }} required value={replydiscussion} onChange={(e)=> setreplydiscussion(e.target.value)}
                            />
                        </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setmodalShowReply(false)}>Close</Button>
                    <Button variant="" type="submit" className="w-100px btn_blue">Send</Button>
                </Modal.Footer>
                </Form>
            </Modal> 
        </>
    )
}

export default View_Sub_Detail;
