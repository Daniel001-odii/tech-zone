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
import PrivacyPolicyPage from '@/views/PrivacyPolicyPage.vue'
import MissionPageViewVue from '@/views/MissionPageView.vue'

import TaskWatchPageView from '@/views/Users/TaskWatchPageView.vue'

import ClientSignupViewVue from '@/views/ClientSignupView.vue'
import ClientDashBoardPage from '@/views/Employers/ClientDashboardPage.vue'
import ClientPostJobView from '@/views/Employers/ClientPostJobPageView.vue'
import ClientSettingsPage from '@/views/Employers/SettingsPageView.vue'
import ClientContractPageViewVue from '@/views/Employers/ContractPageView.vue'
import EarningsPageView from '@/views/Users/EarningsPageView.vue'
import SettingsPageView from '@/views/Users/SettingsPageView.vue'
import OverviewPageView from '@/views/Users/OverviewPageView.vue'
import ClientOverviewPageView from '@/views/Employers/OverviewPageView.vue'

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
import HelpAndSupportPageView from '@/views/HelpAndSupportPageView.vue'

import WaitListPageView from '@/views/WaitListPageView.vue'

const routes = [

  // FOR WAITLIST.....
  {
    path: '/',
    name: 'home',
    component: WaitListPageView
  },


  // MAIN LANDING PAGE AFTER LAUNCH
  /*
  {
    path: '/',
    name: 'home',
    component: LandingPageViewVue
  },
  */


 
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
    path: '/FAQ',
    name: 'FAQ',
    component: SupportPageView
  },

  {
    path: '/support',
    name: 'support',
    component: HelpAndSupportPageView
  },

  {
    path: '/privacy',
    name: 'privacy-policy',
    component: PrivacyPolicyPage
  },

  {
    path: '/in',
    component: TemplateView,
    children: [
      {path: 'jobs', component: UserJobsPageViewVue, name: "jobs"},
      {path: 'saved', component: SavedJobsViewVue, name: "saved jobs"},
      {path: 'messages', component: MessagePageViewVue, name: "user messages"},
      {path: 'contracts', component: ContractsListPageViewVue, name: "user contracts"},
      {path: 'contracts/:contract_id/', component: ContractPageViewVue, name: "contract details"},
      {path: 'users/:user_id', component: ProfilePageViewVue, name: "profile"},
      {path: 'applications', component: MyApplicationsPageViewVue, name: "my applications"},
      {path: 'jobs/:job_id/application', component: ApplicationPageViewVue, name: "job application"},
      {path: 'overview', component: OverviewPageView, name: "user overview"},
      {path: 'notifications', component: NotifcationsPageView, name: "user notifications"},
      {path: 'settings', component: SettingsPageView, name: "user settings"},
      {path: 'contracts/:contract_id/watch', component: TaskWatchPageView, name: "contract task-watch"},
      {
        path: '/support',
        name: 'in-support',
        component: HelpAndSupportPageView
      },
    ],
    meta: { requiresAuth: true, role: 'user' },
  },



  {
    path: '/',
    component: TemplateView,
    children: [
      {path: 'jobs', component: UserJobsPageViewVue, name: "public jobs"},
      {
        path: '/users/:user_id',
        name: 'public profile',
        component: ProfilePageViewVue
      }
    ],
  },

 ,

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
      {path: 'dashboard', component: ClientDashBoardPage, name: "dashboard"},
      {path: 'job', component: ClientPostJobView, name: "create job"},
      {path: 'jobs/:job_id/edit', component: ClientPostJobView, name: "edit job"},
      {path: 'jobs', component: JobsListPageView, name: "my jobs"},
      {path: 'messages', component: MessagePageViewVue, name: "client messages"},
      {path: 'settings', component: ClientSettingsPage, name: "settings"},
      {path: 'profile', component: ClientProfilePageViewVue, name: "user profile"},
      {path: 'notifications', component: NotifcationsPageView, name: "notifications"},
      {path: 'contracts', component: ClientContractsListPageViewVue, name: "my contracts"},
      {path: 'overview', component: ClientOverviewPageView, name: "my overview"},
      {path: 'contracts/:contract_id', component: ClientContractPageViewVue, name: "contract"},
      {path: 'contracts/:contract_id/watch', component: TaskWatchPageView, name: "task-watch"},

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
