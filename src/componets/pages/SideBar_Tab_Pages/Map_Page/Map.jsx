import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../Globalsettings";
import axios from 'axios';
import { InputGroup, Form, Button, FormControl } from "react-bootstrap";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
// 
import MapDataLoop from "../Map_Page/MapDataLoop";
// 
import formtable_img from "../../../../assets/images/formtable_img.svg";
/*global google*/
const Maps = (props) => {
    const [searchtxt, setsearchtxt] = useState('');
    const [MapDataLoopArray, setMapDataLoopArray] = useState({
        MapDataLoop_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/map')
            .then((response) => {
                setMapDataLoopArray({ MapDataLoop_Array: response.data.projectslist ? response.data.projectslist : [], });
            })
            .catch((error) => {
                //  history.push('/signin');
            });
    }, [])
    const [infoOpen, setInfoOpen] = useState(null);
    const handleToggle = (id) => {
        setInfoOpen(id)
    }

    return (
        <>
            <div className="container-fluid mb-4">
                <h4 className="main_title">Jobs Location Map</h4>
            </div>
            {/*  */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-3 col-lg-12">
                        <div className="card card_dashboard h-100 card-body">
                            <h4 className="main_title mb-3">Jobs List</h4>
                            <Form className="transparent_form mb-4">
                                <InputGroup>
                                    <FormControl className="h-40px" placeholder="Search anything here" onChange={e => setsearchtxt(e.target.value)} />
                                    <Button variant=""><img className="img-fluid" src={formtable_img} alt="" /></Button>
                                </InputGroup>
                            </Form>
                            <ul className="list-unstyled">
                                {MapDataLoopArray.MapDataLoop_Array.filter(val => {
                                    if (searchtxt === "") {
                                        return val
                                    } else if (val.project_name.toLowerCase().includes(searchtxt.toLowerCase())) {
                                        return val
                                    }
                                }).map((val, index) => {

                                    return (
                                        <MapDataLoop
                                            key={index}
                                            name={val.project_name}
                                            badgetext={"Deadline: " + val.deadline}
                                        />
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-12 mt-4 mt-xl-0">
                        <div className="card card_dashboard card-body h-740px border-radius-10">
                            <Map google={props.google}
                                style={{}}
                                className={'position-relative h-100'}
                                zoom={1}>
                                {MapDataLoopArray.MapDataLoop_Array.map((mapData, index) => (
                                    <Marker
                                        key={index}
                                        position={{ lat: mapData.project_address_lat, lng: mapData.project_address_lang }}
                                        onClick={() => { handleToggle(index) }}
                                    >
                                        {(infoOpen === index) &&
                                            <InfoWindow>
                                                <h3>helooo</h3>
                                            </InfoWindow>
                                        }

                                    </Marker>
                                ))}
                            </Map>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default GoogleApiWrapper({
    apiKey: ('AIzaSyAt6OZa7_oOl1aweLTYMQFoyDMsvWA-YY4')
})(Maps)