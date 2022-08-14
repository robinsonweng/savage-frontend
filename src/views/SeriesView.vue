<script setup>
import { ref, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import VideoPlayer from "../components/VideoPlayer.vue";

const router = useRoute();
let seriesData = ref();

const sortEpisode = (a, b) => {
  return a.episode - b.episode;
};

const getSeries = async () => {
  seriesData.value = "";
  let data = await fetch(
    `https://savagetime.mooo.com/api/dev/series/info/${router.params.seriesId}/episodes`
  );
  seriesData.value = await data.json();
  seriesData.value = seriesData.value.sort(sortEpisode);
};

let seriesName = computed(() => {
  if (!seriesData.value) return "";
  return seriesData.value[0].series_name;
});

getSeries();
</script>

<template>
  <div class="main-wrapper">
    <main>
      <section class="player">
        <!-- send episode -->
        <VideoPlayer v-if="seriesData" :message="seriesData" />
      </section>
      <div class="player-description player-title">
        <h3>{{ seriesName }}[{{ router.params.videoId }}]</h3>
        <div class="episodes-container">
          <div class="episode-item" v-for="(item, index) in seriesData" :key="item.id">
            <RouterLink
              :to="{
                name: 'video',
                params: { seriesId: router.params.seriesId, videoId: item.episode },
              }">
              {{ item.episode }}
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="player-description">
        <!--<h3>作品簡介</h3>-->
      </div>
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
