import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { InputGroup, Button, FormControl } from "react-bootstrap";

// 
import ProjectTemplateDataTableLoop from "../../Project-Tab/ManageJob_Page_content/ProjectTemplateDataTableLoop";

// 
import formtable_img from "../../../../../assets/images/formtable_img.svg";
import plusiconimg from "../../../../../assets/images/plusicon.svg";


const Project_Template = () => {
    const [projectsdata, setprojectsdata] = useState({ projectsdata_Array: [] });
    // get company id from session
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/project-template')
            .then((response) => {
                setprojectsdata({ projectsdata_Array: response.data.projects ? response.data.projects : [], });
            })
            .catch((error) => {
                //history.push('/signin');
            });
    }, [])
    return (
        <>
            <div className="container-fluid mb-4">
                <div className="d-xl-flex d-block align-items-center">
                    <h4 className="main_title px-0 mb-3 mb-xl-0">Project Template</h4>
                    <NavLink to={`${process.env.PUBLIC_URL}/add_new_template`} className="ml-auto btn btn_blue"><img className="img-fluid mr-2" src={plusiconimg} alt="plusicon" /> Add New Template</NavLink>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card_dashboard card card-body">
                    <div className="d-xl-flex d-block align-items-center">
                        <div className="d-flex align-items-center mb-3 mb-xl-0">
                            <label className="w-100px blackcolortext fontsize16 fontweightregular">Show</label>
                            <select className="form-control transparent_form">
                                <option>10</option>
                                <option>20</option>
                                <option>30</option>
                            </select>
                            <label className="w-100px ml-3 blackcolortext fontsize16 fontweightregular">Entries</label>
                        </div>
                        <div className="ml-auto">
                            <form className="transparent_form">
                                <InputGroup>
                                    <FormControl className="h-40px" placeholder="search" aria-describedby="basic-addon1" />
                                    <Button variant=""><img className="" src={formtable_img} alt="formtable_img" /></Button>
                                </InputGroup>
                            </form>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="table-sm-responsive data_table_profile mt-4">
                    <table className="table m-0">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Template Name</th>
                                <th scope="col">Template Members</th>
                                <th scope="col">Category</th>
                                <th scope="col">Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectsdata.projectsdata_Array.map((val, index) => {
                                let number = index + 1;
                                var category = [];
                                category.push(val.category);
                                return (
                                    <ProjectTemplateDataTableLoop
                                        key={index}
                                        countnumber={number}
                                        projectname={val.project_name}
                                        categoryname={category}
                                        members={val.members}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Project_Template;
