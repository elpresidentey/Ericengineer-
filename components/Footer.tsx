export default function Footer() {
  return (
    <footer className="bg-primary text-white py-14 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/footer-pattern.svg')] bg-repeat opacity-[0.03]" />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <h3 className="font-serif text-xl mb-3">Eric Ohiol Engineering</h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Premium electrical and engineering solutions for over 30 years.
            </p>
            <div className="flex space-x-3 mt-5">
              {[
                { label: 'Facebook', path: 'M22.675 0h-20.35c-3.028 0-3.29 2.646-8.86 8.475-8.86h9.277v11.368h-3.433v-3.89h3.409v3.89h3.583l.479-3.89h-4.062v-2.98c0-2.437.975-4.431 4.253-4.431v3.03h-3.63c-1.543 0-1.781 1.05-1.781 2.052v3.018h3.593l-.355 3.89h-3.238v11.368h-4.275v-11.368h-2.228c-2.065 0-3.338 1.692-3.338 4.235v11.368h-5.117v-11.368c0-4.618 3.26-8.369 8.133-8.369z' },
                { label: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.617H9.351V9h3.414v1.561h.046c.477-.091 1.637-.88 3.069-.88 3.698 0 4.273 2.376 4.273 5.645v6.286zM5.337 7.433c-1.144 0-2.063-.927-2.063-2.065s.919-2.065 2.063-2.065 2.063.92 2.063 2.065-.919 2.065-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zm10.105-2.572c-.451 1.016-1.35 1.739-2.46 1.739-1.896 0-3.339-1.362-3.339-3.254v-.423c0-2.08 1.223-3.171 2.752-3.171 1.478 0 2.588.944 2.588 2.186v.425c0 1.55-.732 2.695-1.719 2.695-1.158 0-1.95-.81-1.95-1.756v-.426c0-1.01.446-1.777 1.264-1.777.949 0 1.568.546 1.568 1.305v.453z' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/8 hover:bg-white/15 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase text-white/50 mb-4 tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: '#about', label: 'About' },
                { href: '#services', label: 'Services' },
                { href: '#projects', label: 'Projects' },
                { href: '#inverter', label: 'Inverter Solutions' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase text-white/50 mb-4 tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a href="tel:08062284585" className="hover:text-white transition-colors">0806 228 4585</a>
              </li>
              <li>
                <a href="mailto:ericonline@rocketmail.com" className="hover:text-white transition-colors break-all">ericonline@rocketmail.com</a>
              </li>
              <li>Lagos &amp; Nationwide</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Eric Ohiol Engineering. All rights reserved.</p>
          <p>Premium electrical solutions</p>
        </div>
      </div>
    </footer>
  );
}
