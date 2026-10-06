import { useState } from "react";
import { X } from "lucide-react";

const whatsappUrl = `https://wa.me/2348031975415?text=${encodeURIComponent("Hi Cyberlife Digital, I need assistance.")}`;

export function WhatsAppAssistance() {
  const [showPrompt, setShowPrompt] = useState(true);

  return (
    <div className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-40 flex items-end gap-3 sm:right-6">
      {showPrompt && (
        <div className="relative max-w-[calc(100vw-7rem)] rounded-2xl border border-border bg-background p-4 pr-9 text-foreground shadow-xl">
          <button
            type="button"
            onClick={() => setShowPrompt(false)}
            aria-label="Dismiss assistance message"
            className="absolute right-1 top-1 rounded-full p-2 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <X className="size-4" />
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <span className="block text-sm font-bold">Need assistance?</span>
            <span className="mt-1 block text-xs text-muted-foreground">
              Chat with us on WhatsApp
            </span>
          </a>
        </div>
      )}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Need assistance? Chat with Cyberlife Digital on WhatsApp (opens in a new tab)"
        className="whatsapp-assistance-button relative grid size-14 shrink-0 place-items-center rounded-full bg-[#128c4a] text-white shadow-lg transition-colors hover:bg-[#0e743d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#128c4a]"
      >
        <svg viewBox="0 0 24 24" className="size-8" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.46 0 .1 5.36.1 11.95c0 2.1.55 4.16 1.6 5.97L0 24l6.24-1.64a11.93 11.93 0 0 0 5.8 1.48h.01c6.59 0 11.95-5.36 11.95-11.95 0-3.19-1.24-6.19-3.48-8.41ZM12.05 21.82a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.7.97.99-3.61-.24-.37a9.88 9.88 0 0 1-1.52-5.27c0-5.46 4.44-9.9 9.91-9.9a9.84 9.84 0 0 1 7 2.9 9.84 9.84 0 0 1 2.9 7c0 5.45-4.44 9.89-9.94 9.89Zm5.43-7.41c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        </svg>
      </a>
    </div>
  );
}
