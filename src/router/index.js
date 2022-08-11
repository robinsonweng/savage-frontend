import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/series/:seriesId",
      name: "series",
      component: () => import("../views/SeriesView.vue"),
      redirect: (to) => {
        const videoid = 1;
        return { path: "video/", params: { videoId: videoid } };
      },
      children: [
        {
          path: "video/:videoId",
          name: "video",
          component: null,
          //component: () => import("../views/PlayerView.vue"),
        },
      ],
    },
    {
      path: "/404",
      name: "404",
      component: () => import("../views/NotFound.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
  ],
  strict: true,
});

export default router;
