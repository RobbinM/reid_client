<template>
  <el-container class="container">
    <el-aside width="25%" class="left">
      <choose/>
    </el-aside>
    <el-container>
      <el-header class="title_bar">
        <span>ReID Client</span>
        <el-button @click="executeData" style="margin-left: 20px">开始检索</el-button>
      </el-header>
      <el-main>
        <el-table :data="outputImg">
          <el-table-column prop="id" label="ID" width="50px"/>
          <el-table-column prop="src" label="目标图片">
            <template slot-scope="scope">
              <el-image
                style="width: 70%; height: auto"
                :src="scope.row.src"/>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
          <span>请先选择要检索的数据集和目标</span>
          <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Choose from '../choose/choose.vue';

export default {
  name: "main-view",
  components: {
    Choose
  },
  data: function () {
    return {
      outputImg: [],
      dialogVisible: false
    }
  },
  methods: {
    executeData: function () {
      let user = this.$db.get('user').find({name: 'shift114'}).value()
      console.log(user)
      // if (this.$store.getters.getSetFlag && this.$store.getters.getTargetFlag) {
      //   for (let i = 1; i <= 16; ++i) {
      //     this.outputImg.push({
      //       id: i,
      //       src: this.$imgSrc('internal_output/internal_output_' + i + '.jpg')
      //     })
      //   }
      //   console.log(this.outputImg[0])
      // } else {
      //   this.dialogVisible = true
      // }
    }
  }
};
</script>

<style>
.container {
  height: calc(100vh);
}

.left {
  background-color: aliceblue;
}

.title_bar {
  background-color: aliceblue;
  text-align: left;
  line-height: 60px;
  font-size: 20px;
}
</style>