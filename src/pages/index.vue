<template>
  <main>
    <section>
      <div class="inner-container">
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
import { usePageStore } from '~/stores/page'
import { storeToRefs } from "pinia";

import BlockBanner from '@/components/Block/Banner';
import BlockSection from '@/components/Block/Section';
import BlockCard from '@/components/Block/Card';
import BlockIcon from '@/components/Block/Icon';

const componentMapping = {
  'blocks.banner': BlockBanner,
  'blocks.section': BlockSection,
  'blocks.card': BlockCard,
  'blocks.icons': BlockIcon,
};

const pageStore = usePageStore();

const config = useRuntimeConfig();

const loading = ref(false);
const sections = ref([]);
const id = 1;

// Slide
let populate = 'populate[block][populate][slide][populate][image]=*';
populate += '&populate[block][populate][slide][populate][buttons][populate]=file';
// Section
populate += '&populate[block][populate][image]=*';
populate += '&populate[block][populate][buttons][populate]=file';
populate += '&populate[block][populate][icons][populate][icon][populate][logo]=*';
// Card Section
populate += '&populate[block][populate][card][populate][image]=*';
populate += '&populate[block][populate][card][populate][svg]=*';
// Icon Section
populate += '&populate[block][populate][icon][populate][svg]=*';

if (config.public.devMode == 'true') {
  await pageStore.fetchPage(id, populate);
}

if (pageStore.page === null) {
  const { data } = await useFetch('/api/get-page?id=' + id)
  pageStore.page = data.value
}
sections.value = pageStore.page.attributes.block
console.log(sections.value)
const visible = ref(Array.from({ length: sections.value.length }, () => ({ visible: false })))

const getComponent = (componentName) => componentMapping[componentName] || null;

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