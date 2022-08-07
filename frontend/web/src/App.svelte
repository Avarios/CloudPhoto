<script lang="ts">
   import router from "page";
   import { Routes } from "./routes";

   let page;
   let routes = new Routes();
   routes.getRoutes.forEach((route) => {
      router(route.path, () => {
         if(route.requireAuth){
            
         } else {
            page = route.component;
         }         
      });
   });
   router.start();

   import AppBar from "./AppBar/AppBar.svelte";
</script>

<header>
   <AppBar />
</header>

<div class="container-fluid">
   <!-- Injecting Components coming from page.js as a router -->
   <svelte:component this={page} />
</div>

<!-- Define Footer in own componente -->
<footer class="mt-auto">MYFOOTER</footer>
