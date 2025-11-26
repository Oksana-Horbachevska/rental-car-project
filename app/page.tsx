import Link from 'next/link';

import css from './home.module.css';

export default function Home() {
  return (
    <section className={css.heroSection}>
      <div className={css.background}>
        <div className={`container ${css.heroContainer}`}>
          <div className={css.content}>
            <h1 className={css.title}>Find your perfect rental car</h1>
            <p className={css.text}>
              Reliable and budget-friendly rentals for any journey
            </p>
            <Link className={css.button} href="/catalog">
              View Catalog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
