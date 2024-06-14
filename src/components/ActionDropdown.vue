<template>
    <div class="flex flex-col relative " :class="{shown: state}">
        <button href="#" @click.prevent="toggleDropdown" class="dropdown-toggle">
            <slot name="icon">
              <i class="bi bi-three-dots-vertical"></i>
            </slot>
        </button>

        <div  @click.prevent="toggleDropdown" class="dark:text-white p-1 z-10 absolute gap-1 flex flex-col right-0 top-5 min-w-[180px] max-w-200 bg-white shadow-lg dark:bg-gray-700 rounded-sm" v-show="state">
            <!-- <ul class="list-unstyled"> -->
                <slot>
                    <p>Hello world</p>
                </slot>
            <!-- </ul> -->
        </div>
    </div>
</template>

<script>
export default {
  name: 'dropdown',
  data () {
    return {
      state: false
    }
  },
  methods: {
    toggleDropdown (e) {
      this.state = !this.state
    },
    close (e) {
      if (!this.$el.contains(e.target)) {
        this.state = false
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.close)
  },
  beforeDestroy () {
    document.removeEventListener('click',this.close)
  }
}
</script>