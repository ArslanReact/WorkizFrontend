import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../../Globalsettings";
import axios from 'axios';
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
// 
import FaqAdminLoop from "../faqa_dmin/FaqAdminLoop";

import fileimage from "../../../../assets/images/fileicon.svg";

const FaqAdmin = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var uid = obj.id;
    var companyid = obj.company_id;
    const [faqdata, setfaqdata] = useState({ faqdata_Array: [] });
    useEffect(() => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/admin/getadminfaqs/' + companyid + '/' + uid)
            .then((response) => {
                setfaqdata({ faqdata_Array: response.data.data.faqs ? response.data.data.faqs : [], });
                setLoading(false);
            })
            .catch((error) => {
                toast.error('somthing went wrong');
            });
    }, []);
    return (
        <>
            <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className='d-lg-flex align-items-center mb-4'>
                    <h5 className="fontsize22 blackcolortext">Admin FAQ</h5>
                    <div className="btn-group ml-auto dropdown for_all mt-3 mt-lg-0">
                        <NavLink to={`${process.env.PUBLIC_URL}/edit_faqs`} className="btn btn_blue w-100px mr-3">Edit</NavLink>
                    </div>
                </div>
                <div className="card card_dashboard">
                    <div className="card-body">
                        <div className="row">
                            {faqdata.faqdata_Array.length > 0 ?
                            faqdata.faqdata_Array.map((val,index) => {
                                return (
                                    <FaqAdminLoop
                                        key={index}
                                        title={val.title}
                                        description={val.description}
                                        file={val.file}
                                    />
                                )
                            })
                            :
                            <p>No Faqs Uploaded Yet</p>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FaqAdmin;
