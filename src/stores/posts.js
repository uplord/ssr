import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';
import { useFetch, useRuntimeConfig } from '#imports'; // Ensure you import from '#imports'

import axios from 'axios'

export const usePostsStore = defineStore('posts', () => {
  const config = useRuntimeConfig();
  
  const state = reactive({
    posts: null,
  });

  const fetchPosts = async (id, populate = null) => {

    try {
      const { data: data1 } = await axios.get(`${config.public.strapiApiUrl}/pages/${id}?${populate}`, {
        headers: {
          Authorization: `Bearer ${config.public.strapiApiKey}`,
        },
      });

      if (data1.data) {
        state.posts = data1.data

        try {
          await axios.post(`${config.public.siteUrl}/api/save-page`, state.posts);
          console.log('save')
        } catch (err) {
          console.error('Save fail', err);
        }

        try {
          await axios.post(`${config.public.siteUrl}/api/download-images`, state.posts);
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
    fetchPosts,
  };
});
