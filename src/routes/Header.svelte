<script lang="ts">
	import Button from '$components/Button.svelte';
	import logo from '$lib/images/my_unsplash_logo.svg';
	import { modal } from '$lib/stores/modal';

	import { page } from '$app/stores';
</script>

<nav class="flex justify-between items-center mt-10">
	<!-- Title/Logo and search -->
	<div class="flex gap-4 items-center">
		<h1>
			<img src={logo} alt="Unsplash logo" class="w-[138px] h-[26px]" />
			<span class="sr-only">My Unsplash</span>
		</h1>

		<!-- Search -->
		<form action="/">
			<label class="sr-only" for="search">Search</label>
			<div class="flex relative items-center">
				<span
					class="absolute left-[19px] material-symbols-rounded flex items-center text-primary-gray-100 w-4 h-4"
				>
					search
				</span>
				<input
					id="search"
					name="name"
					type="text"
					value={$page.url.searchParams.get('name') || ''}
					class="border-primary-gray-100 text-sm text-primary-gray-300 rounded-xl focus:ring-primary-gray-100/50 focus:ring-1 focus:ring-offset-2 placeholder:text-primary-gray-100 pl-[56px] leading-5 py-[18px] h-[55px] w-[300px] border"
					placeholder="Search by name"
				/>
			</div>
		</form>
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
