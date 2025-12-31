import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
  MessageCircle,
  Youtube,
} from "lucide-react";
import gmiLogo from '../assets/images/GMI_Logo.jpeg';
import indiaFlag from '../assets/images/IndiaFlag.png';
import germanyFlag from '../assets/images/germany.png';

const Footer = () => {
  const footerLinks = {
    Quicklinks: [
      { name: "Home", href: "/" },
      { name: "Study Basics", href: "/study-info/higher-education" },
      { name: "Entry Requirements", href: "/study-info/admission-requirements" },
      { name: "Visa & Cities", href: "/study-info/student-visa" },
      { name: "Costs & Work", href: "/study-info/tuition-fees" },
    ],
    services: [
      { name: "Study Abroad", href: "https://www.globalmindsindia.com/" },
      {
        name: "Foreign Language Training",
        href: "https://languages.globalmindsindia.in/",
      },
      { name: "IELTS Training", href: "https://globalmindsindia.in/" },
      { name: "APS Certification", href: "https://aps.globalmindsindia.in/" },
      { name: "SOP Preparation", href: "https://sop.globalmindsindia.in/" },
      { name: "Visa support", href: "https://visa.globalmindsindia.in/" },
    ],
    support: [
      { name: "Terms and Conditions", href: "#" },
      { name: "Refund Policy", href: "#" },
      { name: "Privacy Policy", href: "#" },
      {
        name: "Chat Now",
        href: "https://wa.me/917353446655",
        icon: MessageCircle,
        isWhatsApp: true,
      },
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/people/Global-Minds-India/61573595922348/",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/globalminds_india/",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/authwall?trk=bf&trkInfo=AQFPKZJeWAQQUAAAAZqf3D_4H7Qjpvju5SN7balsbBbhLfh7OW3cZ_E909Ei3VJhozFfIuIPe_ZzIleUeiRArAd3l_YdeIjCBlmXnp_AMXM9LfQ_OWv3no6YFfsQxYaEC__GxA0=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fglobal-minds-india%2F",
      label: "LinkedIn",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@GlobalMindsIndia-1",
      label: "YouTube",
    },
  ];

  return (
    <footer
      id="footer"
      className="relative bg-primary text-primary-foreground overflow-hidden"
    >
      <div className="container-app py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-6 mb-10 items-start">
          {/* Company Info (2 cols) */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <img
                src={gmiLogo}
                alt="Global Minds India"
                className="h-16 w-auto"
              />
            </motion.div>
            <p className="font-body text-sm text-primary-foreground/80 mb-6 leading-relaxed max-w-xs">
              Empowering trusted partners to guide students
              <br />
              toward global education opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="font-heading font-semibold text-base mb-3">
              Quick Links
            </h4>
            <ul className="space-y-1.5 font-body text-sm">
              {footerLinks.Quicklinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="font-heading font-semibold text-base mb-3">
              Services
            </h4>
            <ul className="space-y-1.5 font-body text-sm">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-1">
            <h4 className="font-heading font-semibold text-base mb-3">
              Support
            </h4>
            <ul className="space-y-1.5 font-body text-sm">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.isWhatsApp ? "_blank" : undefined}
                    rel={link.isWhatsApp ? "noopener noreferrer" : undefined}
                    className="text-primary-foreground/80 hover:text-accent transition-colors flex items-center gap-2"
                  >
                    {link.icon && (
                      <link.icon className="w-4 h-4 text-primary-foreground" />
                    )}
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-1">
            <h4 className="font-heading font-semibold text-base mb-3">
              Contact Us
            </h4>
            <div className="space-y-2.5 font-body text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-foreground flex-shrink-0" />
                <a
                  href="mailto:connect@globalmindsindia.com"
                  className="text-primary-foreground/80 hover:text-accent transition-colors break-words"
                >
                  connect@globalmindsindia.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-foreground flex-shrink-0" />
                <a
                  href="tel:+917353446655"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  +91 7353446655
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 font-semibold text-primary-foreground mb-1">
                    <img
                      src={indiaFlag}
                      alt="India"
                      className="w-4 h-3 rounded-sm"
                    />
                    India
                  </div>
                  <div className="text-primary-foreground/80">
                    23, CJ VenkataDas road,
                    <br />
                    Padmanabhanagar, Bangalore
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 font-semibold text-primary-foreground mb-1">
                    <img
                      src={germanyFlag}
                      alt="Germany"
                      className="w-4 h-3 rounded-sm"
                    />
                    Germany
                  </div>
                  <div className="text-primary-foreground/80 mb-1">
                    Koenigsheideweg Berlin, Germany
                  </div>
                  <a
                    href="tel:+4917645728219"
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    +49 17645728219
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-primary-foreground/20 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs sm:text-sm text-primary-foreground/80 text-left">
              © {new Date().getFullYear()}{" "}
              <a
                href="https://www.globalmindsindia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors hover:underline"
              >
                Global Minds India
              </a>
              . All rights reserved.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <social.icon className="w-4 h-4 text-primary-foreground" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;