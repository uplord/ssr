<template>
  <footer
    class="footer"
    :class="[
      { js_footer: animate == 'true', visible: sections[0].visible == true }
    ]"
  >
    <!-- <ul class="navigation">
      <li><a href="/">Home</a></li>
      <li><a href="/styleguide">Styleguide</a></li>
      <li><a href="/blocks">Blocks</a></li>
    </ul> -->

    <ul class="social-icons">
      <li class="instagram">
        <NuxtLink
          to="https://www.instagram.com/michael.adam.allen/"
          target="_blank"
          aria-label="Instagram"
        >
          <nuxt-icon name="instagram" filled />
        </NuxtLink>
      </li>
      <li class="linkedin">
        <NuxtLink
          to="https://www.linkedin.com/in/themichael/"
          target="_blank"
          aria-label="Linkedin"
        >
          <nuxt-icon name="linkedin-in" filled />
        </NuxtLink>
      </li>
      <li class="email">
        <NuxtLink to="mailto:michael@uplord.co.uk" aria-label="Email">
          <nuxt-icon name="envelope-solid" filled />
        </NuxtLink>
      </li>
    </ul>

    <p class="copyright">&copy; {{ getYear() }} Michael Allen</p>
  </footer>
</template>

<script>
export default {
  props: {
    animate: {
      type: [String, Boolean],
      default: false
    }
  },
  data() {
    return {
      sections: [
        {
          visible: false
        }
      ]
    }
  },
  mounted() {
    const vm = this

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            vm.sections[entry.target.index].visible = true
          }
        })
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 50px 0px"
      }
    )

    document.querySelectorAll(".js_footer").forEach(function (el, index) {
      el.index = index
      observer.observe(el)
    })
  },
  methods: {
    getYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss">
@import "style";
</style>
