<script setup>
import { ref, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import VideoPlayer from "../components/VideoPlayer.vue";

const route = useRoute();
let seriesInfo = ref();
let seriesData = ref();

const sortEpisode = (a, b) => {
  return a.episode - b.episode;
};

const getSeries = async () => {
  seriesInfo.value = "";
  await fetch(
    `https://savagetime.mooo.com/api/dev/video/${route.params.videoId}/series`
  )
    .then((response) => response.json())
    .then((data) => {
      seriesInfo.value = data;
      getSeriesData();
    });
};

const getSeriesData = async () => {
  if (!seriesInfo.value) return;
  seriesData.value = "";
  await fetch(
    `https://savagetime.mooo.com/api/dev/series/info/${seriesInfo.value.uuid}/episodes`
  )
    .then((response) => response.json())
    .then((data) => (seriesData.value = data.sort(sortEpisode)));
};

let VideoTitle = computed(() => {
  if (!seriesInfo.value) return "";
  return seriesInfo.value.name;
});

let SeriesDescription = computed(() => {
  if (!seriesInfo.value) return "";
  return seriesInfo.value.description;
});

let CurrentEpisode = computed(() => {
  if (!seriesData.value) return "";
  return seriesData.value.filter((t) => t.uuid == route.params.videoId)[0].episode;
});

let VideoEpisode = (episode) => {
  if (!episode) return "";
  if (episode.length == 1) return `0${episode}`;
  return `${episode}`;
};

getSeries();
</script>

<template>
  <div class="main-wrapper">
    <main v-if="seriesData">
      <section class="player">
        <!--<VideoPlayer :message="seriesData" />-->
        <router-view></router-view>
      </section>
      <div class="player-description player-title">
        <h3>{{ VideoTitle }} [{{ VideoEpisode(CurrentEpisode) }}]</h3>
        <div class="episodes-container">
          <div class="episode-item" v-for="item in seriesData" :key="item.id">
            <RouterLink
              :to="{
                name: 'video',
                params: { videoId: item.uuid, title: route.params.title, episode: item.episode },
              }">
              {{ VideoEpisode(item.episode) }}
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="player-description">
        <h2>作品介紹</h2>
        <p>{{ SeriesDescription }}</p>
      </div>
    </main>
    <main v-else>
      <h1>Loading</h1>
    </main>
  </div>
</template>

<style scoped>
.player-description {
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  background: var(--card-bg);
  margin-bottom: 1rem;
}

.player-title {
  padding: 10px;
}

.player-title > h3 {
  font-size: var(--card-head-font-size);
}

.player-title > p {
  font-size: var(--card-para-font-size);
}

.player-info {
}

.player-info > h3 {
  font-size: var(--card-head-font-size);
}

.player-title > p {
  font-size: var(--card-para-font-size);
}

.episodes-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.episode-item {
  border: 1px gray solid;
  border-radius: 10px;
  min-width: 55px;
  height: 40px;
}

.episode-item > a {
  display: block;
  text-align: center;
  padding: 8px;
  height: 100%;
  width: 100%;
}
</style>
