<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import type { RecordArray, SelectedPick } from '@xata.io/client';
	import type { PhotosRecord } from '$lib/server/xata';

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

	export let photos: RecordArray<Readonly<SelectedPick<PhotosRecord, ['*']>>>;
	$: totalItems = Math.ceil(photos.length / 3);
</script>

<div class="grid grid-cols-2 gap-11 md:grid-cols-3 mt-[75px]">
	<div class="grid gap-11">
		{#each photos.slice(0, totalItems) as item (item.id)}
			<div in:receive={{ key: item.id }} out:send={{ key: item.id }} animate:flip>
				<img class="max-w-full h-auto rounded-2xl" src={item.url} alt="" />
			</div>
		{/each}
	</div>
	<div class="grid gap-11">
		{#each photos.slice(totalItems, totalItems * 2) as item (item.id)}
			<div in:receive={{ key: 'todo.id' }} out:send={{ key: 'todo.id' }} animate:flip>
				<img class="max-w-full h-auto rounded-2xl" src={item.url} alt="" />
			</div>
		{/each}
	</div>
	<div class="grid gap-11">
		{#each photos.slice(totalItems * 2) as item (item.id)}
			<div in:receive={{ key: 'todo.id' }} out:send={{ key: 'todo.id' }} animate:flip>
				<img class="max-w-full h-auto rounded-2xl" src={item.url} alt="" />
			</div>
		{/each}
	</div>
</div>
