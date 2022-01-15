import React, { useState, useEffect,useMemo } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { TableHeader, Pagination, Search } from "../../datatable/DataTableCombo";
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import { Form, FormControl, Button, Table, FormLabel, FormGroup } from "react-bootstrap";
import dateFormat from 'dateformat';
// import components
import CartDataLoop from "../clientinventory/CartDataLoop";
import $ from "jquery";
// images import
import avatar01 from "../../../assets/images/user-1.jpg";
import cheeckicon from "../../../assets/images/checkicon.svg";

const CartDetail = () => {
    const CartDataLoopArray = [
        {
            key: "0",
            avatarimg: avatar01,
            title: "Sold Lapel Neck Blouse",
            description: "Facere Sunt Tempora Ut Eos Voluptatibus Consectetur ",
            unitprice: "650",
            tax: "NA",
            amount: "650",
        },
        {
            key: "1",
            avatarimg: avatar01,
            title: "Sold Lapel Neck Blouse",
            description: "Facere Sunt Tempora Ut Eos Voluptatibus Consectetur ",
            unitprice: "650",
            tax: "NA",
            amount: "650",
        },
    ]
    const refff = React.createRef();
    const [isLoading, setLoading] = useState(true);
    const [invno, setinvno] = useState('');
    const [invnosimple, setinvnosimple] = useState('');
    const [Purchasedate, setPurchasedate] = useState('');
    const [Currency, setCurrency] = useState('');

    const [ProductsData, setProductsData] = useState({
        ProductsData_Array: []
    });
    const [taxes, settaxes] = useState({
        taxes_Array: []
    });
    const [quantityArray, setquantityArray] = useState({
        quantityArray_Array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    
    useEffect(() => {
        axios.post(Globalsettings.url + 'api/client/products/create/'+ companyid+'/'+userid,{
            productcart :  JSON.parse(localStorage.getItem("cart"))
        })
            .then((response) => {
                settaxes({ taxes_Array: response.data.data.taxes ? response.data.data.taxes : [], });
                setinvno(response.data.data.invoiceSetting.invoice_prefix+'#'+response.data.data.zero+'-'+response.data.data.lastInvoice);
                setinvnosimple(response.data.data.lastInvoice);
                setPurchasedate(dateFormat(Date().toLocaleString(), response.data.data.global.date_format))
                setCurrency(response.data.data.cur_data.currency_symbol+' ('+response.data.data.cur_data.currency_code+')');
                setProductsData({ ProductsData_Array: response.data.data.products ? response.data.data.products : [], });
                setquantityArray({ quantityArray_Array: response.data.data.quantityArray ? response.data.data.quantityArray : [], });
                setLoading(false);
            })
    }, []);   

    // Script
    // $('#save-form').click(function(e){

    // });

    $('#storePayments').on('click','.remove-item', function () {
        setLoading(true);
        var id = $(this).data('item-id');
        let productsString = localStorage.getItem('cart')
        let products = []
        if(productsString){
            products = JSON.parse(productsString)
        } 

        const index = products.indexOf(id);
        if (index > -1) {
            products.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(products));
        axios.post(Globalsettings.url + 'api/client/products/create/'+ companyid+'/'+userid,{
            productcart :  JSON.parse(localStorage.getItem("cart"))
        })
            .then((response) => {
                setProductsData({ ProductsData_Array: response.data.data.products ? response.data.data.products : [], });
                setquantityArray({ quantityArray_Array: response.data.data.quantityArray ? response.data.data.quantityArray : [], });
                calculateTotal();
                setLoading(false);
            })
    });

    $('#storePayments').on('keyup change','.quantity,.cost_per_item,.item_name', function () {
        var quantity = $(this).closest('.item-row').find('.quantity').val();

        var perItemCost = $(this).closest('.item-row').find('.cost_per_item').val();

        var amount = (quantity*perItemCost);

        $(this).closest('.item-row').find('.amount').val(amount);
        $(this).closest('.item-row').find('.amount-html').html(decimalupto2(amount));

        calculateTotal();


    });

    $('#storePayments').on('change','.type, #discount_type', function () {
        var quantity = $(this).closest('.item-row').find('.quantity').val();

        var perItemCost = $(this).closest('.item-row').find('.cost_per_item').val();

        var amount = (quantity*perItemCost);

        $(this).closest('.item-row').find('.amount').val(amount);
        $(this).closest('.item-row').find('.amount-html').html(decimalupto2(amount));

        calculateTotal();


    });
    function calculateTotal()
    {
//            calculate subtotal
        var subtotal = 0;
        var discount = 0;
        var tax = '';
        var taxList = new Object();
        var taxTotal = 0;
        $(".quantity").each(function (index, element) {
            var itemTax = [];
            var itemTaxName = [];
            $(this).closest('.item-row').find('input.type').each(function (index) {
                itemTax[index] = $(this).data('rate');
                itemTaxName[index] = $(this).data('tax-name');
            });
            var itemTaxId = $(this).closest('.item-row').find('input.type').val();

            var amount = parseFloat($(this).closest('.item-row').find('.amount').val());

            if(isNaN(amount)){ amount = 0; }

            subtotal = parseFloat(subtotal)+parseFloat(amount);

            if(itemTaxId != ''){
                for(var i = 0; i<=itemTaxName.length; i++)
                {
                    if(typeof (taxList[itemTaxName[i]]) === 'undefined'){
                        taxList[itemTaxName[i]] = ((parseFloat(itemTax[i])/100)*parseFloat(amount));
                    }
                    else{
                        taxList[itemTaxName[i]] = parseFloat(taxList[itemTaxName[i]]) + ((parseFloat(itemTax[i])/100)*parseFloat(amount));
                    }
                }
            }
        });

        $.each( taxList, function( key, value ) {
            if(!isNaN(value)){

                tax = tax+'<div class="col-md-offset-8 col-md-2 col-xs-6 text-right p-t-10">'
                    +key
                    +'</div>'
                    +'<p class="form-control-static col-xs-6 col-md-2" >'
                    +'<span class="tax-percent">'+decimalupto2(value)+'</span>'
                    +'</p>';

                taxTotal = taxTotal+value;
            }

        });

        if(isNaN(subtotal)){  subtotal = 0; }

        $('.sub-total').html(decimalupto2(subtotal));
        $('.sub-total-field').val(subtotal);


        //show tax
        $('#invoice-taxes').html(tax);
        //calculate total
        var totalAfterDiscount = decimalupto2(subtotal);

        totalAfterDiscount = (totalAfterDiscount < 0) ? 0 : totalAfterDiscount;

        var total = decimalupto2(totalAfterDiscount+taxTotal);

        $('.total').html(total);
        $('.total-field').val(total);

    }

    function recurringPayment() {
        var recurring = $('#recurring_payment').val();

        if(recurring == 'yes')
        {
            $('.recurringPayment').show().fadeIn(300);
        } else {
            $('.recurringPayment').hide().fadeOut(300);
        }
    }

    function decimalupto2(num) {
        var amt =  Math.round(num * 100,2) / 100;
        return parseFloat(amt.toFixed(2));
    }   
    const[State , setState] = useState({});
    const handleInputChange = (e) => {
        setState({
            [e.target.name]: e.target.value
        });
    }
    const submitform = (e) => {
        e.preventDefault();
        setLoading(true);
        calculateTotal();

        var discount = $('.discount-amount').html();
        var total = $('.total-field').val();
        if(parseFloat(discount) > parseFloat(total)){
            toast.error("Discount cannot be more than total amount.");
            return false;
        }
        

        const data = new FormData();
        data.append('data', $('#storePayments').serialize());

        axios.post(Globalsettings.url + 'api/client/products/store/'+ companyid+'/'+userid, data).then((response) => {
            toast.success("Order Successfully Placed!");
            localStorage.removeItem("cart");
            window.location.href=`${process.env.PUBLIC_URL}/client_inventory`;
            setLoading(false);
            
        });
    }
    return (
        <>
        <ToastContainer />
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <h4 className="main_title">Product Purchase</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body overflow-hidden">
                    <Form id="storePayments" onSubmit={submitform}>
                        <div className="row p-4">
                            <div className="col-xl-4 col-lg-12 mb-3 mb-xl-0">
                                <FormLabel className="mb-2">Invoice #</FormLabel>
                                <FormControl type="text" className="h-50px border_lightparagraphcolor_1 border-radius-15" value={invno} readOnly />
                                <FormControl type="hidden"  name="invoice_number" value={invnosimple} readOnly />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-3 mb-xl-0">
                                <FormLabel className="mb-2">Purchase Date</FormLabel>
                                <FormControl type="text" readOnly className="h-50px border_lightparagraphcolor_1 border-radius-15" value={Purchasedate} />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-3 mb-xl-0">
                                <FormLabel className="mb-2">Currency</FormLabel>
                                <FormControl type="text" readOnly className="h-50px border_lightparagraphcolor_1 border-radius-15" value={Currency} />
                            </div>
                        </div>
                        {/*  */}
                        <div className="row p-4 m-2">
                            <div class="row col-xs-12 item-row p-2"  style={{background:"#e9ecef"}}>
                                <div class="col-md-3 font-bold" >
                                    Item
                                </div>

                                <div class="col-md-2 font-bold" >
                                Qty/Hrs
                                </div>

                                <div class="col-md-2 font-bold">
                                Unit Price
                                </div>

                                <div class="col-md-2 font-bold">
                                Tax
                                </div>

                                <div class="col-md-2 font-bold">
                                Amount 
                                </div>

                                <div class="col-md-1">
                                    Action
                                </div>

                            </div>
                            {ProductsData.ProductsData_Array.length > 0 ?
                                ProductsData.ProductsData_Array.map((val, i) => {
                                    if(ProductsData.ProductsData_Array.length -1 == i){
                                        calculateTotal();
                                    }
                                    var flag = 0;
                                    var taxesarray = [];
                                    taxesarray.push(val.taxes);
                                    $("#quantity"+val.id).val(quantityArray.quantityArray_Array[val.id]);
                                    return (
                                        <div class="row col-xs-12 item-row margin-top-5" id={"itemRow"+val.id}>
                                        <div class="col-md-3 p-3" >
                                            <div class="form-group">
                                               
                                                <div class="input-group">
                                                    <input type="hidden" class="form-control item_name" name="item_name[]"
                                                           value={val.name} />

                                                </div>
                                                <span class="font-semi-bold">{val.name}</span>
                                            </div>
                                            <div class="form-group">
                                                <input type="hidden" name="item_summary[]" class="form-control" placeholder="@lang('app.description')" value={val.description}/>
                                                <span class="text-muted">{val.description}</span>
                                            </div>
                                        </div>

                                        <div class="col-md-2 p-3">
                                            <div class="form-group">
                                                
                                                <input type="number" min="1" ref={refff} class="form-control quantity" id={"quantity"+val.id}  data-item-id={val.id}   name="quantity[]" />
                                            </div>
                                        </div>

                                        <div class="col-md-2 p-3">
                                            <div class="form-group">
                                                
                                                <input type="hidden"  class="form-control cost_per_item" id={"cost_per_item"+val.id} name="cost_per_item[]" data-item-id={val.id} value={val.price}/>
                                                {val.price}
                                            </div>
                                        </div>

                                        <div class="col-md-2 p-3">

                                            <div class="form-group">
                                               
                                                {taxes.taxes_Array.map((vall) => {
                                                return (
                                                    <>
                                                    {(() => {                                                       
                                                        if (val.taxes != "null"  && taxesarray.indexOf(vall.id) !== false) {
                                                            return (
                                                                <>
                                                                 <input type="hidden" name="" id="" class="type" data-rate={vall.rate_percent} data-tax-name={vall.tax_name+":"+vall.rate_percent+"%"} value={vall.id}/>
                                                                    <span class="clearfix">{ vall.tax_name }: { vall.rate_percent }%</span>
                                                                </>
                                                                )
                                                        }
                                                        else 
                                                        return(
                                                            'N/A'
                                                        )
                                                    })()}
                                                    </>
                                                );
                                                })}
                                            </div>
                                        </div>

                                        <div class="col-md-2 border-dark p-3">
                                            <p class="form-control-static"><span class="amount-html" data-item-id={val.id}>{quantityArray.quantityArray_Array[val.id] * val.price}</span></p>
                                            <input type="hidden" class="amount" value={quantityArray.quantityArray_Array[val.id] * val.price} name="amount[]" data-item-id={val.id}/>
                                        </div>

                                        <div class="col-md-1 text-right visible-md visible-lg p-3">
                                            <button type="button"  data-item-id={val.id}   class="btn remove-item btn-circle btn-danger">Remove</button>
                                        </div>
                                    </div>
                                    )
                                })
                            :
                                <div class="row col-md-12 border-dark p-3" style={{background:"#e9ecef"}}>
                                    <p className="text-center m-0">
                                        Please Add Atlest One Item In Cart For Proceed.
                                        </p>
                                </div>
                            }

                                <div class="row col-xs-12 ">
                                    <div class="row p-3">
                                        <div class="col-md-offset-9 col-xs-6 col-md-1 text-right p-t-10" >Sub Total</div>

                                        <p class="form-control-static col-xs-6 col-md-2" >
                                            <span class="sub-total fontweightbold"></span>
                                        </p>


                                        <input type="hidden" class="sub-total-field" name="sub_total" value=""/>
                                    </div>

                                    <div class="row p-3 m-t-5" id="invoice-taxes">
                                        <div class="col-md-offset-9 col-md-1 text-right p-t-10">
                                           Taxes
                                        </div>

                                        <p class="form-control-static col-xs-6 col-md-2" >
                                            <span class="tax-percent fontweightbold"></span>
                                        </p>
                                    </div>

                                    <div class="row p-3 m-t-5 font-bold">
                                        <div class="col-md-offset-9 col-md-1 col-xs-6 text-right p-t-10" >Total</div>

                                        <p class="form-control-static col-xs-6 col-md-2" >
                                            <span class="total fontweightbold"></span>
                                        </p>


                                        <input type="hidden" class="total-field" name="total" value="0"/>
                                        <input type="hidden" class="" name="client_product_invoice" value="1"/>
                                    </div>

                                </div>
                        </div>
                        {/*  */}
                        <FormGroup>
                            <FormLabel className="mb-2">Note</FormLabel>
                            <Form.Control as="textarea" rows={3} />
                        </FormGroup>
                        <div className="text-start"><Button variant="" type="submit" id="save-form" className="blue_bg_color white_text_color mt-3"><img className="img-fluid" src={cheeckicon} alt="tick" /> Save</Button></div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default CartDetail;
