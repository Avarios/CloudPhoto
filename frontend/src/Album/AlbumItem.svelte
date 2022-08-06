<script>
 export let title;
 export let views;
</script>

<style>
    img {
        width: 280px;
        height: 250px;
    }
    .card {
        width: fit-content;
        margin-left: 2%;
        margin-bottom: 2%;
        border: none;
    }
    
</style>

<div class="card bg-dark text-white">
    <img class="card-img" src="https://live.staticflickr.com/65535/52261060158_bdb6c0b904_c.jpg" alt="Hamburg2022"/>
    <div class="card-img-overlay position-absolute">
        <h4 class="card-title">{title}</h4>
        <p class="card-text">{views} Fotos - {views} Aufrufe</p>
      </div>
</div>

