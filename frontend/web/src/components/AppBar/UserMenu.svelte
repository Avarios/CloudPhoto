<script lang="ts">
  import { createEventDispatcher } from "svelte";
  let dispatch = createEventDispatcher();
  export let userName: string;

  function logout() {
    dispatch("logout");
  }
</script>

<ul id="usermenu" class="navbar-nav ml-xl">
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {userName}
    </a>
    <ul class="dropdown-menu dropdown-menu-dark">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li>
        <a class="dropdown-item" href="#">Another action</a>
      </li>
      <li>
        <button class="dropdown-item btn btn-link" on:click={logout}
          ><i class="bi bi-door-closed" /> Logout</button
        >
      </li>
    </ul>
  </li>
</ul>

<style>
  #usermenu {
    margin-right: 8%;
  }
</style>
