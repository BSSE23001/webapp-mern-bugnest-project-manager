import { useEffect, useState } from 'react'

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className='p-2 rounded bg-gray-300 dark:bg-gray-700'
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  )
}

export default ThemeToggle
