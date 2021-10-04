// Next.js runs on both the browser and server, and we don't have localStorage on the server.
// Use this variable to check if we have localStorage 
const isBrowser = typeof window !== "undefined";

export const getStateItem = (key: string): any | undefined => {
  if (!isBrowser) return {}
  const state = localStorage.getItem(key)
  if (state !== null) return JSON.parse(state)
  return undefined
}

export const setStateItem = (state: any, key: string): void => {
  if (!isBrowser) return
  localStorage.setItem(key, JSON.stringify(state))
}
