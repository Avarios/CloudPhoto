<script>
   import router from "page";
   import routes from "./routes";

   let page;

   routes.forEach((route) => {
      router(route.path, () => { page = route.component });
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
