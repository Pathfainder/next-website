import { allBlogs, Blog } from "contentlayer/generated"

import { allCoreContent, sortedBlogPost } from "@/lib/contentlayer"

import { Header } from "@/components/header"
import { LatestPosts } from "@/components/latest-posts"
import { ShowcaseProjects } from "@/components/showcase-projects"

export default async function Home() {
  const sortedPosts = sortedBlogPost(allBlogs) as Blog[]
  const posts = allCoreContent(sortedPosts)
  

const App: React.FC = () => {
    return (
        <div style={{ display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      height: '100vh', 
                      backgroundColor: '#E6E6FA' }}>
            
        </div>
    );
};


  return (
    <>
      <Header />
      <LatestPosts posts={posts} />
      <ShowcaseProjects />
    </>
  )
}
