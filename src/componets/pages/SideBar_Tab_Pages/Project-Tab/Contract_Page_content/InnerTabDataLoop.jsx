import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";

// 
import searchicon from "../../../../../assets/images/searchiconseablue.svg";
import uploadicon from "../../../../../assets/images/uploadicon.svg";
import crossicon from "../../../../../assets/images/crossiconimg.svg";

const InnerTabDataLoop = (props) => {
    return (
        <>
            <tr>
                <td>
                    <NavLink to="#" className="text_decoration_none d-flex align-items-center">
                        <p className="m-0"><img className="img-fluid" src={props.thumbnailimg} alt="" /></p>
                        <h4 className="fontsize14 blackcolortext ml-2">{props.title}</h4>
                    </NavLink>
                </td>
                <td>
                    <div className="d-flex align-items-center">
                        <NavLink to="#" className="text_decoration_none border-radius-10 h-40px w-40px mr-2 btn badgelightbluebg"><img className="img-flud" src={searchicon} alt="" /></NavLink>
                        <NavLink to="#" className="text_decoration_none border-radius-10 h-40px w-40px btn mr-2 paragraphcolor3bg"><img className="img-flud" src={uploadicon} alt="" /></NavLink>
                        <NavLink onClick={() => sweattest(true)} to="#" className="text_decoration_none border-radius-10 h-40px w-40px btn mr-2 badgeredbg"><img className="img-flud" src={crossicon} alt="" /></NavLink>
                    </div>
                </td>
                <td><p className="m-0">{props.time}</p></td>
            </tr>
        </>
    )
}

export default InnerTabDataLoop;


// 
function sweattest() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover the deleted record!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
}