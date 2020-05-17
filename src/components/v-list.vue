<template>
  <!-- 可视区域的容器 -->
  <div ref="vTree" class="v-tree-container" @scroll="scrollEvent">
    <!-- 容器内的占位 -->
    <div class="v-tree-placeholder" :style="{ height: listHeight + 'px' }"></div>
    <!-- 渲染区域 -->
    <div class="v-tree-list" :style="{ transform: getTransform }">
      <div
        v-for="item in visibleData"
        :key="item.id"
        class="v-tree-item"
        :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-list',
  props: {
    listData: {
      type: Array,
      default: () => []
    },
    itemHeight: {
      type: Number,
      default: 200
    },
    estimatedItemSize: {
      type: Number
    }
  },
  computed: {
    listHeight() {
      return this.listData.length * this.itemHeight;
    },
    visibleCount() {
      return Math.ceil(this.screenHeight / this.itemHeight);
    },
    getTransform() {
      return `translate3d(0, ${this.startOffset}px, 0)`;
    },
    visibleData() {
      return this.listData.slice(this.start, Math.min(this.end, this.listData.length));
    },
  },
  mounted() {
    this.screenHeight = this.$el.clientHeight;
    this.start = 0;
    this.end = this.start + this.visibleCount;
  },
  data() {
    return {
      screenHeight: 0,
      startOffset: 0,
      start: 0,
      end: null
    }
  },
  methods: {
    initPositions() {
      this.positions = this.listData.map((item, index) => {
        return {
          index,
          height: this.estimatedItemSize,
          top: index * this.estimatedItemSize,
          bottom: (index + 1) * this.estimatedItemSize
        }
      })
    },
    scrollEvent() {
      const scrollTop = this.$refs.vTree.scrollTop;
      this.start = Math.floor(scrollTop / this.itemHeight);
      this.end = this.start + this.visibleCount;
      this.startOffset = scrollTop - (scrollTop % this.itemHeight);
    }
  }
}
</script>

<style scoped>
.v-tree-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.v-tree-placeholder {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.v-tree-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.v-tree-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>