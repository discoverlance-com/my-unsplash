<script lang="ts">
	import { modal } from '$lib/stores/modal';
	import Button from './Button.svelte';

	import { afterUpdate } from 'svelte';

	let dialogElement: HTMLDialogElement;
	export let modalId: string;
	export let closeModalText = 'Close';

	$: isDialogActive = modalId === $modal.id && !$modal.open;

	afterUpdate(() => {
		if (isDialogActive) {
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

<div
	data-dialog-backdrop="dialog"
	data-dialog-backdrop-close="true"
	class="grid fixed inset-0 place-items-center z-[999] bg-black bg-opacity-25 transition-all duration-300 pointer-events-none"
	class:hidden={!isDialogActive}
>
	<dialog
		class="rounded-xl w-[620px] px-6 py-8 relative bg-white pointer-events-auto"
		bind:this={dialogElement}
		on:close={() => {
			$modal.id = '';
		}}
		on:keydown={(event) => {
			if (event.key == 'Escape') {
				closeDialog();
			}
		}}
	>
		<div>
			<slot />
		</div>

		<div class="mt-[20px] flex gap-4 justify-end">
			<Button variant="outline" color="danger" on:click={closeDialog}>{closeModalText}</Button>
		</div>
	</dialog>
</div>

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
