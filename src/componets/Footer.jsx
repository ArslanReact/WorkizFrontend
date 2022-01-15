import React from "react";
import { withRouter } from "react-router";

function BottomFooter(props) {
    if (props.location.pathname === `${process.env.PUBLIC_URL}/signin` || props.location.pathname === `${process.env.PUBLIC_URL}/error` || props.location.pathname === `${process.env.PUBLIC_URL}/signup` || props.location.pathname === `${process.env.PUBLIC_URL}/forgot`) {
        return false;
    }
    return (
        <>
            <footer className="footer footer_dashboard">
                <p className="m-0">© 2021 - <a href={`${process.env.PUBLIC_URL}/`} className="underline blusecolortext">Workiz</a></p>
            </footer>
        </>
    );
}

export default withRouter(BottomFooter);