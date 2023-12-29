<template>
  <div class="flex flex-col">
    <div class="flex flex-col  border border-emerald-900 w-fit rounded-xl gap-3 px-8 py-5 mt-[10%]">
      <p class="tracking-widest text-5xl font-bold text-emerald-500">WELCOME</p>
      <p class="text-4xl tracking-wide">Personal Admin Panel</p>
      <p class="text-2xl text-gray-600">Simple way to keep track of your tickets</p>
      <p class="self-end">Head to the
        <RouterLink :to="{name:'tickets'}" class="underline italic text-emerald-500 hover:text-emerald-600">tickets
        </RouterLink>
      </p>
    </div>
    <div class="mt-[7%]">
      <p class="text-6xl font-thin tracking-widest text-emerald-500">
        Personal Admin Panel
      </p>
      <p class="text-2xl mt-5 text-gray-500">Simple way to keep track of your
        <RouterLink :to="{name:'tickets'}" class="underline italic text-emerald-500 hover:text-emerald-600">tickets
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  meta: {
    breadCrumb: [
      { text: 'Home', disabled: false, href: 'home' }
    ]
  }
};
</script>
