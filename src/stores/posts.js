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
    // const url = 'http://localhost:3000/api/posts'
    let response

    // let response = await axios.get(url);
    // console.log(response.data)

    try {
      const { data: data1 } = await axios.get(`${config.public.strapiApiUrl}/pages/${id}?${populate}`, {
        headers: {
          Authorization: `Bearer ${config.public.strapiApiKey}`,
        },
      });

      if (data1.data) {
        // console.log('data1', data1.data)
        state.posts = data1.data

        try {
          const { data: data2 } = await axios.post('http://localhost:3000/api/save-page', state.posts);
          console.log('save')
        } catch (err) {
          console.error('Save fail', err);
        }

        try {
          const { data: data4 } = await axios.post('http://localhost:3000/api/download-images', state.posts);
          console.log('download', data4)
        } catch (err) {
          console.error('Save fail', err);
        }
      }
    } catch (err) {
      console.error('Strapi', err);

      try {
        const { data: data3 } = await axios.get('http://localhost:3000/api/posts');
        state.posts = data3
      } catch (err) {
        console.error('Local', err);
      }
    }
  };

  return {
    ...toRefs(state),
    fetchPosts,
  };
});
