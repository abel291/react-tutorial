import React from 'react'
import ListItem from './ListItem'

export default function List({ items,toggleItem }) {
    
    return (
        <ul>
            {items.map((item) => (
                <ListItem key={item.id} item={item} toggleItem={toggleItem}></ListItem>
            ))}
        </ul>
    )
}
