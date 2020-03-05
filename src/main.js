import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world',
hydrate: true
	}
});

window.app = app;

export default app;
  
