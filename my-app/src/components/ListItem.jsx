import React from 'react'

export default function ListItem({item,toggleItem}) {
    const {id,name,completed}=item;
    const handleItemClick=()=>{
        toggleItem(id)
    }
    return (
        <li >
            <input type='checkbox' checked={completed} onChange={handleItemClick}></input>
            {name}
        </li>
    )
}
