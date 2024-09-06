<template>
  <div
    class="block block-cards alignmax js_section"
    :class="[
      data.class ? data.class : '',
      { visible: visible == true }
    ]"
    :id="data.section_id"
  >
    <div class="inner-container">
      <div class="alignwide">
        <div class="inner-container">
          <div v-if="data.title" class="text-wrap">
            <h2>{{ data.title }}</h2>
          </div>

          <div class="cards">
            <component
              :is="card.link ? 'a' : 'div'"
              v-for="(card, key) in data.card"
              :key="key"
              ref="card"
              :href="card.link || ''"
              :target="card.target"
              class="card js_article"
              :class="[
                card.class,
                {
                  hover: card.text_hover == true,
                  'text-hide': card.text_hide == true,
                  visible: card.visible == true
                }
              ]"
            >
              <div class="card-inner">
                <div v-if="card.image.data != null" class="image-wrap">
                  <Image :image="card.image" :title="data.title" />
                </div>
                <div v-else-if="card.svg.data != null" class="image-wrap svg-wrap">
                  <Image :image="card.svg" :title="data.title" />
                </div>

                <div class="text-wrap inner-container">
                  <h3>{{ card.title }}</h3>
                  <p v-if="card.subtitle">{{ card.subtitle }}</p>
                </div>
                <div v-if="card.tooltip" class="tooltip">
                  {{ card.tooltip }}
                </div>
              </div>
            </component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
const props = defineProps(["animate", "visible", "data", "id"])

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          props.data.card[entry.target.index].visible = true
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0,
      rootMargin: "0px 0px 50px 0px"
    }
  )

  document.querySelectorAll(".card").forEach((el, index) => {
    el.index = index
    observer.observe(el)
  })
})
</script>

<style lang="scss">
@import "style";
</style>