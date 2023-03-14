<template>
  <div class="top_content">
    <div class="top">
      <div class="top_img">
        <img src="../assets/imgs/go2.png" alt="">
      </div>

      <p>Welcome</p>
      <el-button>退 出</el-button>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
  .top_content {
    .top {
      display: flex;
      position: absolute;
      right: 0.8rem;
      height: 100%;
      .top_img{
        height: 60px;
        width: 60px;
        border-radius: 50%;
        transform: translateY(20px);
        overflow: hidden;
      }
      p {
        font-size: 0.2rem;
        font-weight: bolder;
        margin-left: 0.2rem;
        line-height: 100px;
      }
      img {
        width: 100%;
        transform: translateY(-0.25rem);
      }
      .el-button {
        background-color: rgb(18,16,29);
        color: white;
        font-size: 0.15rem;
        margin-left: 0.8rem;
        height: 35px;
        transform: translateY(30px);
        border: none;
      }
      .el-button:hover {
        background-color: white;
        color: rgb(18,16,29);
        border: 1px solid black;
      }
    }
  }
</style>
