<template>
  <div class="help">
    <span class="help__icon">?</span>
    <span class="help__text">
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </span>
  </div>
</template>

<style scoped>
.help {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  font-size: 1.05rem;
  color: #555;
}

.help__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background: #38e8ff;
  color: #fff;
  border-radius: 50%;
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 10px;
  box-shadow: 0 1px 4px rgba(56, 232, 255, 0.12);
}

.help__text {
  line-height: 1.4;
}
</style>
