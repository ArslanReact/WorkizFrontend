import React, { useState } from "react";
import formtable_img from "../../assets/images/formtable_img.svg";
const Search = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const onInputChange = value => {
        setSearch(value);
        onSearch(value);
    };
    return (
        <div className="input-group transparent_form">
        <input placeholder="search" aria-describedby="basic-addon1" className="fontsize14 h-40px form-control" value={search} onChange={e => onInputChange(e.target.value)} />
        <div className="input-group-prepend">
            <button type="button" className="btn"><img className="" src={formtable_img} alt="formtable_img" /></button>
            </div>
        </div>
    );
};

export default Search;