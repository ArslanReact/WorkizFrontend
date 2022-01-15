import React, { useEffect } from 'react';

const My404Component = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="py-5">
                <div className="col-10 col-xl-11 mx-auto">
                    <div className="text-center fontsize44 fontweightbold drkblue_text_color">404!</div>
                </div>
            </div>
        </>
    )
}

export default My404Component;
