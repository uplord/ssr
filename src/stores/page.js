import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';
import { useRuntimeConfig } from '#imports'; // Ensure you import from '#imports'

import axios from 'axios'

export const usePageStore = defineStore('page', () => {
  const config = useRuntimeConfig();
  
  const state = reactive({
    page: null,
  });

  const fetchPage = async (id, populate = null) => {

    try {
      const { data } = await axios.get(`${config.public.strapiApiUrl}/pages/${id}?${populate}`, {
        headers: {
          Authorization: `Bearer ${config.public.strapiApiKey}`,
        },
      });

      if (data.data) {
        state.page = data.data

        try {
          await axios.post(`${config.public.siteUrl}/api/save-page`, state.page);
          console.log('save')
        } catch (err) {
          console.error('Save fail', err);
        }

        try {
          await axios.post(`${config.public.siteUrl}/api/download-images`, state.page);
          console.log('download')
        } catch (err) {
          console.error('Save fail', err);
        }
      }
    } catch (err) {
      console.error('Strapi', err);
    }
  };

  return {
    ...toRefs(state),
    fetchPage,
  };
});
