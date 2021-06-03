<template>
  <section>
    Read next
    <div id="widget-root"></div>
  </section>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data: function() {
    return {
      widgetId: "e9be2319-e287-44fc-811d-862a1cf713ab"
    }
  },
  mounted: function () {
    recombeeIntegration({
      type: "SetDefaults",
      itemId: this.post.id,
      userId: "",
      publicToken: "",
      databaseId: "",
      rapiHostname: "client-rapi.recombee.com:443",
    });
    recombeeIntegration({
      type: "AddDetailView",
    });
    this.$nextTick(() => {
      recombeeIntegration({
        type: "InitializeRecommendationWidget",
        rootElementId: "widget-root",
        widgetId: this.widgetId,
      });
      this.$forceUpdate();
    });
  },
};
</script>