<template>
  <div class="my-table">
    <search-bar v-model="keyword" @click-button="doSearch" width="30%" placeholder="请输入需要查找的内容" style="margin: 20px 0"></search-bar>
    <div class="tags-wrap">
            <el-tag 
            v-for="item in categoryList" 
            :key="item.id"
            :type="activeCategoryId === item.id ? 'success' : 'info'"
            @click="clickTag(item)"
            >
                {{item.name}}
            </el-tag>
        </div>
    <el-table 
    ref="multipleTable"
    :data="contentListData"
    :row-key="row => row.id"
    @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column v-for="item in column" :key=""> -->
        
      <!-- </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
  import { computed } from 'vue';
import SearchBar from '../SearchBar/SearchBar.vue';
  export default {
    props: {
      /**
       * 表头数据
       */
      columns:{},
      /**
       * 表格数据
       */
      dataList:{},
      /**
       * 数据分类信息
       */
      categoryList:{}
    },
    components: {
      SearchBar
    },
    computed: {
      contentListData() {
        return []
      }
    },
    methods: {
      handleSelectionChange() {

      }
    }
  }
</script>

<style scoped>

</style>