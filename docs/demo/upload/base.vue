<template>
  <e-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="3"
    :on-exceed="handleExceed"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </e-upload>
</template>

<script setup lang="ts">
import { Message, MessageBox } from 'element-ui';
import { ElUploadFile } from 'src/components/upload/src/uploadListProps';

const fileList = [
  { name: 'food1.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
  { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
  { name: 'food3.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
]

function handleRemove(file: File, fileList: ElUploadFile[]) {
  console.log(file, fileList);
}
function handlePreview(file: File) {
  console.log(file);
}
function handleExceed(files: File[], fileList: ElUploadFile[]) {
  Message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
}
function beforeRemove(file: File, fileList: ElUploadFile[]) {
  return MessageBox.confirm(`确定移除 ${ file.name }？`);
}
</script>

<style>
.upload-demo {
  min-height: 174px;
}
</style>