<script lang="ts">
  import { user } from '$lib/store'
  import logo from '$lib/assets/logo.png'



</script>

<!-- Navbar -->
<header class="navbar">
  <img src={logo} alt=""/>
  <ul class="navigation">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Blog</a></li>
    <li><a href="#">Demo</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</header>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    background: deepskyblue;
  }

  .navbar > img {
    height: 50px;

  }

  .logo,
  .navigation {
    list-style: none;
    text-transform: uppercase;
  }

  .logo a,
  .navigation a {
    text-decoration: none;
    letter-spacing: .45rem;
  }

  .navigation {
    display: flex;
  }

  .navigation a {
    display: block;
    padding: 1em;
    color: white;
  }

  .navigation a:hover {
    background: #00ace6;
  }

  /* *********** media queries *********** */
  @media all and (max-width: 990px) {
    .navbar {
      flex-direction: column;
    }

    .logo {
      margin: 0;
    }

    .navigation {
      width: 100%;
      justify-content: space-around;
    }
  }


  /* ****** ****** */
  @media all and (max-width: 600px) {

    .logo {
      margin: .25em 0;
      align-self: left;
      /* align the logo to the left side of 'flex-container' */
    }

    .navigation {
      flex-direction: column;
    }

    .navigation a {
      text-align: center;
      padding: 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.3);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .navigation li:last-of-type a {
      border-bottom: none;
    }
  }
</style>