import React,{ useState,useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { InputGroup, Button, FormLabel, Form, FormControl,Table } from "react-bootstrap"
import LoadingOverlay from 'react-loading-overlay';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import $ from "jquery";
const Create_Estimate = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [zero, setzero] = useState('');
    const [estimatenumber, setestimatenumber] = useState('');
    const [client, setclient] = useState('');
    const [validtill, setvalidtill] = useState('');
    const [currency, setcurrency] = useState('');
    const [product, setproduct] = useState('');
    const [clientlist, setclientlist] = useState({
        clientlist_Array : []
    });
    const [curencylist, setcurencylist] = useState({
        curencylist_Array : []
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
    useEffect(async () => {
        await axios.get(Globalsettings.url+'api/admin/finance/estimates/create/'+companyid)
        .then((response) =>{
            setinvoiceSetting({invoiceSetting_array: response.data.invoiceSetting ? response.data.invoiceSetting : [],}); 
            setclientlist({clientlist_Array: response.data.clients ? response.data.clients : [],}); 
            setcurencylist({curencylist_Array: response.data.currencies ? response.data.currencies : [],}); 
            setproductlist({productlist_Array: response.data.products ? response.data.products : [],}); 
            settaxeslist({taxeslist_array: response.data.taxes ? response.data.taxes : [],}); 
            setzero(response.data.zero);
            setestimatenumber(response.data.lastEstimate);
        })
        .catch((error) =>{
        });
    }, []) 
    const AddItems = () => {
        var i = $(document).find('.item_name').length;
        var item = '<div class="col-xs-12 item-row margin-top-5">'
        +'<div class="row">'
        +'<div class="col-md-4">'
        +'<input type="text" class="h-50px transparent_form form-control" name="item_name[]" placeholder="" />'
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

        //       show tax
        $('#invoice-taxes').html(tax);

        //            calculate total
        var totalAfterDiscount = decimalupto2(subtotal-discount);
        // console.log(totalAfterDiscount, taxTotal);

        totalAfterDiscount = (totalAfterDiscount < 0) ? 0 : totalAfterDiscount;

        var total = decimalupto2(totalAfterDiscount+taxTotal);

        $('.total').html(total.toFixed(2));
        $('.total-field').val(total.toFixed(2));

    }
    function decimalupto2(num) {
        var amt =  Math.round(num * 100) / 100;
        return parseFloat(amt.toFixed(2));
    }
    function addProduct(id) {
        var currencyId = $('#currency_id').val();
        $.easyAjax({
            url:'https://tecmyer.com.au/projects/worksuit2/public/admin/finance/all-invoices/update-item',
            type: "GET",
            data: { id: id, currencyId: currencyId },
            success: function(response) {
                $(response.view).hide().appendTo("#sortable").fadeIn(500);
                var noOfRows = $(document).find('#sortable .item-row').length;
                var i = $(document).find('.item_name').length-1;
                var itemRow = $(document).find('#sortable .item-row:nth-child('+noOfRows+') select.type');
                itemRow.attr('id', 'multiselect'+i);
                itemRow.attr('name', 'taxes['+i+'][]');
                $(document).find('#multiselect'+i).selectpicker();
                calculateTotal();
                calculateTotal();
            }
        });
    }

    const handleSubmit = (evt) => {
        calculateTotal();
        var type = 'save';
        var data = $('#storePayments').serialize()+ "&type=" + type;
        setLoading(true);
        axios.post(Globalsettings.url+'api/admin/finance/estimates/store/'+companyid, data).then((response) => {
            toast.success("Estimate Successfully Inserted!");
            setLoading(false);
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/estimates`);
            }, 3000)
        });
        evt.preventDefault();
    }
    return (
        <>
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
        <ToastContainer />
            <div className="container-fluid mb-4">
                <h4 className="main_title">Create Estimates</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <Form onSubmit={handleSubmit} id="storePayments">
                        <div className="row">
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <div className="form-group m-0">
                                    <FormLabel className="mb-2">Estimate #</FormLabel>
                                    <InputGroup className="mb-0">
                                        <InputGroup.Text id="basic-addon1">{invoiceSetting.invoiceSetting_array.estimate_prefix}#{zero}</InputGroup.Text>
                                        <FormControl readOnly
                                            placeholder="1"
                                            className="h-50px transparent_form"
                                            name="estimate_number"
                                            value={estimatenumber}
                                        />
                                    </InputGroup>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <div className="form-group m-0">
                                    <FormLabel className="mb-2">Client</FormLabel>
                                    <Form.Control as="select" name="client_id" className="h-50px transparent_form" required value={client} onChange={e => setclient(e.target.value)}>
                                        <option value="">Select Client</option>
                                        {clientlist.clientlist_Array.map((val,index) => {
                                            return (
                                                <option value={val.user_id} key={index}>{val.name}</option>  
                                            )
                                        })}  
                                    </Form.Control>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <div className="form-group m-0">
                                    <FormLabel className="mb-2">Valid Till</FormLabel>
                                    <Form.Control type="date" name="valid_till" className="h-50px transparent_form" required value={validtill} onChange={e => setvalidtill(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <div className="form-group m-0">
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
                            </div>
                            {/* <div className="col-xl-6 col-lg-12 mb-4">
                                <div className="form-group m-0">
                                    <Form.Control as="select" className="h-50px transparent_form" name="select" value={product} onChange={e => setproduct(e.target.value)}>
                                        <option value="">Add Products</option>
                                        {productlist.productlist_Array.map((val,index) => {
                                            return (
                                                <option value={val.id} key={index}>{val.title + '(' +val.text+ ')'}</option>  
                                            )
                                        })} 
                                    </Form.Control>
                                </div>
                            </div> */}
                        </div>
                        {/*  */}
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
            <input type="text" className="h-50px transparent_form form-control" required name="item_name[]" placeholder="" />
    </div>
    <div className="col-md-1">
        <input type="text" className="h-50px transparent_form form-control quantity" required name="quantity[]"  />
    </div>

    <div className="col-md-2">
        <input type="number" className="h-50px transparent_form form-control cost_per_item" required name="cost_per_item[]" placeholder="" />
    </div>

    <div className="col-md-2">
            <select className="h-50px transparent_form form-control type" name="taxes[0][]" required multiple>
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
                        <div className="row mt-4">
                            <div className="col-lg-12">
                                <FormLabel className="mb-2">Note</FormLabel>
                                <Form.Control as="textarea" name="note" className="transparent_form" rows={5} />
                                <Button variant="" type="submit" className="btn btn_blue w-100px mt-4 h-40px save-form">Save</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Create_Estimate;