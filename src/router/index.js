import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginRegisterView/LoginPage.vue'
import RegisterPage from '../views/LoginRegisterView/RegisterPage.vue';
import RegisterCustomer from '../views/LoginRegisterView/RegisterCustomer.vue';
import RegisterTechnician from '../views/LoginRegisterView/RegisterTechnician.vue';
import RegisterRidesharer from '../views/LoginRegisterView/RegisterRideSharer.vue';
import RegisterTowCompany from '../views/LoginRegisterView/RegisterTowCompany.vue';
import ForgotPassword from '../views/LoginRegisterView/ForgotPassword.vue';
import VerifyEmail from '../views/LoginRegisterView/VerifyEmail.vue';
import CustomerTabs from '../views/CustomerView/CustomerTabs.vue';
import TechnicianTabs from '../views/TechnicianView/TechnicianTab.vue';

import CustomerTransactionHistoryView from '../views/CustomerView/CustomerTransactionHistoryView.vue';


const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/comingsoon',
    component: ()=> import('@/views/ComingSoon.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/registercustomer',
    name: 'RegisterCustomer',
    component: RegisterCustomer
  },
  {
    path: '/registertechnician',
    name: 'RegisterTechnician',
    component: RegisterTechnician
  },
  {
    path: '/registerridesharer',
    name: 'RegisterRidesharer',
    component: RegisterRidesharer
  },
  {
    path: '/registertowcompany',
    name: 'RegisterTowCompany',
    component: RegisterTowCompany
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/verify-email',
    name: 'Verify Email',
    component: VerifyEmail
  },
  {
    path: '/customer',
    component: CustomerTabs,
    children: [
      {
        path: '',
        redirect: '/customer/dashboard',
      },
      {
        path: '/customer/dashboard',
        component: () => import('@/views/CustomerView/CustomerDashboardView.vue'),
      },
      {
        path: "/customer/transactionhistory",
        component: CustomerTransactionHistoryView,
      },
      {
        path: "/customer/transactionhistory/transactiondetails",
        component: () => import("@/views/CustomerView/CustomerTransactionDetailsView.vue")
      },
      {
        path: "/customer/dashboard/location",
        component: () => import("@/views/CustomerView/CustomerLocationView.vue")
      },
      {
        path: "/customer/dashboard/location/cardetails",
        component: () => import("@/views/CustomerView/CustomerCarDetailsView.vue")
      },
      {
        path: "/customer/dashboard/location/cardetails/waiting",
        component: () => import("@/views/CustomerView/CustomerTechnicianWaitingView.vue")
      },
      {
        path: "/customer/dashboard/location/cardetails/booked",
        component: () => import("@/views/CustomerView/CustomerBookedView.vue")
      },
      {
        path: "/customer/dashboard/location/cardetails/booked/chat",
        component: () => import("@/views/ChatView/ChatView.vue")
      },
      {
        path: "/customer/profile",
        component: () => import('@/views/ProfileView.vue')
      },
      {
        path: '/customer/profile/update',
        component: () => import('@/views/UpdateProfile.vue')
      },
      {
        path: '/customer/profile/changepassword',
        component: () => import('@/views/ChangePassword.vue')
      },
    ]
  },
  {
    path: '/technician',
    component: TechnicianTabs,
    children: [
      {
        path: '',
        redirect: '/technician/dashboard',
      },
      {
        path: '/technician/dashboard',
        component: () => import('@/views/TechnicianView/TechnicianDashboardView.vue'),
      },
      {
        path: '/technician/tasks',
        component: () => import('@/views/TechnicianView/TechnicianTaskView.vue')
      },
      {
        path: '/technician/tasks/taskdetails',
        component: () => import('@/views/TechnicianView/TechnicianTaskDetailsView.vue')
      },
      {
        path: '/technician/tasks/taskdetails/location',
        component: () => import('@/views/TechnicianView/TechnicianTaskLocationView.vue')
      },
      {
        path: "/technician/dashboard/location/cardetails/booked/chat",
        component: () => import("@/views/ChatView/ChatView.vue")
      },
      {
        path: "/technician/profile",
        component: () => import('@/views/ProfileView.vue')
      },
      {
        path: '/technician/profile/update',
        component: () => import('@/views/UpdateProfile.vue')
      },
      {
        path: '/technician/profile/changepassword',
        component: () => import('@/views/ChangePassword.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
