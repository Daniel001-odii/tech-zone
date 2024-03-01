import { createRouter, createWebHistory } from 'vue-router'

import LandingPageViewVue from '@/views/LandingPageView.vue'
import JobsPageViewVue from '@/views/JobsPageView.vue'
import MessagePageViewVue from '@/views/MessagePageView.vue'
import SavedJobsViewVue from '@/views/SavedJobsView.vue'
import ApplicationPageViewVue from '@/views/ApplicationPageView.vue'
import ContractPageViewVue from '@/views/ContractPageView.vue'
import ContractsListPageViewVue from '@/views/ContractsListPageView.vue'
import MyApplicationsPageViewVue from '@/views/MyApplicationsPageView.vue'
import ProfilePageViewVue from '@/views/ProfilePageView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import SignupViewVue from '@/views/SignupView.vue'
import ClientSignupViewVue from '@/views/ClientSignupView.vue'
import ProfileStepViewVue from '@/views/ProfileStepView.vue'
import RegistrationDecisionVue from '@/views/RegistrationDecision.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPageViewVue
  },

  {
    path: '/login',
    name: 'login',
    component: LoginViewVue
  },

  {
    path: '/profile/update',
    name: 'new user',
    component: ProfileStepViewVue
  },

  {
    path: '/register',
    name: 'register',
    component: SignupViewVue
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
    path: '/jobs',
    name: 'jobs',
    component: JobsPageViewVue,
    meta: { requiresAuth: true, role: 'user' }
  },

  {
    path: '/profile',
    name: 'profile',
    component: ProfilePageViewVue,
    meta: { requiresAuth: true, role: 'user' }
  },

  {
    path: '/jobs/applications',
    name: 'applications',
    component: MyApplicationsPageViewVue,
    meta: { requiresAuth: true, role: 'user' }
  },

  {
    path: '/jobs/:job_id/application',
    name: 'application',
    component: ApplicationPageViewVue,
    meta: { requiresAuth: true, role: 'user' }
  },

  {
    path: '/contracts',
    name: 'contracts',
    component: ContractsListPageViewVue,
    meta: { requiresAuth: true, role: 'user' }
  },

  {
    path: '/contracts/:contract_id',
    name: 'contract',
    component: ContractPageViewVue,
    meta: { requiresAuth: true, role: 'user' }
  },


  {
    path: '/messages',
    name: 'messages',
    component: MessagePageViewVue,
    meta: { requiresAuth: true, role: 'user' }
  },

  {
    path: '/saved-jobs',
    name: 'saved-job',
    component: SavedJobsViewVue,
    meta: { requiresAuth: true, role: 'user' }
  },

  // {path: "/jobs/declined-jobs", 
  // component: declinedJobs, 
  // meta: { requiresAuth: true, role: 'user' }},

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
const token = localStorage.getItem('life-gaurd');


let redirectToLogin = false; // Initialize a flag to redirect to login after authentication
let requestedRoute = null; // Initialize a variable to store the requested route

router.beforeEach((to, from, next) => {
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  if(to.meta.requiresAdminAuth && to.meta.role !== userRole){
    redirectToLogin = true; // Set the flag to true
    requestedRoute = to.fullPath; // Store the requested route

    next('/login')
  }
  // Check if the route has a "requiresAuth" meta field and matches the user's role
  else if (to.meta.requiresAuth && to.meta.role !== userRole) {
    redirectToLogin = true; // Set the flag to true
    requestedRoute = to.fullPath; // Store the requested route
    next('/login'); // Redirect to login for unauthorized access
  } else {
    next(); // Proceed to the route
  }
});



// Create a navigation guard
router.beforeEach((to, from, next) => {
  // Check if the user is logged in (you should replace this condition)
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  // If the user is logged in and is trying to visit the root URL
  if (userRole && userRole == 'user' && to.path === '/') {
    // Redirect users to /jobs
    next('/jobs')

  } else if(userRole && userRole == 'employer' && to.path === '/') {
    // redirect clients to their dashboard
    next('/client/dashboard');
  }
    else{
      // Otherwise, proceed with the navigation
      next()
    }

  })

export default router
