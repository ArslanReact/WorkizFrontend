import React from 'react';
import { Button } from "react-bootstrap";

// 
import editiconimg from "../../../../assets/images/editimgicon.svg";
import crossimg from "../../../../assets/images/crossiconimg.svg";
const OfflinePaymentCredentials = (props) => {
    
    const Deletemethod= (id) => {
        props.Deletemethod(id);
    }
    const Updatemethod= (id) => {
        props.Updatemethod(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.methodname}</td>
                <td>{props.description}</td>
                <td><span className={"px-3 py-1 border-radius-100 " + props.badgebgcolor}>{props.status}</span></td>
                <td>
                    <Button onClick={() => Updatemethod(props.omid)} variant="" className="w-40px h-40px mr-3 badgelightbluebg"><img src={editiconimg} className="img-fluid" alt="" /></Button>
                    <Button onClick={() => Deletemethod(props.omid)} variant="" className="w-40px h-40px badgeredbg"><img src={crossimg} className="img-fluid" alt="" /></Button>
                </td>
            </tr>
        </>
    )
}

export default OfflinePaymentCredentials;