import CryptoPrices from './CryptoPrices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import Megamenu from 'components/Megamenu/Megamenu'
import style from './Header.module.scss'
import { useSessionContext } from 'context/SessionContext'
import {useState} from 'react'
import searchForArticles from 'components/helpers/searchForArticle'

const Header: React.FC = () => {

  const hamburgerOnClick = () => {
    const mobilePopupMenu = document.getElementById('mobile-menu-show')
    mobilePopupMenu?.classList.toggle('popup-mobile-menu-show')
  }

  const closeMobileMenu = () => {
    const mobilePopupMenu = document.getElementById('mobile-menu-show')
    mobilePopupMenu?.classList.toggle('popup-mobile-menu-show')
  }

  const { apiPostsData } = useSessionContext()
  const { setSearchSlugs } = useSessionContext()

  const [search, setSearch] = useState('')

  const _logo = () => (
    <div className="col-xl-3 d-none d-xl-block">
      <Link href="/" shallow={true}>
        <div className="logo" style={{ paddingTop: '30px' }}>
          <div style={{ cursor: 'pointer', height: '65px', width: '188px' }}>
            <Image
              src="/images/logo/banklessczWhite.svg"
              alt="Bankless logo"
              width={188}
              height={65}
            />
          </div>
        </div>
      </Link>
    </div>
  )

  const _logoMobile = () => (
    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-3 col-12 d-xl-none">
      <Link href="/" shallow={true}>
        <div
          className="logo"
          style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}
        >
          <div
            style={{
              cursor: 'pointer',
              height: 'auto',
              width: 'auto',
              alignItems: 'center',
            }}
          >
            <Image
              src="/images/logo/banklessczWhite.svg"
              alt="Bankless logo"
              width={188}
              height={65}
            />
          </div>
        </div>
      </Link>
    </div>
  )

  const _mobilePopupMenu = () => (
    <div className="popup-mobilemenu-area">
      <div className="inner">
        <div className="mobile-menu-top">
          <div className="logo w-50">
            <Link href="/" shallow={true}>
              <Image
                src="/images/logo/banklessczWhite.svg"
                alt="Bankless logo"
                width={188}
                height={65}
              />
            </Link>
          </div>
          <div className="mobile-close" onClick={closeMobileMenu}>
            <FontAwesomeIcon icon="times" />
          </div>
        </div>
        <ul className="mainmenu list-unstyled">
          <Link href="/" shallow={true}>
            <li onClick={closeMobileMenu}>
              <a>Novinky</a>
            </li>
          </Link>
          <Link href="/hashovky/" shallow={true}>
            <li onClick={closeMobileMenu}>
              <a>#Hashovky</a>
            </li>
          </Link>

          <Link href="/studium/" shallow={true}>
            <li onClick={closeMobileMenu}>
              <a>Studium</a>
            </li>
          </Link>
        </ul>
      </div>
      <div className={style.closeMobileMenu} onClick={closeMobileMenu} />
    </div>
  )

  const _hamburgerMenu = () => (
    <div
      onClick={hamburgerOnClick}
      className="hamburger-menu d-block d-xl-none"
    >
      <div className="hamburger-inner">
        <div className="icon">
          <FontAwesomeIcon icon="bars" />
        </div>
      </div>
    </div>
  )

  const _mainMenu = () => (
    <div className="mainmenu-wrapper">
      <nav className="mainmenu-nav">
        <ul className="mainmenu">
          <Megamenu menuTitle="Novinky" categoryLink="/" categoryName="novinky" isBeginner={false} />

          <li>
            <Link href="/hashovky/" shallow={true}>
              #Hashovky
            </Link>
          </li>

          <Megamenu menuTitle="Studium" categoryLink="/studium" categoryName="studium" isBeginner={true} />
        </ul>
      </nav>
    </div>
  )

  const _SearchBarDesktop = () => {
    return (
      <div style={{float: 'right'}}>
      <form className="header-search-form">
      <div className="axil-search form-group">
        <Link href='/search' shallow={true}><button type="submit" className="search-button" onClick={(event) => {
          setSearchSlugs(searchForArticles(search, apiPostsData.searchPosts))
        }}><FontAwesomeIcon icon="search" href='#'/></button></Link>
        <input type="text" className="form-control" placeholder="Hledat" onChange={(event) => {
            setSearch(event.target.value)
        }}/>
      </div>
    </form>
    </div>
    )
  }

  return (
    <>
      <header className="header axil-header  header-light header-sticky position-relative">
        <div className="header-wrap">
          <div className="row justify-content-between align-items-center">
            {_logo()}
            {_logoMobile()}

            <div className="col-xl-6 d-none d-xl-block">{_mainMenu()}</div>
            <div className="col-xl-3 d-none d-xl-block">{_SearchBarDesktop()}</div>
            <div className="col-xl-3 col-lg-8 col-md-8 col-sm-9 col-12">
              <div className="header-search text-right d-flex align-items-center justify-content-end">
                <CryptoPrices isMobile={true} />
                {_hamburgerMenu()}
              </div>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <CryptoPrices isMobile={false} />
          </div>
        </div>
      </header>
      {_mobilePopupMenu()}
    </>
  )
}

export default Header
