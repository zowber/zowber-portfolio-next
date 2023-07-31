import Link from 'next/link'

async function getData() {
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

export default async function Home() {
  const data = await getData()

  return (
    <>
      <div className='page_portfolio'>
        {/* HEADER */}
        <div className='header'>
          <div className='navbar navbar-default'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12 col-sm-7'>
                  <div className='navbar-header'>
                    <a
                      className='navbar-brand'
                      href='/'
                    >
                      <div className='brand'>
                        <div className='brand__content'>
                          <h1>Zowber</h1>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className='col-xs-8 col-xs-offset-2 col-sm-5 col-sm-offset-0'>
                  <div className='social'>
                    <ul className='list-unstyled'>
                      <li>
                        <a href='mailto:andy+portfolio@zowber.com'>
                          <i className='fa fa-envelope'></i>
                          <span className='sr-only'>Send an Email</span>
                        </a>
                      </li>
                      <li>
                        <a href='https://github.com/zowber/'>
                          <i className='fa fa-github'></i>
                          <span className='sr-only'>GitHub Profile</span>
                        </a>
                      </li>
                      <li>
                        <a href='https://uk.linkedin.com/in/zowber'>
                          <i className='fa fa-linkedin'></i>
                          <span className='sr-only'>LinkedIn Profile</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* HEADER */}

        {/* HERO */}
        <div className='hero'>
          <div className='this--background-alt'>
            <div className='container'>
              <div className='row'>
                <div className='text-hero col-xs-12 col-sm-10 col-sm-offset-1'>
                  <h1>Andy Bright</h1>
                  <p className='lead'>
                    A Product and UX design lead focused on financial services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END HERO */}

        {/* RECENT WORK */}
        <div className='container'>
          <div className='row'>
            <div className='case-studies'>
              <h2>Case Studies</h2>
              <div className='col-xs-12 col-sm-10 col-sm-offset-1'>
                {data.map((item: any, index: any) => {
                  return (
                    <div className='media' key={index}>
                      <div className='row'>
                        <div className='col-xs-12 col-sm-5'>
                          <Link
                            className='media__image-link'
                            href={'/work/' + item.id}
                          >
                            <img
                              className='media__image img-responsive'
                              src={
                                'http://zowber-portfolio-assets.s3.amazonaws.com/portfolio-items' +
                                item.heroImgUrl
                              }
                              alt={item.name}
                            />
                          </Link>
                        </div>

                        <div className='col-xs-12 col-sm-7 media__content'>
                          <h3>{item.name}</h3>
                          <ul className='labels list-unstyled'>
                            {item.labels.map((label: any, index: any) => {
                              return (
                                <li
                                  key={index}
                                  className='labels__label'
                                >
                                  {label.name}
                                </li>
                              )
                            })}
                          </ul>

                          <p>{item.description}</p>
                          <Link
                            href={'/work/' + item.id}
                            className='btn btn-default'
                          >
                            More details
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        {/* END RECENT WORK */}

        {/* FOOTER */}
        <div className='section'>
          <div className='footer'>
            <p className='small'>By Zowber.</p>
          </div>
        </div>
        {/* END FOOTER */}
      </div>
    </>
  )
}
