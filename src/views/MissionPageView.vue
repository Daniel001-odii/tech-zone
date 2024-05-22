<template>
    <div class="testimonial-slider relative overflow-hidden w-full ">
      <div class="flex flex-row gap-3 transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 flex items-center justify-center p-8 border">
          <div class="text-center">
            <p class="text-xl mb-4">"{{ testimonial.message }}"</p>
            <p class="font-bold">{{ testimonial.author }}</p>
          </div>
        </div>
      </div>
      <button @click="prev" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">❮</button>
      <button @click="next" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">❯</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentIndex: 0,
        testimonials: [
          { message: "This is a fantastic product!", author: "John Doe" },
          { message: "I loved the service!", author: "Jane Smith" },
          { message: "Highly recommend to everyone.", author: "Bob Johnson" },
          { message: "Exceptional quality and support!", author: "Alice Brown" },
          { message: "Five stars for sure!", author: "Chris Wilson" }
        ],
        visibleCount: 3
      };
    },
    computed: {
      responsiveVisibleCount() {
        if (window.innerWidth >= 1024) {
          return 3;
        } else if (window.innerWidth >= 768) {
          return 2;
        } else {
          return 1;
        }
      }
    },
    methods: {
      prev() {
        const maxIndex = this.testimonials.length - this.visibleCount;
        this.currentIndex = (this.currentIndex === 0) ? maxIndex : this.currentIndex - 1;
      },
      next() {
        const maxIndex = this.testimonials.length - this.visibleCount;
        this.currentIndex = (this.currentIndex === maxIndex) ? 0 : this.currentIndex + 1;
      },
      updateVisibleCount() {
        this.visibleCount = this.responsiveVisibleCount;
      }
    },
    mounted() {
      this.updateVisibleCount();
      window.addEventListener('resize', this.updateVisibleCount);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.updateVisibleCount);
    }
  };
  </script>
  
  <style scoped>
  .testimonial-slider {
    max-width: 900px;
    margin: auto;
  }
  </style>
  