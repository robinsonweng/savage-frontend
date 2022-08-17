<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="top-wrapper">
    <header>
      <div class="header-wrapper">
        <nav class="nav">
          <div class="">
            <RouterLink to="/">Home</RouterLink>
          </div>
          <div class="">
            <!--
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/main-list"> anime list</RouterLink>
            <RouterLink to="/seasonal-list">seasonal anime</RouterLink>
            <RouterLink to="/upload">Upload Video</RouterLink>
            <RouterLink to="/search">search</RouterLink>
            -->
          </div>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
  <footer>
    <div class="footer-wrapper">
      <p>savagetime</p>
    </div>
  </footer>
</template>

<style scoped>
/* header nav bar */
.header-wrapper {
  margin-bottom: 2rem;
}

.nav {
  display: flex;
  justify-content: space-between;
}

.nav a {
  padding: 1rem;
  font-size: 1.5rem;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
  color: skyblue;
}

/* footer */
footer {
  margin-top: 1rem;
  width: 100%;
}

.footer-wrapper {
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.603);
}

.footer-wrapper > p {
  color: gray;
}

.top-wrapper {
  max-width: 1300px;
  justify-content: space-around;
  margin-left: auto;
  margin-right: auto;
}
</style>
