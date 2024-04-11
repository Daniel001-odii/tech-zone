    <template>
        <!-- ALERTS AND NOTIFICS -->
        <div class="fixed bottom-10 right-0 left-0 flex justify-center z-50">
            <div v-for="alert in alerts" class="flex flex-col gap-3 relative">
                <DismissableAlert  :type="alert_type">{{ alert_message }}</DismissableAlert>
            </div>
        </div>

        <!-- PROFILE EDIT MODAL HERE -->
        <Modal :title="'Edit your profile'" :modal_active="profile_edit_menu">
                <template #body>
                    <div>
                    <form @submit.prevent="updateUserProfile" v-if="user">
                        <div>
                            <div class="flex flex-row gap-3 mb-3">
                                <div class="w-3/6 flex flex-col">
                                    <label for="firstname">firstname</label>
                                    <input class="form_input " type="name" name="firstname" id="firstname" :value="user.firstname" disabled>
                                </div>

                                <div class="w-3/6 flex flex-col">
                                    <label for="firstname">lastname</label>
                                    <input class="form_input" type="name" name="lastname" id="lastname" :value="user.lastname" disabled>
                                </div>
                            </div>

                            <div class="form-section">
                                <div class="form-control">
                                    <label for="email">email</label>
                                    <input class="form_input" type="email" name="email" id="email" :value="user.email" disabled>
                                </div>
                            </div>

                            <div class="form-section">
                                <div class="form-control">
                                    <label for="title">profile title</label>
                                    <input class="form_input" type="text" name="title" id="title" v-model="user_form.profile.title" placeholder="Expereinced Copywriter">
                                </div>
                                <div class="form-control">
                                    <label for="bio">profile bio</label>
                                    <textarea class="form_input h-40 max-h-52" type="text" name="bio" id="bio" v-model="user_form.profile.bio" placeholder="A very brief and descriptive bio"></textarea>
                                </div>
                            </div>

                            <div class="form-section">
                                <div class="form-control">
                                    <label for="skills">skills & expertise</label>
                                    <input class="form_input" type="text" name="skills" id="skills" v-model="user_form.profile.skills" placeholder="Copy writing, Technical writing, Graphic Design">
                                </div>
                            </div>


                            <div class="form-section">
                            

                                <div class="form-control">
                                    <label for="phone">phone</label>
                                    <input class="form_input" type="phone" name="phone" id="phone" v-model="user_form.profile.phone" placeholder="+2348156074667">
                                </div>

                                <div class="form-control">
                                    <label for="phone">social</label>
                                    <input class="form_input" type="text" name="social" id="social" v-model="user_form.profile.social" placeholder="https://facebook.com/johndoe">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            
                </template>
                <template #footer>
                    <LoaderButton @click="updateUserProfile" type="button" class="btn" :buttonText="'save'" :loading="user_form.loading"></LoaderButton>
                </template>
        </Modal>

        <!-- PROFILE IMAGE UPLOAD MODAL -->
        <Modal :title="'Upload a profile image'" :modal_active="profile_image_menu">
            <template #body>
                <div class="flex flex-row flex-wrap gap-5 p-8 justify-center items-center">
                    <div class="flex flex-col">
                        <!-- <h1 class="font-bold text-xl mb-3">Edit Photo</h1> -->
                        <cropper
                            ref="cropper"
                            class="cropper h-[300px] w-[300px] bg-gray-400 rounded-full"
                            :src="image.src"
                            :stencil-component="$options.components.CircleStencil"
                            :stencil-props="{
                                handlers: {},
                                movable: false,
                                resizable: false,
                                aspectRatio: 1,
                                handlerClasses: {
                                    default: 'handler',
                                },
                                previewClass: 'preview'
                            }"
                            :debounce="false"
                            :stencil-size="{
                                width: 280,
                                height: 280
                            }"
                            :resize-image="{
                                adjustStencil: false
                            }"
                            image-restriction="stencil"
                            @change="change"
                        />
                        <div v-if="image.src" class=" flex flex-row justify-center mt-3 gap-3">
                            <button @click="zoomIn" class="btn"><i class="bi bi-zoom-in"></i></button>
                            <button @click="zoomOut" class="btn"><i class="bi bi-zoom-out"></i></button>
                        </div>
                    </div>
                    <div class="flex flex-col gap-3">
                        <h1 class="text-2xl ">Show Employers<br/> the best version of yourself!</h1>
                        <div  class="flex flex-row gap-3 mt-6">
                            <preview class="bg-gray-400 rounded-full"
                                :width="150"
                                :height="150"
                                :image="result.image"
                                :coordinates="result.coordinates"
                            />
                            <preview class="rounded-full bg-gray-400"
                                :width="75"
                                :height="75"
                                :image="result.image"
                                :coordinates="result.coordinates"
                            />
                            <preview class="rounded-full bg-gray-400"
                                :width="37.5"
                                :height="37.5"
                                :image="result.image"
                                :coordinates="result.coordinates"
                            />
                        </div>
                        <p class="text-blue-500">Must be an actual photo of you (showing your face particularly).<br/>
    Logos, clip-art, group photos, and digitally-altered images are not allowed.</p>
                    </div>
                
                </div>
                
               
                
                
            </template>
            <template #footer>
                <div class="flex flex-row gap-3">
                    <input type="file" ref="file" @change="loadImage($event)" class="hidden" accept="image/*">
                    <button class="border border-tz_blue p-3 rounded-md" @click="$refs.file.click()">Select image </button>
                    <button class="btn" @click="uploadProfileImage">
                        <span v-if="!image_uploading">Save photo</span>
                        <span v-else>Working...</span>
                    </button>
                </div>
            </template>
        </Modal>


        <PageTitle>Profile</PageTitle>
        <div class="h-full flex flex-col relative">
            

            <FullPageLoading v-if="!user"/>
            <div v-if="user" class="p-5 flex flex-col items-center gap-8 h-full overflow-y-scroll ">

                <div class="flex w-full rounded-xl justify-evenly items-start md:items-center  flex-col md:flex-row p-4 lg:w-3/4 border  dark:border-gray-600 ">
                    <div class="flex flex-row justify-start md:justify-start items-center p-5 gap-3 flex-wrap">
                        <div v-if="user.profile.image_url" :style="`background-image: url(${user.profile.image_url})`" class=" group relative h-28 w-28 rounded-full border-4 outline outline-tz_blue bg-cover">
                                <div class="bg-black absolute top-0 bottom-0 h-full w-full rounded-full hidden justify-center items-center opacity-50 group-hover:flex cursor-pointer" @click="profile_image_menu = !profile_image_menu">
                                    <i class="bi bi-camera text-2xl"></i>
                                </div>
                            </div>
                            <!-- <img v-if="user.profile.image_url" alt="profile image" :src="user.profile.image_url" class=" h-28 w-28 rounded-full"> -->
                        
                        <div class="flex flex-col items-start text-start">
                            <h1 class="font-bold text-4xl flex flex-row items-center gap-1">{{ user.firstname }} {{ user.lastname }}
                                <svg v-if=" user.settings.KYC.is_verified" class="w-6 h-6 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clip-rule="evenodd"/>
                                </svg>
                            </h1>
                            <h2 class="text-sm text-gray-500">{{ user.profile.title }}</h2>
                            <p>{{ user.email }}</p>
                            <div clas="flex flex-row gap-3">
                                <p class="inline-block mr-2 text-tz_blue" v-html="useStarFromInteger(user.rating)"></p>
                                <span>({{ user.rating }}) {{ user.rating_count }} reviews</span>
                            </div>
                            <div class="flex flex-row flex-wrap gap-3 mt-3">
                                <button v-if="isAllowed" class="btn" @click="profile_edit_menu = !profile_edit_menu">Edit Profile</button>
                                <button class="btn_white dark:hover:bg-tz_light_blue">View Resume</button>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block border-r md:h-40 dark:border-gray-500"></div>
                    <div class=" flex flex-col items-start justify-center text-left p-5">
                        <div>
                            <span v-if="user.is_verified">user is verified</span>
                            <span v-else="user.is_verified">user is not verified</span>
                        </div>
                        <p>Joined: {{ readableDate(user.created) }}</p>
                        <p v-if="user.profile.location">Location: {{ user.profile.location.city }} {{ user.profile.location.state }}</p>
                       
                    </div>
                </div>

                <div class=" w-full lg:w-3/4">
                    <div class="border rounded-xl p-3 text-left  dark:border-gray-600 ">
                        <h1 class="font-bold"><i class="bi bi-person"></i> Profile</h1>
                    </div>

                    <div>
                        <div class="profile_section">
                            <h2 class="font-bold">About Me</h2>
                            <div>
                                {{ user.profile.bio }}
                                <span v-if="!user.profile.bio">No content...</span>
                            </div>
                        </div>

                        <div class="profile_section">
                            <h2 class="font-bold">Skills</h2>
                            <div v-if="user.profile.skills" class="flex flex-row flex-wrap gap-2 gap-y-4 mt-3">
                                <div v-for="skill in user.profile.skills.split(',')" >
                                    <span class=" bg-tz_light_blue p-2 rounded-md text-tz_blue">{{ skill }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="profile_section">
                            <h2 class="font-bold">Phone Number</h2>
                            <div>
                                {{ user.profile.phone }}
                            </div>
                        </div>

                        <div class="profile_section">
                            <h2 class="font-bold">Email Address</h2>
                            <div>
                                {{ user.email }}
                            </div>
                        </div>

                        <div class="profile_section">
                            <h2 class="font-bold">Connected Accounts</h2>
                            <a :href="user.profile.social" class="text-tz_blue">
                                {{ user.profile.social }}
                            </a>
                        </div>


                        <div class="profile_section">
                            <h2 class="font-bold">Date Joined</h2>
                            <div>
                                {{ user.created }}
                            </div>
                        </div>

                    </div>
                </div>

                <div class=" w-full lg:w-3/4">
                    <div class="border rounded-xl p-3 text-left  dark:border-gray-600 ">
                        <h1 class="font-bold"><i class="bi bi-briefcase"></i> Work History</h1>
                    </div>

                    <div class="profile_section">
                        <h2 class="font-bold">Completed Jobs</h2>
                        <div>
                            <SkeletonLoader v-if="!contracts"/>
                            <div v-if="contracts" class="flex flex-col gap-3 overscroll-y-scroll" v-for="(contract, contract_id) in contracts" :key="contract_id">
                                <JobReviewCard :title="contract.job.title" :budget="contract.job.budget">
                                    <template v-if="contract.user_feedback.rating > 0" #feedback>{{ contract.user_feedback.review }}</template>
                                    
                                    <template #star-rating>
                                        <div>
                                            <p class="inline-block mr-2 text-tz_blue" v-html="useStarFromInteger(contract.employer_feedback.rating)"></p>
                                            <!-- rating: {{ useStarFromInteger(contract.employer_feedback.rating) }} -->
                                        </div>
                                    </template>
                                    <template #date>{{ readableDate(contract.created) }}</template>
                                    <template #status>
                                        <span class="px-4 py-1 text-white rounded-md text-xl" 
                                        :class="[contract.status == 'open'?'bg-tz_blue':'', 
                                                contract.status == 'paused'?'bg-orange-500':'',
                                                contract.status == 'completed'?'bg-green-500':'',
                                                contract.status == 'closed'?'bg-gray-500':''
                                                ]">
                                            {{ contract.status }}
                                        </span>

                                        <!-- {{ contract.user_feedback}} -->
                                    </template>
                                </JobReviewCard>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import TemplateView from '../TemplateView.vue';
import JobReviewCard from '@/components/JobReviewCard.vue';
import Modal from '@/components/Modal.vue';
import axios from 'axios';
import LoaderButton from '@/components/LoaderButton.vue';
import { generateStarRating } from '@/utils/ratingStars';
import { generateStarRatingFromInteger } from '@/utils/ratingStars';
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import FullPageLoading from '@/components/FullPageLoading.vue';
import PageTitle from '@/components/PageTitle.vue';
import { formatTimestamp } from '@/utils/dateFormat';
import DismissableAlert from '@/components/DismissableAlert.vue';
import { CircleStencil, Cropper, Preview } from 'vue-advanced-cropper';


export default {
    name: "ProfilePage",
    components: { Navbar, TemplateView, 
        JobReviewCard, 
        Modal, 
        LoaderButton, 
        SkeletonLoader, 
        FullPageLoading, 
        PageTitle, 
        DismissableAlert,
        Cropper,
        CircleStencil,
        Preview
     },
    data(){
        return{
            alerts: [],
            show_alert: false,
            alert_type: '',
            alert_message: '',

            user: null,

            profile_edit_menu: false,
            profile_image_menu: false,

            loading: null,
            user_rating_count: '',
            user_profile_image: '',
            // user_profile_image: 'https://images.unsplash.com/photo-1600984575359-310ae7b6bdf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
            result: {
                coordinates: null,
                image: null,
            },
            image: {
				src: '',
				type: null
			},
            current_zoom: 0,
            max_zoom: 5,

            user_form: {
                loading: false,
                preffered_job_types: '',
                profile: {
                    title: '',
                    bio: '',
                    location: {
                        city: '',
                        state: '',
                        address: '',
                    },
                    phone: '',
                    social: '',
                    skills: '',
                    },
                },

                contracts: '',
                isAllowed: false,

            headers: {Authorization: `JWT ${localStorage.getItem('life-gaurd')}`},

            image_uploading: false,
        }
    },
    methods: {
        change({ coordinates, image }) {
			// console.log(coordinates, canvas, image);
            this.result = {
				coordinates,
				image
			};
		},

        showAlertBox(type, message){
            this.alerts.push(message);
            this.show_alert = !this.show_alert;
            this.alert_type = type;
            this.alert_message = message;
        },

        async getPublicUserData(){
            this.loading = true;
            try{
                const response = await axios.get(`${this.api_url}/user/${this.$route.params.user_id}`);
                this.user = response.data.user;
                console.log("pulic user: ", response);

                this.user_form = response.data.user;
                this.checkCurrentViewer();
                this.loading = false;
                this.image.src = this.user.profile.image_url;

                console.log("image.src: ", this.image.src)
            }catch(error){
                console.log("error fetching public user data", error);
                this.loading = true;
                if(error.response.status == 404) {
                    this.loading = false;
                    this.$router.push("/404")
                    // alert("User mot found")
                }
            }
        },

        async getUserData(){
            try{
                 // Get the token from localStorage
                const token = localStorage.getItem('life-gaurd');
                const headers = {
                    Authorization: `JWT ${token}`, // Assuming it's a JWT token
                };

                const response = await axios.get(`${this.api_url}/user`, { headers });
                console.log("profile page :", response);
                if(!this.user.profile.title){
                    alert("please update your profile");
                    this.$router.push("/profile/complete");
                }
                // push to user variable..
                this.user = response.data.user;
                // this.user_form = response.data.user;
                this.user_form.profile = response.data.user.profile;

                // set image src..
                
                
            }
            catch(error){
                console.error(error)
            }
        },

        async updateUserProfile(){
            this.user_form.loading = true;
            const headers = this.headers;
            try{
                const response = await axios.patch(`${this.api_url}/user/profile`, this.user_form, { headers });
                // console.log(response)
                this.showAlertBox("success", "Profile Updated successfully!");
                this.user_form.loading = false;
            }
            catch(error){
                // display any possible error here...
            }
        },

        async getActiveAndCompletedContracts(){
            const headers = this.headers;
            try{
                const response = await axios.get(`${this.api_url}/contracts/good/${this.$route.params.user_id}`, { headers });
                // console.log("good contracts: ", response);
                this.contracts = response.data.contracts;
            }catch(error){
                console.log(error)
            }
        },

        useStarFromInteger(rating){
            return generateStarRatingFromInteger(rating);
        },

        readableDate(date){
            return formatTimestamp(date);
        },
        

        checkCurrentViewer(){
            const token = localStorage.getItem('life-gaurd');
            const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
            // console.log("user roleeee: ", user_id, "parsed data: ", parsed_item);
            if(user.id == this.$route.params.user_id || user.googleId == this.user.googleId){
                this.isAllowed = true;
            }
            else{this.isAllowed = false};
        },


        // FUNCTIONS FOR ADVANCED IMAGE CROPPER..
        zoomIn() {
            if(this.current_zoom < this.max_zoom){
                this.$refs.cropper.zoom(1.2);
                this.current_zoom += 1;
            }
		},

        zoomOut() {
                this.$refs.cropper.zoom(0.2);
                this.current_zoom = 0;
		},

        crop() {
			const { canvas } = this.$refs.cropper.getResult();
			canvas.toBlob((blob) => {
				// Do something with blob: upload to a server, download and etc.
			}, this.image.type);
		},

		reset() {
			this.image = {
				src: null,
				type: null
			}
		},

        getMimeType(file, fallback = null) {
            const byteArray = (new Uint8Array(file)).subarray(0, 4);
            let header = '';
            for (let i = 0; i < byteArray.length; i++) {
            header += byteArray[i].toString(16);
            }
            switch (header) {
                case "89504e47":
                    return "image/png";
                case "47494638":
                    return "image/gif";
                case "ffd8ffe0":
                case "ffd8ffe1":
                case "ffd8ffe2":
                case "ffd8ffe3":
                case "ffd8ffe8":
                    return "image/jpeg";
                default:
                    return fallback;
            }
        },

		loadImage(event) {
			// Reference to the DOM input element
			const { files } = event.target;
			// Ensure that you have a file before attempting to read it
			if (files && files[0]) {
				// 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
				if (this.image.src) {
					URL.revokeObjectURL(this.image.src)
				}
				// 2. Create the blob link to the file to optimize performance:
				const blob = URL.createObjectURL(files[0]);
				
				// 3. The steps below are designated to determine a file mime type to use it during the 
				// getting of a cropped image from the canvas. You can replace it them by the following string, 
				// but the type will be derived from the extension and it can lead to an incorrect result:
				//
				this.image = {
				   src: blob,
				   type: files[0].type
				}
				
				// Create a new FileReader to read this image binary data
				const reader = new FileReader();
				// Define a callback function to run, when FileReader finishes its job
				reader.onload = (e) => {
					// Note: arrow function used here, so that "this.image" refers to the image of Vue component
					this.image = {
						// Set the image source (it will look like blob:http://example.com/2c5270a5-18b5-406e-a4fb-07427f5e7b94)
						src: blob,
						// Determine the image type to preserve it during the extracting the image from canvas:
						type: this.getMimeType(e.target.result, files[0].type),
					};
				};
				// Start the reader job - read file as a data url (base64 format)
				reader.readAsArrayBuffer(files[0]);
			}
		},

        async uploadProfileImage() {
            const { canvas } = this.$refs.cropper.getResult();
            const headers = this.headers;
            this.image_uploading = true;
            try {
                if (canvas) {
                    const form = new FormData();

                    canvas.toBlob(async blob => {
                        const mimeType = this.image.type; // Use the MIME type determined earlier
                        form.append('image', blob, `${this.user.firstname}_${this.user.lastname}-${this.user._id}-dp.${mimeType.split('/')[1]}`); // Append the blob with original file extension
                        try {
                            const response = await axios.post(`${this.api_url}/profile/image`, form, { headers });
                            this.image_uploading = false;
                            console.log("profile image: ", response);
                            this.profile_image_menu = !this.profile_image_menu;
                            window.location.reload();
                        } catch (error) {
                            console.error("Error uploading profile image:", error);
                            this.image_uploading = false;
                        }
                    }, this.image.type); // Pass original MIME type to toBlob
                }
            } catch (error) {
                console.error("Error uploading profile image:", error);
            }
        },

	},
	destroyed() {
		// Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
		if (this.image.src) {
			URL.revokeObjectURL(this.image.src)
		}
    },
    computed: {
        
        },
    mounted(){
        if(this.$route.params.user_id){
            this.getPublicUserData();
        } else{
            this.getUserData();
        }
        this.getActiveAndCompletedContracts();
        },
    }
</script>
<style>

    input:disabled{
        @apply text-gray-400
    }
    .profile_section{
        @apply text-left p-3 mt-5
    }

    .form-section{
        @apply flex flex-col gap-3 capitalize justify-between flex-wrap mb-3
    }

    .form-control{
        @apply flex flex-col justify-start w-full
    }

    .handler{
        @apply border-red-500 border 
    }

    .preview {
    	border: dashed 1px rgba(255,255,255, 0.25) !important;
    }
</style>