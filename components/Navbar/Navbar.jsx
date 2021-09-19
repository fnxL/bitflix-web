import Link from 'next/link';
import { useRef, useState } from 'react';
import { FaCaretDown, FaSearch } from 'react-icons/fa';
import { IoMdNotifications as FaNotif } from 'react-icons/io';
import useOutSideClick from '../../hooks/useOutsideClick';
import useScroll from '../../hooks/useScroll';
import useViewPort from '../../hooks/useViewport';
import NavItems from '../../config/NavItems';
import ActiveLink from '../ActiveLink/ActiveLink';
import styles from './Navbar.module.css';

function Navbar() {
  const { width } = useViewPort();
  const isScrolled = useScroll(70);
  const [mobileNav, setMobileNav] = useState(false);
  const [profileNav, setProfileNav] = useState(false);
  const mobileNavRef = useRef();
  const profileNavRef = useRef();

  useOutSideClick(mobileNavRef, () => {
    if (mobileNav) setMobileNav(false);
  });
  useOutSideClick(profileNavRef, () => {
    if (profileNav) setProfileNav(false);
  });

  return (
    <>
      <nav className={`${styles.navbar__primary} ${isScrolled && styles.scrolled}`}>
        <div className={styles.navbar__left}>
          <div className="navbar__logo">
            <img
              src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
              alt="logo"
              width="150px"
              height="75px"
            />
          </div>
          <div className={styles.navbar__items}>
            <ul className="flex space-x-8">
              {NavItems.map((item) => (
                <li key={item.name} className={styles.navbar__navlinks}>
                  <ActiveLink activeClassName={styles.activeNavLink} href={item.path}>
                    <a>{item.name}</a>
                  </ActiveLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {width <= 1024 ? (
          <div
            role="button"
            className={styles.navbar__mobile}
            tabIndex={0}
            onClick={() => setMobileNav(!mobileNav)}
          >
            <span className={`${styles.navbar__navlinks} ${styles.text_shadow_mobile}`}>
              Discover
            </span>
            <FaCaretDown className="ml-2" />
          </div>
        ) : (
          ''
        )}
        <div
          className={`${styles.navbar__mobile__content} ${
            mobileNav && styles.navbar_mobile_active
          }`}
        >
          {mobileNav && (
            <ul ref={mobileNavRef} className="flex flex-col justify-center text-[18px]">
              {NavItems.map((item) => (
                <li
                  className={`${styles.navbar__navlinks} text-[#e5e5e5] p-[4vw] block ${styles.text_shadow_mobile}`}
                  key={item.name}
                >
                  <Link href={item.path}>
                    <a>{item.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.navbar__right}>
          <FaSearch size={22} />
          <FaNotif size={27} className="cursor-pointer" />
          <div
            role="button"
            tabIndex={0}
            onClick={() => setProfileNav(!profileNav)}
            className="relative flex items-center cursor-pointer"
          >
            <img
              className="rounded"
              src="https://ih1.redbubble.net/image.618427277.3222/flat,800x800,075,f.u2.jpg"
              alt="profile"
              width="35"
              height="35"
            />
            <FaCaretDown
              className={`ml-3 ${styles.navbar_profile_caret} ${profileNav && styles.caret_active}`}
            />
            <div
              className={`${styles.navbar_profile_menu} md:text-[18px] ${
                profileNav && styles.active
              }`}
            >
              {profileNav && (
                <ul ref={profileNavRef} className="mx-[12px]">
                  <li className="text-[#f2f2f2] block px-[15px] py-[5px] hover:underline">
                    <Link href="/">
                      <a>Sign Out</a>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
