<template>
  <div id="{{ COMPOMENT_NAME }}">
    <el-card shadow="never" header="搜索条件" style="margin-bottom:20px">
      <el-form ref="queryForm" inline :model="query" @submit.native.prevent>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-form-item label="关键词">
                <el-input @keydown.enter.native="update" v-model="query.key" placeholder="搜索"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker
                v-model="query.date"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button @click="update()" type="primary" icon="el-icon-search">搜索</el-button>
              <el-button
                @click="$refs.queryForm.resetFields();update()"
                icon="el-icon-refresh-right"
              >重置</el-button>
              <el-button
                type="text"
                @click="isMsoreScreen=!isMsoreScreen"
                :icon="isMsoreScreen?'el-icon-arrow-up':'el-icon-arrow-down'"
              >更多</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isMsoreScreen">
          <el-col :span="24">
            <el-form-item label="下拉框">
              <el-select v-model="query.state">
                <el-option label="状态1" :value="1"></el-option>
                <el-option label="状态2" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="单选">
              <el-radio-group @change="update" v-model="query.state">
                <el-radio label>全部</el-radio>
                <el-radio label="1">状态1</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card shadow="never" header="搜索结果">
      <el-table :data="list" v-loading="loading" border style="width: 100%">
        <el-table-column prop="p1" label="参数1"></el-table-column>
        <el-table-column prop="p2" label="参数9">
          <template slot-scope="scope">
            <el-tag>{{scope.row.p2}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column></el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <div class="table-button">
              <el-button type="text" @click="show(scope.row)">查看</el-button>
              <el-button type="text" @click="edit(scope.row)">编辑</el-button>
              <el-button type="text" @click="del(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding:10px 0">
        <el-pagination
          background
          :current-page.sync="query.page"
          :page-size.sync="query.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>