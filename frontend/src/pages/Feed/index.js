import React from 'react';
import './index.css';

import Card from '../../components/Card'

import api from '../../api'
import io from 'socket.io-client';

export default class Feed extends React.Component {

    state = {
        feed: []
    }

    async componentDidMount() {
        this.subscribre();
        const response = await api.get('posts');
        this.setState({ feed: response.data });
    }

    subscribre() {
        const socket = io.connect('http://localhost:3000');
        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] })
        });

        socket.on('like', newLike => {
            this.setState({feed: this.state.feed.map( post => post._id === newLike._id ? newLike : post) })
        })
    }

    render() {
        return (
            <section id="post-list">
                {this.state.feed.map(post => <Card post={post} key={post._id} />)}

            </section>
        );
    }
}