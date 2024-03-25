<template>
     <!-- ALERTS AND NOTIFICS -->
     <div class="fixed bottom-10 right-0 left-0 flex justify-center">
            <div v-for="alert in alerts" class="flex flex-col gap-3 relative">
                <DismissableAlert  :type="alert_type">{{ alert_message }}</DismissableAlert>
            </div>
    </div>
   <FullPageLoading v-if="loading"/>

    <div class="flex flex-row">
        <div class=" h-screen w-full lg:w-3/6 flex flex-col justify-center items-center dark:bg-[#27323F] dark:text-white">
            <div class=" w-fit p-8 max-w-sm">
                    <div class="text-start  w-full mb-5">
                        <h1 class="text-3xl font-bold mb-4">Set Your Password</h1>
                        <span class="">Make sure to use a very secure password.</span>
                    </div>
                    <Alert :type="'danger'" :message="`${error}`" v-if="error"/>
                    
                    <div v-if='passHint && passwordValidation.errors.length > 0' class='hints'>
                        <small v-for='error in passwordValidation.errors'>{{ error }}<br/></small>
                    </div>

                    <form class="flex flex-col gap-4" @submit.prevent="resetPassword">
                        <div class="flex flex-col gap-3">
                            <div class="tz_form_control">
                                <label for="password">Password</label>
                                <input @click="passHint = true" class="form_input" type="password" name="password" id="password" placeholder="a very secure password" v-model="form.password" required>
                            </div>
                        </div>
                        <div class="flex flex-col gap-3">
                            <div class="tz_form_control">
                                <label for="password_confirm">Confirm Password</label>
                                <input class="form_input" type="password" name="password_confirm" id="password_confirm" placeholder="confimr password" v-model="form.password_confirmation" required>
                            </div>
                        </div>
                        <LoaderButton @click="resetPassword" v-if="form.password != '' && form.password == form.password_confirmation" :buttonText="loading ? 'Loading...' : 'Change Password'" :loading="loading"/>
                    </form>
            </div>
        </div>

        <div class=" bg-tz_light_blue hidden lg:flex flex-col justify-center items-center w-3/6 dark:bg-[#1F2A36]">
            <div>
                <img src="../assets/images/tech-zone.svg" width="100px">
            </div>
        </div>
           
    </div>
       

</template>
<script>
import Alert from '@/components/Alert.vue';
import FullPageLoading from '@/components/FullPageLoading.vue';
import LoaderButton from '@/components/LoaderButton.vue';
import axios from 'axios';
import DismissableAlert from '@/components/DismissableAlert.vue';

export default {
    name: "ResetPasswordPageView",
    components: { FullPageLoading, Alert, LoaderButton, DismissableAlert },
    data() {
        return {
            error: '',
            loading: false,
            passHint: false,
            alerts: [],
            form: {
                password: '',
                password_confirmation: ''
            },

            rules: [
				{ message:'One lowercase letter required.', regex:/[a-z]+/ },
				{ message:"One uppercase letter required.",  regex:/[A-Z]+/ },
				{ message:"8 characters minimum.", regex:/.{8,}/ },
				{ message:"One number required.", regex:/[0-9]+/ }
			],
        };
    },
    methods: {

        showAlertBox(type, message){
            this.alerts.push(message);
            this.show_alert = !this.show_alert;
            this.alert_type = type;
            this.alert_message = message;
        },

        async resetPassword(){
            this.loading = true;
            const form = {
                new_password: this.form.password,
                reset_token: this.$route.params.reset_token
            };

            try{
                const response = await axios.post(`${this.api_url}/password/reset`, form);
                console.log("pass reset response: ", response);
                const message = response.data.message;

                this.loading = false;
                showAlertBox("success", message);
                this.$router.push("/login");
            }catch(error){
                this.error = error.response.data.message;
                this.loading = false;
            }
        }
       
    },

    computed:{
        passwordValidation () {
			let errors = []
			for (let condition of this.rules) {
				if (!condition.regex.test(this.form.password)) {
					errors.push(condition.message)
				}
			}
			if (errors.length === 0) {
				return { valid:true, errors }
			} else {
				return { valid:false, errors }
			}
		}
    },
}
</script>
<style scoped>
    .tz_form_control{
        @apply flex flex-col justify-start text-start 
    }
</style>