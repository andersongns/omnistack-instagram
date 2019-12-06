import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { Ionicons, EvilIcons, Feather } from '@expo/vector-icons';
import api from '../../api'

const Card = (props) => {
	const { item } = props;
	const handleLike = async (id) => {
		await api.post(`posts/${id}/likes`);
	}
	return (
		<View style={styles.feedItem}>
			<View style={styles.feedItemHeader}>
				<View style={styles.userInfo}>
					<Text style={styles.name}>{item.author}</Text>
					<Text style={styles.name}>{item.place}</Text>
				</View>
				<Ionicons name="ios-more" />
			</View>
			<Image style={styles.feedImage} source={{ uri: `http://192.168.11.8:3000/files/${item.image}` }}></Image>
			<View style={styles.feedItemFooter}>
				<View style={styles.actions}>
					<TouchableOpacity style={styles.action} onPress={() => { handleLike(item._id) }}>
						<EvilIcons name="like" size={24} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.action} onPress={() => { alert('Not Implemented') }}>
						<EvilIcons name="comment" size={24} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.action} onPress={() => { alert('Not Implemented') }}>
						<Feather name="send" size={24} />
					</TouchableOpacity>
				</View>
				<Text style={styles.likes}>{item.likes} curtidas </Text>
				<Text style={styles.description}>{item.description}</Text>
				<Text style={styles.hashtags}>{item.hashtags}</Text>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	feedItem: {
		marginTop: 20
	},
	feedItemHeader: {
		paddingHorizontal: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
	,
	name: {
		fontSize: 14,
		color: '#000'
	},
	place: {
		fontSize: 12,
		color: '#666',
		marginTop: 2
	},
	feedImage: {
		width: '100%',
		height: 400,
		marginVertical: 15
	},
	feedItemFooter: {
		paddingHorizontal: 15,
	},
	actions: {
		flexDirection: 'row'
	},
	action: {
		marginRight: 8
	},
	likes: {
		marginTop: 15,
		fontWeight: 'bold',
		color: '#000',
	}
	, description: {
		lineHeight: 18,
		color: '#000'
	},
	hashtags: {
		color: '#9159c1'
	}
});

export default Card;