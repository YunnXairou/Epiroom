<script>
	import addons from '@storybook/addons';

	addons.getChannel().on('DARK_MODE', (v) => {
		if (v) document.querySelector('#root').classList.add('dark');
		else document.querySelector('#root').classList.remove('dark');
	});
</script>

<slot />
