import React,{ useState,useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { InputGroup, Button, FormLabel, Form, FormControl,Table } from "react-bootstrap"
import LoadingOverlay from 'react-loading-overlay';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import $ from "jquery";
import Toggle from 'react-toggle';

// 
import checkicon_img from "../../../../../assets/images/checkicon.svg";

const AddInvoice = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [shippingaddress, setshippingaddress] = useState(false);
    const [zero, setzero] = useState('');
    const [invoicenumber, setinvoicenumber] = useState('');
    const [client, setclient] = useState('');
    const [projectid, setprojectid] = useState('');
    const [validtill, setvalidtill] = useState('');
    const [currency, setcurrency] = useState('');
    const [product, setproduct] = useState('');
    const [rotation, setrotation] = useState('');
    const [day_of_week, setday_of_week] = useState('');
    const [day_of_month, setday_of_month] = useState('');
    const [clientlist, setclientlist] = useState({
        clientlist_Array : []
    });
    const [curencylist, setcurencylist] = useState({
        curencylist_Array : []
    });
    const [projectslist, setprojectslist] = useState({
        projectslist_Array : []
    });
    const [productlist, setproductlist] = useState({
        productlist_Array : []
    });
    const [invoiceSetting, setinvoiceSetting] = useState({
        invoiceSetting_array : []
    });
    const [taxeslist, settaxeslist] = useState({
        taxeslist_array : []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;   
    var userid = obj.id;   
    useEffect(async () => {
        await axios.get(Globalsettings.url+'api/admin/finance/invoices/create/'+companyid+'/'+userid)
        .then((response) =>{
            setinvoiceSetting({invoiceSetting_array: response.data.data.invoiceSetting ? response.data.data.invoiceSetting : [],}); 
            setclientlist({clientlist_Array: response.data.data.clients ? response.data.data.clients : [],}); 
            setcurencylist({curencylist_Array: response.data.data.currencies ? response.data.data.currencies : [],}); 
            setproductlist({productlist_Array: response.data.data.products ? response.data.data.products : [],}); 
            setprojectslist({projectslist_Array: response.data.data.projects ? response.data.data.projects : [],}); 
            settaxeslist({taxeslist_array: response.data.data.taxes ? response.data.data.taxes : [],}); 
            setzero(response.data.data.zero);
            setinvoicenumber(response.data.data.lastInvoice);
        })
        .catch((error) =>{
        });
    }, []);

    const handleSubmit = (evt) => {
        calculateTotal();

        var discount = $('.discount-amount').html();
        var total = $('.total-field').val();

        if(parseFloat(discount) > parseFloat(total)){
            toast.error("Discount Not More than Total");
            return false;
        }
        var type = 'save';
        var data = $('#storePayments').serialize()+ "&type=" + type;
        setLoading(true);
        axios.post(Globalsettings.url+'api/admin/finance/invoice-recurring/store/'+companyid+'/'+userid, data).then((response) => {
            toast.success("Recuring Invoice Successfully Inserted!");
            setLoading(false);
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/recurring_invoice`);
            }, 3000)
        });
        evt.preventDefault();
    }








    // $(document).ready(function(){
    //     var products = json_encode(productlist.productlist_Array)
    //       var  selectedID = '';
    //     $("#selectProduct").select2({
    //         data: products,
    //         placeholder: "Select a Product",
    //         allowClear: true,
    //         escapeMarkup: function(markup) {
    //             return markup;
    //         },
    //         templateResult: function(data) {
    //             var htmlData = '<b>'+data.title+'</b> <a href="javascript:;" class="btn btn-success btn btn-outline btn-xs waves-effect pull-right">Add <i class="fa fa-plus" aria-hidden="true"></i></a>';
    //             return htmlData;
    //         },
    //         templateSelection: function(data) {
    //             $('#select2-selectProduct-container').html('@lang('app.add') @lang('app.menu.products')');
    //             $("#selectProduct").val('');
    //             selectedID = data.id;
    //             return '';
    //         },
    //     }).on('change', function (e) {
    //         if(selectedID){
    //             addProduct(selectedID);
    //             $('#select2-selectProduct-container').html('@lang('app.add') @lang('app.menu.products')');
    //         }
    //         selectedID = '';
    //     }).on('select2:open', function (event) {
    //         $('span.select2-container--open').attr('id', 'product-box');
    //     });

    // });


    const getCompanyName = () => {
        var projectID = $('#project_id').val();
        var url = Globalsettings.url+'api/admin/finance/all-invoices/get-client-company/'+companyid;
        if(projectID != '' && projectID !== undefined )
        {
            url = Globalsettings.url+'api/admin/finance/all-invoices/get-client-company/'+companyid+'/'+projectID;
        }

        axios.get(url).then((response) => {
            if(projectID != '')
            {
                $('#companyClientName').text('Company Name');
            } else {
                $('#companyClientName').text('Client Name');
            }
            if(projectID != '' && projectID !== undefined ){
                $('#client_company_div').html(response.data.html);
            }else{

            }
            
            if ($('#show_shipping_address').prop('checked') === true) {
                checkShippingAddress();
            }
        });

    }

    function checkShippingAddress() {
        var projectId = $('#project_id').val();
        var clientId = $('#client_company_id').length > 0 ? $('#client_company_id').val() : $('#client_id').val();
        var showShipping = $('#show_shipping_address').prop('checked') === true ? 'yes' : 'no';

        var url = Globalsettings.url+'api/admin/finance/all-invoices/check-shipping-address/'+companyid+'/'+userid+'?showShipping='+showShipping;
        if (clientId !== '') {
            url += `&clientId=${clientId}`;
        }

        axios.get(url).then((response) => {
            if (response.data.switch === 'off') {
                setshippingaddress(!shippingaddress);
            }
            else {
                if (response.data.show !== undefined) {
                    $('#shippingAddress').html('');
                } else {
                    $('#shippingAddress').html(response.data.view);
                }
            }
        });
    }



    const AddItems = () => {
        var i = $(document).find('.item_name').length;
        var item = '<div class="col-xs-12 item-row margin-top-5">'
        +'<div class="row">'
        +'<div class="col-md-4">'
        +'<input type="text" class="h-50px transparent_form form-control item_name" name="item_name[]" placeholder="" />'
        +'</div>'
        +'<div class="col-md-1">'
        +'<input type="text" class="h-50px transparent_form form-control quantity" name="quantity[]" value="1" />'
        +'</div>'
    
        +'<div class="col-md-2">'
        +'<input type="text" class="h-50px transparent_form form-control cost_per_item" name="cost_per_item[]" />'
        +'</div>'
    
        +'<div class="col-md-2">'
        +' <select class="h-50px transparent_form form-control type" id="multiselect'+i+'" name="taxes['+i+'][]" multiple>'
        +taxeslist.taxeslist_array.map((val,index) => {
            return(
                '<option data-rate='+val.rate_percent+' value='+val.id+' key='+index+'>'+val.tax_name+': '+val.rate_percent+'%</option>'
            )
        })
        +'       </select>'
        +' </div>'
    
        +'<div class="col-md-2 border-dark  text-center">'
        +'<p class="form-control-static"><span class="amount-html">0.00</span></p>'
        +'<input type="hidden" class="amount" name="amount[]"></input>'
        +'</div>'
    
        +'<div class="col-md-1 text-right visible-md visible-lg">'
        +'<button type="button" class="btn remove-item btn-circle btn-danger">Remove</button>'
        +'</div>'
        +'<div class="col-12 mt-3 mb-3">'
        +'        <textarea class="transparent_form form-control" placeholder="Enter Note Here..." name="item_summary[]" rows=5 ></textarea>'
        +'</div>'
        +'</div>'
        +'</div>';

        $(item).hide().appendTo("#sortable").fadeIn(500);        
    }

    $('#storePayments').on('click','.remove-item', function () {
        $(this).closest('.item-row').fadeOut(300, function() {
            $(this).remove();
            $('.item-row').each(function(index){
                $(this).find('.selectpicker').attr('name', 'taxes['+index+'][]');
                $(this).find('.selectpicker').attr('id', 'multiselect'+index);
            });
            calculateTotal();
        });
    });

    $('#storePayments').on('keyup change','.quantity,.cost_per_item,.item_name, .discount_value', function () {
        var quantity = $(this).closest('.item-row').find('.quantity').val();

        var perItemCost = $(this).closest('.item-row').find('.cost_per_item').val();

        var amount = (quantity*perItemCost);

        $(this).closest('.item-row').find('.amount').val(decimalupto2(amount).toFixed(2));
        $(this).closest('.item-row').find('.amount-html').html(decimalupto2(amount).toFixed(2));

        calculateTotal();


    });
    $('#storePayments').on('change','.type, #discount_type', function () {
        var quantity = $(this).closest('.item-row').find('.quantity').val();

        var perItemCost = $(this).closest('.item-row').find('.cost_per_item').val();

        var amount = (quantity*perItemCost);

        $(this).closest('.item-row').find('.amount').val(decimalupto2(amount).toFixed(2));
        $(this).closest('.item-row').find('.amount-html').html(decimalupto2(amount).toFixed(2));

        calculateTotal();


    });

    function calculateTotal()
    {
        var subtotal = 0;
        var discount = 0;
        var tax = '';
        var taxList = new Object();
        var taxTotal = 0;
        var discountType = $('#discount_type').val();
        var discountValue = $('.discount_value').val();

        $(".quantity").each(function (index, element) {
            var itemTax = [];
            var itemTaxName = [];
            var discountedAmount = 0;

            $(this).closest('.item-row').find('select.type option:selected').each(function (index) {
                itemTax[index] = $(this).data('rate');
                itemTaxName[index] = $(this).text();
            });
            var itemTaxId = $(this).closest('.item-row').find('select.type').val();

            var amount = parseFloat($(this).closest('.item-row').find('.amount').val());
            if(discountType == 'percent' && discountValue != ''){
                discountedAmount = parseFloat(amount - ((parseFloat(amount)/100)*parseFloat(discountValue)));
            }
            else{
                discountedAmount = parseFloat(amount - (parseFloat(discountValue)));
            }

            if(isNaN(amount)){ amount = 0; }

            subtotal = (parseFloat(subtotal)+parseFloat(amount)).toFixed(2);

            if(itemTaxId != ''){
                for(var i = 0; i<=itemTaxName.length; i++)
                {
                    if(typeof (taxList[itemTaxName[i]]) === 'undefined'){
                        if (discountedAmount > 0) {
                            taxList[itemTaxName[i]] = ((parseFloat(itemTax[i])/100)*parseFloat(discountedAmount));
                        } else {
                            taxList[itemTaxName[i]] = ((parseFloat(itemTax[i])/100)*parseFloat(amount));
                        }
                    }
                    else{
                        if (discountedAmount > 0) {
                            taxList[itemTaxName[i]] = parseFloat(taxList[itemTaxName[i]]) + ((parseFloat(itemTax[i])/100)*parseFloat(discountedAmount));
                            console.log(taxList[itemTaxName[i]]);

                        } else {
                            taxList[itemTaxName[i]] = parseFloat(taxList[itemTaxName[i]]) + ((parseFloat(itemTax[i])/100)*parseFloat(amount));
                        }
                    }
                }
            }
        });


        $.each( taxList, function( key, value ) {
            if(!isNaN(value)){
                tax = tax+'<div class="col-md-offset-8 col-md-2 text-right p-t-10">'
                    +key
                    +'</div>'
                    +'<p class="form-control-static col-xs-6 col-md-2" >'
                    +'<span class="tax-percent">'+(decimalupto2(value)).toFixed(2)+'</span>'
                    +'</p>';
                taxTotal = taxTotal+decimalupto2(value);
            }
        });

        if(isNaN(subtotal)){  subtotal = 0; }

        $('.sub-total').html(decimalupto2(subtotal).toFixed(2));
        $('.sub-total-field').val(decimalupto2(subtotal));



        if(discountValue != ''){
            if(discountType == 'percent'){
                discount = ((parseFloat(subtotal)/100)*parseFloat(discountValue));
            }
            else{
                discount = parseFloat(discountValue);
            }

        }

        $('#invoice-taxes').html(tax);

        var totalAfterDiscount = decimalupto2(subtotal-discount);

        totalAfterDiscount = (totalAfterDiscount < 0) ? 0 : totalAfterDiscount;

        var total = decimalupto2(totalAfterDiscount+taxTotal);

        $('.total').html(total.toFixed(2));
        $('.total-field').val(total.toFixed(2));

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
        var amt =  Math.round(num * 100) / 100;
        return parseFloat(amt.toFixed(2));
    }

    
    return (
        <>
            <div className="container-fluid mb-4">
                <h4 className="main_title fontsize18">Add Invoice</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <Form onSubmit={handleSubmit} id="storePayments">
                    <div className="card card_dashboard card-body">
                        <div className="row">
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Project</FormLabel>
                                <Form.Control className="transparent_form h-50px" as="select" required value={projectid} onChange={e => { setprojectid(e.target.value); getCompanyName(); } } id="project_id" name="project_id">
                                    <option value="">Select Project</option>
                                    {projectslist.projectslist_Array.map((val,index) => {
                                        return (
                                            <option value={val.id} key={index}>{val.project_name}</option>  
                                        )
                                    })}  
                                </Form.Control>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2" id="companyClientName">Company Name</FormLabel>
                                <div id="client_company_div">
                                    <Form.Control as="select" name="client_id" className="h-50px transparent_form" required value={client} onChange={e => setclient(e.target.value)}>
                                        <option value="">Select Client</option>
                                        {clientlist.clientlist_Array.map((val,index) => {
                                            return (
                                                <option value={val.id} key={index}>{val.name}</option>  
                                            )
                                        })}  
                                    </Form.Control>
                                </div>

                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Invoice Date</FormLabel>
                                <Form.Control type="date" name="issue_date" required className="transparent_form h-50px" placeholder="" />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Due Date</FormLabel>
                                <Form.Control type="date" className="transparent_form h-50px" name="due_date" required placeholder="" />
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Currency</FormLabel>
                                <Form.Control as="select" name="currency_id" className="h-50px transparent_form" required value={currency} onChange={e => setcurrency(e.target.value)}>
                                    <option value="">Select Currency</option>
                                    {curencylist.curencylist_Array.map((val,index) => {
                                        return (
                                            <option value={val.id} key={index}>{val.currency_symbol + '(' +val.currency_code+ ')'}</option>  
                                        )
                                    })} 
                                </Form.Control>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Show Shipping Address</FormLabel>
                                <p>
                                <Toggle
                                id="show_shipping_address"
                                    checked={shippingaddress}
                                    name='burritoIsReady'
                                    onChange={(e) => {
                                        setshippingaddress(!shippingaddress);
                                        if (shippingaddress) {
                                            $('#shippingAddress').html(''); 

                                            
                                        } else {
                                            checkShippingAddress();
                                        }
                                        
                                    }}
                                /></p>
                            </div>
                            <div className="col-xl-8 col-lg-12 mb-4" id="shippingAddress">
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Billing Frequency</FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select" name="rotation" required value={rotation} onChange={e => setrotation(e.target.value)}>
                                    <option value="">Select Frequency</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">quarterly</option>
                                    <option value="half-yearly">Half-Yearly</option>
                                    <option value="annually">Annually</option>
                                </Form.Control>
                            </div>
                            {rotation == 'weekly' &&
                                <div className="col-xl-6 col-lg-12 mb-4">
                                    <FormLabel className="mb-2">Day Of Week</FormLabel>
                                    <Form.Control className="transparent_form h-45px" as="select" name="day_of_week" required value={day_of_week} onChange={e => setday_of_week(e.target.value)}>
                                            <option value="">Select</option>
                                            <option value="1">Sunday</option>
                                            <option value="2">Monday</option>
                                            <option value="3">Tuesday</option>
                                            <option value="4">Wednesday</option>
                                            <option value="5">Thursday</option>
                                            <option value="6">Friday</option>
                                            <option value="7">Saturday</option>
                                    </Form.Control>
                                </div>
                            }
                            {rotation != 'weekly' &&
                            <div className="col-xl-6 col-lg-12 mb-4">     
                                <FormLabel className="mb-2">Day Of Month</FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select" name="day_of_month" required value={day_of_month} onChange={e => setday_of_month(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                </Form.Control>    
                                </div>                        
                            }                            
                            <div className="row">
                            <div className="col-xl-12 col-lg-12">
                                <div className="row">
                                    <div className="col-md-4 font-bold py-3 lightseablue_bg_color mb-2" >Item</div>
                                    <div className="col-md-1 font-bold py-3 lightseablue_bg_color mb-2">Qty/Hrs</div>
                                    <div className="col-md-2 font-bold py-3 lightseablue_bg_color mb-2">Unit Price</div>
                                    <div className="col-md-2 font-bold py-3 lightseablue_bg_color mb-2">Tax</div>
                                    <div className="col-md-2 font-bold py-3 lightseablue_bg_color mb-2"> Amount</div>
                                    <div className="col-md-1 py-3 lightseablue_bg_color mb-2">&nbsp;</div>
                                </div>
                            </div>
<div id="sortable">
<div className="col-xs-12 item-row margin-top-5">
    <div className="row">
    <div className="col-md-4">
            <input type="text" className="h-50px transparent_form form-control item_name" required name="item_name[]" placeholder="" />
    </div>
    <div className="col-md-1">
        <input type="text" className="h-50px transparent_form form-control quantity" required name="quantity[]" />
    </div>

    <div className="col-md-2">
        <input type="number" className="h-50px transparent_form form-control cost_per_item" required name="cost_per_item[]" placeholder="" />
    </div>

    <div className="col-md-2">
            <select className="h-50px transparent_form form-control type" name="taxes[0][]" multiple>
                {taxeslist.taxeslist_array.map((val,index) => {
                    return(
                        <option data-rate={val.rate_percent} value={val.id } key={index}>{val.tax_name}: {val.rate_percent}%</option>
                    )
                })}
            </select>
    </div>

    <div className="col-md-3 border-dark  text-center">
        <p class="form-control-static"><span class="amount-html">0.00</span></p>
        <input type="hidden" class="amount" name="amount[]"></input>
    </div>

    <div className="col-12 mt-3 mb-3">
            <textarea  name="item_summary[]" placeholder="Enter Note Here..."  className="transparent_form form-control" rows="5" ></textarea>
    </div>
    </div>
</div>
</div>

<div id="item-list">

</div>

<div className="col-xs-12 m-t-5">
<Button variant="" type="button" className="btn btn_blue w-100px h-40px" onClick={() => AddItems()}>Add Items</Button>
</div>
<Table borderedles className="mb-4">
    <tbody>
        <tr>
            <td><p className="">Sub Total</p></td>
            <td><strong><span className="sub-total">0.00</span> <input type="hidden" className="sub-total-field" name="sub_total" value="0"/></strong></td>
        </tr>
        <tr>
            <td><p className="">Tax</p></td>
            <td id="invoice-taxes"><strong><span className="tax-percent">0.00</span></strong></td>
        </tr>
        <tr>
            <td><p className="">Total</p></td>
            <td><strong><span className="total">0.00</span></strong> <input type="hidden" className="total-field" name="total" value="0"/></td>
        </tr>
        <tr>
            <td><p className="m-0">Discount</p></td>
            <td>
                <div className="d-flex">
            <input type="number" min="0" name="discount_value" className="h-50px transparent_form form-control discount_value mr-3"/>
            <select className="h-50px transparent_form form-control" name="discount_type" id="discount_type">
                    <option value="percent">%</option>
                    <option value="fixed">Amount</option>
                </select>
                </div>
            </td>
        </tr>
    </tbody>
</Table>

</div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Note</FormLabel>
                                <Form.Control className="transparent_form" required as="textarea" rows={5} />
                            </div>
                            <div className="col-xl-12">
                                <Button variant="" type="submit" className="btn_blue"><img className="mr-2" src={checkicon_img} alt="formtable_img" /> Save</Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default AddInvoice;
