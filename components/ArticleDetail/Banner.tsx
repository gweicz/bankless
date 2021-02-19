import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import styles from './Banner.module.scss'
type Props = {
  img: {
    url: string
    alt: string
  }
  title: string
  author: {
    name: string
    profileLink?: string
    img?: {
      url: string
      alt?: string
    }
  }
  date: string
}
export default function Banner({ img, title, author, date }: Props) {
  const _authorName = () => (
    <>
      {author.profileLink ? (
        <h6 className="post-author-name">
          <Link href={author.profileLink}>
            <a className="hover-flip-item-wrapper">
              <span className="hover-flip-item text-left">
                <span data-text={author.name}>{author.name}</span>
              </span>
            </a>
          </Link>
        </h6>
      ) : (
        <h6 className="m-0 text-white">
          <span>{author.name}</span>
        </h6>
      )}
    </>
  )

  const _socShare = () => (
    <ul className="social-share-transparent justify-content-end">
      <li>
        <a href="#">
          <FontAwesomeIcon icon={['fab', 'facebook-f']} />
        </a>
      </li>
      <li>
        <a href="#">
          <FontAwesomeIcon icon={['fab', 'instagram']} />
        </a>
      </li>
      <li>
        <a href="#">
          <FontAwesomeIcon icon={['fab', 'twitter']} />
        </a>
      </li>
      <li>
        <a href="#">
          <FontAwesomeIcon icon={['fas', 'link']} />
        </a>
      </li>
    </ul>
  )

  const _authorBox = () => (
    <div className="post-meta-wrapper">
      <div className="post-meta m-0">
        {author.img.url && (
          <div className="post-author-avatar border-rounded">
            <img src={author.img.url} alt={author.name} />
          </div>
        )}
        <div className={`{content ${styles.authorBox}`}>
          {_authorName()}
          <ul className="post-meta-list">
            <li>{date}</li>
            {/* <li>300k Views</li> */}
          </ul>
        </div>
      </div>
    </div>
  )

  const _featuredPost = () => (
    <div className="post-cat">
      <div className="post-cat-list">
        <a className="hover-flip-item-wrapper" href="#">
          <span className="hover-flip-item">
            <span data-text="FEATURED POST">FEATURED POST</span>
          </span>
        </a>
      </div>
    </div>
  )
  return (
    <div className="banner banner-single-post post-formate post-standard alignwide">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* <!-- Start Single Slide  --> */}
            <div className="content-block">
              <div className="post-thumbnail">
                <img src={img.url} alt={img.alt} />
              </div>

              <div className="post-content">
                {/* {_featuredPost()} */}
                <h1 className={`title ${styles.title}`}>{title}</h1>
                {_authorBox()}
                {/* {_socShare()} */}
              </div>
            </div>
            {/* <!-- End Single Slide  --> */}
          </div>
        </div>
      </div>
    </div>
  )
}
