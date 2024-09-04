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

// Calculate the total years of experience
const total_years = Math.floor(
  (new Date() - new Date('2015-09-01')) / (1000 * 60 * 60 * 24 * 365.25)
)

const meta = {
  title: 'Michael Allen - Front End Developer',
  description: `Experienced Front End Developer with ${total_years} years of expertise, showcasing excellent collaboration, organization, and teamwork skills. Passionate about HTML, CSS, and JavaScript, I thrive on creating exceptional websites. My strong analytical, debugging, and problem-solving abilities have successfully served both small and large clients. Always open to exploring new technologies for innovative web solutions.`,
  type: 'website',
  image: '/assets/images/og_image.png',
  url: 'https://themichael.co.uk/'
}

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

useHead({
  title: meta.title,
  meta: [
    { name: 'description', content: meta.description },
    { hid: 'og-type', property: 'og:type', content: meta.type },
    { hid: 'og-title', property: 'og:title', content: meta.title },
    { hid: 'og-desc', property: 'og:description', content: meta.description },
    { hid: 'og-image', property: 'og:image', content: meta.image },
    { hid: 'og-url', property: 'og:url', content: meta.url },
    { hid: 't-type', name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/images/favicon.png' },
    { rel: 'apple-touch-icon', sizes: '180x18', href: '/assets/images/appletouch.png' }
  ],
  htmlAttrs: { lang: 'en' },
  bodyAttrs: { class: 'homepage sticky' }
})
</script>