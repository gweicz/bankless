import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSideProps } from 'next'
import { getPosts } from '../../api/posts'
import { PostOrPage } from '@tryghost/content-api'
import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Home.module.scss'
import Head from 'next/head'
import MainBanner from '../../../components/HomePage/MainBanner'
import PostList from '../../../components/HomePage/PostList/PostList'
import SideBar from '../../../components/Layout/SideBar'
import MetaTags from "../../../components/MetaTags/MetaTags";

export const POSTS_ON_PAGE_LIMIT = 15

// Fetch posts
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context

  const page = Number(query?.page) || 1

  const posts = await getPosts({
    limit: POSTS_ON_PAGE_LIMIT,
    page,
    include: ['tags', 'authors'],
    filter: 'tag:polkadot',
  })

  const hashovky = await getPosts({
    limit: 5,
    page,
    include: ['tags'],
    filter: 'tag:hashovka',
  })

  if (!posts) {
    return {
      redirect: {
        destination: '/404Error',
        permanent: false,
      },
    }
  }

  return {
    props: { posts, hashovky }, // will be passed to the page component as props
  }
}

const NovinkyPolkadot = ({
  posts,
  hashovky,
}: {
  posts?: PostOrPage[]
  hashovky?: PostOrPage[]
}) => {
  const [postsState, setPostsState] = useState<PostOrPage[]>([])
  const [hashovkyState, setHashovkyState] = useState<PostOrPage[]>([])

  const [nextPage, setNextPage] = useState(1)

  useEffect(() => {
    if (!posts) return
    setPostsState([...postsState, ...posts])
    setNextPage(nextPage + 1)
  }, [posts])

  useEffect(() => {
    if (!hashovky) return
    setHashovkyState([...hashovkyState, ...hashovky])
  }, [hashovky])

  return (
    <div className={styles.container}>
      <Head>
        <title>Bankless | Polkadot novinky</title>
        <link rel="icon" type="image/png" href="/favicon.png" />

        <MetaTags
          meta_title="Bankless | Polkadot novinky"
          meta_description="Nejnovější zprávy ze světa Polkadot"
          og_title="Bankless | Polkadot novinky"
          og_image=""
          og_description="Nejnovější zprávy ze světa Polkadot"
          twitter_title="Bankless | Polkadot novinky"
          twitter_image=""
          twitter_description="Nejnovější zprávy ze světa Polkadot"
        />

        <base target="_blank"/>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`}></script>
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_KEY}');`
          }}
        />
      </Head>
      <main className={styles.main}>
        {postsState && <MainBanner data={postsState?.slice(0, 3) || []} />}
        <div className="container">
          <div className="axil-post-list-area post-listview-visible-color axil-section-gap bg-color-white">
            <div className="row">
              <PostList
                posts={postsState}
                nextPage={nextPage}
                isLastPage={posts?.length !== POSTS_ON_PAGE_LIMIT}
              />
              <SideBar hashovky={hashovkyState} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NovinkyPolkadot
