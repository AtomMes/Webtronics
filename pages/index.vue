<template>
  <div class="flex flex-col">
    <div class="mt-[7%]">
      <p class="text-6xl font-thin tracking-widest text-emerald-500">
        Personal Admin Panel
      </p>
      <p class="text-2xl mt-5 text-gray-500">Simple way to keep track of your
        <NuxtLink :to="{name:'tickets'}" class="underline italic text-emerald-500 hover:text-emerald-600">tickets
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  breadCrumbs: [
    { text: 'Home', href: '/' }
  ]
});
</script>
