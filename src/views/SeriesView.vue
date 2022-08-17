<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const sortEpisode = (a, b) => {
  return a.episode - b.episode;
};

const getVideoId = async () => {
  let url = `https://savagetime.mooo.com/api/dev/series/info/${route.params.seriesId}/episodes`;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const videoList = data.sort(sortEpisode);
      const videoId = videoList[0].uuid;
      const videoEpisode = videoList[0].episode;
      router.push({
        name: `video`,
        path: `/video`,
        params: {
          videoId: videoId,
          title: `${route.params.title}`,
          episode: `${videoEpisode}`,
        },
        replace: true,
      });
    });
};
// if id failed
getVideoId();
</script>

<template>
  <h3>Redirecting</h3>
</template>