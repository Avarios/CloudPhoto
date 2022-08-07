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
<body class="d-flex flex-column">
   <div class="container-fluid">
      <!-- Injecting Components coming from page.js as a router -->
      <svelte:component this={page} />
   </div>

   <!-- Define Footer in own componente -->
   <footer class="fixed-bottom">MYFOOTER</footer>
</body>
