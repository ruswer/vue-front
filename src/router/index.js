import { createRouter, createWebHistory } from "vue-router";

// Default Pages
import Dashboard from "../views/Dashboard.vue";
// Component Pages
import Valert from "../views/components/alert.vue";
import Vaccrodion from "../views/components/accordion.vue";
import Vbadges from "../views/components/badges.vue";
import Vbreadcumb from "../views/components/breadcumbs.vue";
import Vbutton from "../views/components/button.vue";
import Vcard from "../views/components/card.vue";
import Vdropdown from "../views/components/dropdown.vue";
import Vmodal from "../views/components/modal.vue";
import Login from "../views/layouts/auth/Login.vue";
import Register from "../views/layouts/auth/Register.vue";
import ForgotPassword from "../views/layouts/auth/forgot-password.vue";
import StudentList from "../views/students/StudentList.vue";
import AddStudent from "../views/students/AddStudent.vue";
import Parents from "../views/students/Parents.vue";
import Groups from '../views/education/Groups.vue'
import Branches from '../views/education/Branches.vue'
import Courses from '../views/education/Courses.vue'
import Cabinets from '../views/education/Cabinets.vue'
import Timetable from '../views/education/Timetable.vue'
import Employees from '../views/hr/Employees.vue'
import EmployeeAttendance from '../views/hr/EmployeeAttendance.vue'
import EmployeeAttendanceReport from '../views/hr/EmployeeAttendanceReport.vue'
import EmployeeSalary from '../views/hr/EmployeeSalary.vue'
import Department from '../views/hr/Department.vue'
import Position from '../views/hr/Position.vue'
import Settings from '../views/settings/Settings.vue';
import BillingSettings from '../views/settings/BillingSettings.vue';
import RolesPermissions from '../views/settings/RolesPermissions.vue';
// layouts
import Blank from "../views/layouts/Blank.vue";

// error page
import Page404 from "../views/layouts/error/404.vue";
import Page500 from "../views/layouts/error/500.vue";
import PageMaintenance from "../views/layouts/error/maintenance.vue";
import Tables from "../views/tables.vue";

var appname = " - doRus";

const routes = [
  // Routes
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { title: "Dashboard " + appname },
  },

  // Components based Routes
  {
    path: "/component/alert",
    name: "Valert",
    component: Valert,
    meta: { title: "Alert" + appname },
  },
  {
    path: "/component/accordion",
    name: "Vaccordion",
    component: Vaccrodion,
    meta: { title: "Accordion" + appname },
  },
  {
    path: "/component/badge",
    name: "Vbadge",
    component: Vbadges,
    meta: { title: "Badge" + appname },
  },
  {
    path: "/component/breadcumb",
    name: "Vbreadcumb",
    component: Vbreadcumb,
    meta: { title: "Breadcumb" + appname },
  },
  {
    path: "/component/button",
    name: "Vbutton",
    component: Vbutton,
    meta: { title: "Button" + appname },
  },
  {
    path: "/component/card",
    name: "Vcard",
    component: Vcard,
    meta: { title: "Card" + appname },
  },
  {
    path: "/component/dropdown",
    name: "Vdropdown",
    component: Vdropdown,
    meta: { title: "Dropdown" + appname },
  },
  {
    path: "/component/modal",
    name: "Vmodal",
    component: Vmodal,
    meta: { title: "Modal" + appname },
  },
  // layouts

  {
    path: "/Blank",
    name: "Blank Page",
    component: Blank,
    meta: { title: "Blank Page" + appname },
  },

  {
    path: "/auth/login",
    name: "Login",
    component: Login,
    meta: { title: "Login" + appname, hideNav: true },
  },
  {
    path: "/auth/register",
    name: "Register",
    component: Register,
    meta: { title: "Register" + appname, hideNav: true },
  },
  {
    path: "/auth/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: { title: "i Forgot Password" + appname, hideNav: true },
  },
  {
    path: "/students/list",
    name: "StudentsList",
    component: StudentList,
    meta: { title: "O'quvchilar ro'yxati" + appname },
  },
  {
    path: "/students/add",
    name: "AddStudent",
    component: AddStudent,
    meta: { title: "Yangi o'quvchi qo'shish" + appname },
  },
  {
    path: "/students/parents",
    name: "Parents",
    component: Parents,
    meta: { title: "Ota-onalar" + appname },
  },
  {
    path: "/students/auth-info",
    name: "StudentAuthInfo",
    component: () => import('@/views/students/StudentAuthInfo.vue'),
    meta: { title: "Avtorizatsiya ma'lumotlari" + appname },
  },
  {
    path: "/students/removed",
    name: "StudentRemoved",
    component: () => import('@/views/students/StudentRemoved.vue'),
    meta: { title: "Safdan chiqarilganlar" + appname },
  },
  {
    path: "/marketing/payments",
    name: "PaymentsList",
    component: () => import("@/views/marketing/PaymentsList.vue"),
    meta: { title: "To'lovlar ro'yxati" + appname },
  },
  {
    path: '/marketing/debtors',
    name: 'Debtors',
    component: () => import('@/views/marketing/DebtorsList.vue'),
    meta: { title: "Qarzdorlar" }
  },
  {
    path: '/marketing/report',
    name: 'MarketingReport',
    component: () => import('@/views/marketing/MarketingReport.vue'),
    meta: { title: 'Marketing hisobot' }
  },
  {
    path: '/marketing/advert-types',
    name: 'AdvertTypes',
    component: () => import('@/views/marketing/AdvertTypes.vue'),
    meta: { requiresAuth: true, breadcrumb: ['Marketing', 'Reklama turlari'] }
  },
  {
    path: '/expenses/add',
    name: 'AddExpense',
    component: () => import('@/views/expenses/AddExpense.vue'),
    meta: { requiresAuth: true, breadcrumb: ['Chiqimlar', "Chiqim qo'shish"] }
  },
  {
    path: '/expenses/search',
    name: 'SearchExpense',
    component: () => import('@/views/expenses/SearchExpense.vue'),
    meta: { title: "Chiqimlarni izlash" }
  },
  {
    path: '/expenses/categories',
    name: 'ExpenseCategories',
    component: () => import('@/views/expenses/ExpenseCategories.vue'),
    meta: { title: "Chiqim kategoriyalari" }
  },
  {
    path: '/exams/list',
    name: 'ExamList',
    component: () => import('@/views/exams/ExamList.vue'),
    meta: { breadcrumb: [
      { text: 'Bosh sahifa', to: '/' },
      { text: 'Imtihonlar', to: '/exams/list', active: true }
    ] }
  },
  {
    path: '/education/groups',
    name: 'EducationGroups',
    component: Groups
  },
  {
    path: '/education/branches',
    name: 'EducationBranches',
    component: Branches,
    meta: { title: "Filiallar" }
  },
  {
    path: '/education/courses',
    name: 'EducationCourses',
    component: Courses,
    meta: { title: "Kurslar" }
  },
  {
    path: '/education/knowledge-levels',
    name: 'EducationKnowledgeLevels',
    component: () => import('@/views/education/KnowledgeLevels.vue'),
    meta: { title: "Bilim darajalari" }
  },
  {
    path: '/education/cabinets',
    name: 'EducationCabinets',
    component: Cabinets,
    meta: { title: "Kabinetlar" }
  },
  {
    path: '/education/timetable',
    name: 'EducationTimetable',
    component: Timetable,
    meta: { title: "Darslar Jadvali"},
  },
  {
    path: '/hr/employees',
    name: 'Employees',
    component: Employees,
    meta: { title: "Xodimlar" + appname },
  },
  {
    path: '/hr/attendance',
    name: 'EmployeeAttendance',
    component: EmployeeAttendance,
    meta: { title: "Xodimlar davomati" + appname }
  },
{
    path: '/hr/attendance-report',
    name: 'EmployeeAttendanceReport',
    component: EmployeeAttendanceReport,
    meta: { title: "Xodimlar davomati hisoboti" + appname }
  },
  {
    path: '/hr/salary',
    name: 'EmployeeSalary',
    component: EmployeeSalary,
    meta: { title: "Xodimlar ish haqi" + appname }
  },
  {
    path: '/hr/department',
    name: 'Department',
    component: Department,
    meta: { title: "Bo'limlar" + appname }
  },
  {
    path: '/hr/position',
    name: 'Position',
    component: Position,
    meta: { title: "Lavozimlar" + appname }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { title: "Sozlamalar" + appname }
  },
  {
    path: '/settings/billing',
    name: 'BillingSettings',
    component: BillingSettings,
    meta: { title: "Billing sozlamalari" + appname }
  },
  {
    path: '/settings/roles-permissions',
    name: 'RolesPermissions',
    component: RolesPermissions,
    meta: { title: "Rollar va ruxsatlar" + appname }
  },
  // layout/error
  // default page 404
  {
    path: "/:pathMatch(.*)*",
    name: "Page404",
    component: Page404,
    meta: { title: "Upps! 404" + appname, hideNav: true },
  },
  {
    path: "/500",
    name: "Page500",
    component: Page500,
    meta: { title: "Server internal Error" + appname, hideNav: true },
  },
  {
    path: "/maintenance",
    name: "maintenance",
    component: PageMaintenance,
    meta: {
      title: "Sorry the app has been Maintenance" + appname,
      hideNav: true,
    },
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
    meta: {
      title: "Tables" + appname,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

  linkExactActiveClass: "exact-active",
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
