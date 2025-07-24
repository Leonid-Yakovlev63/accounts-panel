import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import type Account from '@/types/Account'
import type Tag from '@/types/Tag'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])
  const passwordVisible = reactive<{ [key: number]: boolean }>({})
  const currentTagInput = reactive<{ [key: number]: string }>({})

  function addAccount() {
    const newId = accounts.value.length ? Math.max(...accounts.value.map((a) => a.id)) + 1 : 1
    accounts.value.push({
      id: newId,
      name: '',
      type: '',
      password: '',
      tags: [],
    })
    currentTagInput[newId] = ''
  }

  function removeAccount(id: number) {
    accounts.value = accounts.value.filter((a) => a.id !== id)
    delete currentTagInput[id]
  }

  function updateType(id: number, newType: string) {
    const acc = accounts.value.find((a) => a.id === id)
    if (acc) acc.type = newType
  }

  function togglePasswordVisibility(id: number) {
    passwordVisible[id] = !passwordVisible[id]
  }

  function addTag(id: number) {
    const value = currentTagInput[id]?.trim()
    if (value) {
      const acc = accounts.value.find((a) => a.id === id)
      if (acc && !acc.tags.some((tag) => tag.value === value)) {
        acc.tags.push({ value })
        currentTagInput[id] = ''
      }
    }
  }

  function removeTag(id: number, tagIndex: number) {
    const acc = accounts.value.find((a) => a.id === id)
    if (acc) {
      acc.tags.splice(tagIndex, 1)
    }
  }

  function handleTagKeydown(event: KeyboardEvent, id: number) {
    if (['Enter', ';', ','].includes(event.key)) {
      event.preventDefault()
      addTag(id)
    }
  }

  return {
    accounts,
    passwordVisible,
    currentTagInput,
    addAccount,
    removeAccount,
    updateType,
    togglePasswordVisibility,
    addTag,
    removeTag,
    handleTagKeydown,
  }
})
