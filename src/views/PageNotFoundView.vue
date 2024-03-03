<template>
    <div>
        <TemplateView :leftNav="true">
            <template #page-title>Page Not Found</template>
            <template #page-contents>
                <div class="h-screen flex flex-col gap-4">
                    <h1 class="text-4xl mt-10">404</h1>
                    <p>Sorry the Resource you requested was not found</p>

                    <RouterLink to="/">
                        <button class="btn w-fit">Go back</button>
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