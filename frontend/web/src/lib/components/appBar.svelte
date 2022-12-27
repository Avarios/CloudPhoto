<script lang="ts">
	import logo from "$lib/images/appicon.png";
	import { ButtonLink,ButtonSize } from ".";
	import type { User } from "$lib/models";
	import { invalidateAll } from "$app/navigation";
	import { PUBLIC_LOCALAUTHENTICATION_CALLBACK_URL } from "$env/static/public";
	export let User: User;
	export let CognitoClientId: string;
	export let CognitoOauth2Url: string;

	let isUserMenuOpen = false;

	const logout = async () => {
		await invalidateAll();
		isUserMenuOpen = false;
	};
</script>

<header>
	<div class="navbar bg-neutral">
		<div class="flex-1">
			<img class="h-8 w-8" src={logo} alt="Your Company" />
			<div class="normal-case text-xl">CloudPhoto</div>
		</div>
		<div class="flex-none">
			{#if User}
				<div class="dropdown dropdown-end">
					<button class="btn-scaling btn btn-ghost btn-circle">
						<div class="indicator">
							<svg
								class="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
								/>
							</svg>
							<span class="badge badge-sm indicator-item">8</span>
						</div>
					</button>
					<div
						class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
					>
						<div class="card-body">
							<span class="font-bold text-lg">8 Items</span>
							<span class="text-info">Subtotal: $999</span>
							<div class="card-actions">
								<button class="btn btn-primary btn-block"
									>View cart</button
								>
							</div>
						</div>
					</div>
				</div>
				<div class="dropdown dropdown-end">
					<button class="btn-scaling user-menu-button btn btn-ghost btn-circle avatar">
						<div class="w-10 rounded-full">
							<img src={User.avatarUrl} alt="useravatar"/>
						</div>
					</button>
					<ul
						class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<div class="justify-between">
								Hi {User.username}
							</div>
							<br>
						</li>
						<li><a>Settings</a></li>
						<li><a href="/authentication/logout" on:click={logout}>Logout</a></li>
					</ul>
				</div>
			{:else}
				<ButtonLink
					buttonSize={ButtonSize.Medium} 
					href={`${CognitoOauth2Url}/authorize?client_id=${CognitoClientId}&response_type=code&scope=email+openid+profile&redirect_uri=http://localhost:5173${PUBLIC_LOCALAUTHENTICATION_CALLBACK_URL}`}>
					Login/Register
				</ButtonLink>
			{/if}
		</div>
	</div>
</header>

<style>
	.btn-scaling:hover {
		transform: scale(1.5);
	}
</style>
