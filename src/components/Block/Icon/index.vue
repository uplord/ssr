<template>
  <!-- <div>{{ data.icon }}</div> -->
  <div class="block icon-block"
    :class="[
      data.class ? data.class : '',
      { js_section: hideAnimation != 'true', visible: visible == true }
    ]"
  >

    <div v-if="data.title" class="text-wrap">
      <h2>{{ data.title }}</h2>
    </div>

    <div class="icons"
      :class="[{
        stacked: stacked == 'true',
        variable: data.variable == true
      }]"
    >
      <div
        v-for="(icon, key) in data.icon"
        :key="key"
        class="icon js_article visible"
        :class="[
          icon.class,
          {
            'svg-icon': icon.svg
          }
        ]"
      >
        <div v-if="icon.svg" class="svg-wrap">
          <Image :image="icon.svg" />
        </div>

        <div
          v-if="icon.title || icon.content"
          class="text-wrap inner-container"
        >
          <h3 v-if="icon.subtitle" class="h4 primary">{{ icon.subtitle }}</h3>
          <h4 v-if="icon.title" class="h3">{{ icon.title }}</h4>

          <a
            v-if="icon.logo.data"
            :href="icon.logo_url"
            target="_blank"
            class="logo-wrap"
          >
            <Image :image="icon.logo" />
          </a>

          <div v-if="icon.content" class="inner-container">
            <StrapiBlocks :content="icon.content" />
          </div>
        </div>

        <div v-if="icon.tooltip" class="tooltip">{{ icon.tooltip }}</div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { StrapiBlocks } from 'vue-strapi-blocks-renderer';

const props = defineProps(["animate", "visible", "data", "id", "stacked", "hideAnimation"])

// const title = ref(props.data.title)
// let  allIcons = ref(props.data.icon)
</script>

<style lang="scss">
@import "style";
</style>