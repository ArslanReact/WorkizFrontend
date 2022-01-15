import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";
import dateFormat from 'dateformat';
// import components
import ClientJobLoop from "../clientproject/ClientJobLoop";

const ClientProject = () => {
    const [isLoading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 4;
    const [modalShow, setModalShow] = useState(false);
    const [dateformat, setdateformat] = useState('');
    const [projectsdata, setprojectsdata] = useState({ projectsdata_Array: [] });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var uid = obj.id;
    var companyid = obj.company_id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/client/projects/' + companyid + '/' + uid)
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
        let tabledata = projectsdata.projectsdata_Array;
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

    }, [projectsdata.projectsdata_Array, currentPage, search, sorting]);     
    return (
        <>
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-block d-xl-flex bg-white py-3 px-3 border-radius-10 align-items-center mb-4">
                    <h4 className="main_title m-0">Project</h4>
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
                    {FinalTableData.map((val,index) => {
                                var clientarray = [];
                                clientarray.push(val.client);
                        return (
                            <ClientJobLoop
                                key={index}
                                projectid={val.id}
                                deadline_date={val.deadline}
                                date_format={dateFormat(dateformat, val.deadline)}
                                project_name={val.project_name}
                                clientdata={clientarray}
                                status={val.status}
                                completion_percent={val.completion_percent}

                                members={val.members}
                                bg_color={val.bg_color}
                                weekly_text={val.weekly_text}
                            />
                        )
                    })}
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

export default ClientProject;
