import React from 'react';

const CurrentPakagesTableLoop = (props) => {
    return (
        <>
            <tr>
                <td>{props.tdtext}</td>
                <td className={" " + props.fontsize}>{props.dataline_1}</td>
                <td className={" " + props.fontsize}>{props.dataline_2}</td>
                <td className={" " + props.fontsize}>{props.dataline_3}</td>
                <td className={" " + props.fontsize}>{props.dataline_4}</td>
                <td className={" " + props.fontsize}>{props.dataline_5}</td>
                <td className={" " + props.fontsize}>{props.dataline_6}</td>
                <td className={" " + props.fontsize}>{props.dataline_7}</td>
                <td className={" " + props.fontsize}>{props.dataline_8}</td>
            </tr>
        </>
    )
}

export default CurrentPakagesTableLoop;
