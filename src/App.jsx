import React, { useEffect, useMemo, useState } from "react";

import style from "./App.module.css";

export default function App() {

  const [data, setData] = useState('');

  const [filter, setFilter] = useState({sort: '', query: ''});

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos/${Math.floor(Math.random()*10+1)}`)
      .then(response => response.json())
      .then(json => {setData(json); console.log(json);})
  }, [])

  const sortedItems = useMemo(() => {
    if(sort) {
      return [...smth].sort((a, b) => a[sort].localeCompare(b[sort]))
    } else {
      return items;// some items we want to sort
    }
  }, [sort, items])
  
  const sortedAndSearchedItems = useMemo(() => {
    return sortItems.filter(item => item.title.toLowerCase().includes(query))
  }, [query, sortedItems])

  return(
    <React.Fragment>
      <Filter
        filter={filter}
        setFilter={setFilter}
      />
      <h1 className={style.style}>Hello worldssss?</h1>
      <button>BFbutton</button>
      <img style={{width: 150, height: 150}} src={data.url}></img>
    </React.Fragment>
  )
}