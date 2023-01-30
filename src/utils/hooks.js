import * as React from 'react'

const useLocalStorageState = (
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) => {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

const useMode = () => {
  const preferDarkMode = '(prefers-color-scheme: dark)';
  const [mode, setMode] = React.useState(
    () => 
    localStorage.getItem('colorMode') || 
    (window.matchMedia(preferDarkMode).matches ? 'dark' : 'light'),
  )
  React.useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkMode)
    const handleChange = () => setMode(mediaQuery.matches ? 'dark' : 'light')
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  React.useEffect(() => {
    localStorage.setItem('colorMode', mode)
  }, [mode])

  return [mode, setMode]
  }

export {useLocalStorageState, useMode}