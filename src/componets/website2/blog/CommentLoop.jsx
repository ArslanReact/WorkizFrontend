import React from 'react';
import { Figure, Nav } from "react-bootstrap";

const CommentLoop = (props) => {
    return (
        <>
            <li className="d-flex align-items-center">
                <Figure className="w-100">
                    <div className="d-xl-flex d-block align-items-center">
                        <div className="d-flex mb-4 mb-xl-0 align-items-center me-3 figure_img">
                            <Figure.Image src={props.avatar_img} alt="avatar" />
                        </div>
                        <Figure.Caption>
                            <h4>{props.title}</h4>
                            <p className="date">{props.date}</p>
                            <p>{props.paragraph}</p>
                            <Nav.Link href="#" className="fontweightbold d-inline-block fontsize16 drkblue_text_color px-2">Reply</Nav.Link>
                        </Figure.Caption>
                    </div>
                </Figure>
            </li>
        </>
    )
}

export default CommentLoop;
