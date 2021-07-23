<template>
  <div class="v-dropdown" ref="dropdown">
    <div class="v-dropdown__reference" @click="$emit('input', !value)">
      <slot name="reference"/>
    </div>
    <div>
      <div
        v-show="value"
        class="v-dropdown__content"
        :class="[
        'v-dropdown__content--' + direction,
         {'v-dropdown__content--opened': value},
         {'v-dropdown__content--closed': !value},
      ]"
        :style="offset()"
      >
        <van-popup
          class="v-dropdown__body"
          :value="value"
          :overlay="overlay"
          :position="direction === 'down' ? 'top' : 'bottom'"
          :duration="duration ? duration : 0"
          :lazy-render="true"
          :overlay-style="{ position: 'absolute' }"
          :close-on-click-overlay="closeOnClickOverlay"
          @open="$emit('open')"
          @close="$emit('close')"
          @opened="$emit('opened')"
          @closed="onClosed"
          @click-overlay="onClosed"
        >
          <slot/>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VDropdown',
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      value: Boolean,
      overlay: {
        type: Boolean,
        default: true
      },
      closeOnClickOutside: {
        type: Boolean,
        default: true
      },
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      zIndex: [Number, String],
      duration: {
        type: [Number, String],
        default: 0.2,
      },
      direction: {
        type: String,
        default: 'down'
      }
    },
    methods: {
      offset() {
        if (this.$refs.dropdown) {
          const rect = this.$refs.dropdown.getBoundingClientRect()
          if (this.direction === 'down') {
            return { top: `${rect.bottom}px` }
          } else {
            return { top: `${window.innerHeight - rect.top}px` }
          }
        }
      },
      onClosed() {
        this.$emit('input', false)
        this.$emit('closed')
      }
    }
  }
</script>

<style lang="less">
  .v-dropdown {
    user-select: none;
  }

  .v-dropdown__reference {
    position: relative;
  }

  .v-dropdown__content {
    position: fixed;
    right: 0;
    left: 0;
    overflow: hidden;
    z-index: 10;
  }

  .v-dropdown__content--down {
    bottom: 0;
  }

  .v-dropdown__body {
    position: absolute;
    max-height: 80%;
  }
</style>