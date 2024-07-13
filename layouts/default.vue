<template>
  <div>
    <nav class="navbar has-shadow is-primary">
      <div class="container px-3" style="max-width: 1024px;">
        <div class="navbar-brand">
          <nuxtLink to="/jukebox" class="navbar-item">
            <img src="/android-chrome-192x192.png" alt="Digital Jukebox" class="" style="max-height: 50px;">
          </nuxtLink>
          <div class="navbar-burger" @click="navActive = !navActive">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>

    <div class="has-text-centered">
      <div class="content container has-text-left" style="max-width: 850px;">
        <NuxtPage/>
      </div>
    </div>

    <footer class="footer">
      <div class="container" style="max-width: 1024px;">
        <div class="content has-text-right">
          <p>
            <br class="is-hidden-tablet"/>
            Rich Clingman (K0OZK), Ozark, Missouri, USA
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const navActive = ref(false)
</script>
