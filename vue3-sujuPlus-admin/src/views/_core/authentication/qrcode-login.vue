<script  setup>
import { AuthenticationQrCodeLogin,LOGIN_PATH } from 'suju-plus';

defineOptions({ name: 'QrCodeLogin' });
</script>

<template>
  <AuthenticationQrCodeLogin :login-path="LOGIN_PATH" />
</template>
