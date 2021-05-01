import {getPosts, getSearchPost} from 'pages/api/posts'
import {useEffect, useState} from 'react'

import {GetServerSideProps} from 'next'
import Head from 'next/head'
import {PostOrPage} from '@tryghost/content-api'
import React from 'react'
import {fetchMenuPosts} from 'utils/fetchMenuPosts'
import {useMenuData} from 'context/SessionContext'
import { useCookies } from 'react-cookie';
import PostList from 'components/HomePage/PostList/PostList'
import SideBar from 'components/Layout/SideBar'

export const POSTS_ON_PAGE_LIMIT = 15

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {query} = context
  const hashovky = await getPosts({
    limit: 5,
    page: 1,
    include: ['tags'],
    filter: 'tag:hashovka',
  })

  const menuPosts = await fetchMenuPosts()
  const searchPosts = await getSearchPost()

  return {
    props: {
      hashovky,
      menuPosts,
      searchPosts
    }, // will be passed to the page component as props
  }
}

export default function Novinka({
    hashovky,
    menuPosts,
    searchPosts
                                }: {
  hashovky?: PostOrPage[]
  menuPosts?: PostOrPage[]
  searchPosts?: PostOrPage[]
}) {
  const [hashovkyState, setHashovkyState] = useState<PostOrPage[]>([])
  const [nextPage, setNextPage] = useState(1)
  const [postsState, setPostsState] = useState<PostOrPage[]>([])

  useMenuData({menuPosts, searchPosts})
  const [cookies, setCookie, get] = useCookies(['search']);
  //cookies.search -> array of strings. The string are slugs of articles.

  useEffect(() => {
    if (!hashovky) return
    setHashovkyState([...hashovkyState, ...hashovky])
  }, [hashovky])

  useEffect(() => {
    if (!searchPosts) return
    setPostsState([...postsState, ...searchPosts])
    setNextPage(nextPage + 1)
  }, [searchPosts])

  let PostsFiltered: PostOrPage[] = [];
  if(!(cookies.search == 'null')) { 
    postsState.forEach((post)=> {
      cookies.search.forEach((slug: string) => {
        if(slug == post.slug) {
          PostsFiltered.push(post)
        }
     })
   })}

  return (
    <div>
      <Head>
        <title>Bankless | Vyhledávání</title>
        <link rel="icon" type="image/png" href="/favicon.png"/>

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
      <div className='container'>
      <h1>Výsledky vyhledávání</h1>
      <div className="axil-post-list-area post-listview-visible-color bg-color-white">
            <div className="row">
          <PostList
          posts={PostsFiltered}
          nextPage={nextPage}
          isLastPage={searchPosts?.length !== POSTS_ON_PAGE_LIMIT}
          />
          <SideBar hashovky={hashovkyState}/>
    </div>
  </div>
  </div>
  </div>
  )
}
