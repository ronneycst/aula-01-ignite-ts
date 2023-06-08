import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import styles from './Post.module.css'
import { Comment } from './Comment.js'
import { Avatar } from './Avatar.js';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}
interface Content{
    type: 'paragraph' | 'link';
    content: string;
}

export interface PostType{
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface PostProps{
    post: PostType;
}


export function Post({ post } : PostProps){
    const [comments, setComments] = useState([
        'Belo Post'
    ]);

    const [newCommentText, setNewCommentText]=useState('')
    
    const publishedAtDateFormatted = format(post.publishedAt,"d 'de' LLLL  'às' HH:mm'h'",{ 
            locale: ptBR,
        }
    );

    const publishedAtDateRelativeToNow = formatDistanceToNow(post.publishedAt,{ 
            locale: ptBR,
            addSuffix: true
        }
    );
   
    function handleCreateNewComment(event: FormEvent){
        event.preventDefault();
      
        setComments([...comments,newCommentText])
        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        setNewCommentText(event.target.value);
    }
    const isNewCommentEmpty = newCommentText.length === 0;
    
    function deleteComment(commentToDelete: string){
        const commentsWithOutDeletedOne = comments.filter(comment =>{
            return comment != commentToDelete
        })
        setComments(commentsWithOutDeletedOne);
    }
    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder src={post.author.avatarUrl}/>
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                    <time title={publishedAtDateFormatted} dateTime={post.publishedAt.toISOString()}>
                        {publishedAtDateRelativeToNow}
                    </time>
                </div>
            </header>
            <div className={styles.content} >
                {post.content.map(line =>{
                    if(line.type ==="paragraph"){
                        return <p key={line.content}>{line.content}</p>
                    }else if(line.type ==="link"){
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }

                })}
            </div>
            <form onSubmit={handleCreateNewComment}  className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    name='comment'
                    onChange={handleNewCommentChange}
                    value={newCommentText}
                    placeholder='Deixe um comentário'
                    required
                />
                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>Comentar</button>
                </footer>
            </form>
            <div className={styles.commentList}>
                {   comments.map(comment =>{
                        return <Comment key={comment} content={comment} onDeleteComment={deleteComment}/>
                    })
                }
                
            </div>
        </article>
    );
}