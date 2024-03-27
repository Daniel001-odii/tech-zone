<template>
    <div>
        <div class="flex flex-row justify-center items-center bg-black text-white">
            <div class="p-5 w-full">
                <h2>Support</h2>
                <h1 class="font-bold text-2xl">Frequently asked Questions</h1>
                <p>New help with something?, Here are our most frequetly asked questions.</p>
            </div>
            <img src="../assets/images/FAQ.png" class=" w-[500px] hidden md:inline-block">
        </div>

        <section class="flex flex-col  md:flex-row justify-between p-8 gap-3">
            <div class="w-full md:w-3/6">
                <h2 class="text-2xl font-bold">General FAQs</h2>
                <p>Everything you need to know about the product and how it works. Cant find answer?, Reachout.</p>
            </div>
            <div class="w-full md:w-3/6 mt-5">
                <div v-for="(question, question_id) in generalFAQs" :key="question_id">
                    <div class="flex flex-row justify-between mt-3">
                        <h4 class="font-bold text-lg max-w-90%">{{ question.text }}</h4>
                        <i class="bi bi-plus"></i>
                    </div>
                  
                    <p class="w-[90%]">{{ question.answer }}</p>
                </div>
            </div>
        </section>

        <section class="flex flex-col  md:flex-row justify-between p-8 gap-3">
            <div class="w-full md:w-3/6">
                <h2 class="text-2xl font-bold">Billing & Payment FAQs</h2>
                <p>Everything you need to know about Billing and Payment. Cant find answer?, Reachout.</p>
            </div>
            <div class="w-full md:w-3/6 mt-5">
                <div v-for="(question, question_id) in billingsFAQs" :key="question_id">
                    <div class="flex flex-row justify-between mt-3">
                        <h4 class="font-bold text-lg max-w-90%">{{ question.text }}</h4>
                        <i class="bi bi-plus"></i>
                    </div>
                  
                    <p class="w-[90%]">{{ question.answer }}</p>
                </div>
            </div>
        </section>

        <section class="p-8">
            <div class=" flex flex-col justify-center items-center w-full md:w-[80%] rounded-lg h-[250px] bg-tz_light_blue mx-auto my-0">
                <img src="../assets/images/FAQ-People-group.png" class="mb-3">
                <div class="flex flex-col justify-center items-center gap-2">
                    <h4>Still have questions?</h4>
                    <p>Can’t find the answer you’re looking for? Please reach out to us directly.</p>
                    <button class="btn">Reach out</button>
                </div>
            </div>
        </section>
    </div>
    <Footer/>
</template>

<script>
import Footer from '@/components/Footer.vue'

    export default {
        name: "SupportPageView",
        components: { Footer },
        data(){
            return{
                generalFAQs: [
                    { text: "Is there a free trial available?",
                    answer:"Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible." },

                    { text: "How do I find jobs on the platform?", 
                    answer: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."},

                    {
                        text: "How can I upload my CV to the platform?",
                        answer: "Simply go to your profile page and click on the <Resume> button. You'll find option to upload and view your CV "
                    },

                    {
                        text: "How can I apply for a job listing ",
                        answer: "To apply for a job listing as a Talent on the platform, follow these steps: 1. Log in to your account and navigate to the Work Explorer page. 2. Browse through the active job listings to find a job that interests you. 3. Click on the job listing to view more details. 4. Use the <apply> here button provided on the job listing page to start and complete the application process. "
                    },

                    {
                        text: "How can I save job listings for later ",
                        answer: "To save job listings for later viewing: 1. Go to the Work Explorer page on the platform. 2. Look for the job listing you want to save. 3. Next to the job listing, you'll see a save icon. Click on this icon to save the job for later. 4. If you wish to remove a job from your saved list, click on the save icon again to deselect it and remove it from your saved list. "
                    },

                    {
                        text: "How do I post a job listing as an employer ",
                        answer: "To post a job listing as an employer, follow these steps: 1. Go to the Employers Console on the platform. 2. Click on the <Post Job> link located in the navigation bar. This action will direct you to the Post Job page. 3. Follow the provided instructions and steps on the Post Job page to successfully create and post your job listing. "
                    }

            ],
            billingsFAQs: [
                {
                    text: "Are there any fees associated with employers posting jobs? ",
                    answer: "No, there are no charges for posting jobs on ApexTeks. The platform is free for both employers and talents. However, there is a 15% charge applied to every completed work order."
                },
                {
                    text: "Does Apex-Teks have any undisclosed fees or charges? ",
                    answer: "ApexTeks operates with transparency, and all potential fees are explicitly outlined. Double confirmation is necessary for crucial actions related to payments to prevent inadvertent actions. "
                },
                {
                    text: "What is the billing process? ",
                    answer: "Billing is mainly directed at employers, who are charged the full job listing fee upon a successful job posting. This is facilitated through an escrow payment system. In case a job is canceled 24 hours before its scheduled start, the entire payment is refunded. However, if the work order is canceled within 24 hours of starting, 20 percent of the total payment made will be deducted. Employers are required to provide a valid debit card for payments, and they can manage payment options in the billing information page. All relevant information regarding billing actions is provided for transparency and clarity. "
                },

                {
                    text: "What happens in case of payment failure or billing issues? ",
                    answer: "You will receive an immediate notification and will be prompted to address the problem. Payment for services will remain pending until the billing issues are resolved. For premium memberships, the subscription will be temporarily deactivated during this period. "
                }
            ]
            }
        }
    }
</script>

<style scoped>

</style>