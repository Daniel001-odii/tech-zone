import { createRouter, createWebHistory } from 'vue-router'

import LandingPageViewVue from '@/views/LandingPageView.vue'
import UserJobsPageViewVue from '@/views/Users/JobsPageView.vue'
import JobsPageViewVue from '@/views/JobsPageView.vue'
import MessagePageViewVue from '@/views/Users/MessagePageView.vue'
import SavedJobsViewVue from '@/views/Users/SavedJobsView.vue'
import ApplicationPageViewVue from '@/views/Users/ApplicationPageView.vue'
import ContractPageViewVue from '@/views/Users/ContractPageView.vue'
import ContractsListPageViewVue from '@/views/Users/ContractsListPageView.vue'
import MyApplicationsPageViewVue from '@/views/Users/MyApplicationsPageView.vue'
import ProfilePageViewVue from '@/views/Users/ProfilePageView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import SignupViewVue from '@/views/SignupView.vue'

import ProfileStepViewVue from '@/views/Users/ProfileStepView.vue'
import RegistrationDecisionVue from '@/views/RegistrationDecision.vue'
import PageNotFoundViewVue from '@/views/PageNotFoundView.vue'
import AboutPageViewVue from '@/views/AboutPageView.vue'
import MissionPageViewVue from '@/views/MissionPageView.vue'

import TaskWatchPageView from '@/views/Users/TaskWatchPageView.vue'

import ClientSignupViewVue from '@/views/ClientSignupView.vue'
import ClientDashBoardPage from '@/views/Employers/ClientDashboardPage.vue'
import ClientPostJobView from '@/views/Employers/ClientPostJobPageView.vue'
import ClientSettingsPage from '@/views/Employers/SettingsPageView.vue'
import EarningsPageView from '@/views/Users/EarningsPageView.vue'
import SettingsPageView from '@/views/Users/SettingsPageView.vue'
import OverviewPageView from '@/views/Users/OverviewPageView.vue'

import ClientContractsListPageViewVue from '@/views/Employers/ContractsListPageView.vue'
import ClientProfilePageViewVue from '@/views/Employers/ProfilePageView.vue'
import NotifcationsPageView from '@/views/NotifcationsPageView.vue'
import JobsListPageView from '@/views/Employers/JobsListPageView.vue'
import TemplateView from '@/views/TemplateView.vue'
import SendPassResetEmailView from '@/views/SendPassResetEmailView.vue'
import ResetPasswordPageView from '@/views/ResetPasswordPageView.vue'

import SupportPageView from '@/views/SupportPageView.vue'


import AdminTemplateView from '@/views/Administration/AdminTemplateView.vue'
import AdminDashboardView from '@/views/Administration/AdminDashboardView.vue'
import AdminSettingsView from '@/views/Administration/AdminSettingsView.vue'
import AdminRegisterPageView from '@/views/Administration/AdminRegisterView.vue'
import AdminLoginView from '@/views/Administration/AdminLoginView.vue'

import ClientMessagePageView from '@/views/Employers/ClientMessagePageView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPageViewVue
  },

  {
    path: '/users/:user_id',
    name: 'Public profile',
    component: ProfilePageViewVue
  },

  {
    path: '/about',
    name: 'about',
    component: AboutPageViewVue
  },

  {
    path: '/vision',
    name: 'mission & vision',
    component: MissionPageViewVue
  },

  {
    path: '/login',
    name: 'login',
    component: LoginViewVue
  },

  // {
  //   path: '/profile/update',
  //   name: 'new user',
  //   component: ProfileStepViewVue
  // },

  {
    path: '/register',
    name: 'register',
    component: SignupViewVue
  },

  {
    path: '/password/forgot',
    name: 'password-forgot',
    component: SendPassResetEmailView
  },

  {
    path: '/user/:reset_token/password',
    name: 'password-change',
    component: ResetPasswordPageView
  },

  {
    path: '/profile/complete',
    name: 'complete profile',
    component: ProfileStepViewVue,
    meta: { requiresAuth: true, role: 'user' },
  },


  {
    path: '/register/decide',
    name: 'decide',
    component: RegistrationDecisionVue,
  },


  {
    path: '/register/client',
    name: 'register-client',
    component: ClientSignupViewVue
  },

  {
    path: '/support',
    name: 'support',
    component: SupportPageView
  },


  {
    path: '/in',
    component: TemplateView,
    children: [
      {path: 'jobs', component: UserJobsPageViewVue},
      {path: 'saved', component: SavedJobsViewVue},
      {path: 'messages', component: MessagePageViewVue},
      {path: 'contracts', component: ContractsListPageViewVue},
      {path: 'contracts/:contract_id/', component: ContractPageViewVue},
      {path: 'users/:user_id', component: ProfilePageViewVue},
      {path: 'applications', component: MyApplicationsPageViewVue},
      {path: 'jobs/:job_id/application', component: ApplicationPageViewVue},
      {path: 'overview', component: OverviewPageView},
      {path: 'notifications', component: NotifcationsPageView},
      {path: 'settings', component: SettingsPageView},
      {path: 'contracts/:contract_id/watch', component: TaskWatchPageView},
    ],
    // meta: { requiresAuth: true, role: 'user' },
  },

  // {
  //   path: '/jobs',
  //   name: 'jobs',
  //   component: JobsPageViewVue,
  // },

  {
    path: '/',
    component: TemplateView,
    children: [
      {path: 'jobs', component: UserJobsPageViewVue},
    ],
  },

  // 404 PAGES CONFIG...
  {
    path: "/404", 
    name: "404", 
    component: PageNotFoundViewVue
  },

  {
    path: "/:catchAll(.*)", 
    redirect: "/404"
  },
  //  404 PAGES ENDS HERE....

  {
    path: '/client',
    component: TemplateView,
    children: [
      {path: 'dashboard', component: ClientDashBoardPage},
      {path: 'job', component: ClientPostJobView},
      {path: 'jobs/:job_id/edit', component: ClientPostJobView},
      {path: 'jobs', component: JobsListPageView},
      {path: 'messages', component: MessagePageViewVue},
      {path: 'settings', component: ClientSettingsPage},
      {path: 'profile', component: ClientProfilePageViewVue},
      {path: 'notifications', component: NotifcationsPageView},
      {path: 'contracts', component: ClientContractsListPageViewVue},
      {path: 'contracts/:contract_id', component: ContractPageViewVue},

    ],
    meta: { requiresAuth: true, role: 'employer' },
  },

  


  /*
  **
  ** ADMNISTRATIVE BASED ROUTES
  **
  */
  {
    path: "/site/register",
    name: "admin register",
    component: AdminRegisterPageView,
  },
  {
    path: "/site/login",
    name: "admin login",
    component: AdminLoginView,
  },

  {
    path: "/admin",
    component: AdminTemplateView,
    children: [
      {path: "dashboard", component: AdminDashboardView},
      {path: "settings", component: AdminSettingsView},
    ],
    meta: { requiresAdminAuth: true, role: 'admin'}
  },


 
/*
// CLIENT BASED ROUTES STARTS HERE
*/
// {
//   path: "/client/dashboard",
//   name: "dashboard",
//   component: ClientDashBoardPage,
//   meta: { requiresAuth: true, role: 'employer' }
// },

// {
//   path: "/client/job",
//   name: "job",
//   component: ClientPostJobView,
//   meta: { requiresAuth: true, role: 'employer' }
// },

// {
//   path: "/client/jobs",
//   name: "my jobs",
//   component: JobsListPageView,
//   meta: { requiresAuth: true, role: 'employer' }
// },

// {
//   path: '/client/contracts',
//   name: 'client contracts',
//   component: ClientContractsListPageViewVue,
//   meta: { requiresAuth: true, role: 'employer' }
// },

// {
//   path: '/client/profile',
//   name: 'client profile',
//   component: ClientProfilePageViewVue,
//   meta: { requiresAuth: true, role: 'employer' }
// },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



const token = localStorage.getItem('life-gaurd');

let redirectToLogin = false; // Initialize a flag to redirect to login after authentication
let requestedRoute = null; // Initialize a variable to store the requested route



// Create a navigation guard that prevents loggedn in users from visiting irrelevant routes when logged in...
// this is ensured via the user roles present in the token...
router.beforeEach((to, from, next) => {
  // Check if the user is logged in (you should replace this condition)
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  // If the user is logged in and is trying to visit the root URL or login page
  if (token && userRole && userRole == 'user' && to.path === '/' || userRole && userRole == 'user'&& to.path === '/login') {
    // Redirect users to /jobs
    next('/in/jobs')

  } else if(token && userRole && userRole == 'employer' && to.path === '/' || userRole && userRole == 'employer'&& to.path === '/login') {
    // redirect clients to their dashboard
    next('/client/dashboard');
  }
    else{
      // Otherwise, proceed with the navigation
      next()
    }
});


// navigation gaurd to allow only loggedin users to view certain pages..
router.beforeEach((to, from, next) => {
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  // Check if the route has a "requiresAuth" meta field and matches the user's role
  if (to.meta.requiresAuth && to.meta.role !== userRole) {
    redirectToLogin = true; // Set the flag to true
    requestedRoute = to.fullPath; // Store the requested route
    next('/login'); // Redirect to login for unauthorized access
  } else {
    next(); // Proceed to the route
  }
});


// navigation gaurd to allow only loggedin administrators and users to view certain pages..
router.beforeEach((to, from, next) => {
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  // Check if the route has a "requiresAuth" meta field and matches the user's role
  if (to.meta.requiresAdminAuth && to.meta.role !== userRole) {
    redirectToLogin = true; // Set the flag to true
    requestedRoute = to.fullPath; // Store the requested route
    next('/site/login'); // Redirect to login for unauthorized access
  } else {
    next(); // Proceed to the route
  }
});


export default router
