import React from 'react';

const HrDLateAttendance = (props) => {
    return (
        <>
            <tr>
                <td className="px-4 py-3"><span className="p-2 fontsize16 d-inline-block">{props.text}</span></td>
                <td className="px-4 py-3"><span className="w-30px h-30px fontsize14 text-center blusecolortext align-items-center d-inline-flex justify-content-center lightparagraphcolorbg border-radius-50">{props.number_text}</span></td>
            </tr>
        </>
    )
}

export default HrDLateAttendance;
