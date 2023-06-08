import { Post, PostType } from './components/Post'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

import './global.css'
import styles from './App.module.css'

export function App() {
  const posts: PostType[] = [
    {
      id: 1,
      author: {
        avatarUrl: "https://github.com/rodrigomatosc.png",
        name: "Rodrigo Matos",
        role: "Web Developer",
     },
     content: [
        {
          type: "paragraph",
          content: "Fala galerinha"
        },
        {
          type: "paragraph",
          content: "Acabei de subir meu projetinho react"
        },
        {
          type: "link",
          content: "jane.design/doctorcare"
        }
      ],
      publishedAt: new Date('2023-05-31 17:00:00')
    },
    {
      id: 2,
      author: {
        avatarUrl: "https://github.com/danielmarquesdm.png",
        name: "Daniel Marques",
        role: "Web Developer",
     },
     content: [
        {
          type: "paragraph",
          content: "Fala gг"
        },
        {
          type: "paragraph",
          content: "Acabei de subir ma"
        },
        {
          type: "link",
          content: "jane.design/doctorcare"
        }
      ],
      publishedAt: new Date('2023-05-31 20:00:00')
    }
  ];

  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>
        <Sidebar/>
        <main> 
          {posts.map(post =>{
            return (
              <Post
                key={post.id}
                post={post}
              />
            )
             
          })}
        </main>
      </div>
    </div>
  )
}

