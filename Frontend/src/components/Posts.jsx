import React, { useState } from 'react'
import { DUMMY_POSTS } from './posts-data'
import PostItem from './PostItem'

const Posts = () => {
    const [posts,setPosts] = useState(DUMMY_POSTS)


  return (
    <section className="posts">
       {posts.length > 0 ? <div className="container posts__container">
        {
            posts.map(({id,thumbnail,category,title,desc,authorID}) => <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} desc={desc} authorID={authorID}  />)
        }
        </div> : <h2 className='center'>No posts found</h2>}
    </section>
  )
}

export default Posts