import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
export default function Overlay({ title, onClose, children, drawer = false }: { title: string; onClose: () => void; children: ReactNode; drawer?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    dialog?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      // Switching dialogs removes the previous dialog's trigger from the DOM.
      // Return to the persistent bag trigger in that case.
      if (previous?.isConnected && previous !== document.body) previous.focus();
      else document.querySelector<HTMLButtonElement>('.cart-button')?.focus();
    };
  }, []);
  return <dialog ref={ref} className={drawer ? 'overlay drawer' : 'overlay modal'} aria-labelledby="overlay-title" onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="overlay-inner"><div className="overlay-heading"><h2 id="overlay-title">{title}</h2><button className="icon-button" aria-label="Close dialog" onClick={onClose} autoFocus><X size={22}/></button></div>{children}</div>
  </dialog>;
}
