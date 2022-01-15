import React from 'react';
import { Nav, Modal } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

const ReviewCardLoop = (props) => {
    const [navbarModolTask, setnavbarModolTask] = React.useState(false);
    return (
        <>
            <Nav.Item className="col-xl-4 col-lg-12 mb-4">
                <div className="card-body white_bg_color shadow_box border_radius_15">
                    <div className=" d-block">
                        <div className="border_radius_10 mb-4 mb-xl-0 overflow-hidden position-relative"><NavLink className="video-play-button" to="#" onClick={() => setnavbarModolTask(true)}><span></span></NavLink><img className="img-fluid" src={props.banner_image} alt="review_banner" /></div>
                        <div className="mt-3">
                            <h5 className="fontsize18">{props.title}</h5>
                            <p className="m-0 fontsize16">{props.paragraph}</p>
                        </div>
                    </div>
                </div>
            </Nav.Item>
            {/* task categor */}
            <MyVerticallyCenteredModalnavbarModol
                show={navbarModolTask}
                onHide={() => setnavbarModolTask(false)}
            />
        </>
    )
}

export default ReviewCardLoop;
// drag filter modal
function MyVerticallyCenteredModalnavbarModol(props) {
    return (
        <>
            <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" className="navbarModol" centered>
                <Modal.Header closeButton className="p-0 d-flex align-items-center">
                    <Modal.Title id="contained-modal-title-vcenter">Video</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">Video</Modal.Body>
            </Modal>
        </>
    );
}