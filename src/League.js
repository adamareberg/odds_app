import React from "react";

export default function League({ item }) {
    return (
        <li className="list-group-item">
            { item.name || item.title }
        </li>
    )
}