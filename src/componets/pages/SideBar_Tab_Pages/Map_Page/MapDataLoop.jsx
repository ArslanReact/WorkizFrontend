import React from 'react';

const MapDataLoop = (props) => {
    return (
        <>
            <li className="d-flex mb-3 align-items-center justify-content-between">
                <span>{props.name}</span>
                <span className="px-3 py-2 fontsize14 redcolortext graycolorbg border-radius-100">{props.badgetext}</span>
            </li>
        </>
    )
}

export default MapDataLoop;
