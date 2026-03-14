/**
 * Accordion state for legal/terms pages: openSections, toggleSection, expandAll.
 */
export function useAccordion (sectionCount: number) {
  const openSections = ref<boolean[]>([])

  function toggleSection (idx: number) {
    openSections.value = openSections.value.map((v, i) => (i === idx ? !v : v))
  }

  function expandAll (open: boolean) {
    openSections.value = Array(sectionCount).fill(open)
  }

  function init () {
    openSections.value = Array(sectionCount).fill(false)
  }

  return { openSections, toggleSection, expandAll, init }
}
