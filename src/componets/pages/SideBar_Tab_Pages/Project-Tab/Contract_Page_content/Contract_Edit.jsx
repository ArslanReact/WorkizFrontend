import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form, FormGroup, FormLabel, Modal } from "react-bootstrap";
import { Editor, editorState } from "react-draft-wysiwyg";

// 
import DataTableLoopModalTwo from "../../Project-Tab/Contract_Page_content/DataTableLoopModalTwo";
import DataTableLoopModalTwoArray from "../../Project-Tab/Contract_Page_content/DataTableLoopModalTwoArray";

// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../../../node_modules/react-tabs/style/react-tabs.css";

// 
import editicon from "../../../../../assets/images/edit_4_iconimg.svg";
import checkicon from "../../../../../assets/images/checkicon.svg";
import plusicon from "../../../../../assets/images/plusicon.svg";
import avatarprofile from "../../../../../assets/images/avatar_dummy.svg";

const Contract_Edit = () => {
    const [modalShowTaskCategory, setModalShowTaskCategory] = React.useState(false);
    const [modalShowContractType, setModalShowContractType] = React.useState(false);
    return (
        <>
            <div className="container-fluid mb-4">
                <div className="d-flex align-items-center">
                    <h4 className="main_title px-0">Edit Contract</h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to={`${process.env.PUBLIC_URL}/contract_view`} className="btn btn_blue"><img className="img-fluid mr-1" src={editicon} alt="" /> View Contract</NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-6 col-lg-12">
                        <div className="full_page_tabs">
                            <Tabs>
                                <TabList className="react-tabs__tab-list d-flex justify-content-between">
                                    <Tab>Contract</Tab>
                                    <Tab>Contract Renewal History</Tab>
                                </TabList>
                                <TabPanel>
                                    <div className="card card_dashboard card-body">
                                        <Editor
                                            editorState={editorState}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                        />
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="card card-body">
                                        <div className="btn-group">
                                            <Button onClick={() => setModalShowTaskCategory(true)} type="button" variant="" className="btn btn_blue"><img className="img-fluid mr-1" src={editicon} alt="" /> Renew Contract</Button>
                                        </div>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12">
                        <div className="card card_dashboard card-body">
                            <h4 className="main_title px-0 mb-4 fontsize16">Edit Contract</h4>
                            <Form>
                                <div className="row">
                                    <div className="col-xl-6 col-lg-12 mb-3">
                                        <FormGroup className="m-0">
                                            <FormLabel className="mb-2">Client</FormLabel>
                                            <Form.Control name="" className="h-40px transparent_form" as="select">
                                                <option>Jovani Ferry</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </FormGroup>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 mb-3">
                                        <FormGroup className="m-0">
                                            <FormLabel className="mb-2">Subject</FormLabel>
                                            <Form.Control className="h-40px transparent_form" type="text" name="" placeholder="" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 mb-3">
                                        <FormGroup className="m-0">
                                            <FormLabel className="mb-2">Amount ($)</FormLabel>
                                            <Form.Control className="h-40px transparent_form" type="number" name="" placeholder="" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 mb-3">
                                        <FormGroup className="m-0">
                                            <FormLabel className="mb-2">Contract Type <NavLink onClick={() => setModalShowContractType(true)} to="#" className="ml-2 purplecolorbg p-1 px-2 border-radius-5"><img className="img-fluid" width="15" src={plusicon} alt="" /></NavLink></FormLabel>
                                            <Form.Control name="" className="h-40px transparent_form" as="select">
                                                <option>Jovani Ferry</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </FormGroup>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 mb-3">
                                        <div className="d-flex align-items-center">
                                            <Form.Check className="" name="" />
                                            <FormLabel className="mb-0">No Amount</FormLabel>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 mb-3">
                                        <FormGroup className="m-0">
                                            <FormLabel className="mb-2">Start Date</FormLabel>
                                            <Form.Control className="h-40px transparent_form" type="number" name="" placeholder="" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 mb-3">
                                        <FormGroup className="m-0">
                                            <FormLabel className="mb-2">End Date</FormLabel>
                                            <Form.Control className="h-40px transparent_form" type="number" name="" placeholder="" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 mb-3">
                                        <div className="d-flex align-items-center">
                                            <Form.Check className="" name="" />
                                            <FormLabel className="mb-0">No Amount</FormLabel>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 mb-3">
                                        <FormGroup className="m-0">
                                            <FormLabel className="mb-2">Contract Name</FormLabel>
                                            <Form.Control className="h-40px transparent_form" type="text" name="" placeholder="" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 mb-3">
                                        <FormGroup className="m-0">
                                            <FormLabel className="mb-2">Alternate Address</FormLabel>
                                            <Form.Control className="transparent_form" as="textarea" rows={1} />
                                        </FormGroup>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 mb-3">
                                        <FormGroup className="m-0">
                                            <FormLabel className="mb-2">Mobile</FormLabel>
                                            <Form.Control className="h-40px transparent_form" type="number" name="" placeholder="" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 mb-3">
                                        <FormGroup className="m-0">
                                            <FormLabel className="mb-2">Office Phone Number</FormLabel>
                                            <Form.Control className="h-40px transparent_form" type="number" name="" placeholder="" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 mb-3">
                                        <FormGroup className="m-0">
                                            <FormLabel className="mb-2">City</FormLabel>
                                            <Form.Control className="h-40px transparent_form" type="text" name="" placeholder="" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 mb-3">
                                        <FormGroup className="m-0">
                                            <FormLabel className="mb-2">State</FormLabel>
                                            <Form.Control className="h-40px transparent_form" type="text" name="" placeholder="" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 mb-3">
                                        <FormGroup className="m-0">
                                            <FormLabel className="mb-2">Country</FormLabel>
                                            <Form.Control className="h-40px transparent_form" type="text" name="" placeholder="" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 mb-3">
                                        <FormGroup className="m-0">
                                            <FormLabel className="mb-2">Postal code</FormLabel>
                                            <Form.Control className="h-40px transparent_form" type="text" name="" placeholder="" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 mb-3">
                                        <FormGroup className="m-0">
                                            <FormLabel className="mb-2">Notes</FormLabel>
                                            <Form.Control className="transparent_form" as="textarea" rows={5} />
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-5 mb-4">
                                        <div className="p-3 border-radius-15 bodycolorbg">
                                            <div className="mb-3 p-2 bg-white text-center"><img width="160" className="img-thumnail" src={avatarprofile} alt="" /></div>
                                            <Form.File
                                                className="w-100px btn btn_blue"
                                                type="file"
                                                id="inputGroupFile01"
                                                label="Upload Boundary File"
                                                custom
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <Button variant="" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" />  Update</Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModalTaskCategory
                show={modalShowTaskCategory}
                onHide={() => setModalShowTaskCategory(false)}
            />
            {/* task categor */}
            <MyVerticallyCenteredModalContractType
                show={modalShowContractType}
                onHide={() => setModalShowContractType(false)}
            />
        </>
    )
}

export default Contract_Edit;

// add fllow modal
function MyVerticallyCenteredModalTaskCategory(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Contract Type</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <Form>
                    <div className="form-group mb-4">
                        <FormLabel className="mb-2">Start Date</FormLabel>
                        <Form.Control className="transparent_form h-40px" type="date" name="" placeholder="" />
                    </div>
                    <div className="form-group m-0">
                        <FormLabel className="mb-2">End Date</FormLabel>
                        <Form.Control className="transparent_form h-40px" type="date" name="" placeholder="" />
                    </div>
                    <div className="form-group m-0">
                        <FormLabel className="mb-2">Amount</FormLabel>
                        <Form.Control className="transparent_form h-40px" type="number" name="" placeholder="" />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" />  Save</Button>
            </Modal.Footer>
        </Modal>
    );
}
// add fllow modal
function MyVerticallyCenteredModalContractType(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Contract Type</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 my-4">
                <div className="table-sm-responsive">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {DataTableLoopModalTwoArray.map((val) => {
                                return (
                                    <DataTableLoopModalTwo
                                        key={val.key}
                                        countnumber={val.countnumber}
                                        name={val.name}
                                        remove={val.remove}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <Form>
                    <div className="form-group m-0">
                        <FormLabel className="mb-2">Name</FormLabel>
                        <Form.Control className="transparent_form h-40px" type="name" name="" placeholder="" />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="mr-1" src={checkicon} alt="formtable_img" />  Save</Button>
            </Modal.Footer>
        </Modal>
    );
}