import Image from "next/image";
import styles from "./page.module.css";

import { Nunito } from "next/font/google";
import localFont from "next/font/local";

const fontAwesome = localFont({
  src: "fontawesome-webfont.woff2",
  display: "swap",
});

const nunito = Nunito({ subsets: ["latin"] });

async function getData() {
  const res = await fetch(
    "http://localhost:3000/portfolioItems/portfolioItems.json"
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      {/* HEADER */}
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="col-6 col-sm-7">
              <div className="navbar-header">
                <a className="navbar-brand" href="/">
                  <div className="brand">
                    <div className="brand__content">
                      <h1>Zowber</h1>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-5 offset-1 col-sm-5 offset-sm-0">
              <div className="social">
                <ul className="list-unstyled">
                  <li>
                    <a href="mailto:andy+portfolio@zowber.com">
                      <i className="fa fa-envelope"></i>
                      <span className="sr-only">Email me!</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/zowber/">
                      <i className="fa fa-github"></i>
                      <span className="sr-only">GitHub Profile</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://uk.linkedin.com/in/zowber">
                      <i className="fa fa-linkedin"></i>
                      <span className="sr-only">LinkedIn Profile</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* HEADER */}

      {/* HERO */}
      <div className="hero">
        <div className="this--background-alt">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 className={nunito.className}>Andy Bright</h1>
                <p className={nunito.className}>
                  A Product and UX design lead focused on financial services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END HERO */}

      {/* RECENT WORK */}
      <div className="case-studies row">
        <h2 className={nunito.className}>Case Studies</h2>
        <p className={nunito.className}></p>
        {data.map((item: any) => {
          return (
            <div>
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>{item.type}</p>
              {item.labels.map((label: any) => {
                return label.name;
              })}
            </div>
          );
        })}
      </div>
      {/* END RECENT WORK */}

      {/* FOOTER */}
      {/* END FOOTER */}

      {/*       <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className={styles.thirteen}>
          <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Docs <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Templates <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Deploy <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}
    </>
  );
}
