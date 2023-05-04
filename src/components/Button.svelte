<script lang="ts">
	export let color: 'danger' | 'primary' = 'primary';
	export let variant: 'outline' | undefined = undefined;
	export let type: 'submit' | 'reset' | 'button' = 'button';
</script>

<button
	on:click
	{type}
	class="px-5 py-4 rounded-xl border"
	class:bg-primary-green-100={color === 'primary' && !variant}
	class:bg-primary-red-100={color === 'danger' && !variant}
	class:hover:bg-white={(color === 'primary' || color === 'danger') && !variant}
	class:hover:border-primary-green-100={color === 'primary' && !variant}
	class:hover:border-primary-red-100={color === 'danger' && !variant}
	class:hover:text-primary-green-100={color === 'primary' && !variant}
	class:hover:text-primary-red-100={color === 'danger' && !variant}
	class:text-white={(color === 'danger' || color === 'primary') && !variant}
	class:border-primary-red-100={color === 'danger' && variant === 'outline'}
	class:border-primary-green-100={color === 'primary' && variant === 'outline'}
	class:hover:text-white={variant === 'outline'}
	class:hover:bg-primary-red-100={color === 'danger' && variant === 'outline'}
	class:hover:bg-primary-green-100={color === 'primary' && variant === 'outline'}
	class:text-primary-red-100={color === 'danger' && variant === 'outline'}
	class:text-primary-green-100={color === 'primary' && variant === 'outline'}
>
	<slot />
</button>
