const routes = [
  { path: "/", redirect: "/guest" },
  {
    path: "/instructor",
    component: () => import("layouts/InstructorLayout.vue"),
    meta: { role: "instructor" },
    children: [
      { path: "/instructor", redirect: "/instructor/driving" },
      {
        path: "driving",
        props: true,
        name:"instructorDriving",
        component: () => import("pages/InstructorPages/Driving.vue")
      },
      {
        path: "changepassword",
        props: true,
        name:"changePassword",
        component: () => import("pages/InstructorPages/CabinetChangePassword.vue")
      },
      {
        path: "driving/details",
        props: true,
        name:"drivingDetails",
        component: () => import("pages/InstructorPages/DrivingDetails.vue")
      },
      {
        path: "driving/studentInfo",
        props: true,
        name:"studentInfo",
        component: () => import("pages/InstructorPages/DrivingStudentCabinet.vue")
      },
      {
        path: "cabinet",
        name:"instructorCabinet",
        component: () => import("pages/InstructorPages/Cabinet.vue")
      },
      {
        path: "cabinet/knd",
        name:"knd",
        component: () => import("pages/InstructorPages/CabinetKND.vue")
      },

    ]
  },
  {
    path: "/student",
    component: () => import("layouts/StudentLayout.vue"),
    meta: { role: "student" },
    children: [
      { path: "/student", redirect: "/student/driving" },
      {
        path: "driving",
        name:"driving",
        props: true,
        component: () => import("pages/StudentPages/Driving.vue")
      },
      {
        path: "driving/history",
        name:"driving_history",
        component: () => import("pages/StudentPages/DrivingHistory.vue")
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
      },
      {
        path: "cabinet/feedback",
        name:"feedback",
        component: () => import("pages/StudentPages/CabinetFeedback.vue")
      },
      {
        path: "cabinet/faq",
        name:"faq",
        component: () => import("pages/StudentPages/CabinetFAQ.vue")
      },
      {
        path: "cabinet/history",
        name:"history",
        component: () => import("pages/StudentPages/CabinetHistory.vue")
      },
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
