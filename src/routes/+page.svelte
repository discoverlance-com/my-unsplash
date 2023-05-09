<script lang="ts">
	import Gallery from './Gallery.svelte';
	import Header from './Header.svelte';

	import type { PageServerData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	import Modal from '$components/Modal.svelte';
	import Button from '$components/Button.svelte';

	export let data: PageServerData;
	$: photos = data.photos;
	export let form: ActionData;
	let creating = false;
</script>

<svelte:head>
	<title>My Unsplash - DevChallenge</title>
	<meta name="description" content="Add and manage your photos" />
</svelte:head>

<Header />

<Gallery {photos} />

<!-- New Photo Modal -->
<Modal modalId="new-photo" let:close={closeDialog}>
	<form
		class="space-y-[20px]"
		method="post"
		action="?/create"
		use:enhance={async () => {
			creating = true;
			return async ({ update, result }) => {
				creating = false;
				if (result.type == 'success') {
					closeDialog();
					photos = [result.data?.photo, ...photos];
				}
			};
		}}
	>
		<h2 class="text-2xl font-medium text-primary-gray-300">Add a new photo</h2>

		<div>
			<label for="label" class="block mb-2 text-primary-gray-200">Label</label>
			<input
				id="label"
				name="label"
				type="text"
				value={form?.label || ''}
				class="border-primary-gray-100 text-sm text-primary-gray-300 rounded-xl focus:ring-primary-gray-100/50 focus:ring-1 focus:ring-offset-2 placeholder:text-primary-gray-100 leading-5 p-[18px] h-[55px] w-full border"
				required
			/>
		</div>

		<div>
			<label for="url" class="block mb-2 text-primary-gray-200">Photo URL</label>
			<input
				id="url"
				name="url"
				type="url"
				value={form?.url || ''}
				class="border-primary-gray-100 text-sm text-primary-gray-300 rounded-xl focus:ring-primary-gray-100/50 focus:ring-1 focus:ring-offset-2 placeholder:text-primary-gray-100 leading-5 p-[18px] h-[55px] w-full border"
				required
			/>
		</div>

		<div class="flex gap-4 justify-end">
			<Button type="button" variant="outline" color="danger" on:click={closeDialog}>Cancel</Button>
			<Button type="submit">
				{#if creating}
					Adding...
				{:else}
					Submit
				{/if}
			</Button>
		</div>
	</form>
</Modal>
