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
