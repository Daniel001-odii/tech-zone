<nav v-if="oldnav">
    <!-- <div style="margin: 0 auto;" class="flex flex-col justify-between items-start md:items-center text-left md:flex-row"> -->
    <div style="margin: 0 auto;" class=" flex flex-col md:flex-row justify-between">
        <div class="flex flex-row justify-between items-center w-full md:w-[30%]">
            <SiteLogo/>
            <button  @click="nav_visible = !nav_visible" class=" flex font-bold inline-block text-lg md:hidden">
                <i v-if="!nav_visible" class="bi bi-list"></i>
                <i v-if="nav_visible" class="bi bi-x-lg"></i>
            </button>
        </div>

    
        <div  :class="nav_visible ? 'flex':'hidden'" class="md:flex items-center justify-evenly flex-col md:flex-row md:gap-8 md:w-[90%]">
            <div class="flex md:flex-row text-center md:flex px-8 flex-col mt-8 md:flex-row md:gap-8 md:mt-0 transition-transform transform duration-300 ease-in-out">
                <RouterLink to="/" class="nav_link">
                    Home
                </RouterLink>

                <RouterLink to="/jobs" class="nav_link">
                    Find Job
                </RouterLink>

                <RouterLink to="/register/decide" class="nav_link">
                    Post Job
                </RouterLink>

                <RouterLink to="/jobs" class="nav_link">
                    Browse Categories
                </RouterLink>
            </div>

            <div class="flex justify-self-end md:flex gap-3 md:m-0">
                <RouterLink to="/login">
                    <button class="btn rounded-md text-tz_blue hover:text-tz_blue hover:bg-tz_light_blue">Login</button>
                </RouterLink>
                <RouterLink to="/register/decide">
                    <button class="btn rounded-md bg-tz_blue hover:bg-tz_dark_blue text-white">Sign Up</button>
                </RouterLink>
            </div>
        </div>

    </div>
</nav>