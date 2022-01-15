import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Form, Button, FormLabel } from 'react-bootstrap';
import { Ripple } from 'react-preloaders2';
import { withRouter } from 'react-router-dom';
// 
import MemberData from "../../Hr_Tab/Deparment_Page_Content/MemberData";

const Manage_Department = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [DeptName, setDeptName] = useState('');
    const [MemberDataArray, setMemberDataArray] = useState({
        MemberData_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/employees/teams/edit/' + props.match.params.id)
            .then((response) => {
                setMemberDataArray({ MemberData_Array: response.data.deptdetaildata.member ? response.data.deptdetaildata.member : [], });
                setLoading(false);
                setDeptName(response.data.deptdetaildata.team_name);
            });
    }, [])

    const handleSubmit = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/employees/teams/update/' + props.match.params.id, {
            team_name: DeptName,
        })
            .then((response) => {
                toast.success("Department Successfully Updated!");
            })
            .catch((error) => {
            });
        evt.preventDefault();
    }
    return (
        <>

            <React.Fragment>
                <ToastContainer closeButton={false} position="top-right" />
                <Ripple customLoading={isLoading} color={'#3546ab'} />
                <div className="container-fluid mb-4">
                    <h4 className="main_title">Update Department</h4>
                </div>
                {/*  */}
                <div className="container-fluid mb-4">
                    <Form onSubmit={handleSubmit}>
                        <div className="card card_dashboard card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <FormLabel className="mb-2">Department</FormLabel>
                                    <div className="form-group d-xl-flex d-block">
                                        <Form.Control className="transparent_form h-55px mb-3 mb-xl-0" type="text" placeholder="" value={DeptName} onChange={e => setDeptName(e.target.value)} />
                                        <Button type="submit" variant="" className="w-100px btn_blue ml-3">Save</Button>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <ul className="list-unstyled mt-4">
                                        {MemberDataArray.MemberData_Array.length > 0 ?
                                        MemberDataArray.MemberData_Array.map((val,index) => {
                                            return(
                                            <MemberData
                                                key={index}
                                                avatarimg={val.user.image_url}
                                                title={val.user.name}
                                                email={val.user.email}
                                            />
                                            )
                                        })
                                        :
                                            <li className="tolightredcolorbg p-2 mb-2 border-radius-5">
                                                No Member Yet!
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </React.Fragment>
        </>
    )
}

export default withRouter(Manage_Department);
