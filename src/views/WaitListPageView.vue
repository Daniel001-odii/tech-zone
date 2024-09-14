<template>
        
        <div class="w-full min-h-screen  flex flex-col justify-center items-center wl-background relative">
            <img src="../../public/apex-tek-white.svg" class=" w-36 absolute top-10 left-10">



            <div v-if="false" class="flex flex-col-reverse mt-40 md:mt-0 md:flex-row w-full p-8 text-white justify-center items-center">

                <!-- TEXT WRITE UP -->
                <div class="flex flex-col w-full md:w-[50%] md:text-left text-center">
                    <span class=" text-6xl font-medium leading-[85px] title">
                        Find Your <span class="relative"> dream <StrikeLineSvg class="absolute top-[55px] left-0 right-0 li"/></span> Job.<br/> Hire the right talents.
                    </span>
                    <span class=" text-[16px]">
                        At Apex Technologies, we serve as a comprehensive marketplace, <br/>
                        facilitating seamless connections between companies seeking tech expertise and skilled professionals
                            looking for temporary contract opportunities. Through our platform, companies can find the right talent for their projects,
                            whether they're large corporations embarking on ambitious ventures or small businesses in need of specialized skills. 
                    </span>

                    <!-- FORM AREA -->
                    <form @submit.prevent="joinWaitList" class="flex  flex-col md:flex-row gap-2 mt-8 w-full">
                        <p class="text-red-400 font-bold p-3 inline-block" v-if="error"> {{  error }}</p>
                        <input type="email" required class="text-sm rounded-md px-6 h-14 w-full md:w-[60%]  text-gray-600" placeholder="youemail@gmail.com" v-model="user_form.email"/>
                        <button :disabled="loading" type="submit" class="gradient-button text-sm w-full md:w-[40%]">
                            <span class="btn-text font-bold" v-if="loading">loading...</span>
                            <span class="btn-text font-bold" v-else>Join Waitlist</span>
                        </button>
                    </form>
                </div>

                <!-- RIGHT SIDE IMAGE -->
                <div class="w-full h-[400px] md:h-[600px] md:w-[60%] flex-grow-1 relative flex justify-center items-center right-image">
                </div>
            </div>
            


            <div v-if="true" class="flex flex-col text-center justify-center items-center h-full p-8">
              <!--   <Vue3Lottie
                    :animationData="contractOffer"
                    :height="200"
                    :width="200"
                /> -->
                <h1 class="font-bold text-4xl text-blue-300">🎉 <br/>Thank you for joining our waitlist! </h1><br/>
                <p class="text-slate-300 text-center text-xl max-w-96">
                    We’re excited to have you on board and can’t wait to share our platform with you soon.
                    we'll let you know by email as soon as we go live fully.<br/>
                    <br/>In the meantime, follow us on social media for updates and sneak peeks!
                </p>
                <div class="flex flex-row gap-4 justify-center items-center text-white text-xl mt-4">
                    <a href="https://www.instagram.com/apexteks?igsh=MW5rYnhnbXQwa2Ridg==" target="_blank">
                        <i class="bi bi-instagram hover:text-blue-300"></i>
                    </a>
                    <a href="https://x.com/apexteks?s=21" target="_blank">
                        <i class="bi bi-twitter hover:text-blue-300"></i>
                    </a>
            
                    <a href="https://www.linkedin.com/company/apexteks/" target="_blank">
                        <i class="bi bi-linkedin hover:text-blue-300"></i>
                    </a>

                </div>
            </div>


        </div>
        <!-- <MiniFooter/> -->
</template>

<script>
    import StrikeLineSvg from '@/components/StrikeLineSvg.vue';
    import MiniFooter from '@/components/MiniFooter.vue';
    import axios from 'axios';
    import contractOffer from '../lottie/contract-offer.json'

    export default {
        name: "WaitListPageView",
        components: {
            StrikeLineSvg,
            MiniFooter,
        },
        data(){
            return {
                form_filled: false,
                contractOffer,
                loading: false,
                user_form: {
                    email: '',
                },
                error: '',
            }
        },

        methods:{
            async joinWaitList(){
                try{
                    this.loading = true;
                    const response = await axios.post(`${this.api_url}/onboard`, this.user_form);
                    console.log(response);
                    this.form_filled = true;
                    this.loading = false;
                }catch(error){
                    console.log(error);
                    this.error = error.response.data.message;
                    this.loading = false;
                }
            }
        }
    }
</script>

<style scoped>
.title{
  font-family: "Inconsolata", monospace;
  font-optical-sizing: auto;
  font-weight: bold;
  font-style: normal;
  font-variation-settings:
    "wdth" 100;
}

.wl-background{
    background-image: url('../assets/images/Waitlist_bg.png');
    background-size: cover;
    background-position: center;
    background-origin: content-box
}

.right-image{
    background-image: url('../assets/images/waitList_hero.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}


.gradient-button {
    display: inline-block;
    padding: 10px 20px;
    /* font-size: 18px; */
    font-weight: bold;
    color: transparent;
    background: linear-gradient(to right, #8e44ad, #3498db);
    background-clip: text;
    -webkit-background-clip: text;
    border: 2px dotted;
    border-image-slice: 1;
    border-width: 2px;
    border-image-source: linear-gradient(to right, #8e44ad, #3498db);
    /* border-radius: 15px; */
    text-align: center;
    text-decoration: none;
    transition: background 0.3s, color 0.3s;
}

.gradient-button:hover {
    background: linear-gradient(to right, #8e44ad, #3498db);
    color: #fff;
    background-clip: border-box;
    -webkit-background-clip: border-box;
    
}

.gradient-button:disabled::after{
    content: none;
}

.gradient-button::after {
    content: '→';
    display: inline-block;
    margin-left: 10px;
    transition: transform 0.3s;
}

.gradient-button:hover::after {
    transform: translateX(5px);
}
</style>