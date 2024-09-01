<template>
    <div class="h-full flex flex-col">
                <!-- <PageTitle>Messages</PageTitle> -->
                <div class=" flex flex-row h-full w-full">
                    <!-- LEFT SIDE -->
                    <div class="w-full md:w-[500px] border-r dark:border-r-gray-700 dark:bg-[#1f2a36]">
                        <div class="h-[70px] flex flex-col items-start justify-center border-b dark:border-b-gray-700 p-3">
                            <input type='search' class="w-full h-[40px] form_input" placeholder="search for rooms here" v-model="room_search_term">
                        </div>

                        <!-- {{ this.$route.path }} -->

                        <!-- {{ rooms }} -->
                        <div class=" h-[90%] overflow-y-auto">
                            <!-- MESSAGE ROOMS FOR EMPLOYERS -->
                            <div v-if="user && user.role == 'employer'" @click="selectRoom(room)"  v-for="(room, index) in employer_rooms_list()" :key="index" >
                                <div class="h-[100px] gap-3 border-b  dark:border-b-gray-700 hover:bg-tz_light_blue cursor-pointer flex flex-row items-center justify-start pl-3 relative" :class="selected_room == room ? ' bg-tz_blue text-white hover:text-black dark:hover:text-white':''">
                                    <div class="rounded-full h-12 w-12 profile_image" :style="`background-image: url(${room.user.profile.image_url})`"></div>
                                    <div  class="flex flex-col w-[60%]">
                                        <div class="font-bold">{{ room.user.firstname}} {{ room.user.lastname}} </div>
                                        <span class="text-sm capitalize">{{ room.name.substring(0,50) }}...</span>
                                    </div>
                                    <span class="flex justify-center items-center rounded-full text-sm bg-red-500 h-6 w-6 text-white absolute right-5 border border-white" v-if="room.unread_messages > 0">
                                        {{ room.unread_messages }}
                                    </span>
                                </div>
                            </div>

                            <!-- MESSAGE ROOMS FOR USERS -->
                            <div v-if="user && user.role == 'user'" @click="selectRoom(room)"  v-for="(room, index) in user_rooms_list()" :key="index" >
                                <div class="h-[100px] gap-3 border-b  dark:border-b-gray-700 hover:bg-tz_light_blue cursor-pointer flex flex-row items-center justify-start pl-3 relative" :class="selected_room == room ? ' bg-tz_blue text-white hover:text-black dark:hover:text-white':''">
                                    <!-- <div class="rounded-full h-12 w-12 profile_image" :style="`background-image: url(${room.employer.profile.image_url})`"></div> -->
                                    <div class="rounded-full h-12 w-12 flex justify-center items-center bg-gray-100 text-gray-500 font-bold profile_image">
                                        {{ room.employer.firstname[0] }}{{ room.employer.lastname[0] }} 
                                    </div>
                                    <div  class="flex flex-col w-[60%]">
                                        <div class="font-bold">{{ room.employer.firstname}} {{ room.employer.lastname}} </div>
                                        <span class="text-sm capitalize">{{ room.name.substring(0,50) }}...</span>
                                    </div>
                                    <span class="flex justify-center items-center rounded-full text-sm bg-red-500 h-6 w-6 text-white absolute right-5 border border-white" v-if="room.unread_messages > 0">
                                        {{ room.unread_messages }}
                                    </span>
                                </div>
                            </div>
                            <div v-if="!rooms || rooms.length <= 0" class="text-gray-500 text-center p-8">No Message rooms</div>
                        </div>
                    </div>
                    <!-- /LEFT SIDE ENDS HERE -->

                    <!-- RIGHT SIDE IF A ROOM IS SELECTED -->
                    <div v-if="selected_room" :class="show_chat_room == true ? 'flex' : 'hidden'" class="fixed top-0 left-0 md:relative  w-[100%] flex-col  h-full bg-white dark:bg-gray-700 z-30">
                        <!-- ROOM HEADER AND TITLE BLOCK -->
                        <div class="min-h-[70px] border-b dark:border-b-gray-800 flex flex-row justify-start p-3 gap-3">
                            <button class="md:hidden" @click="show_chat_room = !show_chat_room">
                                <i class="bi bi-arrow-left"></i>
                            </button>
                            <div class="flex flex-col">
                                <span class="font-bold">{{ selected_room.name }}</span>
                                <span class="text-gray-400">initiated {{ formatTimestamp(selected_room.createdAt) }}</span>
                            </div>
                        </div>
                        <div class="pl-10 py-2 border-b dark:border-b-gray-800 flex flex-row gap-3 text-sm">
                            <span class="text-blue-400">Go to Contract</span>
                            <span class="text-blue-400">See Job Application</span>
                        </div>

                        <!-- CHATS CONTAINER -->
                            <div class="h-[80%] p-4 flex flex-col-reverse gap-4 overflow-y-auto relative justify-start">
                                <!-- ALL CHATS ARE DISPLAYED HERE -->
                                <!-- chat box -->

                                <!-- <transition name="fade-up"> -->
                                    <div v-if="opponent_is_typing" class="bg-slate-100 dark:bg-gray-600 dark:text-white rounded-br-xl rounded-t-xl  w-fit p-3 opacity-40">
                                        <div class="loader"></div>
                                    </div>
                                <!-- </transition> -->

                               
                                    <div v-for="(message, message_id) in messages" :key="message_id" class="flex flex-col" :class="message.user == this.user._id ? 'self-end items-end':'self-start items-start'">
                                        <!-- <ActionDropdown>
                                            <button>edit message</button>
                                        </ActionDropdown> -->
                                        <div :class="message.user == this.user._id ? 'bg-tz_blue text-white rounded-bl-xl':'bg-slate-100 dark:bg-gray-600 dark:text-white rounded-br-xl'" :key="message._id" class=" rounded-t-xl max-w-[300px] w-fit p-3 flex flex-col items-end">
                                            <span v-html="message.text" class="whitespace-pre-line"></span>
                                        </div>
                                        <span class="text-[12px] text-gray-" v-if="message.createdAt">{{ convertTimeToAMPM(message.createdAt) }}</span>
                                    </div>

                                <div v-if="loading_chats" class=" bg-white dark:bg-[#27323F] dark:text-white h-full absolute w-full top-0 bottom-0 left-0 flex flex-col justify-center items-center">
                                    <Vue3Lottie
                                        :animationData="loadingChats"
                                        :height="200"
                                        :width="200"
                                    />
                                    <span>Loading your chats..</span>
                                </div>

                                <!-- chat box ends here -->
                            </div>

                            <form @sumbit.prevent="sendMessage" class="h-[10%] flex flex-col justify-center items-center relative">

                                <!-- TYPING STATUS INDICATOR -->
                                <!-- <div v-if="true" class="p-3 w-fit text-sm absolute -top-10 left-4 z-10 bg-slate-100 dark:bg-gray-600 dark:text-white rounded-br-xl">typing...</div> -->

                                <div class="w-full flex flex-row items-center justify-center gap-1">
                                    <button type="button" class="h-10 w-10 flex justify-center items-center bg-transparent p-3 text-gray-500 text-xl">
                                        <i class="bi bi-paperclip"></i>
                                    </button>
                                    <!-- <input type="textarea" @input="validateMessage" class="form_input w-[80%] h-10" placeholder="Type your message here..." v-model="message_text"> -->
                                   
                                    <textarea type="text" @input="validateMessage" class="form_input w-[80%] max-h-12 min-w-12 resize-none overflow-hidden" style="box-sizing: border-box;" placeholder="Type your message here..." v-model="message_text"></textarea>

                                    <button id="send_message_btn" :disabled="!is_valid_message" type="button" @click="sendMessage" class="bg-blue-500 h-10 w-10 flex justify-center items-center rounded-xl text-white p-3 text-xl dark:disabled:bg-gray-500 dark:disabled:text-gray-600 disabled:opacity-30">
                                        <i class="bi bi-send-fill"></i>
                                    </button>

                                </div>
                            </form>
                        <!-- </div> -->
                    </div>

                    <div v-else class="hidden md:flex w-[100%] h-full bg-gray-100 dark:bg-[#27323F] flex-col justify-center items-center p-8 text-center">
                        <!-- <i class="bi bi-file-earmark-lock text-4xl"></i> -->
                        <!-- <p>Your chats are secured</p> -->
                        <Vue3Lottie
                            :animationData="blankMessagePage"
                            :height="200"
                            :width="200"
                        />
                        <p :class="`text-gray-500`">Start Sending a message by clicking on any of the rooms</p>
                    </div>
                    <!-- RIGHT SIDE ENDS HERE -->
                </div>
    </div>
</template>
<script>
import PageTitle from '@/components/PageTitle.vue';
import axios from 'axios';
import blankMessagePage from '../../lottie/blankMessagePage.json';
import loadingChats from '../../lottie/loadingChats.json';
import { formatTimestamp } from '../../utils/dateFormat'
import { formatToRelativeTime } from '../../utils/dateFormat';
import { convertTimeToAMPM } from '../../utils/dateFormat';

import ActionDropdown from '@/components/ActionDropdown.vue';
// socket io for real time messaging...
import io from "socket.io-client";



import { mapActions } from 'vuex';

export default {
    name: "MessagePageView",
    components: { PageTitle, ActionDropdown },
    data(){
        return{
            user: '',
            show_chat_room: false,
            selected_room: '',

            // lottie animation files...
            blankMessagePage,
            loadingChats,

            rooms: [],
            messages: [],

            messaged_users: {},

            headers: {
                Authorization: `JWT ${localStorage.getItem('life-gaurd')}`,
            },
            
            formatTimestamp,
            formatToRelativeTime,
            convertTimeToAMPM,

           message_text: '',

           loading_chats: false,

           chat: {
            sorted: [],
            unsorted: []
           },

           room_search_term: '',

           is_valid_message: false,

           socket: io(this.api_url.split('/').slice(0, 3).join('/'), { autoConnect: true}),
           opponent_is_typing: false,

        }
    },

    methods: {
        validateMessage(){
            const trimmed_msg = this.message_text.trim();
            this.is_valid_message = trimmed_msg.length > 0;
            this.onTyping();
        },

        employer_rooms_list() {
            if(this.rooms){
                return this.rooms.filter((room) => 
                room.name.toLowerCase().includes(this.room_search_term.toLowerCase())
                || room.user.firstname.toLowerCase().includes(this.room_search_term.toLowerCase())
                || room.user.lastname.toLowerCase().includes(this.room_search_term.toLowerCase())
                );
            }
        },

        user_rooms_list() {
            if(this.rooms){
                return this.rooms.filter((room) => 
                room.name.toLowerCase().includes(this.room_search_term.toLowerCase())
                || room.employer.firstname.toLowerCase().includes(this.room_search_term.toLowerCase())
                || room.employer.lastname.toLowerCase().includes(this.room_search_term.toLowerCase())
                );
            }
        },


        // SELECT A PARTICULAR ROOM >>>
        selectRoom(room) {
            this.selected_room = room;

            // display chat for room..
            this.show_chat_room = true;

            // mark messages as read since user opend room..
            this.markBulkMessagesAsRead(room._id);

            // get messages for room
            this.fetchMessages(room._id); 

            

            // re-fetch message room to update...
            // this.getMessageRooms();
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
                // const socket = io(this.api_url.split('/').slice(0, 3).join('/'), { autoConnect: true});
                
               
                
            }
            catch(error){
                console.error("error getting user data: ", error)
            }
        },

        // FETCH USER ROOMS >>>
        async getMessageRooms(){
            const user_id = this.user._id;
            console.log("getting for user id: ", user_id);
            if(this.user && this.$route.path == '/client/messages'){
                
                try{
                    const response = await axios.get(`${this.api_url}/message/employer/${user_id}/rooms`);
                    this.rooms = response.data.rooms.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));;
                    console.log("available message rooms: ", response.data);

                    this.rooms.forEach(room =>{
                        this.socket.emit('join', room._id);
                    });
                    this.socket.on('message', (message) => {
                        // Add received message to the messages array
                        if(message.room == this.selected_room._id){
                            this.messages.unshift(message);
                            console.log('message: ', message)
                        }
                        //scrolls the recipients message box...
                    }); 

                    // auto open room...
                    this.selectRoom(this.rooms[0]);
                    

                }catch(error){
                    console.log("error fetching rooms: ", error)
                }
            } else if(this.user && this.$route.path == '/in/messages'){
                try{
                    const response = await axios.get(`${this.api_url}/message/user/${user_id}/rooms`);
                    this.rooms = response.data.rooms.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));;
                    console.log("available message rooms: ", response.data);

                    this.rooms.forEach(room =>{
                        this.socket.emit('join', room._id);
                    });
                    this.socket.on('message', (message) => {
                        // Add received message to the messages array
                        if(message.room == this.selected_room._id){
                            this.messages.unshift(message);
                            console.log('message: ', message)
                        }
                        //scrolls the recipients message box...
                    });

                    // auto open room...
                    this.selectRoom(this.rooms[0]);

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
            this.loading_chats = true;
            try{
                const response = await axios.get(`${this.api_url}/message/room/${roomId}/messages`);
                console.log("fetched message for room: ", response)
                this.messages = response.data.messages.reverse();
                this.loading_chats = false;
            }catch(error){
                console.log("error loading chats..", error);
                this.loading_chats = false;
            }
        },

        // FOR SENDING MESSAGE >>>
        async sendMessage() {
            this.input_value = this.message_text.trim();
            if(!this.input_value){
                document.getElementById("send_message_btn").disabled = true;
            };

            const payload = {
                text: this.message_text,
                userId: this.user._id,
            }
            // console.log("preparing the send :", payload);
            
            try{
                const response = await axios.post(`${this.api_url}/message/room/${this.selected_room._id}`, payload);
                // console.log("response from msg snt: ", response);
                // pushing message by send function not necessary since its done by socket.io
                // this.messages.unshift(response.data.message);
            }catch(error){
                console.log("error sending message: ", error);
            };
            
            this.message_text = '';
            
        },

         // FOR SENDING TYPING STATUS >>>
        async statusisTyping(status){
            try{
                const headers = this.headers;
                console.log(" you are typing...");
                const user = this.user._id;
                const response = await axios.post(`${this.api_url}/message/room/${this.selected_room._id}/status/${status}`, { user });
            }catch(error){
                console.log("error in typing status: ", error)
            }
        },

        onTyping() {
            // If there's already a timeout in progress, clear it
            if (this.typingTimeout) {
                clearTimeout(this.typingTimeout);
            }
            
            // Set the typing state to true when the user types
            this.statusisTyping('typing');

            // Start a new timeout to check when the user stops typing
            this.typingTimeout = setTimeout(() => {
                // this.isTyping = false;
                this.statusisTyping('idle');
            }, 1000);  // 500ms after the last keystroke, we consider the user to have stopped typing
        },
    
        // MARK ROOM MESSAGES AS READ WHEN OPENED
        async markBulkMessagesAsRead(room_id){
            const headers = this.headers;
            try{
                const response = await axios.put(`${this.api_url}/message/${room_id}/read`, {}, { headers });
                console.log("marked messages as read: ", response);
            }catch(error){  
                console.log("error marking messages as read: ", error);
            }
        },

        // SENDING MSG ALERT TO SIDEBAR
        ...mapActions(['setUnreadMessagesCount', 'incrementUnreadMessagesCount', 'decrementUnreadMessagesCount']),
    },

    created(){
        this.getUserData();

        this.getMessageRooms();

        

        this.socket.on('message', (message) => {
            // Add received message to the messages array
            const room = this.rooms.find(room => room._id == message.room);
            if(room){
                if(room._id != this.selected_room._id){
                    room.unread_messages += 1;
                    console.log("new message for room: ", room);
                    // console.log("check loop room: ", room._id, "and selected room: ", this.selected_room._id)
                }

                if(this.$route.path != '/in/messages' ){
                    // Set the unread messages count
                    this.setUnreadMessagesCount(room.unread_messages);
                } else if (this.$route.path != '/client/messages' ){
                    // Set the unread messages count
                    this.setUnreadMessagesCount(room.unread_messages);
                }
            }
        });


        // GET TYPING STATUS...
        this.socket.on('typing', (payload) => {
            console.log("room payload: ", payload)
           if(payload.status == 'typing' && payload.user != this.user._id){
             this.opponent_is_typing = true;
           } else {
            this.opponent_is_typing = false;
           }
        }); 

    },


}
</script>
<style scoped>
    .profile_image{
        background-size: cover;
        background-position: center;
    }

.fade-up-enter-active, .fade-up-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-up-enter, .fade-up-leave-to /* .fade-up-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(-20px); /* Starts slightly above */
}

.fade-up-enter-to, .fade-up-leave {
  opacity: 1;
  transform: translateY(0);
}

/* HTML: <div class="loader"></div> */
.loader {
  width: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l5 1s infinite linear alternate;
  margin: 0 15px;
}
@keyframes l5 {
    0%  {box-shadow: 12px 0 #000, -12px 0 gray;background: #000 }
    33% {box-shadow: 12px 0 #000, -12px 0 gray;background: gray}
    66% {box-shadow: 12px 0 gray,-12px 0 #000; background: gray}
    100%{box-shadow: 12px 0 gray,-12px 0 #000; background: #000 }
}

</style>