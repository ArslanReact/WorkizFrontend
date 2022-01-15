import React, { useState, useEffect, useMemo } from 'react';
import Globalsettings from "../../../Globalsettings";
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { NavLink } from 'react-router-dom';
import { TableHeader, Pagination, Search } from "../../../datatable/DataTableCombo";
// 
import InventoryTableData from "../Inventory_Page/InventoryTableData";
import { exportTableToCSV } from '../../../datatable/Exportcsv'; 
import swal from 'sweetalert';
// 
import csv_file from "../../../../assets/images/csv_file.svg";
import excel_file from "../../../../assets/images/excel_file.svg";
import exporticon from "../../../../assets/images/icon_16.svg";
import plusicon from "../../../../assets/images/plusicon.svg";

const Inventory = () => {
        // get company id from session
        let obj = JSON.parse(localStorage.getItem('data'));
        var companyid = obj.company_id;
    const [isLoading, setLoading] = useState(true);
    const [totalProducts, settotalProducts] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;

    const [InventoryTableDataArray, setInventoryTableDataArray] = useState({
        InventoryTableData_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/products/'+companyid)
            .then((response) => {
                setInventoryTableDataArray({ InventoryTableData_Array: response.data.products ? response.data.products : [], });
                settotalProducts(response.data.totalProduct);
                setLoading(false);
            })
            .catch((error) => {
            });
    }, [])

    const headers = [
        { name: "#", field: "id", sortable: true },
        { name: "Name", field: "name", sortable: true },
        { name: "Price (Includes All Taxes)", field: "price", sortable: true },
        { name: "Purchase Allow", field: "allow_purchase", sortable: false },
        { name: "Action", field: "action", sortable: false }
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = InventoryTableDataArray.InventoryTableData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.price.toLowerCase().includes(search.toLowerCase()) ||
                    comment.allow_purchase.toLowerCase().includes(search.toLowerCase())
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

    }, [InventoryTableDataArray.InventoryTableData_Array, currentPage, search, sorting]);  
    // Delete Product 
    const DeleteProduct = (id) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover the deleted product data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.get(Globalsettings.url + 'api/admin/products/destroy/' + id)
                        .then(response => {
                            swal("Product Delete Successfully!", {
                                icon: "success",
                            });
                        });
                        setInventoryTableDataArray({ InventoryTableData_Array: InventoryTableDataArray.InventoryTableData_Array.filter(item => item.id !== id) });
                } else {
                }
            });
    }  
    return (
        <>
            <React.Fragment>
                <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
                <div className="container-fluid mb-4">
                    <div className="d-xl-flex d-block align-items-center">
                        <h4 className="main_title d-flex mb-3 mb-xl-0">Inventory <p className="ml-2 mr-1 fontsize16 fontweightbold blusecolortext">{totalProducts}</p> <p className="m-0 paragraphcolor1text">Total Products</p></h4>
                        <div className="btn-group ml-auto dropdown for_all">
                            <NavLink to={`${process.env.PUBLIC_URL}/add_new_inventory`} className="btn btn_blue mr-3"><img className="img-fluid" src={plusicon} alt="" /> Add New Inventory</NavLink>
                            <NavLink to="#" data-bs-toggle="dropdown" className="btn lightbluecolorbg whitecolortext fontsize14" data-toggle="dropdown"><img className="img-fluid" src={exporticon} alt="" /> Export </NavLink>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <NavLink onClick={() => exportTableToCSV('inventory.csv')} to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={excel_file} alt="" />Excel</NavLink>
                                <NavLink onClick={() => exportTableToCSV('inventory.csv')} to="#" className="dropdown-item"><img className="img-fluid mr-2" width="15" src={csv_file} alt="" />CSV</NavLink>
                            </ul>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="container-fluid mb-4">
                    <div className="card card_dashboard card-body">
                        <div className="d-flex align-items-center">
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
                    <div className="table-sm-responsive data_table_profile mt-4">
                        <table className="table m-0 table-hover">
                                <TableHeader
                                    headers={headers}
                                    onSorting={(field, order) =>
                                        setSorting({ field, order })
                                    }
                                />
                            <tbody>
                            {FinalTableData.length > 0 ?  
                                FinalTableData.map((val, index) => {
                                    let productno = index + 1;
                                    return (
                                        <InventoryTableData
                                            key={index}
                                            pid={val.id}
                                            countnumber={productno}
                                            name={val.name}
                                            price={val.price}
                                            allow={val.allow_purchase === '1' ? 'Allowed' : 'Not Allowed'}
                                            statusbadgecolor={val.allow_purchase === '1' ? "badgegreenbg greencolortext" : "badgeredbg redcolortext"}
                                            DeleteProduct={DeleteProduct}
                                        />
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="5" className="text-center">No Record Found</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            </React.Fragment>
        </>
    );
}

export default Inventory;
