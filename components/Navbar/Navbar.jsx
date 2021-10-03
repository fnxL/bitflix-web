/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDisclosure } from '@chakra-ui/hooks';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { IoMdNotifications as FaNotif } from 'react-icons/io';
import NavItems from '../../config/NavItems';
import useOutSideClick from '../../hooks/useOutsideClick';
import useScroll from '../../hooks/useScroll';
import useViewPort from '../../hooks/useViewport';
import useStore from '../../store/store';
import { generateKeys, getInviteKeys, logOut } from '../../utils/auth';
import ActiveLink from '../ActiveLink/ActiveLink';
import Search from '../Search/Search';
import styles from './Navbar.module.css';

function Navbar() {
  const { width } = useViewPort();
  const isScrolled = useScroll(70);
  const [mobileNav, setMobileNav] = useState(false);
  const [profileNav, setProfileNav] = useState(false);
  const mobileNavRef = useRef();
  const profileNavRef = useRef();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [invitekeys, setInvitekeys] = useState([]);

  const user = JSON.parse(Cookies.get('user'));
  const toast = useToast();
  useOutSideClick(mobileNavRef, () => {
    if (mobileNav) setMobileNav(false);
  });
  useOutSideClick(profileNavRef, () => {
    if (profileNav) setProfileNav(false);
  });

  const handleLogout = async () => {
    const response = await logOut();
    if (response.status === 'success') {
      Cookies.remove('token');
      Cookies.remove('user');
      useStore.setState({ user: null });
      router.push('/login');
    }
  };

  const handleGetInviteKeys = async () => {
    const response = await getInviteKeys();
    if (response.status === 'success') {
      setInvitekeys(response.keys);
      onOpen();
    }
  };

  const handleGenerateKeys = async () => {
    const response = await generateKeys();
    if (response.status === 'success') {
      toast({
        title: 'Invite key generated!',
        position: 'top',
        description: response.key,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } else
      toast({
        title: 'Error',
        description: response,
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="rgb(38,38,38)">
          <ModalHeader>Invite Keys</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {invitekeys.map((key) => (
              <p>{key.inviteKey}</p>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
      <nav className={`${styles.navbar__primary} ${isScrolled && styles.scrolled}`}>
        <div className={styles.navbar__left}>
          <div className="navbar__logo">
            <img src="/logo.png" alt="logo" width="150px" height="75px" />
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
          <Search />
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
                  {user.username === 'admin' && (
                    <>
                      <li className="text-[#f2f2f2] block px-[15px] py-[5px] hover:underline">
                        <a onClick={handleGenerateKeys}>Generate Invite key</a>
                      </li>
                      <li className="text-[#f2f2f2] block px-[15px] py-[5px] hover:underline">
                        <a onClick={handleGetInviteKeys}>Invite keys</a>
                      </li>
                    </>
                  )}
                  <li className="text-[#f2f2f2] block px-[15px] py-[5px] hover:underline">
                    <span onClick={handleLogout}>
                      <a>Logout</a>
                    </span>
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
