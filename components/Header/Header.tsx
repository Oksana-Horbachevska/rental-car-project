import Link from 'next/link';

import css from './Header.module.css';

function Header() {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.headerContainer}>
          <div className={css.logoContainer}>
            <Link className={css.logoLink} href="/">
              <svg
                className={css.logoSvg}
                width="102"
                height="16"
                viewBox="0 0 208 32"
              >
                <use href="/icons.svg#icon-Logo" />
              </svg>
            </Link>
          </div>
          <nav className={css.navContainer}>
            <ul className={css.navList}>
              <li className={css.navItem}>
                <Link className={css.navLink} href="/">
                  Home
                </Link>
              </li>
              <li className={css.navItem}>
                <Link className={css.navLink} href="/catalog">
                  Catalog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
