import React from 'react';
import { NavLink } from 'react-router-dom';
import clockicon from "../../../../assets/images/watchicon.svg";
import ReactTimeAgo from 'react-time-ago';
const ChatListLoop = (props) => {
    const getChatData = (id,name) => {
        props.getChatData(id, name);
    }
    return (
        <>
            <li id={"dp_"+props.id} onClick={() => getChatData(props.id, props.title) } className="chat_items">
                <NavLink to="#" id={"dpa_"+props.id} className="chat_link">
                    <div className="d-flex align-items-center">
                    <p className="avatar m-0"><img className="img-fluid ml-auto" src={props.avatarimg} alt="" /> </p>
                        <div className="ml-3 w-100">
                            <div className="d-flex justify-content-between mb-1 align-items-center">
                                <h4 className="fontsize16 fontweightbold blackcolortext">{props.title}</h4>
                                <span className={"border-radius-100 fontsize14 px-3 py-1 " + props.badgebgcolor}>{props.badgetext}</span>
                            </div>
                            {/* <p className="fontsize14 mb-1">{props.description}</p> */}
                            <p className="m-0 fontsize12 paragraphcolor1text d-flex align-items-center"><img className="img-fluid mr-2" src={clockicon} alt="" /><ReactTimeAgo date={props.timetext} locale="en-US"/></p>
                        </div>
                    </div>
                </NavLink>
            </li>
        </>
    )
}

export default ChatListLoop;
