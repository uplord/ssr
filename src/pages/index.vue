<template>
  <main>
    <section>
      <div class="inner-container">
        <div @click="testButton()" class="button">Button</div>
        <component
          v-if="sections"
          v-for="(section, key) in sections"
          :key="key"
          :is="getComponent(section.__component)"
          :data="section"
          animate="true"
          :visible="visible[key].visible"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import { usePostsStore } from '~/stores/posts'
import { storeToRefs } from "pinia";

import BlockBanner from '@/components/Block/Banner';
import BlockSection from '@/components/Block/Section';

const componentMapping = {
  'blocks.banner': BlockBanner,
  'blocks.section': BlockSection,
};

const postsStore = usePostsStore();

const config = useRuntimeConfig();

const loading = ref(false);
const sections = ref([]);
const id = 1;

// Slide
let populate = 'populate[sections][populate][slide][populate][image]=*';
populate += '&populate[sections][populate][slide][populate][buttons][populate]=file';
// Section
populate += '&populate[sections][populate][section][populate][image]=*';
populate += '&populate[sections][populate][section][populate][buttons][populate]=file';

if (config.public.devMode == 'true') {
  await postsStore.fetchPosts(id, populate);
}

if (postsStore.posts === null) {
  const { data } = await useFetch('/api/posts')
  postsStore.posts = data.value
}
console.log('posts', postsStore.posts)
sections.value = postsStore.posts.attributes.sections
const visible = ref(Array.from({ length: sections.value.length }, () => ({ visible: false })))

const getComponent = (componentName) => componentMapping[componentName] || null;

const testButton = async () => {
  const { data: data2 } = await useFetch('/api/test')
  console.log('data2', data2)
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            loading.value = true
            visible.value[entry.target.index].visible = true
          }, index * 1200)
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -100px 0px"
    }
  )

  document.querySelectorAll(".js_section").forEach(function (el, index) {
    el.index = index
    observer.observe(el)
  })
})
</script>