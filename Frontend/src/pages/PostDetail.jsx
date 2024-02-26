import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import blog1 from'../images/blog1.jpg';
const PostDetail = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor />
          <div className="post-detail__buttons">
            <Link to={`/posts/edit/a`} className='btn sm primary'>Edit</Link>
            <Link to={`/posts/delete/a`} className='btn sm primary danger'>Delete</Link>
          </div>
        </div>
        <h1>This is a Post Title</h1>
        <div className="post-detail__thumbnail">
          <img src={blog1} alt="" />
        </div>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id ex nulla dicta illo quos ducimus et commodi libero quae doloribus. Atque, consequuntur repellendus consectetur reiciendis, labore minus voluptatum libero autem deserunt itaque aut? Expedita dicta, ipsam quam nostrum illum dolore eligendi omnis iusto corporis earum, vel quaerat veniam? Provident, voluptate? Consequuntur explicabo suscipit odit quisquam est dolorum ea vel neque delectus excepturi minima eveniet, nam eaque placeat culpa nisi esse illo? Labore architecto corporis hic cumque facilis ea pariatur error fuga, praesentium, doloribus tenetur! Suscipit, amet. Magni voluptatum, quae voluptatibus laborum veniam, quam reiciendis voluptate corporis aspernatur velit totam nemo!</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id ex nulla dicta illo quos ducimus et commodi libero quae doloribus. Atque, consequuntur repellendus consectetur reiciendis, labore minus voluptatum libero autem deserunt itaque aut? Expedita dicta, ipsam quam nostrum illum dolore eligendi omnis iusto corporis earum, vel quaerat veniam? Provident, voluptate? Consequuntur explicabo suscipit odit quisquam est dolorum ea vel neque delectus excepturi minima eveniet, nam eaque placeat culpa nisi esse illo? Labore architecto corporis hic cumque facilis ea pariatur error fuga, praesentium, doloribus tenetur! Suscipit, amet. Magni voluptatum, quae voluptatibus laborum veniam, quam reiciendis voluptate corporis aspernatur velit totam nemo!</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id ex nulla dicta illo quos ducimus et commodi libero quae doloribus. Atque, consequuntur repellendus consectetur reiciendis, labore minus voluptatum libero autem deserunt itaque aut? Expedita dicta, ipsam quam nostrum illum dolore eligendi omnis iusto corporis earum, vel quaerat veniam? Provident, voluptate? Consequuntur explicabo suscipit odit quisquam est dolorum ea vel neque delectus excepturi minima eveniet, nam eaque placeat culpa nisi esse illo? Labore architecto corporis hic cumque facilis ea pariatur error fuga, praesentium, doloribus tenetur! Suscipit, amet. Magni voluptatum, quae voluptatibus laborum veniam, quam reiciendis voluptate corporis aspernatur velit totam nemo!</p>
      </div>
    </section>
  )
}

export default PostDetail