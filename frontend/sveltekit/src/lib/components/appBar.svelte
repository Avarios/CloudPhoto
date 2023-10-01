<script lang="ts">
  import { user } from '$lib/store'
  import logo from '$lib/assets/camera.png'



</script>

<!-- Navbar -->
<header>
  <div id="nav-data">
    <a href="/home"> Cloud Photo</a>
    <img src={logo} alt=""/>
  </div>

  <nav>
      <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
      </ul>
  </nav>
</header>

<style>
  * {
    font-family: Arial, Helvetica;
  }

  header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px 50px;
    box-shadow: 0 1px 8px #ddd;
  }

  #nav-data {
    margin-right: auto;
    display: flex;
  }

  #nav-data a {
    margin-right: auto;
    font-size: 1.5em;
    text-decoration: none;
    transition: all 0.3s ease 0s;
  }

  #nav-data a:hover {
    transform: scale(1.1);
  }

  #nav-data img {
    width: 80px; 
    border-radius: 20%;
    opacity: 0.5;
    margin-right: auto;
  }

  header li {
    list-style: none;
    display: inline-block;
    padding: 0 20px;
  }

  header a:hover {
    color: #b2dfdb;
  }
</style>