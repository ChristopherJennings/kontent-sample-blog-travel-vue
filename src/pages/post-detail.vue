<template>
  <div v-if="postLoaded" class="post-template">
        
      <span id="home-button" class="nav-button">
        <router-link :to="'/' + post.language" class="home-button" title="Home"><i class="ic ic-arrow-left"></i> Home</router-link>
      </span>
      
    <the-header-generic :title="post.title" :cover-image-url="post.featureImageUrl">
      <post-meta :authors="post.authors" :date="post.published" :activities="post.activities" />
    </the-header-generic>
    <base-layout-page>
      <base-dynamic-render v-if="post.body" :dynamic-template="post.body" />
      <template slot="after-content-section">
        <section class="post-info">
          <buttons-social-sharing :twitter-text="post.title" :url="currentUrl" />
          <buttons-activities :activities="post.activities" />
          <div class="clear"></div>
          <summary-author v-for="author in post.authors" :key="author.slug" :author="author" />
        </section>
        <!--<recombee-widget :post="post"></recombee-widget>-->
      </template>
    </base-layout-page>
  </div>
</template>

<script>
import { postService } from "../api/services/post-service";

import BaseDynamicRender from "@/components/base-dynamic-render";
import BaseLayoutPage from "@/components/base-layout-page";
import ButtonsActivities from "@/components/buttons-activities";
import ButtonsSocialSharing from "@/components/buttons-social-sharing";
import PostMeta from "@/components/post-meta";
import SummaryAuthor from "@/components/summary-author";
import TheHeaderGeneric from "@/components/the-header-generic";
//import RecombeeWidget from "@/components/recombee-widget";

export default {
  name: "post-detail",
  components: {
    BaseDynamicRender,
    BaseLayoutPage,
    ButtonsActivities,
    ButtonsSocialSharing,
    PostMeta,
    SummaryAuthor,
    TheHeaderGeneric,
    //RecombeeWidget,
  },
  props: {
    year: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    postData: {
      type: Object,
    },
  },
  data: function () {
    return {
      post: {},
      postLoaded: false,
    };
  },
  computed: {
    currentUrl: function () {
      return window.location.href;
    },
  },
  watch: {
    $route: {
      handler: "loadPage",
      immediate: true,
    },
  },
  methods: {
    loadPage() {
      if (this.postData) {
        this.post = this.postData;
        this.postLoaded = true;
      } else {
        postService
          .getItem({
            year: this.year,
            month: this.month,
            date: this.date,
            slug: this.slug,
          })
          .then((post) => {
            if (post) {
              this.post = post;
              this.postLoaded = true;
            } else {
              this.$router.replace({ name: "not-found", query: { url: this.$route.fullPath } });
            }
          });
      }
    },
  },
};
</script>
