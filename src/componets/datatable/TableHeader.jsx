import React, { useState } from "react";
import arrowdown from "../../assets/images/arrowdown.svg";
import arrowup from "../../assets/images/arrowup.svg";
const TableHeader = ({ headers, onSorting }) => {
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = (field) => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };

    return (
        <thead className="thead-light">
            <tr>
                {headers.map(({ name, field, sortable }) => (
                    <th scope="col"
                        key={name}
                        onClick={() =>
                            sortable ? onSortingChange(field) : null
                        }
                    >
                        {name}

                        {sortingField && sortingField === field && (
                            
                                    sortingOrder === "asc"
                                        ? <img src={arrowdown} width="15" className="img-fluid ml-2" alt="icon" />
                                        : <img src={arrowup} width="15" className="img-fluid ml-2" alt="icon" />
                                
                            
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;