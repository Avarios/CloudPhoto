<script lang="ts">
   import router from "page";
   import { Routes } from "./routes";
   let page: SvelteComponent;
   let routes = new Routes();
   routes.getRoutes.forEach((route) => {
      router(route.path, () => {
         if (route.requireAuth) {
         } else {
            page = route.component;
         }
      });
   });
   router.start();

   import AppBar from "./AppBar/AppBar.svelte";
   import type { SvelteComponent } from "svelte/types/runtime/internal/Component";
</script>

<header>
   <AppBar />
</header>
<main class="flex-shrink-0">
   <svelte:component this={page} />
</main>

<!-- Define Footer in own componente -->
<footer class="footer mt-auto py-3 bg-light fixed-bottom">
   <div class="container">
      <span class="text-muted">Place sticky footer content here.</span>
   </div>
</footer>
