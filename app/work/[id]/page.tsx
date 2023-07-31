import Link from 'next/link'
import parseHTML from 'html-react-parser'

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

export default async function Page({ params }: { params: { id: number } }) {
  const item = await getData(params.id)

  return (
    <>
      <div className='page_portfolio-detail'>
        {/* PORTHEADER */}
        <div className='container-fluid'>
          <div className='row portfolio-detail-header'>
            <div className='col-xs-12 col-sm-1'>
              <Link
                href='/'
                className='back-button'
              >
                <i className='fa fa-arrow-left'></i>
                <span className='sr-only'>Back to Portfolio Home</span>
              </Link>
            </div>
            <div className='col-xs-12 col-sm-10'>
              <h1>{item.name}</h1>
            </div>
          </div>
        </div>
        {/* END PORTHEADER */}

        {/* PORTINTRO */}
        <div className='container-fluid'>
          {item.type === 'caseStudy' && (
            <div className='row'>
              <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
                <div className='media-hero'>
                  {item.mp4Hero ? (
                    <video
                      src='http://zowber-portfolio-assets.s3.amazonaws.com/portfolio-items/4/hero.mp4'
                      className='img-responsive'
                      autoPlay
                      controls
                      loop
                    />
                  ) : (
                    <img
                      src={
                        'http://zowber-portfolio-assets.s3.amazonaws.com/portfolio-items' +
                        item.heroImgUrl
                      }
                      alt={item.name}
                      className='img-responsive'
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          <div className='row'>
            <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
              <div className='text-hero'>{parseHTML(item.lead)}</div>
            </div>
          </div>
        </div>

        {/* END PORTINTRO */}

        {/* PORTBODY */}
        <div className='container-fluid'>
          {item.sections.map((section: any, index: any) => {
            return (
                <div
                  className='section'
                  key={index}
                >
                  <h2>{section.heading}</h2>

                  {section.sections.map((section: any, index: any) => {
                    if (section.type === 'textOnly') {
                      return (
                        <div
                          key={index}
                          className='subsection'
                        >
                          <div className='row textOnly'>
                            {section.heading && (
                              <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
                                <h3>{section.heading}</h3>
                              </div>
                            )}
                            <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
                              {parseHTML(section.content)}
                            </div>
                          </div>
                        </div>
                      )
                    }

                    if (section.type === 'imagesAndText') {
                      return (
                        <div
                          className='imagesAndText'
                          key={index}
                        >
                          {section.heading && (
                            <div className='row'>
                              <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
                                <h4>{section.heading}</h4>
                              </div>
                            </div>
                          )}
                          <div className='row'>
                            <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
                              {section.images.map((image: any, index: any) => {
                                return (
                                  <img
                                    key={index}
                                    className='img-responsive'
                                    alt='Example'
                                    src={
                                      'http://zowber-portfolio-assets.s3.amazonaws.com/portfolio-items' +
                                      image
                                    }
                                  />
                                )
                              })}
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
                              <div>{parseHTML(section.content)}</div>
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
                            <div className='col-xs-12'>
                              <div className='row'>
                                <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
                                  <h2>{section.heading}</h2>
                                  {section.content && (
                                    <div>{parseHTML(section.content)}</div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className='col-xs-12 col-sm-10 col-sm-offset-1'>
                              <div className='row'>
                                {section.images.map(
                                  (image: any, index: any) => {
                                    return (
                                      <div
                                        key={index}
                                        className='col-xs-12 col-lg-6'
                                      >
                                        <img
                                          alt='Example'
                                          className='img-responsive'
                                          src={
                                            'http://zowber-portfolio-assets.s3.amazonaws.com/portfolio-items' +
                                            image
                                          }
                                        />
                                      </div>
                                    )
                                  }
                                )}
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

        {/* PORTFOOTER */}
        {/* END PORTFOOTER */}
      </div>
    </>
  )
}
