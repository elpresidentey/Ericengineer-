'use client';

export default function MobileContactButton() {
  return (
    <div className="fixed bottom-0 inset-x-0 p-3 bg-background/95 backdrop-blur-md border-t border-border md:hidden z-40">
      <div className="flex gap-2">
        <a
          href="tel:08062284585"
          className="flex-1 text-center py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Call Now
        </a>
        <a
          href="https://wa.me/2348062284585"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-3 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
