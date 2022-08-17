<script setup>
import { ref, onMounted } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import Hls from "hls.js";

const route = useRoute();
const streamUrl = ref();

const getStreamUrl = async (id) => {
  streamUrl.value = "";
  let url = `https://savagetime.mooo.com/api/dev/video/${id}/stream`;
  return await fetch(url)
    .then((response) => response.json())
    .then((data) => data.url);
};

const startPlayer = (ele, source) => {
  let url = `https://savagetime.stream.mooo.com${source}`;
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.attachMedia(ele);
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(url);
    });
  }
};

const player = ref();

onMounted(async () => {
  startPlayer(player.value, await getStreamUrl(route.params.videoId));
});

onBeforeRouteUpdate(async (to, from) => {
  startPlayer(player.value, await getStreamUrl(to.params.videoId));
});
</script>

<template>
  <div class="player-frame">
    <div class="player-container">
      <video muted controls ref="player" class="player-window"></video>
    </div>
  </div>
</template>

<style scoped>
.player-window {
  width: 100%;
}

.player-frame {
  height: 50%;
}
</style>
