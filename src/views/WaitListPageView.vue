<template>
    <div class="flex flex-col justify-center items-center min-h-screen wl-background relative">
        <!-- <img src="../../public/apex-tek-white.svg" class="  w-52 absolute left-14 top-14"> -->
        <section class="flex flex-col p-8">
                <div class="flex md:flex-row  flex-col-reverse gap-5 container">
                    <div class="flex flex-col text-center md:text-left justify-center items-center md:items-start gap-6 md:w-[50%] text-white">
                        <img src="../../public/apex-tek-white.svg" class=" w-52">
                        <!-- <div class="text-sm bg-tz_light_blue p-2 text-center text-tz_blue rounded-md w-fit">                           
                            <i class="bi bi-hand-thumbs-up-fill"></i> <span>Best Job Solution Platform</span>
                        </div> -->
                        <div class=" text-6xl font-medium leading-[85px] ">
                            Find Your <span class="relative"> dream <StrikeLineSvg class="absolute top-[55px] left-0 right-0 li"/></span> Job.<br/> Hire the right talents.
                        </div>
                        <div class=" text-[16px]">
                            At Apex Technologies, we serve as a comprehensive marketplace, <br/>
                            facilitating seamless connections between companies seeking tech expertise and skilled professionals
                             looking for temporary contract opportunities. Through our platform, companies can find the right talent for their projects,
                             whether they're large corporations embarking on ambitious ventures or small businesses in need of specialized skills. 
                        </div>
                        
                    </div>
                  
                    <div class="w-full md:w-[50%] relative flex justify-center items-center">
                        <img class=" w-96 md:w-full" src="../assets/images/waitList_hero.png">
                    </div>
                </div>

                <form @submit.prevent="joinWaitList" class="flex flex-row flex-wrap gap-5  mt-2 w-fit">
                    <input type="email" required class="rounded-md px-6 h-14 w-auto text-gray-600" placeholder="youemail@gmail.com" v-model="email"/>
                    <button class="gradient-button">
                        <span class="btn-text font-bold">Join Waitlist</span>
                        <!-- <i class="bi bi-arrow-right"></i> -->
                    </button>
                </form>
                
            </section>
    </div>
</template>

<script>

    export default {
        name: "WaitListPageView",
        data(){
            return {
                email: '',
            }
        },

        methods:{
            async joinWaitList(){
                try{

                }catch(error){

                }
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

.gradient-button {
            display: inline-block;
            padding: 15px 30px;
            font-size: 18px;
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


.button-now{
    background-image:
    radial-gradient(circle closest-side, red calc(100% - 0.5px), transparent 100%),
    radial-gradient(circle closest-side, green calc(100% - 0.5px), transparent 100%),
    radial-gradient(circle closest-side, blue calc(100% - 0.5px), transparent 100%),
    radial-gradient(circle closest-side, orange calc(100% - 0.5px), transparent 100%);
    background-position: 0 0, 100% 0, 0 100%;
    background-repeat: repeat-x, repeat-y;
    background-size: 1em 4px, 4px 1em;
    /* width: 320px;
    height: 240px; */
}

</style>