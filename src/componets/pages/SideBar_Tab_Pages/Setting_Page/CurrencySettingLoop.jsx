import React from 'react';
import { NavLink } from "react-router-dom";
import editiconimg from "../../../../assets/images/editimgicon.svg";
const CurrencySettingLoop = (props) => {
    return (
        <>
            <tr>
                <td>{props.currencyname} {props.currencyid == props.companydefaultcurrency && <span className="ml-2 fontsize12 px-3 py-1 border-radius-100 badgegreenbg greencolortext">DEFAULT</span>}</td>
                <td>{props.symbol}</td>
                <td>{props.position}</td>
                <td>{props.code}</td>
                <td>{props.rate}</td>
                <td>
                    {props.status == 'enable' ?
                        <span className="fontsize12 px-3 py-1 border-radius-100 badgegreenbg greencolortext">{props.status}</span>
                    :
                        <span className="fontsize12 px-3 py-1 border-radius-100 badgeredbg redcolortext">{props.status}</span>
                    }
                </td>
                <td>
                    <NavLink to={`${process.env.PUBLIC_URL}/edit_currency/`+props.currencyid} className="w-40px text-center align-items-center border_lightbluecolor_1 btn h-40px badgelightbluebg"><img src={editiconimg} className="w-100 img-fluid" alt="" /></NavLink>
                </td>
            </tr>
        </>
    )
}

export default CurrencySettingLoop;
