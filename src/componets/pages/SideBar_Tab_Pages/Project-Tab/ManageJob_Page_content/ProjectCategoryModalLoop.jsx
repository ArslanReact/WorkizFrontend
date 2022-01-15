import React from 'react';
import { NavLink } from "react-router-dom";

const ProjectCategoryModalLoop = (props) => {
    const Delete = (id) => {
        props.DeleteProjectCategory(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumer}</td>
                <td>{props.name}</td>
                <td><NavLink onClick={() => Delete(props.cid)} to="#" className="border_lightredcolor_1 py-1 px-3 redcolortext fontsize14">{props.remove}</NavLink></td>
            </tr>
        </>
    )
}

export default ProjectCategoryModalLoop;
