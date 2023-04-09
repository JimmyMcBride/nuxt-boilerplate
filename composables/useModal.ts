export const useModal = (name: string) => {
  const isOpen = useState(name, () => false)

  function closeModal() {
    isOpen.value = false
  }
  function openModal() {
    isOpen.value = true
  }

  return {
    isOpen: computed(() => isOpen.value),
    closeModal,
    openModal,
  }
}
