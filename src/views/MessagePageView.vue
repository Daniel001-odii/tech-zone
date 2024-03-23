<template>
    <div class="h-full flex flex-col">
                <PageTitle>Messages</PageTitle>
                <div class=" flex flex-row h-full w-full">
                    <!-- LEFT SIDE -->
                    <div class="w-full md:w-[300px] border-r dark:border-r-gray-700">
                        <div class="h-[70px] flex flex-col items-start justify-center border-b dark:border-b-gray-700 p-3">
                            <input type='search' class=" w-3/6 md:w-[150px] h-[40px] form_input" placeholder="search for rooms here">
                        </div>

                        <div @click="show_chat_room = !show_chat_room" class="h-[70px] gap-3 border-b dark:border-b-gray-700 hover:bg-tz_light_blue cursor-pointer flex flex-row items-center justify-start pl-3" v-for="box in 6">
                            <div class="rounded-full h-12 w-12 bg-blue-500"></div>
                            <div clas=" flex flex-col">
                                <div class="font-medium">Odii Daniel room</div>
                                <span class="text-sm">Web Development Jo..</span>
                            </div>
                        </div>
                    </div>
                    <!-- /LEFT SIDE ENDS HERE -->

                    <!-- RIGHT SIDE -->
                    <div :class="show_chat_room == true ? 'flex' : 'hidden'" class=" hidden absolute top-0 left-0 md:relative md:flex w-[100%] flex-col">
                        <div class="h-[70px] border-b dark:border-b-gray-700 flex flex-col justify-center p-3">
                            <span class="font-medium">Alex Ferguson</span>
                            <span class="text-gray-400">Web Development Project</span>
                        </div>
                        <div class="p-2 border-b dark:border-b-gray-700 flex flex-row gap-3">
                            <span class="text-blue-400">Go to Contract</span>
                            <span class="text-blue-400">See Job Application</span>
                        </div>

                        <!-- <div clas="h-full border border-green-300"> -->
                            <div class="h-[85%] p-4 flex flex-col gap-4 overflow-y-scroll">

                                
<div class="flex items-start gap-2.5">
   <img class="w-8 h-8 rounded-full" src="../assets/images/Group 284.png" alt="Jese image">
   <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
         <span class="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
         <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
      </div>
      <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">That's awesome. I think our users will really appreciate the improvements.</p>
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
   </div>
   <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
         <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
      </svg>
   </button>
   <div id="dropdownDots" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
         <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
         </li>
         <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
         </li>
         <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
         </li>
         <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
         </li>
         <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
         </li>
      </ul>
   </div>
</div>


<div class="flex items-start gap-2.5">
   <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie Green image">
   <div class="flex flex-col gap-1">
      <div class="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
         <div class="flex items-center space-x-2 rtl:space-x-reverse mb-2">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
         </div>
         <p class="text-sm font-normal text-gray-900 dark:text-white">This is the new office <3</p>
         <div class="grid gap-4 grid-cols-2 my-2.5">
            <div class="group relative">
                <div class="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <button data-tooltip-target="download-image-1" class="inline-flex items-center justify-center rounded-full h-8 w-8 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50">
                        <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
                        </svg>
                    </button>
                    <div id="download-image-1" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Download image
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
                <img src="../assets/images/Group 281.png" class="rounded-lg" />
            </div>
            <div class="group relative">
                <div class="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <button data-tooltip-target="download-image-2" class="inline-flex items-center justify-center rounded-full h-8 w-8 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50">
                        <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
                        </svg>
                    </button>
                    <div id="download-image-2" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Download image
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
                <img src="../assets/images/Group 284.png" class="rounded-lg" />
            </div>
            <div class="group relative">
                <div class="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <button data-tooltip-target="download-image-3" class="inline-flex items-center justify-center rounded-full h-8 w-8 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50">
                        <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
                        </svg>
                    </button>
                    <div id="download-image-3" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Download image
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
                <img src="../assets/images/Group 285.png" class="rounded-lg" />
            </div>
            <div class="group relative">
                <button class="absolute w-full h-full bg-gray-900/90 hover:bg-gray-900/50 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <span class="text-xl font-medium text-white">+7</span>
                    <div id="download-image" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Download image
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </button>
                <img src="../assets/images/Group 281.png" class="rounded-lg" />
            </div>
         </div>
         <div class="flex justify-between items-center">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
            <button class="text-sm text-blue-700 dark:text-blue-500 font-medium inline-flex items-center hover:underline">
                <svg class="w-3 h-3 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
                </svg>
            Save all</button>
         </div>
      </div>
   </div>
   <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
         <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
      </svg>
   </button>
   <div id="dropdownDots" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
         <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
         </li>
         <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
         </li>
         <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
         </li>
         <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
         </li>
         <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
         </li>
      </ul>
   </div>
</div>



                            </div>
                                <div class="h-[15%] flex justify-center items-center">
                                    <div class="w-full flex flex-row items-center justify-center gap-1">
                                        <button class="h-10 w-10 flex justify-center items-center bg-transparent p-3 text-gray-500 text-xl">
                                            <i class="bi bi-paperclip"></i>
                                        </button>
                                        
                                        <input type="text" class="form_input w-[80%] h-10" placeholder="Type your message here...">

                                        <button class="bg-blue-500 h-10 w-10 flex justify-center items-center rounded-xl text-white p-3 text-xl">
                                            <i class="bi bi-send-fill"></i>
                                        </button>

                                    </div>
                                </div>
                        <!-- </div> -->
                    <!-- RIGHT SIDE ENDS HERE -->
                </div>
                </div>
    </div>
</template>
<script>
import TemplateView from './TemplateView.vue';
import PageTitle from '@/components/PageTitle.vue';


export default {
    name: "MessagePageView",
    components: { TemplateView, PageTitle },
    data(){
        return{
            show_chat_room: false,
        }
    }
}
</script>
<style scoped>
    
</style>