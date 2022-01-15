import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Globalsettings from "../../Globalsettings";
// 
import searchicon from "../../../assets/images/searchiconseablue.svg";
import uploadicon from "../../../assets/images/uploadicon.svg";
import crossicon from "../../../assets/images/crossiconimg.svg";
import filepng from "../../../assets/images/file.png";
const InnerTabDataLoop = (props) => {
    const DeleteFiles = (id) => {
        props.DeleteFiles(id);
    }
            // get company id from session
            let obj = JSON.parse(localStorage.getItem('data'));
            var uid = obj.id;
            var companyid = obj.company_id;
    return (
        <>
            <tr>
                <td>
                    <NavLink to="#" className="text_decoration_none d-flex align-items-center">
                        {props.extension === 'jpg' || props.extension === 'png' || props.extension === 'jpeg' ?
                            <p className="m-0"><img className="img-fluid" src={props.fileurl} alt="" width="60" /></p>
                        :
                        <p className="m-0"><img class="img-fluid" src={filepng} width="60" /></p>
                        }                  
                        <h4 className="fontsize14 blackcolortext ml-2">{props.title}</h4>
                    </NavLink>
                </td>
                <td>
                    <div className="d-flex align-items-center">
                        <Nav.Link href={props.fileurl} target="_blank" className="text_decoration_none border-radius-10  mr-2 btn badgelightbluebg"><img width="15" className="img-flud" src={searchicon} alt="" /></Nav.Link>
                        <Nav.Link href={Globalsettings.url+"api/client/project/files/download/"+props.valid+'/'+companyid+'/'+uid} target="_blank" className="text_decoration_none border-radius-10  btn mr-2 paragraphcolor3bg"><img width="15" className="img-flud" src={uploadicon} alt="" /></Nav.Link>
                        <NavLink onClick={() => DeleteFiles(props.valid)} to="#" className="text_decoration_none border-radius-10  btn mr-2 badgeredbg"><img width="15" className="img-flud" src={crossicon} alt="" /></NavLink>
                    </div>
                </td>
                <td><p className="m-0">{props.time}</p></td>
            </tr>
        </>
    )
}

export default InnerTabDataLoop;