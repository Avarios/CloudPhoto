<script lang="ts">
  import { user } from '$lib/store'
  import logo from '$lib/assets/camera.png'



</script>

<!-- Navbar -->
<header class="header">
  <a href="/home" class="logo"> Cloud Photo</a>
  <img src={logo} alt=""/>
  <ul>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
  </ul>
  <button>PROFILE</button>
</header>

<style>
  * {
    font-family: Arial, Helvetica;
  }

  .header {
    display: grid;
    grid-template-columns: 100px 50px 1fr auto;
    justify-content: flex-start;
    justify-items: center;
  }

  .header img {
    border-radius: 20%;
    opacity: 0.5;
    grid-column-start: 2;
  }

  .header a {
    grid-column-start: 1;  
  }

  .logo:hover {
    transform: scale(1.3);
    transition: all 1s;
  }

  .header > ul  {
    gap: 1em;
    grid-column-start: 3;
    display: flex;
    flex-direction: row;
  }

  .header > ul > li:hover {
    transform: scale(1.2);
    transition: all 500ms;
  }

  .header button {
    grid-column-start: 4;
    gap: 1em
  }

</style>