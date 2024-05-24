<template>

<!-- TOAST -->
    <Toast/>
<!-- ***** -->


   <FullPageLoading v-if="loading"/>

    <div class=" min-h-screen bg-[#E7F1FF] flex flex-col">
            <div class=" my-auto mx-0 flex flex-col justify-center items-center">

                <div class=" w-fit p-8 max-w-md bg-white rounded-xl" v-if="is_valid_token && !loading">
                    <!-- <div class="text-start  w-full mb-5">
                        <h1 class="text-3xl font-bold mb-4">Reset Password</h1>
                        <span class="">Make sure to use a very secure password.</span>
                    </div> -->
                    <RouterLink to="/">
                        <img src="../../public/apex-tek.svg" class=" h-10 w-full">
                    </RouterLink>
                        <div class="w-full mb-5">
                            <h1 class="text-2xl font-bold mt-5">Reset Password</h1>
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
                                <input class="form_input" type="password" name="password_confirm" id="password_confirm" placeholder="confirm password" v-model="form.password_confirmation" required>
                            </div>
                        </div>
                        <!-- <LoaderButton @click="resetPassword" v-if="form.password != '' && form.password == form.password_confirmation" :buttonText="loading ? 'Loading...' : 'Change Password'" :loading="loading"/> -->
                        <button type="submit" class=" bg-tz_blue text-white font-medium p-3 rounded-full" >Change Password</button>
                    </form>
            </div>
            <div v-if="!is_valid_token && !loading" class="text-center">
                <span class="text-red-500 text-xl text-center">
                    Token invalid or expired
                    <p class="text-sm">Please request for a new password reset link</p>
                </span>
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
import Toast from 'primevue/toast';



export default {
    name: "ResetPasswordPageView",
    components: { 
        FullPageLoading, 
        Alert, 
        LoaderButton, 
        DismissableAlert,
        Toast, 
    },
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

            is_valid_token: true,
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
                this.$toast.add({ severity: 'success', summary: 'Success Message', detail: `${response.data.message}`, life: 3000 });
                this.$router.push("/login");
            }catch(error){
                this.$toast.add({ severity: 'error', summary: 'Error Message', detail: `${error.response.data.message}`, life: 3000 });
                this.error = error.response.data.message;
                this.loading = false;
            }
        },

        async checkResetToken(){
            try{
                this.loading = true;
                const response = await axios.get(`${this.api_url}/password/${this.$route.params.reset_token}/check`);
                console.log("checking reset token: ", response);
                this.is_valid_token = true;
                this.loading = false;
            } catch(error){
                console.log("error checking reset token: ", error);
                this.is_valid_token = false;
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

    created(){
        this.checkResetToken();
    }
}
</script>
<style scoped>
    .tz_form_control{
        @apply flex flex-col justify-start text-start 
    }
</style>