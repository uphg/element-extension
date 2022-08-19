<template>
  <div class="test">
    <EConfigProvider>
      <div>
        <Upload>
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </Upload>
      </div>
    </EConfigProvider>
  </div>
</template>

<script setup lang="ts">
import EConfigProvider from '../components/e-config-provider'
import { ref } from 'vue';
import { Upload } from 'element-ui';


</script>