import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-14 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <Logo className="h-12 w-auto mb-4 text-white" />
            <p className="text-white/55 text-sm leading-relaxed">
              Premium electrical and engineering solutions for over 30 years
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase text-white/40 mb-4" style={{ letterSpacing: '0.06em' }}>Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { href: '#about', label: 'About' },
                { href: '#services', label: 'Services' },
                { href: '#inverter', label: 'Inverter Solutions' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase text-white/40 mb-4" style={{ letterSpacing: '0.06em' }}>Contact</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><a href="tel:08062284585" className="hover:text-white transition-colors">0806 228 4585</a></li>
              <li><a href="mailto:ericonline@rocketmail.com" className="hover:text-white transition-colors">ericonline@rocketmail.com</a></li>
              <li>Lagos & Nationwide</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Eric Ohiol Engineering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
