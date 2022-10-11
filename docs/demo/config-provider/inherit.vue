<template>
  <e-config-provider :pagination="{ background: true }">
    <div>
      <div>
        <h4>页面1</h4>
        <p>巴拉巴拉...</p>
      </div>
      <e-pagination :total="50"></e-pagination>
      <e-config-provider :pagination="{ background: false }">
        <div>
          <h5>页面1.1</h5>
          <p>巴拉巴拉...</p>
          <e-pagination :total="50"></e-pagination>
        </div>
      </e-config-provider>
    </div>
  </e-config-provider>
</template>