<script lang="ts">
	import Button from '$components/Button.svelte';
	import Modal from '$components/Modal.svelte';
	import logo from '$lib/images/my_unsplash_logo.svg';
	import { modal } from '$lib/stores/modal';
</script>

<nav class="flex justify-between items-center mt-10">
	<!-- Title/Logo and search -->
	<div class="flex gap-4 items-center">
		<h1>
			<img src={logo} alt="Unsplash logo" class="w-[138px] h-[26px]" />
			<span class="sr-only">My Unsplash</span>
		</h1>

		<!-- Search -->
		<div>
			<label class="sr-only" for="search">Search</label>
			<div class="flex relative items-center">
				<span
					class="absolute left-[19px] material-symbols-rounded flex items-center text-primary-gray-100 w-4 h-4"
				>
					search
				</span>
				<input
					id="search"
					name="search"
					type="text"
					class="border-primary-gray-100 text-sm text-primary-gray-300 rounded-xl focus:ring-primary-gray-100/50 focus:ring-1 focus:ring-offset-2 placeholder:text-primary-gray-100 pl-[56px] leading-5 py-[18px] h-[55px] w-[300px] border"
					placeholder="Search by name"
					required
				/>
			</div>
		</div>
	</div>

	<!-- Add photo button -->
	<Button
		on:click={() => {
			$modal.id = 'new-photo';
		}}
	>
		Add a photo
	</Button>
</nav>

<!-- New Photo Modal -->
<Modal modalId="new-photo" closeModalText="Cancel">
	<div class="space-y-[20px]">
		<h2 class="text-2xl font-medium text-primary-gray-300">Add a new photo</h2>

		<div>
			<label for="label" class="block mb-2 text-primary-gray-200">Label</label>
			<input
				id="label"
				name="label"
				type="text"
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
				class="border-primary-gray-100 text-sm text-primary-gray-300 rounded-xl focus:ring-primary-gray-100/50 focus:ring-1 focus:ring-offset-2 placeholder:text-primary-gray-100 leading-5 p-[18px] h-[55px] w-full border"
				required
			/>
		</div>
	</div>
</Modal>
