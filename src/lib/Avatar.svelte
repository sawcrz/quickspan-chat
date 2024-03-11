<script lang="ts">
  export let src: string;
  export let alt: string;
</script>

<picture class="rounded-full w-full h-full">
  <img {src} {alt} class="rounded-full w-full h-full" />
</picture>
