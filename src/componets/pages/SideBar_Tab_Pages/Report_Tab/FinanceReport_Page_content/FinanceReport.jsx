import React, {useState, useMemo} from 'react';
import { Bar } from 'react-chartjs-2';
import { TableHeader, Pagination, Search } from "../../../../datatable/DataTableCombo";
// 
import FinanceReportTableLoop from "../FinanceReport_Page_content/FinanceReportTableLoop";
import FinanceReportTableLoop_Array from "../FinanceReport_Page_content/FinanceReportTableLoop_Array";

// 

const FinanceReport = () => {
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;

    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Project", field: "projectname", sortable: true },
        { name: "invoices", field: "invoicename", sortable: true },
        { name: "Amount", field: "amount", sortable: true },
        { name: "Paid On", field: "paidon", sortable: true },
        { name: "Status", field: "status", sortable: true },
        { name: "Remark", field: "remark", sortable: true }
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = FinanceReportTableLoop_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.projectname.toLowerCase().includes(search.toLowerCase()) ||
                    comment.invoicename.toLowerCase().includes(search.toLowerCase()) 
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

    }, [FinanceReportTableLoop_Array, currentPage, search, sorting]);        
    return (
        <>

            {/* */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <div className="d-xl-flex d-block align-items-center">
                        <h4 className="main_title m-0"> Finance Report</h4>
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
                                return (
                                    <FinanceReportTableLoop
                                        key={val.key}
                                        countnumber={val.countnumber}
                                        projectname={val.projectname}
                                        invoicename={val.invoicename}
                                        amount={val.amount}
                                        paidon={val.paidon}
                                        badgetext={val.badgetext}
                                        badgebgcolor={val.badgebgcolor}
                                        remark={val.remark}
                                    />
                                )
                            })
                            :
                            <tr>
                                <td colSpan="7" className="text-center">No Record Found</td>
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
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <Bar
                        data={{
                            labels: ["2020"],
                            datasets: [
                                {
                                    label: 'Income',
                                    data: [46],
                                    borderColor: 'rgb(28, 166, 210)',
                                    backgroundColor: 'rgb(28, 166, 210)',
                                    fill: true
                                },
                                {
                                    label: 'Expense',
                                    data: [62],
                                    borderColor: '#3546AB',
                                    backgroundColor: '#3546AB',
                                    fill: true
                                }
                            ],
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default FinanceReport;
