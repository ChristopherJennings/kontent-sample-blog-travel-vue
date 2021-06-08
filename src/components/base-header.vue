<template>
  <header
    :id="headerId"
    class="has-cover"
  >
    <div class="inner">
      <nav id="navigation">
        <button-menu />
      </nav>
      <slot/>
    </div>
  </header>
</template>

<script>
import ButtonMenu from './button-menu'
export default {
  name: 'base-header',
  components: {
    ButtonMenu
  },
  props: {
    isHome: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    headerId: function () {
      return this.isHome ? 'blog-header' : 'post-header'
    }
  }
}
</script>
