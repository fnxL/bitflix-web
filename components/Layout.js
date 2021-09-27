import Head from 'next/head';
import { Navbar } from '.';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="overflow-hidden">{children}</div>
    </>
  );
}
