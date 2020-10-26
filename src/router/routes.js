const routes = [
  { path: "/", redirect: "/guest" },
  {
    path: "/student",
    component: () => import("layouts/StudentLayout.vue"),
    children: [
      { path: "/student", redirect: "/student/driving" },
      {
        path: "driving",
        name:"driving",
        component: () => import("pages/StudentPages/Driving.vue")
      },
      {
        path: "services",
        name:"services",
        component: () => import("pages/StudentPages/Services.vue")
      },
      {
        path: "cabinet",
        name:"cabinet",
        component: () => import("pages/StudentPages/Cabinet.vue")
      }
    ]
  },
  {
    path: "/guest",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "/guest", redirect: "/guest/login" },
      {
        path: "prices",
        name:"prices",
        component: () => import("pages/GuestPages/Prices.vue"),
      },
      {
        path: "prices/details/:id",
        props: true,
        name:"details",
        component: () => import("pages/GuestPages/PricesDetails.vue")
      },
      {
        path: "prices/set_user_info",
        name:"set_user_info",
        component: () => import("pages/GuestPages/PricesSetUserInfo.vue")
      },
      {
        path: "prices/set_department",
        name:"set_department",
        component: () => import("pages/GuestPages/PricesSetDepartment.vue")
      },

      { path: "about", name:"about", component: () => import("pages/GuestPages/About.vue") },
      { path: "login", name:"login", component: () => import("pages/GuestPages/Login.vue") }
    ]
  },

  { path: "*", redirect: "/" },

  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
