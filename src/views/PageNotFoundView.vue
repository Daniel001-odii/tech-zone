<template>
    <div>
        <TemplateView :leftNav="true">
            <template #page-title>Not Found</template>
            <template #page-contents>
                <div class="h-screen flex flex-col gap-4 justify-center items-center">
                    <div class="flex flex-col justify-center items-center w-full mt-6">
                        <img class=" h-40 w-40" src="../assets/images/404 error in laptop.svg">
                        <p>Sorry the Resource you requested was not found</p>
                    </div>
                    

                    <RouterLink to="/">
                        <button class="btn w-fit">Go Home</button>
                    </RouterLink>
                    
                </div>
              
            </template>
        </TemplateView>
    </div>
</template>
<script>
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import TemplateView from './TemplateView.vue';
import axios from 'axios';
import { formatToRelativeTime } from '@/utils/dateFormat';

export default {
    name: "PageNotFoundView",
    components: { TemplateView, SkeletonLoader },
}
</script>
<style scoped>
    
</style>