import React from 'react';

// 
import FaqAdminLoop from "../faqa_dmin/FaqAdminLoop";

import fileimage from "../../../../assets/images/fileicon.svg";

const FaqAdmin = () => {
    const FaqAdminLoopArray = [
        {
            key: "0",
            title: "HYT",
            name: "l;k;lk",
            file: fileimage,
        },
    ]
    return (
        <>
            <div className="container-fluid mb-4">
                <h5 className="fontsize22 blackcolortext">Admin FAQ</h5>
                <div className="card card_dashboard">
                    <div className="card-body">
                        <div className="row">
                            {FaqAdminLoopArray.map((val) => {
                                return (
                                    <FaqAdminLoop
                                        key={val.key}
                                        title={val.title}
                                        name={val.name}
                                        file={val.file}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FaqAdmin;
