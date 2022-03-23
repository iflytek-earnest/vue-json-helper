<template>
  <div id="app">
    <div class="introduce">
      <h1>Vue-Json-Helper</h1>
      <p class="content">Help people who don't understand JSON to use JSON！</p>
    </div>

    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="13">
        <el-card class="box-card">
          <p class="p-title">Helper</p>
          <VueJsonHelper
            :size="size"
            :names="names"
            :jsonStr="jsonStr"
            @jsonListener="jsonListener"
          />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="11">
        <el-card class="box-card">
          <p class="p-title">Viewer</p>
          <json-viewer
            :value="jsonData"
            :expand-depth="5"
            copyable
            sort
          ></json-viewer>
        </el-card>
        <el-card class="box-card" style="margin-top: 10px;">
          <el-col class="tab-control">
            <el-popover
              trigger="click"
              width="800px"
              @hide="handleAddHide()"
              v-model="hideFlag"
            >
              <p class="popover-title">更新数据</p>
              <el-form :model="addForm" label-width="30px">
                <el-form-item label="键"
                  ><el-input
                    v-model="addForm.key"
                    placeholder="键"
                    size="mini"
                  ></el-input
                ></el-form-item>
                <el-form-item label="值"
                  ><el-input
                    v-model="addForm.name"
                    placeholder="值"
                    size="mini"
                  ></el-input
                ></el-form-item>
                <el-form-item align="center" label-width="0"
                  ><el-button size="mini" type="primary" @click="handleAdd()"
                    >提交</el-button
                  ></el-form-item
                >
              </el-form>
              <el-button size="mini" type="primary" slot="reference"
                >新增</el-button
              >
            </el-popover>
            <el-popconfirm title="确定批量删除数据？" @confirm="handleDelete()">
              <el-button size="mini" type="danger" slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
          </el-col>
          <el-table
            ref="multipleTable"
            border
            :data="names"
            size="mini"
            stripe
            style="width: 100%;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column label="键" prop="key" />
            <el-table-column label="值" prop="name" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-popover
                  trigger="click"
                  width="800px"
                  @hide="handleEditHide(scope.$index)"
                >
                  <p class="popover-title">更新数据</p>
                  <el-form :model="scope.row" label-width="30px">
                    <el-form-item label="键"
                      ><el-input
                        v-model="scope.row.key"
                        placeholder="键"
                        size="mini"
                      ></el-input
                    ></el-form-item>
                    <el-form-item label="值"
                      ><el-input
                        v-model="scope.row.name"
                        placeholder="值"
                        size="mini"
                      ></el-input
                    ></el-form-item>
                  </el-form>
                  <el-button size="mini" slot="reference">编辑</el-button>
                </el-popover>
                <el-popconfirm
                  title="确定删除该条数据？"
                  @confirm="handleDelete(scope.$index, scope.row)"
                >
                  <el-button size="mini" type="danger" slot="reference"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
var data = require('./utils/data.js');
import VueJsonHelper from "./components/Helper";
import JsonViewer from "vue-json-viewer";
export default {
  name: "App",
  components: {
    VueJsonHelper,
    JsonViewer,
  },
  data() {
    return {
      size: 'mini',
      names: data.names,
      addForm: {},
      hideFlag: false,
      multipleSelection: [],
      jsonStr: JSON.stringify(data.data),
      jsonData: data.data
    };
  },
  created() {
    this.json = JSON.stringify(this.jsonData);
  },
  methods: {
    /**处理新增 */
    handleAdd() {
      var names = this.names;
      var addForm = this.addForm;
      if (!this.isNull(addForm.key) && !this.isNull(addForm.name)) {
        for (var i in names) {
          if (names[i].key == addForm.key) {
            this.$notify.error({
              title: "错误",
              message: "键已存在",
            });
            return;
          }
        }
        this.names.push(addForm);
        this.hideFlag = !this.hideFlag;
        this.addForm = {};
      }
    },
    /**处理新增框隐藏 */
    handleAddHide() {
      this.addForm = {};
    },
    /**处理编辑框隐藏 */
    handleEditHide(index) {
      var key = this.names[index].key;
      var name = this.names[index].name;
      if (this.isNull(key) || this.isNull(name)) {
        this.$delete(this.names, index);
      }
    },
    /**处理删除 */
    handleDelete(index, row) {
      if (index != undefined && row != undefined) {
        this.$delete(this.names, index);
        this.$notify.success({
          title: "正确",
          message: "删除成功",
        });
        return;
      }
      var names = this.names;
      var multipleSelection = this.multipleSelection;
      if (multipleSelection.length == 0) {
        this.$notify.error({
          title: "错误",
          message: "至少选择一项",
        });
        return;
      }
      for (var i in names) {
        for (var j in multipleSelection) {
          console.log(names[i], multipleSelection[j]);
          if (names[i] == multipleSelection[j]) {
            this.$delete(this.names, i);
            continue;
          }
        }
      }
      this.$notify.success({
        title: "正确",
        message: "删除成功",
      });
    },
    /**子集传递数据 */
    jsonListener(jsonData) {
      this.jsonData = jsonData;
    },
    /**多选，element自带 */
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    /**多选，element自带 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**判断是否为空 */
    isNull(e) {
      var flag = false;
      if (e == null || e == "" || e == undefined) {
        flag = true;
      }
      return flag;
    },
  },
};
</script>

<style scope>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-col {
  border-radius: 4px;
}
.introduce {
  text-align: center;
}
.content {
  color: #888;
}
.tab-control {
  margin-top: 5px;
  margin-bottom: 5px;
}
.el-form-item {
  margin-bottom: 0;
}
.popover-title {
  margin-top: 5px;
  margin-bottom: 5px;
  font-weight: bold;
}
.p-title {
  margin-top: 5px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #888;
  text-align: center;
}
.box-card {
  margin-top: 10px;
}
</style>
