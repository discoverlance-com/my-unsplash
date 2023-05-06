<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	const items = [
		{ id: '1', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg' },
		{ id: '2', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg' },
		{ id: '3', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg' },
		{ id: '4', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg' },
		{ id: '5', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg' },
		{ id: '6', url: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg' }
	];
</script>

<div class="grid grid-cols-2 gap-11 md:grid-cols-3 mt-[75px]">
	<div class="grid gap-11">
		{#each items as item (item.id)}
			<div in:receive={{ key: item.id }} out:send={{ key: item.id }} animate:flip>
				<img class="max-w-full h-auto rounded-2xl" src={item.url} alt="" />
			</div>
		{/each}
	</div>
	<div class="grid gap-11">
		{#each items as item (item.id)}
			<div in:receive={{ key: 'todo.id' }} out:send={{ key: 'todo.id' }} animate:flip>
				<img class="max-w-full h-auto rounded-2xl" src={item.url} alt="" />
			</div>
		{/each}
	</div>
	<div class="grid gap-11">
		{#each items as item (item.id)}
			<div in:receive={{ key: 'todo.id' }} out:send={{ key: 'todo.id' }} animate:flip>
				<img class="max-w-full h-auto rounded-2xl" src={item.url} alt="" />
			</div>
		{/each}
	</div>
</div>
