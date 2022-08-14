<script setup>
import { ref, onBeforeMount, onMounted, defineProps } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import Hls from "hls.js";

const route = useRoute();
const series = defineProps(["message"]);
const seriesInfo = ref(series.message);
const streamUrl = ref(null);

const getVideoInfo = (e) => {
  if (!seriesInfo.value) return "";
  return seriesInfo.value.filter((t) => t.episode == e)[0].uuid;
};

const getStreamUrl = async (id) => {
  streamUrl.value = "";
  let url = `https://savagetime.mooo.com/api/dev/video/${id}/stream`;
  const location = await fetch(url)
    .then((response) => response.json());
  return location;
};

const startPlayer = (ele, source) => {
  let url = `https://savagetime.stream.mooo.com${source.url}`;
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
  const vId = getVideoInfo(route.params.videoId);
  startPlayer(player.value, await getStreamUrl(vId));
});

onBeforeRouteUpdate(async (to, from) => {
  const vId = getVideoInfo(to.params.videoId);
  startPlayer(player.value, await getStreamUrl(vId));
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
