<template>
  <div v-if="data" class="block block-section alignmax"
    :class="{
      'animate js_section': animate === 'true',
      visible: visible == true
    }"
    :id="data.section_id"
  >
    <div class="inner-container">
      <div class="alignwide">
        <div class="sections">
          <div class="section"
            :class="[
              data.class,
              {
                'section-icons': data.icons,
                full: !data.image
              }
            ]"
          >
            <div v-if="data.image.data != null" class="image-wrap">
              <Image :image="data.image" :title="data.title" />
            </div>
            <div class="text-wrap inner-container">
              <h2 v-if="data.subtitle" class="h4 primary">{{ data.subtitle }}</h2>
              <h3 class="h2">{{ data.title }}</h3>
              <div v-if="data.content" class="inner-container">
                <StrapiBlocks :content="data.content" />
              </div>
              <BaseButtons v-if="data.buttons.length" :buttons="data.buttons" />
            </div>

            <div v-if="data.icons" class="image-wrap image-other">
              <BlockIcon
                :visible="true"
                :data="data.icons"
                stacked="true"
                hide-animation="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { StrapiBlocks } from 'vue-strapi-blocks-renderer';

const props = defineProps(["animate", "visible", "data", "id"])
</script>

<style lang="scss">
@import "style";
</style>