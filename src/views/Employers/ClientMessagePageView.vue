<template>
    <div class="h-full flex flex-col">
                <PageTitle>Messages</PageTitle>
                <div class=" flex flex-row h-full w-full">
                    <!-- LEFT SIDE -->
                    <div class="w-full md:w-[500px] border-r dark:border-r-gray-700 dark:bg-[#1f2a36]">
                        <div class="h-[70px] flex flex-col items-start justify-center border-b dark:border-b-gray-700 p-3">
                            <input type='search' class=" w-3/6 md:w-full h-[40px] form_input" placeholder="search for rooms here">
                        </div>

                        <!-- {{ rooms }} -->
                        <div class=" h-[90%] overflow-y-scroll">
                            <div  @click="selectRoom(room)"  v-for="(room, index) in rooms" :key="index" >
                                <div class="h-[100px] gap-3 border-b  dark:border-b-gray-700 hover:bg-tz_blue cursor-pointer flex flex-row items-center justify-start pl-3" :class="selected_room == room ? ' bg-tz_blue':''">
                                    <div class="rounded-full h-12 w-12 profile_image" :style="`background-image: url(${room.user.profile.image_url})`"></div>
                                    <div  class="flex flex-col w-[60%]">
                                        <div class="font-medium">{{ room.user.firstname}} {{ room.user.lastname}} </div>
                                        <span class="text-sm">{{ room.name }}</span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="!rooms || rooms.length <= 0" class="text-gray-500 text-center p-8">No Message rooms</div>
                        </div>

                       
                    </div>
                    <!-- /LEFT SIDE ENDS HERE -->

                    <!-- RIGHT SIDE IF A ROOM IS SELECTED -->
                    <div v-if="selected_room" :class="show_chat_room == true ? 'flex' : 'hidden'" class=" hidden absolute top-0 left-0 md:relative md:flex w-[100%] flex-col ">
                        <!-- ROOM HEADER AND TITLE BLOCK -->
                        <div class="h-[70px] border-b dark:border-b-gray-700 flex flex-col justify-center p-3">
                            <span class="font-medium">{{ selected_room.name }}</span>
                            <span class="text-gray-400">started {{ formatTimestamp(selected_room.createdAt) }}</span>
                        </div>
                        <div class="p-2 border-b dark:border-b-gray-700 flex flex-row gap-3">
                            <span class="text-blue-400">Go to Contract</span>
                            <span class="text-blue-400">See Job Application</span>
                        </div>

                        <!-- CHATS CONTAINER -->
                            <div class="h-[85%] p-4 flex flex-col-reverse gap-4 overflow-y-auto relative">
                                <!-- ALL CHATS ARE DISPLAYED HERE -->
                                <!-- chat box -->

                                <div v-for="message in messages" :class="{'bg-tz_blue text-white self-end': message.user == this.user._id,'bg-gray-700 text-white': message.user == user._id}" :key="message._id" class=" max-w-[300px] w-fit p-3 rounded-t-xl rounded-bl-xl">
                                    {{ message.text }} <br/>
                                    from: {{ message.user }}
                                </div>

                                <div class="bg-red-300">{{ messages }}</div>
                                <!-- chat box ends here -->
                            </div>

                            <form @sumbit.prevent="sendMessage" class="h-[15%] flex justify-center items-center">
                                
                                <div class="w-full flex flex-row items-center justify-center gap-1">
                                    <button class="h-10 w-10 flex justify-center items-center bg-transparent p-3 text-gray-500 text-xl">
                                        <i class="bi bi-paperclip"></i>
                                    </button>
                                    <!-- <input type="textarea" class="form_input w-[80%] h-10"> -->
                                    <textarea type="text" class="form_input w-[80%] h-10" placeholder="Type your message here..." v-model="message_text"></textarea>

                                    <button :disabled="message_text == ''" type="button" @click="sendMessage" class="bg-blue-500 h-10 w-10 flex justify-center items-center rounded-xl text-white p-3 text-xl">
                                        <i class="bi bi-send-fill"></i>
                                    </button>

                                </div>
                            </form>
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
import { formatTimestamp } from '../../utils/dateFormat'

export default {
    name: "ClientMessagePageView",
    components: { PageTitle },
    data(){
        return{
            user: '',
            show_chat_room: false,
            selected_room: '',
            blankMessagePage,

            rooms: [],
            messages: [],

            messaged_users: {},

            headers: {
                    Authorization: `JWT ${localStorage.getItem('life-gaurd')}`, // Assuming it's a JWT token
                },
            
            formatTimestamp,

           message_text: '',

        }
    },

    methods: {
        // SELECT A PARTICULAR ROOM >>>
        selectRoom(room) {
            this.selected_room = room;
            this.fetchMessages(room._id);

            // Initialize WebSocket connection for real-time updates
            const socket = io('http://localhost:8000');
            socket.emit('join', room._id);
            socket.on('message', (message) => {
                // Add received message to the messages array
                this.messages.unshift(message);
                //scrolls the recipients message box...
            });
        },

        // GET USER DATA >>>
        async getUserData(){
            try{
                const headers = this.headers;
                const response = await axios.get(`${this.api_url}/user`, { headers });
                console.log("fetched user data :", response);
                this.user = response.data.user;   
                
                // GET USER MESSAGE ROOMS...
                this.getMessageRooms();
            }
            catch(error){
                console.error("error getting user data: ", error)
            }
        },

        // FETCH USER ROOMS >>>
        async getMessageRooms(){
            if(this.user){
                const user_id = this.user._id;
                try{
                    const response = await axios.get(`${this.api_url}/message/employer/${user_id}/rooms`);
                    console.log("available message rooms: ", response.data);
                    this.rooms = response.data.rooms;
                }catch(error){
                    console.log("error fetching rooms: ", error)
                }
            }
        },

        // GET USER DATA BY USER DATA >>>
        async getUserDataById(user_id){
            this.loading = true;
            try{
                const response = await axios.get(`${this.api_url}/user/${user_id}`);
                console.log("messaged user: ", response);

                // check if current user detail is fetched before prefilling array
                if(!this.messaged_users[user_id]){
                    this.messaged_users[user_id] = response.data.user;
                }
                
                this.loading = false;
                // return this.messaged_users[user_id];
            }catch(error){
                console.log("error fetching public user data", error);
                this.loading = false;
            }
        },
        
         // FETCH MESSAGES FOR A ROOM >>>
         async fetchMessages(roomId) {
            // Fetch messages for the selected room using Axios
            this.messageIsLoading = true;
            try{
                const response = await axios.get(`${this.api_url}/message/room/${roomId}/messages`);
                console.log("fetched message for room: ", response)
                this.messages = response.data.messages.reverse();
                this.messageIsLoading = false;
            }catch(error){

            }
        },

        // FOR SENDING MESSAGE >>>
        async sendMessage() {
            const payload = {
                text: this.message_text,
                userId: this.user._id,
            }
            console.log("preparing the send :", payload)
            try{
                const response = await axios.post(`${this.api_url}/message/room/${this.selected_room._id}`, payload);
                console.log("response from msg snt: ", response);
            }catch(error){
                console.log("error sending message: ", error);
            }
            this.message_text = '';
        },
    },

    mounted(){
        this.getUserData();
        
    }
}
</script>
<style scoped>
    .profile_image{
        background-size: cover;
        background-position: center;
    }
</style>