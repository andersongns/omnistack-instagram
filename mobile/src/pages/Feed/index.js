import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { SimpleLineIcons, Ionicons, EvilIcons, Feather } from '@expo/vector-icons';
import Card from '../../components/Card'
import api from '../../api'
import io from 'socket.io-client';

export default class Feed extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerRight: (
			<TouchableOpacity style={{ marginRight: 20 }} onPress={() => { navigation.navigate('New') } }>
				<SimpleLineIcons name="camera" size={24} />
			</TouchableOpacity>
		)
	})

	state = {
		feed: []
	}

	async componentDidMount() {
		this.subscribre();
		const response = await api.get('posts');
		this.setState({ feed: response.data });
	}

	subscribre() {
		const socket = io.connect('http://192.168.11.8:3000');
		socket.on('post', newPost => {
			this.setState({ feed: [newPost, ...this.state.feed] })
		});

		socket.on('like', newLike => {
			this.setState({ feed: this.state.feed.map(post => post._id === newLike._id ? newLike : post) })
		})
	}


	render() {
		const { feed } = this.state;
		return (
			<View style={styles.container}>
				<FlatList
					data={feed}
					keyExtractor={post => post._id}
					renderItem={({ item }) => (
						<Card item={item} />
					)}>
				</FlatList>
			</View >
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
