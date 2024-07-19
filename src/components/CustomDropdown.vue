<template>
    <span class="flex flex-col relative">
        <button href="#" @click.prevent="toggleDropdown" class="dropdown-toggle">
            <slot name="trigger">
                ...
            </slot>
        </button>

        <div class="z-50 bg-transparent absolute right-0 top-[125%] min-w-[180px]" v-show="state">
                <slot name="menu">
                    <p>Hello world</p>
                </slot>
        </div>
    </span>
</template>

<script>
export default {
  name: 'CustomDropdown',
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