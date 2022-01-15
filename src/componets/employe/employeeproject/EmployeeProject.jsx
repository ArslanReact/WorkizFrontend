import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// image import
import formtable_img from "../../../assets/images/formtable_img.svg";
import avatariconimg_01 from "../../../assets/images/avatar_01.svg";
import avatariconimg_02 from "../../../assets/images/avatar_02.svg";
import avatariconimg_03 from "../../../assets/images/avatar_03.svg";
import dateFormat from 'dateformat';
// import components
import JobLoop from "../employeeproject/JobLoop";

const EmployeeProject = () => {
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 4;
    const [modalShow, setModalShow] = useState(false);
    const [dateformat, setdateformat] = useState('');
    const [Projectsdata, setprojectsdata] = useState({ projectsdata_Array: [] });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var uid = obj.id;
    var companyid = obj.company_id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/member/projects/' + companyid + '/' + uid)
            .then((response) => {
                setprojectsdata({ projectsdata_Array: response.data.data.projects ? response.data.data.projects : [], });
                setdateformat(response.data.data.global.date_format)
                setLoading(false);
            })
            .catch((error) => {
                //history.push('/signin');
            });
    }, [companyid, uid])

    const FinalTableData = useMemo(() => {
        let tabledata = Projectsdata.projectsdata_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.project_name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(tabledata.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            tabledata = tabledata.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        
        //Current Page slice
        return tabledata.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );

    }, [Projectsdata.projectsdata_Array, currentPage, search, sorting]);         
    return (
        <>
         <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="d-block d-xl-flex bg-white py-3 px-3 border-radius-10 align-items-center mb-4">
                <h4 className="main_title mb-0">Project</h4>
                    <div className="ml-auto">
                            <Search
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="row">
                    {FinalTableData.length > 0 ?
                        FinalTableData.map((val) => {
                        return (
                            <JobLoop
                                key={val.key}
                                id ={val.id}
                                top_date={dateFormat(dateformat, val.deadline)}
                                title={val.project_name}
                                title_small={val.title_small}
                                status={val.status}
                                badge_bg={
                                    (() => {
                                        if (val.status == 'in progress')
                                           return "badgelightbluebg badgelightbluecolor"
                                        if (val.status == 'on hold')
                                            return "yelowcolortext badgeyellowbg"
                                        if (val.status == 'not started')
                                            return "yelowcolortext badgeyellowbg"
                                        if (val.status == 'canceled')
                                            return "redcolortext badgeredbg"
                                        if (val.status == 'success')
                                            return "badgegreenbg badgegreencolor"
                                    })()
                                 }

                                pathcolor="0, 163, 137"
                                percentage_update={val.completion_percent}
                                text_color="#00A389"
                                tailbgcolor="#E1E3F3"

                                members={val.members}
                                bg_color={val.bg_color}
                                weekly_text={val.weekly_text}
                            />
                        )
                    })
                :
                    <div className="container-fluid mb-4">
                        <div className="bg-white py-3 px-3 border-radius-10 text-center mb-4">
                                No Project Found!
                        </div>
                    </div>
                }
                    <div className="col-xl-12 mt-4">
                            <Pagination
                                    total={totalItems}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    currentPage={currentPage}
                                    onPageChange={page => setCurrentPage(page)}
                            />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeProject;
