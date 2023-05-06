<script lang="ts">
	import Button from '$components/Button.svelte';
	import type { PhotosRecord } from '$lib/server/xata';

	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispath = createEventDispatcher();

	function deletePhoto() {
		dispath('delete', {
			id: id
		});
	}
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

	export let id: Pick<PhotosRecord, 'id'>['id'];
	export let url: Pick<PhotosRecord, 'url'>['url'];
	export let label: Pick<PhotosRecord, 'label'>['label'];
</script>

<div
	in:receive={{ key: id }}
	out:send={{ key: id }}
	class="relative w-full h-full cursor-pointer group"
>
	<div class="hidden absolute group-hover:block top-[18px] right-[18px]">
		<Button color="danger" type="submit" variant="outline" on:click={deletePhoto}>delete</Button>
	</div>
	<img
		class="object-fill object-center w-full max-w-full h-auto rounded-2xl"
		src={url}
		alt={label}
	/>
</div>
