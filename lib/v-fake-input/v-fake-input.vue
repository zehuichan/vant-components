<template>
  <div
    class="van-cell van-field fake-input is-waiting"
    :class="{'is-focus': showCursor}"
    @touchstart="onTouchstart"
  >
    <div class="van-field__left-icon" v-if="$slots['left-icon'] || leftIcon">
      <slot name="left-icon"/>
    </div>
    <div class="van-cell__title van-field__label" v-if="$slots.label || label">
      <slot name="label">{{ label }}</slot>
    </div>
    <div class="van-cell__value van-cell__value--alone van-field__value">
      <div class="van-field__body" style="position:relative;">
        <div class="van-field__control" :class="`van-field__control--${inputAlign}`">
          <span>{{ value }}</span>
        </div>
        <i class="van-icon van-icon-clear van-field__clear" v-if="showClear" @touchstart="onClear"/>
        <div class="van-field__placeholder" v-if="value === '' && placeholder !== ''">{{ placeholder }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VFakeInput',
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      value: {
        type: [String, Number],
        default: '',
      },
      size: {
        // large, normal
        type: String,
        default: 'normal',
      },
      type: {
        // bankCard, money
        type: String,
        default: 'money',
      },
      focused: {
        type: Boolean,
        default: false,
      },
      clearable: {
        type: Boolean,
        default: false,
      },
      inputAlign: {
        type: String,
        default: 'left'
      },
      leftIcon: String,
      label: String,
      placeholder: String,
    },
    computed: {
      showClear() {
        return (
          this.clearable &&
          this.focused &&
          this.value !== ''
        )
      },
      showCursor() {
        return this.focused && this.value.length !== -1
      }
    },
    methods: {
      onTouchstart(event) {
        event.stopPropagation()
        this.$emit('focus', event)
      },
      onClear(event) {
        event.stopPropagation()
        this.$emit('input', '')
        this.$emit('clear', event)
      },
    }
  }
</script>

<style lang="less">
  .van-field__label {
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    box-sizing: border-box;
    width: 6.2em;
    margin-right: 3.2vw;
    color: #646566;
    text-align: left;
    word-wrap: break-word
  }

  .van-field__label--center {
    text-align: center
  }

  .van-field__label--right {
    padding-right: 4.26667vw;
    text-align: right
  }

  .van-field--disabled .van-field__label {
    color: #c8c9cc
  }

  .van-field__value {
    overflow: visible
  }

  .van-field__body {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center
  }

  .van-field__control {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    color: #323233;
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none
  }

  .van-field__control::-webkit-input-placeholder {
    color: #c8c9cc
  }

  .van-field__control::placeholder {
    color: #c8c9cc
  }

  .van-field__control:disabled {
    color: #c8c9cc;
    background-color: transparent;
    cursor: not-allowed;
    opacity: 1;
    -webkit-text-fill-color: currentColor
  }

  .van-field__control:read-only {
    cursor: default
  }

  .van-field__control--center {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    text-align: center
  }

  .van-field__control--right {
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
    text-align: right
  }

  .van-field__control--custom {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    min-height: 6.4vw
  }

  .van-field__control[type=date], .van-field__control[type=datetime-local], .van-field__control[type=time] {
    min-height: 6.4vw
  }

  .van-field__control[type=search] {
    -webkit-appearance: none
  }

  .van-field__button, .van-field__clear, .van-field__icon, .van-field__right-icon {
    -webkit-flex-shrink: 0;
    flex-shrink: 0
  }

  .van-field__clear, .van-field__right-icon {
    margin-right: -2.13333vw;
    padding: 0 2.13333vw;
    line-height: inherit
  }

  .van-field__clear {
    color: #c8c9cc;
    font-size: 4.26667vw;
    cursor: pointer
  }

  .van-field__left-icon .van-icon, .van-field__right-icon .van-icon {
    display: block;
    min-width: 1em;
    font-size: 4.26667vw;
    line-height: inherit
  }

  .van-field__left-icon {
    margin-right: 1.33333vw
  }

  .van-field__right-icon {
    color: #969799
  }

  .van-field__button {
    padding-left: 2.13333vw
  }

  .van-field__error-message {
    color: #ee0a24;
    font-size: 3.2vw;
    text-align: left
  }

  .van-field__error-message--center {
    text-align: center
  }

  .van-field__error-message--right {
    text-align: right
  }

  .van-field__word-limit {
    margin-top: 1.06667vw;
    color: #646566;
    font-size: 3.2vw;
    line-height: 4.26667vw;
    text-align: right
  }

  .van-field--error .van-field__control::-webkit-input-placeholder {
    color: #ee0a24;
    -webkit-text-fill-color: currentColor
  }

  .van-field--error .van-field__control, .van-field--error .van-field__control::placeholder {
    color: #ee0a24;
    -webkit-text-fill-color: currentColor
  }

  .van-field--min-height .van-field__control {
    min-height: 16vw
  }

  .fake-input {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: text;


    .van-field__control {
      height: 24px;

      &::after {
        position: relative;
        z-index: 2;
        display: none;
        content: " ";
        height: 80%;
        border-right: solid 1px #323233;
      }
    }

    .van-field__placeholder {
      position: absolute;
      left: 0;
      top: 0;
      color: #c8c9cc;
    }

    &.is-focus {
      .van-field__control:after {
        display: inline;
      }
    }

    &.is-waiting {
      .van-field__control:after {
        animation: keyboard-cursor 1s step-start infinite;
      }
    }
  }

  @-webkit-keyframes keyboard-cursor {
    from {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes keyboard-cursor {
    from {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>