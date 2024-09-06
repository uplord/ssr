<template>
  <component
    :is="button.type === 'submit' ? 'button' : (button.url || button.file?.data ? 'a' : 'div')"
    v-bind="componentAttrs"
    :href="href"
    :target="button.target"
    type="submit"
    class="button"
    :class="buttonClasses"
    :aria-label="button.text"
  >
    <span v-if="button.icon" class="svg-wrap">
      <nuxt-icon :name="button.icon" filled />
    </span>
    <span v-else>{{ button.text }}</span>
  </component>
</template>

<script setup>
const props = defineProps({
  button: {
    type: Object,
    required: true,
  },
});

const config = useRuntimeConfig();

const href = computed(() => {
  if (props.button.url) return props.button.url;
  if (props.button.file?.data) {
    const fileUrl = props.button.file.data.attributes.url;
    return props.button.file.data.attributes.provider === 'ipx'
      ? fileUrl
      : `${config.public.strapiUrl}${fileUrl}`;
  }
  return null;
});

const componentAttrs = computed(() => {
  if (props.button.type === 'submit') return { type: 'submit' };
  if (props.button.url || props.button.file?.data) return { href: href.value, target: props.button.target };
  return {};
});

const buttonClasses = computed(() => [
  props.button.class,
  { icon: props.button.icon },
]);
</script>

<style lang="scss">
@import "style";
</style>
