<script setup>
import { ref, watch } from "vue";

let animeList = ref(null);
let info = ref(null);
const amount = 20;
const getData = async () => {
  animeList.value = "";
  const data = await fetch(`
    http://localhost/api/dev/series/info?recent=false`);
  animeList.value = await data.json();
};

getData();

watch(info, () => {
  for (let i = 0; i <= info.value.length; i++) {
    const scrollbar = info.value[i].scrollHeight;
    const offset = info.value[i].offsetHeight;
    if (scrollbar === offset) {
      info.value[i].classList.remove("synopsis-hover");
    }
  }
});
</script>

<template>
  <div class="cards-info">
    <div class="card-title">
      <h2>動畫列表</h2>
    </div>
    <!--
    <div class="filter-section">
      filter
      <input type="text" />
    </div>
    -->
  </div>

  <div class="card-container">
    <div class="card-item" v-for="item in animeList" :key="item.id">
      <div>
        <div class="title">
          <div class="video-title card-text">
            <h3>
              <RouterLink :to="{ name : 'video', params: { seriesId: item.uuid, videoId: '1' } }">{{ item.name }}</RouterLink>
            </h3>
          </div>
        </div>
        <div class="video-datetime card-text">
          <p>{{ item.pub_year}}{{ item.season }}</p>
        </div>

        <div class="img-wrapper">
          <div class="image">
            <img :src="item.cover_img" />
          </div>
          <div class="synopsis synopsis-hover" ref="info">
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>

      <div class="grid-footer">
        <p>　</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* cards info seciton*/
.cards-info {
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 2rem;
}
/* card section */
.card-container {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(3, 1fr);
}

.card-item {
  padding: 10px, 10px, 10px, 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 10px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.card-text {
  text-align: center;
}

.title {
  align-items: center;
  justify-content: center;
  display: flex;
  height: 4rem;
}

.video-title {
  padding: 0.3rem;
  margin-top: auto;
  margin-bottom: auto;
}

.image > img {
  width: 150px;
  height: 160px;
  float: left;
  object-fit: contain;
}

.synopsis {
  padding: 0.2rem;
  padding-right: 20px;
  overflow: hidden;
}

.synopsis > p {
  max-height: 140px;
  word-break: break-all;
  /*overflow: hidden;*/
}

.synopsis-hover:hover {
  padding-right: 5px;
  overflow-y: auto;
}

.grid-footer {
  margin-top: 0.5rem;
  background-color: #666666;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.grid-footer > p {
  text-align: center;
}
</style>
