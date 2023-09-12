import Link from 'next/link'
import { forEachChild } from 'typescript'

async function getData(id: number) {
  const res = await fetch(
    'http://localhost:3000/portfolioItems/' + id + '.json'
  )

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getAllCaseStudies() {
  const res = await fetch(
    'http://localhost:3000/portfolioItems/portfolioItems.json'
  )

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page({ params }: { params: { id: number } }) {
  const item = await getData(params.id)
  const readNextItems = await getAllCaseStudies().then((items) => {
    return items.filter(
      (item: any) => item.type === 'caseStudy' && item.id != params.id
    )
  })

  return (
    <>
      <div className='page_portfolio-detail'>
        {/* PORTHEADER */}
          <nav className='navbar navbar-expand-lg bg-primary navbar-dark'>
            <div className='container'>
              <button
                className='navbar-toggler'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarNav'
                aria-controls='navbarNav'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <span className='navbar-toggler-icon'></span>
              </button>
              <div
                className='collapse navbar-collapse'
                id='navbarNav'
              >
                <ul className='navbar-nav'>
                  <li className='nav-item'>
                    <Link
                      className='nav-link active'
                      aria-current='page'
                      href='/'
                    >
                      <i className='fa fa-home'></i>
                      <span className='ms-2'>Back to Home</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

        <div className='container-fluid bg-primary text-light'>
          <div className='container'>
            <div className='row pt-5 pb-5'>
              <div className='col-6 d-flex flex-column justify-content-center align-items-start'>
                <h1 className='display-4 mb-3'>{item.name}</h1>
                <div
                  className='pb-5'
                  dangerouslySetInnerHTML={{ __html: item.lead }}
                ></div>
              </div>
              <div className='col-5 offset-1'>
                <img
                  src={
                    'http://zowber-portfolio-assets.s3.amazonaws.com/portfolio-items' +
                    item.heroImgUrl
                  }
                  alt={item.name}
                  className='img-fluid'
                />
              </div>
            </div>
          </div>
        </div>
        {item.meta ? (
          <div className='container-fluid bg-primary-subtle'>
            <div className='container'>
              <div className='row pt-3 pb-1'>
                <div className='col text-center'>
                  <h6 className='fst-italic'>Company</h6>
                  <p>{item.meta.client}</p>
                </div>
                <div className='col text-center'>
                  <h6 className='fst-italic'>Role</h6>
                  <p>{item.meta.role}</p>
                </div>
                <div className='col text-center'>
                  <h6 className='fst-italic'>Duration</h6>
                  <p>{item.meta.duration}</p>
                </div>
                <div className='col text-center'>
                  <h6 className='fst-italic'>Location</h6>
                  <p>{item.meta.location}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {/* END PORTHEADER */}

        {/* PORTBODY */}
        <div className='container mt-5'>
          {item.sections.map((section: any, index: any) => {
            return (
              <div
                className='mt-5'
                key={index}
              >
                <div className='row'>
                  <div className='col-12 col-sm-8 offset-sm-2'>
                    <h2>{section.heading}</h2>
                  </div>
                </div>

                {section.sections.map((section: any, index: any) => {
                  if (section.type === 'textOnly') {
                    return (
                      <div
                        key={index}
                        className='textOnly mt-3'
                      >
                        <div className='row textOnly'>
                          {section.heading && (
                            <div className='col-12 col-sm-8 offset-sm-2'>
                              <h3>{section.heading}</h3>
                            </div>
                          )}
                          <div
                            className='col-12 col-sm-8 offset-sm-2 mt-2'
                            dangerouslySetInnerHTML={{
                              __html: section.content,
                            }}
                          ></div>
                        </div>
                      </div>
                    )
                  }

                  if (section.type === 'imagesAndText') {
                    return (
                      <div
                        className='imagesAndText mt-3'
                        key={index}
                      >
                        {section.heading && (
                          <div className='row'>
                            <div className='col-12 col-sm-8 offset-sm-2'>
                              <h3>{section.heading}</h3>
                            </div>
                          </div>
                        )}

                        {section.images.map((image: any, index: any) => {
                          if (image.layout == 'full-bleed') {
                            return (
                              <div
                                className='row'
                                key={index}
                              >
                                <div className='col-12 col-sm-8 offset-sm-2 mt-4 mb-3'>
                                  <figure className='figure'>
                                    <img
                                      key={index}
                                      className='figure-img img-fluid rounded'
                                      alt=''
                                      src={
                                        'http://zowber-portfolio-assets.s3.amazonaws.com/portfolio-items' +
                                        image.url
                                      }
                                    />
                                    <figcaption className='figure-caption'>
                                      {image.caption}
                                    </figcaption>
                                  </figure>
                                </div>
                              </div>
                            )
                          }
                        })}

                        <div className='row'>
                          <div className='col-12 col-sm-8 offset-sm-2'>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: section.content,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  if (section.type === 'imageGrid') {
                    return (
                      <div
                        key={index}
                        className='subsection'
                      >
                        <div className='row imageGrid'>
                          <div className='col-12'>
                            <div className='row'>
                              <div className='col-12 col-sm-8 offset-sm-2'>
                                <h2>{section.heading}</h2>
                                {section.content && (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: section.content,
                                    }}
                                  ></div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className='col-12'>
                            <div className='row'>
                              {section.images.map((image: any, index: any) => {
                                return (
                                  <div
                                    key={index}
                                    className='col-xs-12 col-lg-6'
                                  >
                                    <img
                                      alt='Example'
                                      className='figure-img img-fluid rounded'
                                      src={
                                        'http://zowber-portfolio-assets.s3.amazonaws.com/portfolio-items' +
                                        image
                                      }
                                    />
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            )
          })}
        </div>
        {/* END PORTBODY */}

        <div className='container pt-5'>
          <div className='row'>
            <div className='col-12 col-sm-8 offset-sm-2'>
              <h4>More Case Studies</h4>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-6 col-sm-4 offset-sm-2'>
              <div className='card mb-3'>
                <div className='row g-0'>
                  <div className='col-md-4'>
                    <img
                      src={
                        'http://zowber-portfolio-assets.s3.amazonaws.com/portfolio-items' +
                        readNextItems[0].heroImgUrl
                      }
                      className='img-fluid rounded-start'
                      alt='...'
                    />
                  </div>
                  <div className='col-md-8'>
                    <div className='card-body'>
                      <h5 className='card-title'>
                        <Link href={'/work/' + readNextItems[0].id}>
                          {readNextItems[0].name}
                        </Link>
                      </h5>
                      <p className='card-text'>
                        {readNextItems[0].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='card mb-3'>
                <div className='row g-0'>
                  <div className='col-md-4'>
                    <img
                      src={
                        'http://zowber-portfolio-assets.s3.amazonaws.com/portfolio-items' +
                        readNextItems[1].heroImgUrl
                      }
                      className='img-fluid rounded-start'
                      alt='...'
                    />
                  </div>
                  <div className='col-md-8'>
                    <div className='card-body'>
                      <h5 className='card-title'>
                        <Link href={'/work/' + readNextItems[1].id}>
                          {readNextItems[1].name}
                        </Link>
                      </h5>
                      <p className='card-text'>
                        {readNextItems[1].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-12'></div>
            <p className='small text-center'>By Andy.</p>
          </div>
        </div>
        {/* END FOOTER */}
      </div>
    </>
  )
}
