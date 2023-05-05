<script lang="ts">
	import { modal } from '$lib/stores/modal';
	import Button from './Button.svelte';

	import { afterUpdate } from 'svelte';

	let dialogElement: HTMLDialogElement;
	export let modalId: string;

	afterUpdate(() => {
		if (modalId == $modal.id) {
			openDialog();
		}
	});

	function openDialog() {
		dialogElement.show();
	}

	function closeDialog() {
		dialogElement.close();
	}
</script>

<dialog
	class="rounded-xl w-[620px] h-[368px] bg-white transition-all duration-300 backdrop:bg-black backdrop:bg-opacity-50 open:backdrop:animate-[fade-in] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm"
	bind:this={dialogElement}
	on:close={() => {
		$modal.id = '';
	}}
	on:keydown|preventDefault={(event) => {
		if (event.key == 'Escape') {
			closeDialog();
		}
	}}
>
	<div>
		<slot />
	</div>

	<div>
		<Button color="danger" on:click={closeDialog}>Close</Button>
	</div>
</dialog>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
