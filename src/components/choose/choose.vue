<template>
  <el-form class="container">
    <el-form-item label="模式" style="padding-top: 6%">
      <el-select
          v-model="chooseOption"
          placeholder="请选择模式"
          style="width: 70%"
          @change="currSelectOption"
      >
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <hr/>
    <p>选择要检索的数据集合</p>
    <el-button @click="chooseDataset">选择文件夹</el-button>
    <p>{{ datasetPath }}</p>
    <hr/>
    <p>选择要检索的行人对象</p>
    <el-form-item class="target_background">
      <div class="drop_area" @click="chooseTarget">
        <p v-if="!showTarget" class="targetText">拖入或点击选择要检索的行人对象图像</p>
        <img :src="$imgSrc('internal_target/internal_target_1.jpg')" alt="" v-if="showTarget" class="target">
      </div>
    </el-form-item>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
      <span>{{ dialogText }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </el-form>
</template>

<script>
export default {
  name: "choose",
  data: function () {
    return {
      datasetPath: "还没有选择要检索的数据集",
      targetPath: "",
      options: [
        {
          value: "option 1",
          label: "演示模式",
        },
        {
          value: "option 2",
          label: "生产模式",
        },
      ],
      chooseOption: "",
      showTarget: false,
      dialogVisible: false,
      dialogText: "",
    };
  },
  methods: {
    currSelectOption: function (val) {
      if (val === 'option 2') {
        this.datasetPath = '还没有选择要检索的数据集'
        this.$store.commit('setSetFlag', false)
        this.targetPath = ''
        this.showTarget = false
        this.$store.commit('setTargetFlag', false)
      }
    },
    chooseDataset: function () {
      if (this.chooseOption === "option 1") {
        this.datasetPath = "./assets/internal_sample";
        this.$store.commit('setSetFlag', true)
      } else if (this.chooseOption === "option 2") {
        this.dialogText = "模型训练还未完成"
        this.dialogVisible = true;
      } else {
        this.dialogText = "请先选择模式";
        this.dialogVisible = true;
      }
    },
    chooseTarget: function () {
      if (this.chooseOption === 'option 1') {
        this.targetPath = ""
        this.showTarget = true
        this.$store.commit('setTargetFlag', true)
      } else if (this.chooseOption === 'option 2') {
        this.dialogText = '模型训练还未完成'
        this.dialogVisible = true;
      } else {
        this.dialogText = "请先选择模式"
        this.dialogVisible = true
      }
    }
  },
};
</script>

<style scoped>
.container {
  padding-left: 6%;
  padding-right: 6%;
}

.target_background {
  height: 43%;
  background-color: #dcdcdc;
  border-radius: 10px;
  padding: 15px;
}

.drop_area {
  height: calc(42vh);
  border: 2px dashed black;
  border-radius: 10px;
  white-space: normal;
  word-wrap: break-word;
  overflow-y: auto;
  text-align: center;
  margin: 0;
}
.targetText {
  padding-top: 40%;
}

.target {
  width: 95%;
  height: 90%;
  margin-top: 5%;
}
</style>