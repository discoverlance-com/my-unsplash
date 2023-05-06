<script>
	import './styles.css';
</script>

<div class="relative px-24 mx-auto max-w-7xl bg-white">
	<main class="pb-32">
		<slot />
	</main>

	<footer class="absolute bottom-4 left-24">
		<p class="text-primary-gray-200">
			created by <strong>Lance</strong> -
			<a href="https://devchallenges.io" target="_blank" rel="noopener noreferrer"
				>devChallenges.io</a
			>
		</p>
	</footer>
</div>
