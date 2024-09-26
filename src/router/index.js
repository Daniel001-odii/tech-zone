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

import ContractFundingStatusView from '@/views/ContractFundingStatusView.vue'
import BillingsAndOverviewPageView from '@/views/Employers/BillingsAndOverviewPageView.vue'

import SearchPageView from '@/views/Employers/SearchPageView.vue';

import EmailVerificationView from '@/views/EmailVerificationView.vue'
import AdminEarlyUsers from '@/views/Administration/AdminEarlyUsers.vue'




const routes = [

  // MAIN LANDING PAGE AFTER LAUNCH
  {
    path: '/',
    name: 'home',
    component: LandingPageViewVue,
    meta: { title: 'home' }
  },

  {
    path: '/about',
    name: 'about',
    component: AboutPageViewVue,
    meta: { title: 'about' }
  },

  {
    path: '/vision',
    name: 'mission & vision',
    component: MissionPageViewVue,
    meta: { title: 'mission & vision' }
  },

  {
    path: '/login',
    name: 'login',
    component: LoginViewVue,
    meta: { title: 'login' }
  },

  {
    path: '/register',
    name: 'register',
    component: SignupViewVue,
    meta: { title: 'register' }
  },

  {
    path: '/password/forgot',
    name: 'password-forgot',
    component: SendPassResetEmailView,
    meta: { title: 'password-forgot' }
  },

  {
    path: '/user/:reset_token/password',
    name: 'password-change',
    component: ResetPasswordPageView,
    meta: { title: 'password-change' }
  },

  {
    path: '/profile/complete',
    name: 'complete profile',
    component: ProfileStepViewVue,
    meta: { requiresAuth: true, role: 'user', title: 'complete profile' }
  },

  {
    path: '/register/decide',
    name: 'decide',
    component: RegistrationDecisionVue,
    meta: { title: 'decide' }
  },

  {
    path: '/register/client',
    name: 'register-client',
    component: ClientSignupViewVue,
    meta: { title: 'register-client' }
  },

  {
    path: '/FAQ',
    name: 'FAQ',
    component: SupportPageView,
    meta: { title: 'FAQ' }
  },

  {
    path: '/support',
    name: 'support',
    component: HelpAndSupportPageView,
    meta: { title: 'support' }
  },

  {
    path: '/privacy',
    name: 'privacy-policy',
    component: PrivacyPolicyPage,
    meta: { title: 'privacy-policy' }
  },

  {
    path: '/user/email/:email/:token/verify/native',
    name: 'email verification',
    component: EmailVerificationView,
    meta: { title: 'email verification' }
  },

  {
    path: '/contracts/:contract_id/funding/:status',
    name: 'contract funding-status',
    component: ContractFundingStatusView,
    meta: { title: 'contract funding-status' }
  },

  {
    path: '/contracts/:contract_id/funding-status',
    name: 'contract funding-status',
    component: ContractFundingStatusView,
    meta: { title: 'contract funding-status' }
  },

  {
    path: '/in',
    component: TemplateView,
    children: [
      { path: '', component: UserJobsPageViewVue, name: "jobs all", meta: { title: 'jobs all' } },
      { path: 'jobs', component: UserJobsPageViewVue, name: "jobs", meta: { title: 'jobs' } },
      { path: 'saved', component: SavedJobsViewVue, name: "saved jobs", meta: { title: 'saved jobs' } },
      { path: 'messages', component: MessagePageViewVue, name: "user messages", meta: { title: 'user messages' } },
      { path: 'contracts', component: ContractsListPageViewVue, name: "user contracts", meta: { title: 'user contracts' } },
      { path: 'contracts/:contract_id/', component: ContractPageViewVue, name: "contract details", meta: { title: 'contract details' } },
      { path: 'users/:user_id', component: ProfilePageViewVue, name: "profile", meta: { title: 'profile' } },
      { path: 'applications', component: MyApplicationsPageViewVue, name: "my applications", meta: { title: 'my applications' } },
      { path: 'jobs/:job_id/application', component: ApplicationPageViewVue, name: "job application", meta: { title: 'job application' } },
      { path: 'overview', component: OverviewPageView, name: "user overview", meta: { title: 'user overview' } },
      { path: 'notifications', component: NotifcationsPageView, name: "user notifications", meta: { title: 'user notifications' } },
      { path: 'settings', component: SettingsPageView, name: "user settings", meta: { title: 'user settings' } },
      { path: 'contracts/:contract_id/watch', component: TaskWatchPageView, name: "contract task-watch", meta: { title: 'contract task-watch' } },
      { path: '/support', name: 'in-support', component: HelpAndSupportPageView, meta: { title: 'in-support' } },
    ],
    meta: { requiresAuth: true, role: 'user' }
  },

  {
    path: '/',
    component: TemplateView,
    children: [
      { path: 'jobs', component: UserJobsPageViewVue, name: "public jobs", meta: { title: 'public jobs' } },
      { path: '/users/:user_id', name: 'public profile', component: ProfilePageViewVue, meta: { title: 'public profile' } }
    ]
  },

  // 404 PAGES CONFIG...
  {
    path: "/404",
    name: "404",
    component: PageNotFoundViewVue,
    meta: { title: '404' }
  },

  {
    path: "/:catchAll(.*)",
    redirect: "/404"
  },

  {
    path: '/client',
    component: TemplateView,
    children: [
      { path: 'dashboard', component: ClientDashBoardPage, name: "dashboard", meta: { title: 'dashboard' } },
      { path: 'job', component: ClientPostJobView, name: "create job", meta: { title: 'create job' } },
      { path: 'jobs/:job_id/edit', component: ClientPostJobView, name: "edit job", meta: { title: 'edit job' } },
      { path: 'jobs', component: JobsListPageView, name: "my jobs", meta: { title: 'my jobs' } },
      { path: 'messages', component: MessagePageViewVue, name: "client messages", meta: { title: 'client messages' } },
      { path: 'settings', component: ClientSettingsPage, name: "settings", meta: { title: 'settings' } },
      { path: 'profile', component: ClientProfilePageViewVue, name: "user profile", meta: { title: 'user profile' } },
      { path: 'notifications', component: NotifcationsPageView, name: "notifications", meta: { title: 'notifications' } },
      { path: 'contracts', component: ClientContractsListPageViewVue, name: "my contracts", meta: { title: 'my contracts' } },
      { path: 'billings', component: BillingsAndOverviewPageView, name: "billings & overview", meta: { title: 'billings & overview' } },
      { path: 'overview', component: ClientOverviewPageView, name: "my overview", meta: { title: 'my overview' } },
      { path: 'contracts/:contract_id', component: ClientContractPageViewVue, name: "contract", meta: { title: 'contract' } },
      { path: 'contracts/:contract_id/watch', component: TaskWatchPageView, name: "task-watch", meta: { title: 'task-watch' } },
      { path: 'search', component: SearchPageView, name: "Search", meta: { title: 'Search' } },
    ],
    meta: { requiresAuth: true, role: 'employer' }
  },

  // ADMINISTRATIVE BASED ROUTES
  {
    path: "/site/register",
    name: "admin register",
    component: AdminRegisterPageView,
    meta: { title: 'admin register' }
  },
  {
    path: "/site/login",
    name: "admin login",
    component: AdminLoginView,
    meta: { title: 'admin login' }
  },

  {
    path: "/admin",
    component: AdminTemplateView,
    children: [
      { path: "dashboard", component: AdminDashboardView, meta: { title: 'admin dashboard' } },
      { path: "waitlist", component: AdminEarlyUsers, meta: { title: 'admin dashboard' } },
      { path: "settings", component: AdminSettingsView, meta: { title: 'admin settings' } },
    ],
    meta: { requiresAdminAuth: true, role: 'admin' }
  },

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// auto change page title...
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'ApexTeks'; // Default title
  }
  next();
});

const token = localStorage.getItem('life-gaurd');

let redirectToLogin = false; // Initialize a flag to redirect to login after authentication
let requestedRoute = null; // Initialize a variable to store the requested route



// Create a navigation guard that prevents loggedn in users from visiting irrelevant routes when logged in...
// this is ensured via the user roles present in the token...
router.beforeEach((to, from, next) => {
  // Check if the user is logged in (you should replace this condition)
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  // If the user is logged in and is trying to visit the root URL or login page
  if (
    token && userRole && userRole == 'user' && to.path === '/' 
    || token && userRole && userRole == 'user'&& to.path === '/login' 
    || token && userRole && userRole == 'user'&& to.path === '/register'
    || token && userRole && userRole == 'user' && to.path == '/register/client'
    || token && userRole && userRole == 'employer' && to.path == '/register'
  ) {
    // Redirect users to /jobs
    next('/in/jobs')

  } else if(
    token && userRole && userRole == 'employer' && to.path === '/' 
    || token && userRole && userRole == 'employer' && to.path === '/login' 
    || token && userRole && userRole == 'employer' && to.path === '/register/client'
    || token && userRole && userRole == 'employer' && to.path === '/register'
    || token && userRole && userRole == 'user' && to.path == '/register'
  ) {
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


/* // navigation gaurd to allow only loggedin administrators and users to view certain pages..
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
}); */


export default router
