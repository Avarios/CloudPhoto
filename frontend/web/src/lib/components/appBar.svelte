<script lang="ts">
	import logo from "$lib/images/appicon.png";
	import { ButtonLink } from ".";
	import type { User } from "$lib/models";
	import { invalidateAll } from '$app/navigation';
	import { PUBLIC_LOCALAUTHENTICATION_CALLBACK_URL } from '$env/static/public'
	export let CognitoClientId: string;
	export let CognitoOauth2Url: string;
	export let User: User|undefined;

	let isUserMenuOpen = false;

	const logout = async () => {
		await invalidateAll()
		isUserMenuOpen = false;
	};

	const toggleMenu = () => {
		isUserMenuOpen = !isUserMenuOpen;
	};
</script>

<header>
	<nav class="bg-gray-800 navbar">
		<div class="px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<img class="h-8 w-8" src={logo} alt="Your Company" />
					</div>
					<div class="hidden md:block">
						<div class="ml-10 flex items-baseline space-x-4">
							{#if User}
								<ButtonLink
									buttonHeight="10"
									href="/statistics"
								>
									Statistics
								</ButtonLink>
							{/if}
						</div>
					</div>
				</div>
				<div class="hidden md:block">
					<div class="ml-4 flex items-center md:ml-6">
						{#if User}
							<button
								type="button"
								class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
							>
								<span class="sr-only">View notifications</span>
								<!-- Heroicon name: outline/bell -->
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
							</button>
						{/if}
						<!-- Profile dropdown -->
						<div class="relative ml-3">
							<div>
								{#if User}
									<button
										on:click={toggleMenu}
										type="button"
										class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
										id="user-menu-button"
										aria-expanded="false"
										aria-haspopup="true"
									>
										<span class="sr-only"
											>Open user menu</span
										>
										<img
											class="h-8 w-8 rounded-full"
											src={User.avatarUrl}
											alt=""
										/>
									</button>
								{/if}

								{#if !User}
									<div
										class="ml-10 flex items-baseline space-x-4"
									>
										<ButtonLink
											buttonHeight="10"
											href={`${CognitoOauth2Url}/authorize?client_id=${CognitoClientId}&response_type=code&scope=email+openid+profile&redirect_uri=http://localhost:5173${PUBLIC_LOCALAUTHENTICATION_CALLBACK_URL}`}
										>
											Login/Register
										</ButtonLink>
									</div>
								{/if}
							</div>
							{#if isUserMenuOpen}
								<div
									on:mouseleave={toggleMenu}
									class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
									role="menu"
									aria-orientation="vertical"
									aria-labelledby="user-menu-button"
									tabindex="-1"
								>
									<div
										class="block px-4 py-2 text-sm text-gray-700"
										role="menuitem"
										tabindex="-1"
										id="user-menu-item-0"
									>
										Hi {User?.username}
									</div>
									<hr />
									<a
										href="/"
										class="block px-4 py-2 text-sm text-gray-700"
										role="menuitem"
										tabindex="-1"
										id="user-menu-item-1">Settings</a
									>

									<a
										on:click={logout}
										href="/authentication/logout"
										class="block px-4 py-2 text-sm text-gray-700"
										role="menuitem"
										tabindex="-1"
										id="user-menu-item-2">Sign out</a
									>
								</div>
							{/if}
						</div>
					</div>
				</div>

			</div>
		</div>
	</nav>
</header>

<style>
	#user-menu-button:hover {
		transform: scale(1.5);
	}
</style>
