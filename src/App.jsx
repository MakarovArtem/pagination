import React, { useEffect, useMemo, useState } from "react";
import PostService from "./API/PostService.js";
import useFetching from "./hooks/useFetching.jsx";
import { getAdaptivePageNumbers, getNumberSequence, getPageCount } from "./utils/pages.js";

import style from './App.module.css';

export default function App() {

  const [posts, setPosts] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [itemsOnPageLimit, setItemsOnPageLimit] = useState(10)
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  let buttonsForPages = getAdaptivePageNumbers(totalPageCount, currentPageNumber, 2, '...');

  // const getPosts = async () => {
  //   const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  //   setPosts(response.data);
  //   setTotalItemCount(response.data.length)
  // };

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(itemsOnPageLimit, currentPageNumber);
    setPosts(response.data);
    const totalItemCount = response.headers['x-total-count'];
    setTotalPageCount(getPageCount(totalItemCount, itemsOnPageLimit));
  })

  useEffect(() => {
    fetchPosts();
    console.log(currentPageNumber)
  }, [currentPageNumber]);

  return(
    <div>
      <h1>Those are pages numbers</h1>

      <div className={style.buttonsPanel}>
        <button style={{display: currentPageNumber === 1 ? 'none' : 'inline-block'}} className={style.navButton} onClick={() => setCurrentPageNumber(prev => prev - 1)}>&lt;&lt;</button>
        {
          buttonsForPages.map(pageNumber => 
          <button className={
            currentPageNumber === pageNumber ?
            style.navButtonCurrent :
            style.navButton}
            disabled={typeof pageNumber !== 'number' ? true : false}
            onClick={() => setCurrentPageNumber(pageNumber)}
          >
            {pageNumber}
          </button>)
        }
        <button style={{display: currentPageNumber === totalPageCount ? 'none' : 'inline-block'}} className={style.navButton} onClick={() => setCurrentPageNumber(prev => prev + 1)}>&gt;&gt;</button>
      </div>

      {
        [...posts].map(post =>
        <article className={style.post}>
          <h3 key={post.id} className={style.postTitle}>
            {`${post.id}. ${post.title}`}
          </h3>
          <p>{post.body}</p>
        </article>
        )
      }
    </div>
  )
}