import { useState, useRef, useEffect } from 'react'
import EmojiPicker from 'emoji-picker-react'

export default function EmojiPickerBtn({ icon, onChange, size = 'md' }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <div className={`emoji-wrap emoji-wrap--${size}`} ref={wrapRef}>
      <button
        type="button"
        className="emoji-trigger"
        onClick={() => setOpen(o => !o)}
        title="Escolher ícone"
      >
        <span className="emoji-trigger__icon">{icon}</span>
        <span className="emoji-trigger__caret">▾</span>
      </button>

      {open && (
        <div className="emoji-picker-popup">
          <EmojiPicker
            onEmojiClick={(data) => { onChange(data.emoji); setOpen(false) }}
            lazyLoadEmojis
            skinTonesDisabled
            height={360}
            width={300}
            searchPlaceholder="Buscar emoji..."
          />
        </div>
      )}
    </div>
  )
}
