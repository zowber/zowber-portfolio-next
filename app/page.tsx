import Link from "next/link";

import { All } from "../data";

export default async function Home() {
  const caseStudies = await All()

  return (
    <>
      {/* HERO */}
      <div className="container text-center">
        <div className="row">
          <div className="col-12">
            <h1 className="display-3 mt-5 mb-5 pt-5">Andy Bright</h1>
            <p className="h4 mt-0 mb-5">
              A Product and UX design lead focused on financial services.
            </p>
          </div>
        </div>

        <div className="row mt-0 mb-5 pb-5">
          <div className="col-12">
            <a href="mailto:andy+portfolio@zowber.com" className="fs-4 me-3">
              <i className="fa fa-envelope"></i>
              <span className="sr-only">Send an Email</span>
            </a>

            <a href="https://github.com/zowber/" className="fs-4 me-3">
              <i className="fa fa-github"></i>
              <span className="sr-only">GitHub Profile</span>
            </a>

            <a href="https://uk.linkedin.com/in/zowber" className="fs-4 me-3">
              <i className="fa fa-linkedin"></i>
              <span className="sr-only">LinkedIn Profile</span>
            </a>
          </div>
        </div>
      </div>
      {/* END HERO */}

      {/* RECENT WORK */}
      <div className="container">
        {caseStudies.map((item: any, index: any) => {
          return (
            <div className="row mb-5" key={index}>
              <div className="col-12 col-sm-6">
                <Link href={"/work/" + item.id}>
                  <img
                    className="img-fluid"
                    src={
                      process.env.CONTENT_HOST +
                      "/portfolio-items" +
                      item.heroImgUrl
                    }
                    alt={item.name}
                  />
                </Link>
              </div>

              <div className="col-12 col-sm-6 mt-3 mt-0-sm d-flex flex-column justify-content-center align-items-center text-center">
                <h3>
                  <Link href={"/work/" + item.id}>{item.name}</Link>
                </h3>
                <ul className="labels list-unstyled">
                  {item.labels.map((label: any, index: any) => {
                    return <li key={index}>{label.name}</li>;
                  })}
                </ul>

                <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* END RECENT WORK */}

      {/* FOOTER */}
      <div className="section">
        <div className="footer">
          <p className="small">By Andy Bright.</p>
        </div>
      </div>
      {/* END FOOTER */}
    </>
  );
}
