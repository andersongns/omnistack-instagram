import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import api from '../../api';

const New = (props) => {

	[post, setPost] = useState({
		author: '',
		place: '',
		description: '',
		hashtags: '',
		image: {
			uri: null,
			type: null,
			name: null
		}
	});

	useEffect(() => {
		getPermissionAsync();
	}, [])

	getPermissionAsync = async () => {
		const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
		if (status !== 'granted') {
			await Permissions.askAsync(Permissions.CAMERA_ROLL);
		}
	}
	const handleSubmit = async () => {
		const data = new FormData();
		data.append('author', post.author);
		data.append('place', post.place);
		data.append('description', post.description);
		data.append('hashtags', post.hashtags);
		data.append('image', post.image);

		try {
			await api.post('posts', data);
			props.navigation.navigate('Feed');
		} catch (err) {
			console.log(err)
		}

	}
	const handleImagePicker = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		});

		let prefix = new Date().getTime();
		let ext = 'jpg';

		if (result.fileName) {
			[prefix, ext] = result.fileName.split('.');
			ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
		}

		const image = {
			uri: result.uri,
			type: result.type,
			name: `${prefix}.${ext}`
		}

		if (!result.cancelled) {
			setPost({ ...post, image });
		}
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={handleImagePicker} style={styles.selectButton}>
				<Text style={styles.selectButtonText}>Selecionar imagem</Text>
			</TouchableOpacity>

			{post.image.uri && <Image style={styles.preview} source={{ uri: post.image.uri }} />}

			<TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' placeholder="Nome do Autor" placeholderTextColor="#999" value={post.author} onChangeText={author => setPost({ ...post, author })}></TextInput>
			<TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' placeholder="Local" placeholderTextColor="#999" value={post.place} onChangeText={place => setPost({ ...post, place })}></TextInput>
			<TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' placeholder="Descrição" placeholderTextColor="#999" value={post.description} onChangeText={description => setPost({ ...post, description })}></TextInput>
			<TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' placeholder="Hashtags" placeholderTextColor="#999" value={post.hashtags} onChangeText={hashtags => setPost({ ...post, hashtags })}></TextInput>
			<TouchableOpacity onPress={handleSubmit} style={styles.shareButton}>
				<Text style={styles.shareButtonText}>Compartilhar</Text>
			</TouchableOpacity>
		</View>
	);

}

New.navigationOptions = {
	headerTitle: 'Nova publicação'
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 30
	},
	selectButton: {
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#CCC',
		borderStyle: 'dashed',
		height: 42,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	},
	selectButtonText: {
		fontSize: 16,
		color: '#666'
	},
	preview: {
		width: 100,
		height: 100,
		marginTop: 10,
		alignSelf: 'center',
		borderRadius: 4
	},
	input: {
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#ddd',
		padding: 15,
		marginTop: 10,
		fontSize: 16
	},
	shareButton: {
		backgroundColor: '#7159c1',
		borderRadius: 4,
		height: 42,
		marginTop: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	shareButtonText: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#FFF'
	}
});

export default New;