<template>
    <!-- <div class="p-8 flex flex-col justify-center items-center mx-auto text-center w-full h-screen dark:bg-[#27323F] dark:text-white"> -->
    <!-- <div class="p-8 flex flex-col justify-center items-center mx-auto text-center w-full h-screen bg-[#E7F1FF]"> -->
    <div class="flex flex-col justify-center items-center p-6">
        <RouterLink to="/" class="mt-40">
            <img src="../../public/apex-tek.svg" class=" inline-block h-[35px] md:h-[50px] ">
        </RouterLink>
        
        <div class=" flex flex-col justify-center items-center">
            <h1 class="text-4xl p-4 mt-8">Join as an employer or freelancer</h1>
            <div class="flex flex-row flex-wrap gap-4 justify-center p-4">
                <label class="selection_box" :class="user_type == 'employer' ? 'active':''">
                    <input name="userType" type="radio" id="employer" value="employer" v-model="user_type" class=" h-5 w-5">
                    <p class=" box_title">
                        <i class="bi bi-person-up"></i>
                        <span>
                            I'm an employer hiring for a project or contract.
                        </span>
                    </p>
                </label>

                <label class="selection_box"  :class="user_type == 'freelancer' ? 'active':''">
                    <input name="userType" type="radio" id="freelancer" value="freelancer" v-model="user_type"  class=" h-5 w-5">
                    <p class=" box_title">
                        <i class="bi bi-person-down"></i>
                        <span>
                            I'm a freelancer looking for work
                        </span>
                    </p>
                </label>
            </div>
            <RouterLink :to="user_type === 'employer' ? '/register/client' : (user_type === 'freelancer' ? '/register' : '')">
                <button class="bg-tz_blue p-3 text-white rounded-lg" :disabled="!user_type">
                    <span v-if="!user_type">
                    Create Account
                    </span>
                    <span v-if="user_type">
                    Join as {{ user_type }}
                    </span>
                </button>
            </RouterLink>
        </div>
    </div>
</template>

<script>
import SiteLogo from '@/components/SiteLogo.vue';

    export default {
    name: "RegistrationDecision",
    data() {
        return {
            user_type: '',
            register_page: '',
        };
    },
    methods: {
        selectUserType(user_type) {
            this.user_type = user_type;
        }
    },
    components: { SiteLogo }
}
</script>

<style scoped>
    .selection_box{
       @apply flex flex-row-reverse justify-between items-start rounded-lg border-gray-400 border-2 w-full md:w-fit p-5 hover:bg-tz_light_blue
    }

    .box_title{
        @apply flex flex-col w-52 text-left text-3xl
    }
    .active{
        @apply bg-tz_light_blue border-tz_blue
    }
</style>