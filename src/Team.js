import React from "react";

export default function Team({ item }) {
    return (
        <li className="list-group-item">
            { item.name || item.title }
        </li>
    )
}