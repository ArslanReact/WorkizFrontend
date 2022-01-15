import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { NavLink, useHistory } from "react-router-dom";
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";
import LoadingOverlay from 'react-loading-overlay';
import { Modal, Button, Table } from "react-bootstrap";
import { Form, FormLabel } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
// import images
import formtable_img from "../../../assets/images/formtable_img.svg";
import avatar_01 from "../../../assets/images/user-1.jpg";
import cartimg from "../../../assets/images/cart.svg";
import $ from "jquery";
import swal from 'sweetalert';
// import components
import InventoryDataLoop from "./InventoryDataLoop";

const ClientInventory = () => {
    const history = useHistory();
    const [modalShowAddContact, setModalShowAddContact] = React.useState(false);
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');

    const [isLoading, setLoading] = useState(true);
    const [CartItems, setCartItems] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const[currency_symbolmain, setcurrency_symbolmain] = useState('');
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/client/products/'+ companyid+'/'+userid)
            .then((response) => {
                setTableData({ TableData_Array: response.data.data.products ? response.data.data.products : [], });
                setcurrency_symbolmain(response.data.data.currency_symbol);
                if (localStorage.getItem("cart") === null) {
                    setCartItems(0);
                }else{
                    var result = JSON.parse(localStorage.getItem("cart"));
                    setCartItems(result.length);
                }
                setLoading(false);
            })
            .catch((error) => {
                // history.push('/signin');
            });
    }, []);

    const headers = [
        { name: "Sr No", field: "pid", sortable: false },
        { name: "Product Name", field: "name", sortable: true },
        { name: "Price (Including All Taxes)", field: "price", sortable: true },
        { name: "Action", field: "action", sortable: false },
    ];
    const FinalTableData = useMemo(() => {
        let tabledata = TableData.TableData_Array;
        // Searching
        if (search) {
            tabledata = tabledata.filter(
                comment =>
                    comment.name.toLowerCase().includes(search.toLowerCase()) 
                    
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

    }, [TableData.TableData_Array, currentPage, search, sorting]);   


    const Addtocart = (pidd) => {
            let productsString = localStorage.getItem('cart')
            let products = []
            if(productsString){
                products = JSON.parse(productsString)
            } 
            products.push(pidd)
            localStorage.setItem('cart', JSON.stringify(products));
            var result = JSON.parse(localStorage.getItem("cart"));
            setCartItems(result.length);
            toast.success("Product Added To Cart");
    }
    const GotoCart = () => {
        if (localStorage.getItem("cart") == null || localStorage.getItem("cart") == '') {
            toast.error("Please at least add one item in cart before goto cart page");
        }else{
            var result = JSON.parse(localStorage.getItem("cart"));
            if(result.length > 0){
                window.location.href=`${process.env.PUBLIC_URL}/cart_detail`;
            }else{
                toast.error("Please at least add one item in cart before goto cart page");
            }
        } 
    }
    const[productname, setproductname] = useState('');
    const[productprice, setproductprice] = useState('');
    const[producttax, setproducttax] = useState('');
    const[productdesc, setproductdesc] = useState('');
    const[currency_symbol, setcurrency_symbol] = useState('');
    const ProductDetails = (pidd) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/client/products/show/'+pidd+'/'+ companyid+'/'+userid)
        .then((response) => {
            setproductname(response.data.data.product.name);
            setproductprice(response.data.data.product.price);
            setproducttax(response.data.data.product.tax);
            setproductdesc(response.data.data.product.description);
            setcurrency_symbol(response.data.data.currency_symbol);
            setLoading(false);
        })
        .catch((error) => {
            toast.error("Something Went Wrong");
        });
        setModalShowAddContact(true);
    }
    return (
        <>
        <ToastContainer />
        <div className="container-fluid mb-3">
                <div className="d-block d-xl-flex bg-white py-3 px-3 border-radius-10 align-items-center">
                    <div className="d-flex align-items-center mb-3 mb-xl-0">
                        <h4 className="main_title">Inventory</h4>
                    </div>
                    <div className="ml-auto d-flex">
                        <div className="transparent_form">
                            <Search
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                        <Form className="d-flex align-items-center">
                            <NavLink className="btn btn_blue ml-3" to="#" onClick={GotoCart}><img className="img-fluid mr-3" src={cartimg} alt="cart img" />{CartItems}</NavLink>
                        </Form>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="table-sm-responsive data_table_radius">
                <table className="table table-hover m-0">
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
                                <InventoryDataLoop
                                    key={val.key}
                                    countnumber={index+1}
                                    pid={val.id}
                                    name={val.name}
                                    avatar={val.avatar}
                                    currency_symbolmain={currency_symbolmain}
                                    price={val.price}
                                    viewtext={val.viewtext}
                                    plustext={val.plustext}
                                    viewimg={val.viewimg}
                                    plusimg={val.plusimg}
                                    Addtocart={Addtocart}
                                    ProductDetails={ProductDetails}
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

        <Modal show={modalShowAddContact} onHide={() => setModalShowAddContact(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Product Details</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td colSpan="2">{productname}</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>{currency_symbol}{productprice}</td>
                        </tr>
                        <tr>
                            <td>Taxes</td>
                            <td>{producttax}</td>
                        </tr>
                    </tbody>
                </Table>
                <strong>Description</strong>
                <p> {productdesc}</p>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setModalShowAddContact(false)}>Close</Button>
            </Modal.Footer>
        </Modal >                

        </>
    )
}

export default ClientInventory;
