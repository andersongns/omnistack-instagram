import React from 'react';
import { YellowBox } from 'react-native'
import Main from './src';


YellowBox.ignoreWarnings(['Unrecognized WebSocket'])

export default function App() {
	return (
		<Main />
	);
}