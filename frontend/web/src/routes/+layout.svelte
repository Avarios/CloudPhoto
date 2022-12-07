<script lang="ts">
    import { Header } from '$lib/components'
</script>

<div class="min-h-full"> 
     <Header/>
    <main class="bg-white shadow">
      <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
  