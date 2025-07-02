import { defineStore } from "pinia";

// this is sidebar data s
// if your adding a router or link add data use object
// here

export const useSidebar = defineStore({
  state: () => ({
    menu: [
      {
        name: "MENU",
        children: [
          {
            name: "Dashboard",
            icon: "bxs:dashboard",
            type: "default",
            url: "/",
          },
          {
            name: "Ta'lim",
            icon: "ic:round-school",
            type: "accordion",
            url: false,
            isChildren: true,
            children: [
              {
                name: "Guruhlar",
                url: "/education/groups",
                icon: false,
                type: "default",
              },
              {
                name: "Filiallar",
                url: "/education/branches",
                icon: false,
                type: "default",
              },
              {
                name: "Kurslar",
                url: "/education/courses",
                icon: false,
                type: "default",
              },
              {
                name: "Bilim darajalari",
                url: "/education/knowledge-levels",
                icon: false,
                type: "default",
              },
            ],
          },
          {
            name: "Kadrlar bo'limi",
            icon: "mdi:account-tie",
            type: "accordion",
            url: false,
            isChildren: true,
            children: [
              {
                name: "Xodimlar",
                url: "/hr/employees",
                icon: false,
                type: "default",
              },
              {
                name: "Xodimlar davomati",
                url: "/hr/attendance",
                icon: false,
                type: "default",
              },
            ],
          },
           {
            name: "Students",
            icon: "ph:student-bold",
            type: "accordion",
            url: false,
            isChildren: true,
            children: [
              {
                name: "Student List",
                url: "/students/list",
                icon: false,
                type: "default",
              },
              {
                name: "Add Student",
                url: "/students/add",
                icon: false,
                type: "default",
              },
              {
                name: "Parents",
                url: "/students/parents",
                icon: false,
                type: "default",
              },
              {
                name: "Avtorizatsiya ma'lumotlari",
                url: "/students/auth-info",
                icon: false,
                type: "default",
              },
              {
                name: "Safdan chiqarilganlar",
                url: "/students/removed",
                icon: false,
                type: "default",
              },
            ],
           },
          {
            name: "Components",
            icon: "gg:components",
            type: "accordion",
            url: false,
            isChildren: true,
            children: [
              {
                name: "Alert",
                url: "/component/alert",
                icon: false,
                type: "default",
              },
            ],
          },
        ],
      },
    ],
  }),
});
