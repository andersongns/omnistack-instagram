import React, { useState } from 'react';
import api from '../../api'
import './index.css';

const New = (props) => {
    const [post, setPost] = useState({
        author: "",
        place: "",
        description: "",
        hashtags: "",
        image: React.createRef()
    })
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const data = new FormData();
        data.append('author', post.author);
        data.append('place', post.place);
        data.append('description', post.description);
        data.append('hashtags', post.hashtags);
        data.append('image', post.image.current.files[0]);

        await api.post('posts',data);
        props.history.push('/')
    }

    const handleInputChange = (evt) => {
        setPost({ ...post, [evt.target.name]: evt.target.value });
    }

    return (
        <form id="new-post" onSubmit={handleSubmit}>
            <input type="file" name="image" ref={post.image} />
            <input type="text" name="author" placeholder="Autor do post" value={post.author} onChange={handleInputChange} />
            <input type="text" name="place" placeholder="Local do post" value={post.place} onChange={handleInputChange} />
            <input type="text" name="description" placeholder="Descrição do post" value={post.description} onChange={handleInputChange} />
            <input type="text" name="hashtags" placeholder="Hashtags do post" value={post.hashtags} onChange={handleInputChange} />
            <button type="submit">Enviar</button>
        </form>
    );
}

export default New;