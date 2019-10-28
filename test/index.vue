<template>
  <div id="test">
    
    <el-card shadow="never">
      <el-form inline>
        <el-form-item label="状态">
          <el-select v-model="state">
            <el-option label="状态1" :value="1"></el-option>
            <el-option label="状态2" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="date" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input @keydown.enter.native="update" v-model="key" placeholder="搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="update">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list" v-loading="loading" border style="width: 100%">
        <el-table-column prop="p1" label="参数1"></el-table-column>
        <el-table-column prop="p2" label="参数9">
          <template slot-scope="scope">
            <el-tag>{{scope.row.p2}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="()=>scope.row">查看</el-button>
            <el-button type="text" @click="()=>scope.row">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding:10px 0">
        <el-pagination :current-page.sync="page" :page-sizes="[10, 20, 30, 40]" :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>