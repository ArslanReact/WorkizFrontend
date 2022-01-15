import React from 'react';

const OverviewDesriptionLoop = (props) => {
    return (
        <>
            <h4 className="fontsize18 blackcolortext mb-3">{props.title}</h4>
            <p className="paragraphcolor1text">{props.desription}</p>
        </>
    )
}

export default OverviewDesriptionLoop;
