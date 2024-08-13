let globalEcho = null

export const setEcho = echo => {
  globalEcho = echo
}

export const getEcho = () => {
  return globalEcho
}
