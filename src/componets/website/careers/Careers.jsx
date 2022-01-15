import React, { useEffect } from 'react';

// import component

// images import


const Careers = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="top_banner py-5 text-center">
                <h5>Careers</h5>
            </div>
            {/*  */}
            <div className="py-5">
                <div className="col-10 col-xl-7 mx-auto">
                    <h5 className='fontsize24 blacktext text-center mb-4'>Open Positions</h5>
                    <h4 className='fontsize20 blackcolortext fontweightbold'>Who are we?</h4>
                    <p className='fontsize16 paragraph_blue_text_color'>EasyManage is a professional Service Management platform that allows organizations to manage their daily tasks seamlessly. From creating invoices to managing complete spreadsheets of employees' data, everything is just one click away.</p>
                    <p className='fontsize16 paragraph_blue_text_color'>Business managers take advantage of this amazing software to automate their tasks. You can stay connected to your office work 24/7. We serve locksmith, junk removal, carpet cleaning, garage door repair, electronics repair, and other businesses.</p>
                    <p className='fontsize16 paragraph_blue_text_color'>Join us and become part of our empowering service to increase profit and expand your business.</p>
                </div>
            </div>
        </>
    )
}

export default Careers;
