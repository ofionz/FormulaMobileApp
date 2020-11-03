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
        component: () => import("pages/StudentPages/FillingStudentInfo.vue")
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
    component: () => import("layouts/GuestLayout.vue"),
    children: [
      { path: "/guest", redirect: "/guest/auth/login" },
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
      {
        path: "prices/confirm_payment",
        name:"confirm_payment",
        component: () => import("pages/GuestPages/PricesConfirmPayment.vue")
      },
      {
        path: "prices/payment_finished/:type",
        name:"payment_finished",
        props: true,
        component: () => import("pages/GuestPages/PricesPaymentFinished.vue")
      },

      { path: "about", name:"about", component: () => import("pages/GuestPages/About.vue") },
      { path: "/guest/auth",  name:"auth", redirect: "/guest/auth/login" },
      { path: "auth/login", name:"login", component: () => import("pages/GuestPages/AuthLogin.vue") },
      { path: "auth/register", name:"register", component: () => import("pages/GuestPages/AuthRegister.vue") }
    ]
  },

  { path: "*", redirect: "/" },

  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
