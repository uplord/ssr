<template>
  <div v-if="isSvg" class="svg-wrap">
    <div v-html="svgContent" class="nuxt-icon"></div>
  </div>
  <NuxtImg
    v-else-if="image.data"
    :provider="image.data.attributes.provider === 'ipx' ? '' : 'strapi'"
    :src="image.data.attributes.url"
    format="webp"
    fit="outside"
    :alt="title"
    :width="image.data.attributes.width"
    :height="image.data.attributes.height"
  />
</template>

<script setup>
const props = defineProps({
  image: {
    type: Object,
  },
  title: {
    type: String,
  },
})

const config = useRuntimeConfig()

const isSvg = ref(false)
const svgContent = ref('')

watchEffect(async () => {
  if (props.image.data) {
    const url = (props.image.data.attributes.provider === 'ipx' ? '' : config.public.strapiUrl) + props.image.data.attributes.url
    if (url.endsWith('.svg')) {
      isSvg.value = true
      try {
        const response = await fetch(url)
        if (response.ok) {
          svgContent.value = await response.text()
        } else {
          console.error('Failed to fetch SVG content:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching SVG:', error)
      }
    } else {
      isSvg.value = false
    }
  }
})
</script>