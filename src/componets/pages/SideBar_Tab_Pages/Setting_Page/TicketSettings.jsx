import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormLabel, Button, FormGroup, Modal, } from "react-bootstrap";

// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../../node_modules/react-tabs/style/react-tabs.css";

// 
import ReplyTemplatesTableLoop from "../Setting_Page/ReplyTemplatesTableLoop";
import ReplyTemplatesTableLoop_Array from "../Setting_Page/ReplyTemplatesTableLoop_Array";
import AddTicketChannelTableLoop from "../Setting_Page/AddTicketChannelTableLoop";
import AddTicketChannelTableLoop_Array from "../Setting_Page/AddTicketChannelTableLoop_Array";
import AddTicketTypesTableLoop from "../Setting_Page/AddTicketTypesTableLoop";
import AddTicketTypesTableLoop_Array from "../Setting_Page/AddTicketTypesTableLoop_Array";
import DataTableLoopModal2 from "../Setting_Page/DataTableLoopModal2";
import DataTableLoopModal2Array from "../Setting_Page/DataTableLoopModal2Array";
import TicketSettingTableLoop from "../Setting_Page/TicketSettingTableLoop";
import TicketSettingTableLoop_Array from "../Setting_Page/TicketSettingTableLoop_Array";

// 
import backicon from "../../../../assets/images/arrowleft.svg";
import checkicon from "../../../../assets/images/checkicon.svg";
import plusiconimgicon from "../../../../assets/images/plusicon.svg";
import ckeckimgicon from "../../../../assets/images/checkicon.svg";

const TicketSettings = () => {
    const [modalShowAgent, setModalShowAgent] = React.useState(false);
    return (
        <>
            <div className="container-fluid mb-4">
                <div className="react_tabs_block">
                    <Tabs>
                        <div className="row">
                            <div className="col-xl-3">
                                <div className="card card_dashboard card-body">
                                    <TabList className="react-tabs__tab-list">
                                        <li className=""><NavLink to={`${process.env.PUBLIC_URL}/setting`} className="w-100 bodycolorbg d-flex align-items-center"><img className="img-fluid mr-2" src={backicon} alt="backicon" /> Back</NavLink></li>
                                        <Tab>Ticket Agents</Tab>
                                        <Tab>Ticket Type</Tab>
                                        <Tab>Ticket Channel</Tab>
                                        <Tab>Reply Template</Tab>
                                    </TabList>
                                </div>
                            </div>
                            <div className="col-xl-9">
                                <Form>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">Ticket Agents</h4>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-4 pb-3">
                                                <h4 className="fontsize18">Add New Agent</h4>
                                            </div>
                                            <FormGroup className="mb-3">
                                                <FormLabel className="mb-2">Choose Agents</FormLabel>
                                                <Form.Control className="transparent_form h-40px" as="select">
                                                    <option>No Group Assigned</option>
                                                </Form.Control>
                                            </FormGroup>
                                            <FormGroup className="mb-3">
                                                <FormLabel className="mb-2">Assign Group <NavLink onClick={() => setModalShowAgent(true)} to="#" className="text-center border-radius-100 fontsize12 text-white ml-2 paragraphcolor1bg py-1 px-2"><img className="img-fluid" src={plusiconimgicon} alt="plusiconimgicon" /> Manage Group</NavLink></FormLabel>
                                                <Form.Control className="transparent_form h-40px" as="select">
                                                    <option>No Group Assigned</option>
                                                    <option>Sales</option>
                                                    <option>Code</option>
                                                    <option>Management</option>
                                                </Form.Control>
                                            </FormGroup>
                                            <Button type="button" variant="" className="btn w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="checkicon" /> Save</Button>
                                            <div className="card-header mt-4 pb-3">
                                                <h4 className="fontsize18">Agent</h4>
                                            </div>
                                            <div className="table-sm-responsive clent_data_table mt-4">
                                                <table className="table m-0">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Group </th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {TicketSettingTableLoop_Array.map((val) => {
                                                            return (
                                                                <TicketSettingTableLoop
                                                                    key={val.key}
                                                                    avatarimg={val.avatarimg}
                                                                    title={val.title}
                                                                    crossimg={val.crossimg}
                                                                />
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">Ticket Types</h4>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-4 pb-3">
                                                <h4 className="fontsize18">Add New Ticket Types</h4>
                                            </div>
                                            <FormGroup className="mb-3">
                                                <FormLabel className="mb-2">Ticket Type</FormLabel>
                                                <Form.Control type="text" name="" className="transparent_form h-40px" placeholder="" />
                                            </FormGroup>
                                            <Button type="button" variant="" className="btn w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="checkicon" /> Save</Button>
                                            <div className="card-header mt-4 pb-3">
                                                <h4 className="fontsize18">Ticket Types</h4>
                                            </div>
                                            <div className="table-sm-responsive clent_data_table mt-4">
                                                <table className="table m-0">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Name </th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {AddTicketTypesTableLoop_Array.map((val) => {
                                                            return (
                                                                <AddTicketTypesTableLoop
                                                                    key={val.key}
                                                                    countnumber={val.countnumber}
                                                                    name={val.name}
                                                                    crossimg={val.crossimg}
                                                                    editiconimg={val.editiconimg}
                                                                />
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">Ticket Channel</h4>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-4 pb-3">
                                                <h4 className="fontsize18">Add New Ticket Channel</h4>
                                            </div>
                                            <FormGroup className="mb-3">
                                                <FormLabel className="mb-2">Channel Name</FormLabel>
                                                <Form.Control type="text" name="" className="transparent_form h-40px" placeholder="" />
                                            </FormGroup>
                                            <Button type="button" variant="" className="btn w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="checkicon" /> Save</Button>
                                            <div className="card-header mt-4 pb-3">
                                                <h4 className="fontsize18">Ticket Channel</h4>
                                            </div>
                                            <div className="table-sm-responsive clent_data_table mt-4">
                                                <table className="table m-0">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Name </th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {AddTicketChannelTableLoop_Array.map((val) => {
                                                            return (
                                                                <AddTicketChannelTableLoop
                                                                    key={val.key}
                                                                    countnumber={val.countnumber}
                                                                    name={val.name}
                                                                    crossimg={val.crossimg}
                                                                    editiconimg={val.editiconimg}
                                                                />
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <h4 className="main_title fontsize18 mb-3">Reply Templates</h4>
                                        <div className="card card_dashboard card-body">
                                            <div className="card-header mb-4 pb-3">
                                                <h4 className="fontsize18">Add New Reply Templates</h4>
                                            </div>
                                            <FormGroup className="mb-3">
                                                <FormLabel className="mb-2">Template Heading</FormLabel>
                                                <Form.Control type="text" name="" className="transparent_form h-40px" placeholder="" />
                                            </FormGroup>
                                            <FormGroup className="mb-3">
                                                <FormLabel className="mb-2">Template Text</FormLabel>
                                                <Form.Control className="transparent_form" as="textarea" rows={4} />
                                            </FormGroup>
                                            <Button type="button" variant="" className="btn w-100px h-40px btn_blue"><img className="img-fluid mr-2" src={checkicon} alt="checkicon" /> Save</Button>
                                            <div className="table-sm-responsive clent_data_table mt-4">
                                                <table className="table m-0">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Template Heading </th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {ReplyTemplatesTableLoop_Array.map((val) => {
                                                            return (
                                                                <ReplyTemplatesTableLoop
                                                                    key={val.key}
                                                                    countnumber={val.countnumber}
                                                                    name={val.name}
                                                                    crossimg={val.crossimg}
                                                                    editiconimg={val.editiconimg}
                                                                />
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </Form>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModalAgent
                show={modalShowAgent}
                onHide={() => setModalShowAgent(false)}
            />
        </>
    )
}

export default TicketSettings;

// task category modal
function MyVerticallyCenteredModalAgent(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className="d-flex align-items-center p-0">
                <Modal.Title id="contained-modal-title-vcenter">Manage Groups</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
                <div className="table-sm-responsive">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Group</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DataTableLoopModal2Array.map((val) => {
                                return (
                                    <DataTableLoopModal2
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
                    <div className="form-group mt-3">
                        <FormLabel className="mb-2">Group Name</FormLabel>
                        <Form.Control type="text" className="transparent_form h-45px" placeholder="" />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <Button variant="" className="w-100px graycolorbg fontsize14 border_bodycolor_0" onClick={props.onHide}>Close</Button>
                <Button variant="" className="w-100px btn_blue"><img className="img-fluid mr-2" src={ckeckimgicon} alt="ckeckimgicon" /> Save</Button>
            </Modal.Footer>
        </Modal>
    );
}