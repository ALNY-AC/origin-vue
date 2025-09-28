<template>
  <div>
    <div class="itemDialogstyle">
      <el-dialog :title="title" :visible.sync="dataVisible" width="80%">
        <el-form
          :model="dataform"
          :rules="dataRules"
          ref="dataform"
          label-width="150px"
          size="medium"
        >
          <el-col :span="12" v-if="datamode==='see'">
            <el-form-item label="内部标识符">
              <span class="see-span">{{dataform.identifier}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="中文名称" prop="nameCn">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dataform.nameCn}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文名称" prop="nameEn">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dataform.nameEn}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数据类型" prop="dataType">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dicFilter(dataform.dataType,'CATA_ELE_DATATYPE')}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字段描述" prop="desc">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dataform.desc}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数据长度" prop="length">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dataform.length}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="datamode==='see'">
            <template>
              <el-form-item label="所在信息资源名称：">
                <span class="see-span">{{dataform.infoName}}</span>
              </el-form-item>
            </template>
          </el-col>
          <el-col :span="12">
            <el-form-item label="来源部门：" prop="originOrg">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dataform.originOrg | orgName}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="默认值" prop="defaultValue">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dataform.defaultValue}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对象类型" prop="objectType">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dicFilter(dataform.objectType,'CATA_ELE_OBJECTYPE')}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否字典项" prop="dic">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dicFilter(dataform.dic,'YES_NO')}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="共享类型" prop="shareType">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dicFilter(dataform.shareType,'CATA_INFO_SHARETYPE')}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="共享条件" prop="shareCondition">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dataform.shareCondition}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="共享方式" prop="shareMode">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dicFilter(dataform.shareMode,'CATA_INFO_SHAREMETHOD')}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否向全社会开放" prop="open">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dicFilter(dataform.open,'YES_NO')}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="dataform.open ==='1'">
            <el-form-item label="开放条件" prop="openConditions">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dataform.openConditions}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="更新周期" prop="updateCycle">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dicFilter(dataform.updateCycle,'CATA_UPDATE_FREQ')}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否主键" prop="key">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dicFilter(dataform.key,'YES_NO')}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否为空" prop="blank">
              <template v-if="datamode==='see'">
                <span class="see-span">{{dicFilter(dataform.blank,'YES_NO')}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否归集" prop="imp">
              <template>
                <span class="see-span">{{dicFilter(dataform.imp,'YES_NO')}}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="datamode==='see'">
            <el-form-item label="来源" prop="source">
              <template>
                <span class="see-span">{{dicFilter(dataform.source,'CATA_INFO_SOURCETYPE')}}</span>
              </template>
            </el-form-item>
          </el-col>
        </el-form>
        <span slot="footer" class="dialog-footer" v-if="datamode!=='see'">
          <el-button type="primary" :loading="submitting" @click="addDataElementData()">确 定</el-button>
          <el-button @click="dataVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <dna-tree ref="treeDialog" @treesubmit="submitTree" treeType="isPer"></dna-tree>
    </div>
  </div>
</template>