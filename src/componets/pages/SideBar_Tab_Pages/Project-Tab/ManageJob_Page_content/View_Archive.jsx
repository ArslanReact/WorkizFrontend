import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import swal from 'sweetalert';
import dateFormat from 'dateformat';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// 
import TopBoxesArchiveLoop from "../../Project-Tab/ManageJob_Page_content/TopBoxesArchiveLoop";
import JobLoop from "../../Project-Tab/ManageJob_Page_content/JobLoop";
import top_icon_1 from "../../../../../assets/images/top_icon_1.svg";

// 
import plusiconimg from "../../../../../assets/images/plusicon.svg";
import formtable_img from "../../../../../assets/images/formtable_img.svg";
import vertical_bars from "../../../../../assets/images/vertical_bars.svg";
import archiveiconimg from "../../../../../assets/images/archive.svg";
import crossiconimg from "../../../../../assets/images/cross.svg";

const View_Archive = () => {
    const [CompanyArray, setCompanyArray] = useState({
        Company_Array: []
    });
    const [state] = useState({
        TopBoxesArray: [
            {
                key: "0",
                iconimg: top_icon_1,
                altburger: "top_icon_2",
                toptitle: "Total Archived Projects",
                classnth: "nth_1",
                topnumber: "0",
            },
        ]
    });
    let temp_state = { ...state };
    const [projectsdata, setprojectsdata] = useState({ projectsdata_Array: [] });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var uid = obj.id;
    var companyid = obj.company_id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/projects/archive/' + companyid + '/' + uid)
            .then((response) => {
                temp_state.TopBoxesArray[0].topnumber = response.data.totalProjects;
                setprojectsdata({ projectsdata_Array: response.data.projects ? response.data.projects : [], });
                setCompanyArray({ Company_Array: response.data.companydata[0] ? response.data.companydata[0] : [], });
            })
            .catch((error) => {
                //history.push('/signin');
            });
    }, [])

        // Delete Job 
        const DeleteJob = (id) => {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover the deleted job data",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.get(Globalsettings.url + 'api/admin/projects/destroy/'+companyid+'/'+ uid+'/'+id)
                            .then(response => {
                                swal("Project Delete Successfully!", {
                                    icon: "success",
                                });
                            });
                            setprojectsdata({ projectsdata_Array: projectsdata.projectsdata_Array.filter(item => item.id !== id) });
                    } else {
                    }
                });
        }
        // Delete Archive 
        const Reverse = (id) => {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover the restore data",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.get(Globalsettings.url + 'api/admin/projects/archive-restore/'+companyid+'/'+ uid+'/'+id)
                            .then(response => {
                                swal("Project Restore Successfully!", {
                                    icon: "success",
                                });
                            });
                            setprojectsdata({ projectsdata_Array: projectsdata.projectsdata_Array.filter(item => item.id !== id) });
                    } else {
                    }
                });
        }
    return (
        <>
            <div className="container-fluid mb-4">
                <div className="d-flex align-items-center">
                    <h4 className="main_title px-0">View Archive</h4>
                    <NavLink to={`${process.env.PUBLIC_URL}/manage-job`} className="ml-auto btn btn_blue"><img className="img-fluid mr-2" src={plusiconimg} alt="plusicon" /> Back to Jobs</NavLink>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid top-boxes mb-4">
                <div className="row">
                    {state.TopBoxesArray.map((val) => {
                        return (
                            <TopBoxesArchiveLoop
                                key={val.key}
                                iconimg={val.iconimg}
                                altburger={val.altburger}
                                toptitle={val.toptitle}
                                classnth={val.classnth}
                                topnumber={val.topnumber}
                            />
                        )
                    })}
                </div>
            </div>
            {/*  */}
            <div className="container-fluid top-boxes mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-block d-xl-flex align-items-center">
                        <div className="ml-auto mt-4 mt-xl-0">
                            <form className="transparent_form">
                                <InputGroup>
                                    <FormControl className="h-40px" placeholder="search" aria-describedby="basic-addon1" />
                                    <Button variant=""><img className="" src={formtable_img} alt="formtable_img" /></Button>
                                </InputGroup>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    {projectsdata.projectsdata_Array.map((val, index) => {
                        var clientarray = [];
                        clientarray.push(val.client);
                        var users = [];
                        {
                            val.members.map((val) => {
                                users.push(val.user);
                            })
                        }
                        return (
                            <div className="col-xl-6 col-lg-12 mb-4">
                            <div className="card_dashboard card card-body whitecolorbg pb-2">
                                <div className="d-flex align-items-center pb-3 dropdown for_all">
                                    <p className="fontsize14 m-0">{dateFormat(val.deadline, CompanyArray.Company_Array.date_format)}</p>
                                    <NavLink to="#" data-bs-toggle="dropdown" className="ml-auto" data-toggle="dropdown"><img className="img-fluid" src={vertical_bars} alt="" /></NavLink>
                                    <div className="dropdown-menu m-0 dropdown-menu-right">
                                        <NavLink onClick={() => Reverse(val.id)} to="#" className="dropdown-item fontsize14"><img className="img-fluid mr-2" width="12" src={archiveiconimg} alt="" /> Restore</NavLink>
                                        <NavLink onClick={() => DeleteJob(val.id)} to="#" className="dropdown-item fontsize14"><img className="img-fluid mr-2" width="12" src={crossiconimg} alt="" /> Delete</NavLink>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center pb-4">
                                    <div>
                                        <h4 className="mb-2"><NavLink to={`${process.env.PUBLIC_URL}/view_details`} className="fontsize22 mb-1 blackcolortext">{val.project_name}</NavLink></h4>
                                        {users.length > 0 ?
                                            users.map((val) => {
                                                return (
                                                    <small>{val.name} [{val.company_name}]</small>
                                                )
                                            })
                                            :
                                            <span></span>
            
                                        }
                                        <span className="d-flex justify-content-center mt-2 px-3 py-2 text-center fontsize12 fontweightmeduim border-radius-100 badgegreenbg badgegreencolor" >{val.status}</span>
                                    </div>
                                    <div className="ml-auto w-100px">
                                        <CircularProgressbar
                                            value={val.completion_percent}
                                            text={`${val.completion_percent}%`}
                                            styles={buildStyles({
                                                rotation: 0.50,
                                                strokeLinecap: 'butt',
                                                textSize: '18px',
                                                fontWeight: 'bold',
                                                pathTransitionDuration: 0.5,
                                                pathColor: `rgba(0, 163, 137, ${val.completion_percent / 10})`,
                                                textColor: '#00A389',
                                                trailColor: '#E1E3F3',
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="card-footer d-flex align-items-center py-2 px-0">
                                    <div className="d-flex align-items-center">
                                        <div className="d-inline-flex">
                                            {users.map((val) => {
                                                return (
                                                    <span className="m-minus-left-15 avatar"><img className="img-fluid" width="35" src={val.image_url} alt="" /></span>
                                                )
                                            })}
                                        </div>
                                        <NavLink to={`${process.env.PUBLIC_URL}/add_job_member`} className="ml-2 blusecolorbg border-radius-100 w-30px h-30px text-center justify-content-center d-flex"><img width="20" className="img-fluid" src={plusiconimg} alt="" /></NavLink>
                                    </div>
                                    <div className="ml-auto"><span className={"px-3 py-1 fontsize14 border-radius-100 " + val.bg_color}>{val.weekly_text}</span></div>
                                </div>
                            </div>
                        </div>                            
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default View_Archive;
