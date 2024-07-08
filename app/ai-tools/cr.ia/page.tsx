import { allBlogs, Blog } from "contentlayer/generated"

import { allCoreContent, sortedBlogPost } from "@/lib/contentlayer"

import ReportGenerator from "components/report-generator"

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
      <ReportGenerator />
      </>
  )
}
