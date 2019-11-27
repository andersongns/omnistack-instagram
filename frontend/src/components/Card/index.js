import React from 'react';
import api from '../../api'
import More from '../../assets/more.svg'
import Like from '../../assets/like.svg'
import Comment from '../../assets/comment.svg'
import Send from '../../assets/send.svg'
import './index.css';

const Card = (props) => {
    const { post } = props;

    const handleLike = (id) => async () => {
        await api.post(`posts/${id}/likes`);
    }

    return (
        <article key={post._id}>
            <header>
                <div className="user-info">
                    <span>{post.author}</span>
                    <span className="place">{post.place}</span>
                </div>
                <img src={More} alt="Mais" />
            </header>
            <img src={`http://localhost:3000/files/${post.image}`} alt="teste" />
            <footer>
                <div className="actions">
                    <button type="button" onClick={handleLike(post._id)} ><img src={Like} alt="Like" id="like" /></button>
                    <button><img src={Comment} alt="Mais" /></button>
                    <button><img src={Send} alt="Mais" /></button>
                </div>
                <strong> {post.likes} </strong>
                <p>
                    {post.description} <span>{post.hashtags}</span>
                </p>
            </footer>
        </article>
    )
}

export default Card;