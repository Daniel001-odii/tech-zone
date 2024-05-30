<template>
        
        <div class="w-full min-h-screen  flex flex-col justify-center items-center wl-background relative">
            <img src="../../public/apex-tek-white.svg" class=" w-36 absolute top-10 left-10">



            <div class="flex flex-col-reverse mt-40 md:mt-0 md:flex-row w-full p-8 text-white justify-center items-center">

                <!-- TEXT WRITE UP -->
                <div class="flex flex-col w-full md:w-[50%] md:text-left text-center">
                    <span class=" text-6xl font-medium leading-[85px] ">
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
                        <input type="email" required class="text-sm rounded-md px-6 h-14 w-full  text-gray-600" placeholder="youemail@gmail.com" v-model="email"/>
                        <button class="gradient-button text-sm w-full ">
                            <span class="btn-text font-bold">Join Waitlist</span>
                        </button>
                    </form>
                </div>

                <!-- RIGHT SIDE IMAGE -->
                <div class="w-full h-[400px] md:h-[600px] md:w-[60%] flex-grow-1 relative flex justify-center items-center right-image">
                </div>
            </div>


        </div>
        <MiniFooter/>
</template>

<script>
    import StrikeLineSvg from '@/components/StrikeLineSvg.vue';
    import MiniFooter from '@/components/MiniFooter.vue';

    export default {
        name: "WaitListPageView",
        components: {
            StrikeLineSvg,
            MiniFooter,
        },
        data(){
            return {

            }
        }
    }
</script>

<style scoped>
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