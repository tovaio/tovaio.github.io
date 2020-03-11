import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import App from './App';

const AppContainer: React.FC = () => {
	return (
		<ParallaxProvider>
			<App/>
		</ParallaxProvider>
	)
}

export default AppContainer;