import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
// 
import BlogCardLoop from "../blog/BlogCardLoop";

// image import
import banner_01 from "../../../assets/images/website/wallpaper_img.svg";

const Blog = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // BlogCardLoopAray
    const BlogCardLoopAray = [
        {
            key: "0",
            banner_image: banner_01,
            title: "Your Blog Header here",
            date: "July 7, 2021",
            paragraph: "Lorem ipsum dolor sit amet, consetetur sad ipscing elitr, sed diam nonumy eirmod tempor",
        },
        {
            key: "2",
            banner_image: banner_01,
            title: "Your Blog Header here",
            date: "July 7, 2021",
            paragraph: "Lorem ipsum dolor sit amet, consetetur sad ipscing elitr, sed diam nonumy eirmod tempor",
        },
        {
            key: "3",
            banner_image: banner_01,
            title: "Your Blog Header here",
            date: "July 7, 2021",
            paragraph: "Lorem ipsum dolor sit amet, consetetur sad ipscing elitr, sed diam nonumy eirmod tempor",
        },
    ]
    return (
        <>
            <div className="top_banner py-5 text-center">
                <h5>Blog</h5>
            </div>
            {/*  */}
            <div className="py-5">
                <div className="col-10 col-xl-10 col-lg-11 mx-auto">
                    <div className="main_head text-center mb-4">
                        <h4>25 Best Tools for Service Techs in 2021-2022 </h4>
                        <p>Lorem ipsum dolor sit amet, consetetur sad ipscing elitr, sed diam nonumy eirmod tempor</p>
                    </div>
                    {/*  */}
                    <ul className="row blog list-unstyled mb-4">
                        {BlogCardLoopAray.map((val) => {
                            return (
                                <BlogCardLoop
                                    key={val.key}
                                    banner_image={val.banner_image}
                                    title={val.title}
                                    date={val.date}
                                    paragraph={val.paragraph}
                                />
                            )
                        })}
                    </ul>
                    {/* <div className="d-flex align-items-center justify-content-center">
                        <NavLink to="#" className="fontweightmeduim px-4 py-2 fontsize18 border_paragraphcolor_1 drkblue_text_color border_radius_15">Load More</NavLink>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Blog;