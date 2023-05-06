<script lang="ts">
	import { modal } from '$lib/stores/modal';

	import { onMount } from 'svelte';

	let dialogElement: HTMLDialogElement;
	export let modalId: string;

	$: isDialogActive = modalId === $modal.id && !$modal.open;

	onMount(() => {
		document.body.addEventListener('keydown', function (event) {
			if (event.key == 'Escape' && isDialogActive) {
				closeDialog();
			}
		});
	});

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
			$modal.open = false;
		}}
		open={isDialogActive}
	>
		<div>
			<slot close={closeDialog} />
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
