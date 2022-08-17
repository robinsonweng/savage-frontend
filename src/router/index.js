import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: { title: "Savagetime" },
    },
    {
      path: "/series/:seriesId",
      name: "series",
      component: () => import("../views/SeriesView.vue"),
      meta: { title: "Redirecting" },
    },
    {
      path: "/video/:videoId",
      component: () => import("../views/VideoView.vue"),
      children: [
        {
          path: "",
          name: "video",
          component: () => import("../components/VideoPlayer.vue"),
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

router.beforeEach((to, from, next) => {
  if (to.params.title && to.params.episode) {
    let episode = (e) => {
      if (e.length == 1) return `${to.params.title}[0${e}]`;
      return `${to.params.title}[${e}]`;
    };
    document.title = episode(to.params.episode);
  }
  if (to.meta.title) document.title = to.meta.title;
  next();
});

export default router;
