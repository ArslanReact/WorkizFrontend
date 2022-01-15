import React from 'react';
import { FormLabel } from 'react-bootstrap';

const SlackSettingToggleLoop = (props) => {
    return (
        <>
            <div className="col-xl-6 mb-2">
                <div className="d-flex justify-content-between align-items-center">
                    <FormLabel className="mr-3">{props.labeltext}</FormLabel>
                    <div className="button m-0 r" id="button-1">
                        <input type="checkbox" className="checkbox" />
                        <div className="knobs"></div>
                        <div className="layer"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SlackSettingToggleLoop;