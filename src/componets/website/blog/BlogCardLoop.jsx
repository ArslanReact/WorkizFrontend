import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

const BlogCardLoop = (props) => {
    return (
        <>
            <Nav.Item className="col-xl-4 col-lg-6 mb-4">
                <div className="card shadow_box border_radius_10">
                    <div className="mb-4"><NavLink to={`${process.env.PUBLIC_URL}/blog_detail`} className="p-0"><img className="img-fluid" src={props.banner_image} alt="review_banner" /></NavLink></div>
                    <div className="card-body">
                        <h5 className=""><NavLink className="p-0" to={`${process.env.PUBLIC_URL}/blog_detail`}>{props.title}</NavLink></h5>
                        <p className="date">{props.date}</p>
                        <p className="m-0">{props.paragraph}</p>
                    </div>
                </div>
            </Nav.Item>
        </>
    )
}

export default BlogCardLoop;