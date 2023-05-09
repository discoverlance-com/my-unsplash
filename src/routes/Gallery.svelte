<script lang="ts">
	import { flip } from 'svelte/animate';
	import type { RecordArray, SelectedPick } from '@xata.io/client';
	import type { PhotosRecord } from '$lib/server/xata';
	import PhotoItem from './PhotoItem.svelte';
	import Modal from '$components/Modal.svelte';

	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import { modal } from '$lib/stores/modal';

	let deleting = false;
	let itemTobeDeleted: string | null = null;
	export let photos: RecordArray<Readonly<SelectedPick<PhotosRecord, ['*']>>>;
</script>

{#if photos.length == 0}
	<div class="col-span-full mt-[75px]">
		<p class="text-lg text-primary-gray-200">No gallery item maches the current filter</p>
	</div>
{/if}

<div class="columns-3 gap-11 space-y-11 mt-[75px]">
	{#each photos as item (item.id)}
		<div animate:flip>
			<PhotoItem
				url={item.url}
				label={item.label}
				id={item.id}
				on:delete={(event) => {
					itemTobeDeleted = event.detail.id;
					$modal.id = 'delete-photo';
				}}
			/>
		</div>
	{/each}
</div>

<!-- Delete Photo Modal -->
<Modal modalId="delete-photo" let:close={closeDialog}>
	<form
		class="space-y-[20px]"
		method="post"
		action="?/delete"
		use:enhance={async () => {
			deleting = true;
			return async ({ update, result }) => {
				deleting = false;
				if (result.type == 'success') {
					closeDialog();
					photos = photos.filter((photo) => photo.id !== itemTobeDeleted);
					itemTobeDeleted = null;
				}
			};
		}}
	>
		<h2 class="text-2xl font-medium text-primary-gray-300">Add you sure?</h2>

		<input type="hidden" name="id" value={itemTobeDeleted} />

		<div class="flex gap-4 justify-end">
			<Button type="button" variant="outline" color="danger" on:click={closeDialog}>Cancel</Button>
			<Button type="submit">
				{#if deleting}
					Deleting...
				{:else}
					Delete
				{/if}
			</Button>
		</div>
	</form>
</Modal>
