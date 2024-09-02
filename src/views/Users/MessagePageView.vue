<template>


<!-- MODAL FOR IN-MESSAGE IMAGE PREVIEW -->
<div v-if="image_preview_modal" class="flex flex-col fixed top-0 left-0 h-screen bg-[rgba(0,0,0,0.8)] dark:bg-[rgba(0,0,0,0.8)] w-full z-40 justify-center items-center">
    <button type="button" class=" !size-[20px] rounded-full flex justify-center items-center absolute top-5 right-5 text-2xl" @click="image_preview_modal = !image_preview_modal">
        <i class="bi bi-x-lg"></i>
    </button>
    <div class="bg-white flex justify-center items-center">
        <img :src="image_to_preview">
    </div>
</div>

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

                            

                            
                                <div v-for="(message, message_id) in messages" :key="message_id" class="flex flex-col border-red-50" :class="message.user == this.user._id ? 'justify-end items-end':'justify-start items-start'">
                                    <!-- <ActionDropdown>
                                        <button>edit message</button>
                                    </ActionDropdown> -->
                                    
                                    <div :key="message._id" class="flex flex-col gap-1 border-green-500 w-full" :class="message.user == this.user._id ? 'justify-end items-end':'justify-start items-start'">
                                        <div class="flex flex-col lg:flex-row flex-wrap gap-3 lg:max-w-[50%]" :class="message.user == this.user._id ? 'justify-end items-end':'justify-start items-start'">
                                            <div v-for="file in message.files">
                                                <div v-if="file.type.startsWith('image/')" class="flex flex-row flex-wrap border-yellow-400">
                                                    <img class="!size-[100px] rounded-xl" :src="file.url" @click="previewImage(file.url)">
                                                </div>
                                            </div>
                                        </div>
                                            
                                        <div v-for="file in message.files" class="file-container rounded-md">
                                            <div  v-if="!file.type.startsWith('image/')" class="file-container  whitespace-nowrap h-[50px] w-[200px] bg-gray-100 rounded-md p-3 text-black flex flex-row items-center justify-end gap-3">
                                                <span class="overflow-hidden ">{{file.name.substring(0,15)}}</span>
                                                <a :href="file.url" target="_blank">
                                                    <span class="bg-blue-500 text-white px-3 py-1 rounded-lg "><i class="mr-3 bi bi-cloud-arrow-down-fill"></i>{{file.type.split("/")[1]}}</span>
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <span v-if="message.text"  :class="message.user == this.user._id ? 'bg-tz_blue text-white rounded-bl-xl items-end text-right':'bg-slate-100 dark:bg-gray-600 dark:text-white rounded-br-xl items-start text-left'" v-html="message.text" class="whitespace-pre-line rounded-t-xl max-w-[300px] w-fit p-3 flex flex-col shadow-md"></span>
                                    </div>
                                    <span class="text-[12px] text-gray-" v-if="message.text || message.files.length > 0">{{ convertTimeToAMPM(message.createdAt) }}</span>
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

                        <form @sumbit.prevent="sendMessage" class="h-auto flex flex-col justify-center items-center relative mb-6 border-t dark:border-gray-600 p-3">

                            <!-- PREVIEW FOR FILE ATTACHMENTS -->
                            <div v-if="uploadResults.length >0" class="flex flex-row gap-3 w-full p-3 overflow-x-auto">
                                <div v-for="(file, index) in uploadResults" :key="index">
                                <!-- type -->
                                    <!-- status -->
                                    <!-- progress -->
                                    <!-- sizeBeforeUpload -->
                                    <div v-if="file.type.startsWith('image/')" class=" size-[80px] relative flex justify-center items-center">
                                        <button type="button" class=" !size-[20px] rounded-full flex justify-center items-center absolute top-1 left-1" @click="deleteFile(file.name, index)">
                                            <i class="bi bi-x-circle-fill"></i>
                                        </button>
                                        <img :src="file.image_preview" class=" !size-[80px]"/>
                                        <SpinnerComponent v-if="file.status === 'uploading'" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                                    </div>
                                    <div v-else class=" size-[80px] bg-blue-500 justify-center items-center flex flex-col relative" :key="index">
                                        <button type="button" class=" !size-[20px] rounded-full flex justify-center items-center absolute top-1 left-1" @click="deleteFile(file.name, index)">
                                            <i class="bi bi-x-circle-fill"></i>
                                        </button>
                                        <i class="bi bi-file-earmark-text-fill text-2xl"></i>
                                        <div class="flex flex-col text-[10px] text-center">
                                            <span v-if="file.status == 'failed'" class=" w-[50px] text-red-500">failed</span>
                                            <span v-else class=" w-[50px] overflow-hidden whitespace-nowrap">{{ file.name }}</span>
                                            <span>({{file.sizeBeforeUpload}})</span>
                                        </div>
                                        <SpinnerComponent v-if="file.status === 'uploading'" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                                    </div>
                                </div>
                            </div>

                            <div class="w-full flex flex-row items-center justify-center gap-1">
                                <label class="h-10 w-10 flex justify-center items-center rounded-xl cursor-pointer p-3 text-gray-500 dark:text-gray-200 text-xl hover:bg-black hover:bg-opacity-10">
                                    <input
                                    multiple
                                        type="file"
                                        ref="fileInput"
                                        @change="onFileChange"
                                        accept="image/*;capture=camera"
                                        style="display: none"
                                    />
                                    <i class="bi bi-paperclip"></i>
                                </label>                                       
                                <!-- <input type="textarea" @input="validateMessage" class="form_input w-[80%] h-10" placeholder="Type your message here..." v-model="message_text"> -->
                                
                                <textarea type="text" @input="validateMessage" class="form_input w-[80%] max-h-12 min-w-12 resize-none overflow-hidden" style="box-sizing: border-box;" placeholder="Type your message here..." v-model="message_text"></textarea>

                                
                                <button id="send_message_btn" type="button" @click="sendMessage" class="bg-tz_blue h-10 w-10 flex justify-center items-center rounded-xl text-white p-3 text-md dark:disabled:bg-gray-500 dark:disabled:text-gray-600 disabled:opacity-30">
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
import { filesize } from "filesize";

import { useToast } from 'vue-toastification'

import { mapActions } from 'vuex';

import SpinnerComponent from '../../components/SpinnerComponent'

export default {
    name: "MessagePageView",
    components: { PageTitle, ActionDropdown, SpinnerComponent },
    data(){
        return{
            filesize,
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

           errorMessage: '',
           imageUrls: [],
           fileUrls: [],
           base64Image: '',

           message_files: [/* {
             name: '',
             url: '',
             type: '',
             size: '',
           } */],

           uploadResults: [],
           toast: useToast(),
           image_preview_modal: false,
           image_to_preview: '',

        }
    },

    methods: {
        previewImage(image_url){
            this.image_to_preview = image_url;
            this.image_preview_modal = true;
        },
        removeFile(index){
            this.fileUrls.splice(index, 1)
        },
        removeImage(index){
            this.imageUrls.splice(index, 1)
        },
        onFileChange(event) {
            const files = event.target.files;
            this.errorMessage = null;
            this.base64Images = []; // Store the base64 images in an array
            this.imageUrls = []; // Store the object URLs for preview

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                if (!file.type.startsWith("image/")) {
                this.errorMessage = `File ${file.name} is not a valid image.`;
                this.fileUrls.push(file);
                this.uploadFile(file);
                console.log("file :", file)
                } else if (file.size > this.maxFileSize) {
                this.errorMessage = `File ${file.name} exceeds the size limit of 2MB.`;
                } else {
                const imageUrl = URL.createObjectURL(file);
                this.fileUrls.push(file);
                // this.imageUrls.push(imageUrl);
                // this.convertToBase64(file);
                this.uploadFile(file)
                }
            }
        },
        convertToBase64(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Remove the prefix from the Base64 string
                const base64String = e.target.result;
                this.base64Image = base64String.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
            };
            reader.readAsDataURL(file);
        },


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
           /*  if(!this.input_value){
                document.getElementById("send_message_btn").disabled = true;
            }; */

            const payload = {
                text: this.message_text,
                userId: this.user._id,
                files: this.message_files,
            }
            // console.log("preparing the send :", payload);
            
            try{
                const response = await axios.post(`${this.api_url}/message/room/${this.selected_room._id}`, payload);
                console.log("response from msg snt: ", response);

                // remove all attached files...
                this.uploadResults = [];
                this.message_files = [];

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

        uploadFile(file) {
            if(this.uploadResults.length >= 5){
                this.toast.error("Maximum upload per-time reached")
            } else {
            const formData = new FormData();
            formData.append('files', file);

            const real_file_name = file.name;

            const fileSizeBeforeUpload = this.filesize(file.size); // Size in MB
            const uploadResult = {
                name: file.name,
                type: file.type,
                status: 'uploading',
                progress: 0,
                sizeBeforeUpload: `${fileSizeBeforeUpload}`,
                sizeAfterUpload: null, // Will be updated after upload
            };
            if(file.type.startsWith("image/")){
                const imageUrl = URL.createObjectURL(file);
                uploadResult.image_preview = imageUrl;
            }
            this.uploadResults.push(uploadResult);

            const index = this.uploadResults.length - 1; // Index of the current upload result

            const xhr = new XMLHttpRequest();
            xhr.open('POST', `${this.api_url}/message/room/${this.selected_room._id}/rooms/file`, true);

            // Handle progress event
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                const progress = Math.ceil((event.loaded  / event.total ) * 100);
                console.log(`Progress: ${progress}%`); // Debug log
                this.uploadResults[index].progress = progress;
                this.$forceUpdate(); // Force Vue to re-render
                } else {
                console.log('Progress event not computable'); // Debug log
                }

                // disable submit button...
                this.submit_loading = true;
            };

            // Handle response
            xhr.onload = () => {
                if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);

                response.files.forEach(file => {
                    let attachment = {
                        name: file.Key.split("/")[1],  // Assuming 'key' should be 'Key'
                        url: file.Location,
                        type: this.uploadResults[index].type,
                        size:  this.uploadResults[index].sizeBeforeUpload,
                    };

                    this.message_files.push(attachment);
                });



                console.log("from upload: ", response);

                const fileSizeAfterUpload = response.size ? `${(response.size / (1024 * 1024)).toFixed(2)} MB` : this.uploadResults[index].sizeBeforeUpload;
                this.uploadResults[index].status = 'Uploaded';
                this.uploadResults[index].name = response.files[0].Key.split("/")[1]; // Assuming single file response
                this.uploadResults[index].sizeAfterUpload = fileSizeAfterUpload;
                this.$forceUpdate(); // Ensure reactivity

                // re-enable submit button...
                this.submit_loading = false;
                } else {
                    this.uploadResults[index].name = `${file.name} - failed`;
                    this.uploadResults[index].status = 'failed';
                    console.error('Error uploading file 1:', xhr.statusText);
                    this.$forceUpdate(); // Ensure reactivity
                }
            };

            xhr.onerror = () => {
                // re-enable submit button...
                this.submit_loading = false;

                this.uploadResults[index].name = `${file.name} - failed`;
                this.uploadResults[index].status = 'failed';
                console.error('Error uploading file 2:', xhr.statusText);
                this.$forceUpdate(); // Ensure reactivity
            };

            // Send the form data
            xhr.send(formData);
        }
        },

        async deleteFile(name, index) {
            try {
                // first remove from files array...

                this.uploadResults.splice(index, 1);
                // re-enable submit button...
                this.submit_loading = false;

                const key = encodeURIComponent(name); // Encode the file name to be used in the URL
                const response = await fetch(`${this.api_url}/upload/files/${key}/delete`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('failed to delete file');
                }
                console.log('File deleted successfully');
            } catch (error) {
                console.error('Error deleting file:', error);
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