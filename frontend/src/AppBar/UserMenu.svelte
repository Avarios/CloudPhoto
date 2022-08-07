<script>
  import { createEventDispatcher } from 'svelte';
  let dispatch = createEventDispatcher();
  function onClick(e) {
    dispatch('clicked', e);
  }
</script>