import Link from "next/link";
import parseHTML from "html-react-parser";

async function getData(id: number) {
  const res = await fetch(
    "http://localhost:3000/portfolioItems/" + id + ".json"
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

export default async function Page({ params }: { params: { id: number } }) {
  const data = await getData(params.id);

  return (
    <>
      {/* PORTHEADER */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-2">
            <Link href="/" className="back-button mt-5">
              <i className="fa fa-arrow-left"></i>
              <span className="sr-only">Back to Portfolio</span>
            </Link>
          </div>
          <div className="col-12 col-sm-10">
            <h2 className="mt-5">{data.name}</h2>
          </div>
        </div>
      </div>
      {/* END PORTHEADER */}

      {/* PORTINTRO */}
      <div className="container-fluid">
        {data.type === "caseStudy" && (
          <div className="row">
            <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <div className="media-hero">
                {data.mp4Hero ? (
                  <video
                    src="http://zowber-portfolio-assets.s3.amazonaws.com/portfolio-items/4/hero.mp4"
                    className="img-fluid"
                    autoPlay
                    controls
                    loop
                  />
                ) : (
                  <img
                    src={
                      "http://zowber-portfolio-assets.s3.amazonaws.com/portfolio-items" +
                      data.heroImgUrl
                    }
                    alt={data.name}
                    className="img-fluid"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <div className="text-hero">{parseHTML(data.lead)}</div>
          </div>
        </div>
      </div>

      {/* END PORTINTRO */}

      {/* PORTBODY */}
      <div className="container-fluid">
        {data.sections.map((section: any) => {
          return (
            <>
              <div className="section">
                <div className="row">
                  <div className="col-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2">
                    <h3>{section.heading}</h3>
                    {section.sections.map((section: any, index: any) => {
                      if (section.type === "textOnly") {
                        return (
                          <div key={index} className="subsection">
                            <div className="row textOnly">
                              <div className="col-12 col-sm-10 offset-sm-1 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                                <h4>{section.heading}</h4>
                              </div>
                              <div className="col-12 col-sm-10 offset-sm-1 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                                {parseHTML(section.content)}
                              </div>
                            </div>
                          </div>
                        );
                      }
                      if (section.type === "imagesAndText") {
                        return (
                          <div key={index} className="subsection">
                            <div className="row imagesAndText">
                              <div className="col-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2">
                                <h4>{section.heading}</h4>
                              </div>
                              <div className="col-12 col-sm-8 offset-sm-2 col-lg-8 offset-lg-2 ">
                                {section.images.map(
                                  (image: any, index: any) => {
                                    return (
                                      <img
                                        key={index}
                                        className="img-fluid"
                                        alt="Example"
                                        src={
                                          "http://zowber-portfolio-assets.s3.amazonaws.com/portfolio-items" +
                                          image
                                        }
                                      />
                                    );
                                  }
                                )}
                              </div>
                              <div className="col-12 col-sm-10 offset-sm-1 col-lg-6 offset-lg-3">
                                <div>{parseHTML(section.content)}</div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      if (section.type === "imageGrid") {
                        return (
                          <div key={index} className="subsection">
                            <div className="row imageGrid">
                              <div className="col-12">
                                <div className="row">
                                  <div className="col-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2">
                                    <h4>{section.heading}</h4>
                                    <div>{section.content}</div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-12 col-sm-10 offset-sm-1">
                                <div className="row">
                                  {section.images.map(
                                    (image: any, index: any) => {
                                      return (
                                        <div
                                          key={index}
                                          className="col-12 col-lg-6"
                                        >
                                          <img
                                            alt="Example"
                                            className="img-fluid"
                                            src={
                                              "http://zowber-portfolio-assets.s3.amazonaws.com/portfolio-items" +
                                              image
                                            }
                                          />
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {/* END PORTBODY */}

      {/* PORTFOOTER */}
      {/* END PORTFOOTER */}
    </>
  );
}
