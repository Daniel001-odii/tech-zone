<template>
    <div class="h-full flex flex-col">
                <PageTitle>Messages</PageTitle>
                <div class=" flex flex-row h-full w-full">
                    <!-- LEFT SIDE -->
                    <div class="w-full md:w-[450px] border-r dark:border-r-gray-700">
                        <div class="h-[70px] flex flex-col items-start justify-center border-b dark:border-b-gray-700 p-3">
                            <input type='search' class=" w-3/6 md:w-[150px] h-[40px] form_input" placeholder="search for rooms here">
                        </div>

                        <div class=" h-[90%] overflow-y-scroll">
                            <div  @click="selectRoom(room)" class="h-[70px] gap-3 border-b dark:border-b-gray-700 hover:bg-tz_light_blue cursor-pointer flex flex-row items-center justify-start pl-3" v-for="(room, index) in rooms" :key="index">
                                <div class="rounded-full h-12 w-12 bg-blue-500"></div>
                                <div clas=" flex flex-col">
                                    <div class="font-medium">Odii Daniel room</div>
                                    <span class="text-sm">Web Development Jo..</span>
                                </div>
                            </div>

                            <div v-if="!rooms || rooms.length <= 0" class="text-gray-500 text-center p-8">No Message rooms</div>
                        </div>
                    </div>
                    <!-- /LEFT SIDE ENDS HERE -->

                    <!-- RIGHT SIDE IF A ROOM IS SELECTED -->
                    <div v-if="true" :class="show_chat_room == true ? 'flex' : 'hidden'" class=" hidden absolute top-0 left-0 md:relative md:flex w-[100%] flex-col">
                        <!-- ROOM HEADER AND TITLE BLOCK -->
                        <div class="h-[70px] border-b dark:border-b-gray-700 flex flex-col justify-center p-3">
                            <span class="font-medium">Alex Ferguson</span>
                            <span class="text-gray-400">Web Development Project | started April 1 2024</span>
                        </div>
                        <div class="p-2 border-b dark:border-b-gray-700 flex flex-row gap-3">
                            <span class="text-blue-400">Go to Contract</span>
                            <span class="text-blue-400">See Job Application</span>
                        </div>

                        <!-- CHATS CONTAINER -->
                            <div class="h-[85%] p-4 flex flex-col-reverse gap-4 overflow-y-auto relative">
                                <!-- ALL CHATS ARE DISPLAYED HERE -->

                                <!-- chat box -->
                                <div v-for="message in messages" :class="{'bg-tz_blue text-white self-end': message.user == user._id,'bg-gray-700 text-white': message.user != user._id}" :key="message._id" class=" max-w-[300px] w-fit p-3 rounded-t-xl rounded-bl-xl">
                                    {{ message.text }}
                                </div>


                                <div 
                                class="msg_box" >
                                <div class="msg_tex">
                                    
                                    <br/>
                                    <!-- <span class="msg_time">{{ formatTimestamp(message.created) }}</span> -->
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
                    </div>

                    <div v-else class=" absolute top-0 left-0 md:relative md:flex w-[100%] flex-col justify-center items-center text-center">
                        <Vue3Lottie
                            :animationData="blankMessagePage"
                            :height="200"
                            :width="200"
                        />
                        <p class="text-gray-500 text-xl">Start Sending a message <br/>by clicking on any of the rooms</p>
                    </div>
                    <!-- RIGHT SIDE ENDS HERE -->
                </div>
    </div>
</template>
<script>
import PageTitle from '@/components/PageTitle.vue';
import axios from 'axios';
import io from 'socket.io-client';
import blankMessagePage from '../../lottie/blankMessagePage.json';

export default {
    name: "MessagePageView",
    components: { PageTitle },
    data(){
        return{
            user: '',
            show_chat_room: false,
            // messages: [],
            selectedRoom: '',
            blankMessagePage,
            rooms: [],

            headers: {
                    Authorization: `JWT ${localStorage.getItem('life-gaurd')}`, // Assuming it's a JWT token
                },

            messages: [
            {
      "_id": 123456,
      "user": "65e4d82512ece25e3813061d",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      "_id": 789012,
      "user": "65e4d82512ece25e381306d",
      "text": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "_id": 345678,
      "user": "65e4d82512ece25e3813061d",
      "text": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      "_id": 901234,
      "user": "65e4d82512ece25e381301d",
      "text": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      "_id": 567890,
      "user": "65e4d82512ece25e3813061d",
      "text": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
            ],
        }
    },

    methods: {
        // get user's rooms..
        async getMessageRooms(){
            try{
                const response = await axios.get(`${this.msg_api_url}/rooms/${this.user._id}`);
                console.log("user rooms: ", response.data);
            }catch(error){
                console.log("error fetching rooms: ", error)
            }
        },

        async fetchMessages(roomId) {
            // Fetch messages for the selected room using Axios
            this.messageIsLoading = true;
            try{
                const response = await axios.get(`${this.message_api_url}/api/messages/${roomId}`);
                this.messages = response.data.reverse();
                this.messageIsLoading = false;
            }catch(error){

            }
        },
        
        selectRoom(room) {
            this.selectedRoom = room;
            this.fetchMessages(room._id);

            // Initialize WebSocket connection for real-time updates
            const socket = io(this.message_api_url);

            socket.emit('join', room._id);

            socket.on('message', (message) => {
                // Add received message to the messages array
                this.messages.unshift(message);
                //scrolls the recipients message box...
                // this.scrollChatsToBottom();
            });

            if(this.messages){
                this.scrollChatsToBottom();
            }

        },

        async getUserData(){
            try{
                const headers = this.headers;
                const response = await axios.get(`${this.api_url}/user`, { headers });
                // console.log("fetched user data :", response);
                this.user = response.data.user;                
            }
            catch(error){
                console.error(error)
            }
        },
    },

    mounted(){
        this.getUserData();
    }
}
</script>
<style scoped>
    
</style>