
import { Instagram, Mail, Twitter, Facebook } from 'lucide-react';

function Contact() {
  const iconWrapper =
    'group flex items-center justify-center bg-primary p-4 rounded-full hover:bg-white hover:border-2 hover:border-primary transition-colors duration-300';

  const iconStyle =
    'w-10 h-10 text-white group-hover:text-primary transition-colors duration-300';
  return (
    <div className='mt-16'>
      <div className="md:flex md:flex-row items-center p-4 md:justify-around justify-center flex flex-col">
        <div className="my-[8%]">
          <h1 className="text-6xl font-oswald font-bold mb-2">
            Contact <span className="text-primary">US</span>
          </h1>
          <p className="font-lato text-gray-600 text-xl mb-3">
            We are ready to lead you into the future!!!
          </p>
          <p className="font-lato text-gray-600 text-xl mb-5">
            Get in touch, we’d love to hear from you.
          </p>
          <h1 className="text-4xl font-pacifico font-bold mb-2">
            The <span className="text-primary">Socials</span>
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="mailto:someone@example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={iconWrapper}>
                <Mail className={iconStyle} />
              </div>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={iconWrapper}>
                <Instagram className={iconStyle} />
              </div>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={iconWrapper}>
                <Twitter className={iconStyle} />
              </div>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={iconWrapper}>
                <Facebook className={iconStyle} />
              </div>
            </a>
          </div>
        </div>
        <div className="w-full md:w-2/3 h-auto">
          <img
            src="https://images.ctfassets.net/6d085vujy22q/5sc2xjsikpED4DCLTan9pL/887be6486a8f191ac40d1092f0d3591e/Support_Hero.jpg?w=1372&h=758&q=50&fm=webp"
            alt="contact-us"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
