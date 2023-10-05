import Link from "next/link";

async function getAllCaseStudies() {
  const res = await fetch(process.env.DATA_HOST + "/portfolioItems.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}


export default async function MoreCaseStudies(id: any) {
  const readNextItems = await getAllCaseStudies().then((items) => {
    return items.filter(
      (item: any) => item.type === "caseStudy" && item.id != id
    );
  });

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-12 col-sm-8 offset-sm-2">
          <h4>More Case Studies</h4>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-6 col-sm-4 offset-sm-2">
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={
                    process.env.CONTENT_HOST +
                    "/portfolio-items" +
                    readNextItems[0].heroImgUrl
                  }
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link href={"/work/" + readNextItems[0].id}>
                      {readNextItems[0].name}
                    </Link>
                  </h5>
                  <p className="card-text">{readNextItems[0].description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={
                    process.env.CONTENT_HOST +
                    "/portfolio-items" +
                    readNextItems[1].heroImgUrl
                  }
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link href={"/work/" + readNextItems[1].id}>
                      {readNextItems[1].name}
                    </Link>
                  </h5>
                  <p className="card-text">{readNextItems[1].description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
