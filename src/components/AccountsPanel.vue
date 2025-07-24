<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts'
import { storeToRefs } from 'pinia'
import PlusButton from './ui/PlusButton.vue'
import Help from './ui/Help.vue'
import Select from './ui/Select.vue'
import Input from './ui/Input.vue'
import IconEyeOff from './icons/IconEyeOff.vue'
import IconEye from './icons/IconEye.vue'
import IconClose from './icons/IconClose.vue'
import IconTrash from './icons/IconTrash.vue'

const store = useAccountsStore()
const { accounts, passwordVisible, currentTagInput } = storeToRefs(store)
const {
  addAccount,
  removeAccount,
  updateType,
  togglePasswordVisibility,
  addTag,
  removeTag,
  handleTagKeydown,
} = store

const typeOptions = [
  { value: 'local', label: 'Локальная' },
  { value: 'ldap', label: 'LDAP' },
]
</script>

<template>
  <section class="accounts-panel">
    <header class="accounts-panel__header">
      <h2 class="accounts-panel__title">Учётные записи</h2>
      <PlusButton class="accounts-panel__add-btn" @click="addAccount" />
    </header>
    <Help />
    <div class="accounts-panel__table">
      <table class="accounts-table">
        <thead>
          <tr>
            <th>Метки</th>
            <th>Тип записи</th>
            <th>Логин</th>
            <th>Пароль</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in accounts" :key="account.id">
            <td class="tags-cell">
              <div class="tags-input-container">
                <span v-for="(tag, idx) in account.tags" :key="idx" class="tag">
                  {{ tag.value }}
                  <button type="button" class="tag-remove-btn" @click="removeTag(account.id, idx)">
                    <IconClose />
                  </button>
                </span>
                <input
                  v-model="currentTagInput[account.id]"
                  @keydown="handleTagKeydown($event, account.id)"
                  @blur="addTag(account.id)"
                  placeholder="Добавить метку..."
                  class="tags-input-inner"
                  autocomplete="off"
                />
              </div>
            </td>
            <td>
              <Select
                :options="typeOptions"
                :modelValue="account.type"
                placeholder="Выберите тип"
                @update:modelValue="(type) => updateType(account.id, type)"
              />
            </td>
            <td>
              <Input v-model="account.name" placeholder="Имя пользователя" />
            </td>
            <td>
              <div class="password-input-wrapper">
                <input
                  :type="passwordVisible[account.id] ? 'text' : 'password'"
                  v-model="account.password"
                  placeholder="Пароль"
                  class="password-input"
                  autocomplete="new-password"
                />
                <button
                  type="button"
                  class="password-eye-btn"
                  @click="togglePasswordVisibility(account.id)"
                  :aria-label="passwordVisible[account.id] ? 'Скрыть пароль' : 'Показать пароль'"
                  tabindex="-1"
                >
                  <component :is="passwordVisible[account.id] ? IconEyeOff : IconEye" />
                </button>
              </div>
            </td>
            <td class="accounts-table__trash-cell">
              <button
                class="accounts-table__trash-btn"
                @click="removeAccount(account.id)"
                title="Удалить"
                type="button"
              >
                <IconTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style lang="scss">
.accounts-panel {
  max-width: 90%;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(40, 60, 90, 0.08);
  padding: 32px 28px 24px 28px;
  justify-content: flex-start;

  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-bottom: 18px;
    margin-bottom: 8px;
  }

  &__title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #222;
    margin: 0;
    letter-spacing: 0.01em;
  }

  &__add-btn {
    flex-shrink: 0;
    margin-left: 16px;
  }

  &__table {
    margin-top: 16px;
  }
}

.accounts-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #f9fafb;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
  box-shadow: 0 1px 6px rgba(40, 60, 90, 0.04);

  th,
  td {
    padding: 12px 16px;
    text-align: left;
  }

  th {
    background: #f1f5f9;
    font-weight: 600;
    color: #333;
    border-bottom: 2px solid #e5e7eb;
  }

  tr:not(:last-child) td {
    border-bottom: 1px solid #e5e7eb;
  }

  td {
    background: #fff;
    vertical-align: middle;
  }

  th:first-child {
    border-top-left-radius: 10px;
  }
  th:last-child {
    border-top-right-radius: 10px;
  }
  tr:last-child td:first-child {
    border-bottom-left-radius: 10px;
  }
  tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
  }

  .accounts-table__trash-cell {
    width: 44px;
    text-align: center;
    padding: 0;
  }
  .accounts-table__trash-btn {
    background: none;
    border: none;
    padding: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;
    border-radius: 6px;

    &:hover {
      background: #f1f5f9;
    }

    svg {
      display: block;
    }
  }
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1.5px solid #d1d5db;
  border-radius: 10px;
  font-size: 1.1rem;
  color: #222;
  background: #f9fafb;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #b0b8c1;
    opacity: 1;
    font-size: 1rem;
  }

  &:focus {
    border-color: #38e8ff;
    box-shadow: 0 0 0 2px rgba(56, 232, 255, 0.15);
    background: #fff;
  }
}

.password-eye-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background 0.15s;

  &:hover {
    background: #f1f5f9;
  }

  svg {
    display: block;
  }
}

.tags-input-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  padding: 8px 10px;
  border: 1.5px solid #d1d5db;
  border-radius: 10px;
  background: #f9fafb;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  cursor: text;

  &:focus-within {
    border-color: #38e8ff;
    box-shadow: 0 0 0 2px rgba(56, 232, 255, 0.15);
    background: #fff;
  }
}

.tag {
  display: inline-flex;
  align-items: center;
  background: #e0f7fa;
  color: #00796b;
  border-radius: 6px;
  padding: 4px 8px 4px 12px;
  font-size: 0.95rem;
  height: 28px;
  line-height: 1;
}

.tag-remove-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  margin-left: 6px;
  padding: 2px;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.15s;
  color: #00796b;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 14px;
    height: 14px;
  }
}

.tags-input-inner {
  flex: 1;
  min-width: 100px;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  height: 28px;
  font-size: 1.05rem;
  min-width: 120px;

  &::placeholder {
    color: #b0b8c1;
    font-size: 1rem;
  }
}
</style>
