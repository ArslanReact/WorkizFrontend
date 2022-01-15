import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Form, Button, FormLabel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const Manage_Designation = (props) => {
    const [DesigName, setDesigName] = useState('');
    const [MemberDataArray, setMemberDataArray] = useState({
        MemberData_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/designations/edit/' + props.match.params.id)
            .then((response) => {
                setDesigName(response.data.designation.name);
                setMemberDataArray({ MemberData_Array: response.data.designation.members ? response.data.designation.members : [], });
            });
    }, [])

    const handleSubmit = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/designations/update/' + props.match.params.id, {
            designation_name: DesigName,
        })
            .then((response) => {
                toast.success("Designation Successfully Updated!");
            })
            .catch((error) => {
            });
        evt.preventDefault();
    }
    return (
        <>
            <ToastContainer closeButton={true} position="top-right" />
            <div className="container-fluid mb-4">
                <h4 className="main_title">Update Designation</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <Form onSubmit={handleSubmit}>
                    <div className="card card_dashboard card-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <FormLabel className="mb-2">Designation Name</FormLabel>
                                <div className="form-group d-xl-flex d-block">
                                    <Form.Control className="transparent_form h-45px mb-3 mb-xl-0" type="text" required value={DesigName} onChange={e => setDesigName(e.target.value)} />
                                    <Button variant="" type="submit" className="ml-3 w-100px btn_blue">Save</Button>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                    <ul className="list-unstyled mt-4">
                                        {MemberDataArray.MemberData_Array.length > 0 ?
                                        MemberDataArray.MemberData_Array.map((val,index) => {
                                            return(
                                            <li className="tolightredcolorbg p-2 mb-2 border-radius-5" key={index}>
                                                <NavLink to="#" className="d-flex align-items-center">
                                                    <div className="avatar mr-3"><img className="img-fluid" src={val.user.image_url} alt="" /></div>
                                                    <div className="">
                                                        <h4 className="fontsize18 blackcolortext">{val.user.name}</h4>
                                                        <p className="paragraphcolor1text">{val.user.email}</p>
                                                    </div>
                                                </NavLink>
                                            </li>
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
        </>
    )
}

export default Manage_Designation;
