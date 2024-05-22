<template>
    <div class="h-full w-full flex flex-col justify-center items-center">

        <div class="max-w-md flex flex-col gap-3 mt-20">
            <h1 class="text-3xl font-bold">Can’t find answers in the FAQ’s?, Reach out to us.</h1>
            <form @submit.prevent="submitForm" class="flex flex-col gap-5 justify-center mt-8">

                <div class="flex flex-col">
                    <span>Email</span>
                    <input required type="email" name="email" class="rounded-md " placeholder="johndoe@mail.com">
                </div>
              
                <div class="flex flex-col">
                    <span>How can we help?</span>
                    <textarea required type="textarea" name="description" class="rounded-md min-h-52 max-h-52 overflow-auto" placeholder="Tell us about questions and concerns..."></textarea>
                </div>
                
                <button type="submit" class=" bg-tz_blue text-white font-medium rounded-full p-3">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HelpAndSupportPageView",
        data(){
            return{
                email: '',
                description: '',
            }
        },
        methods: {
            async submitForm(){
                try{

                }catch(error){

                }
            }
        }
    }
</script>

<style scoped>

</style>