<script setup>
import { ref, onMounted, defineProps } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import Hls from "hls.js";

const route = useRoute();
const message = defineProps(["message"]);
const seriesData = ref(message);
const video_id = seriesData.value["message"][route.params.videoId - 1].uuid;

const startPlayer = (ele, id) => {
  let source = `http://savagetime.mooo.com:5000/hls/${id}.mp4/index.m3u8?md5=id2tPFIcl59pAG1kcorMig`;
  console.log(id);
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.attachMedia(ele);
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(source);
    });
  }
};

const player = ref();
onMounted(() => {
  startPlayer(player.value, video_id);
});

onBeforeRouteUpdate((to, from) => {
  console.log(to.params.videoId);
  const video_id = seriesData.value["message"][to.params.videoId - 1].uuid;
  startPlayer(player.value, video_id);
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
