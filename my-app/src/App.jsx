import React, { Fragment, useState, useRef, useEffect } from 'react'
import List from './components/List'
import { v4 as uuidv4 } from 'uuid';
const KEY = 'ItemsApp.items'
export default function App() {
    const [items, setItems] = useState([
        { id: 'f', name: 'f', completed: false },
        { id: 'f1', name: 'f', completed: true },
        { id: 'f2', name: 'f', completed: false }
    ])

    const newItemRef = useRef();

    const handleItems = () => {
        console.log('dasda')
        let item = newItemRef.current.value
        if (item === '') return

        setItems((prevItems) => {
            return [...prevItems, { id: uuidv4(), name: item, completed: true }]
        })

        newItemRef.current.value = ''
    }
    const toggleItem = (id) => {
        let newItems = [...items];
        let toggleitem = newItems.find((item) => item.id === id);
        toggleitem.completed = !toggleitem.completed;
        setItems(newItems)

    }
    const handleClearItems = () => {
        let newItems = items.filter((item) => item.completed)
        setItems(newItems)
    }
    useEffect(() => {
        const storeItems = JSON.parse(localStorage.getItem(KEY));
        if (storeItems) {
            setItems(storeItems)
        }
    }, [])
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(items))
    }, [items])

    return (
        <Fragment>
            <List items={items} toggleItem={toggleItem} />
            <input onKeyPress={(e) => e.key === 'Enter' && handleItems()} ref={newItemRef} type="text" placeholder="Nueva tarea"></input>
            <button onClick={handleItems}>agregar</button>
            <button onClick={handleClearItems}>quitar</button>
            <div>te quedan {items.filter((item) => !item.completed).length}</div>
        </Fragment>
    )
}
