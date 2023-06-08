import { Trash, ThumbsUp} from 'phosphor-react';
import styles from './Comment.module.css'
import { Avatar } from './Avatar';
import { useState } from 'react';

interface CommentProps{
    content: string;
    onDeleteComment(comment: string): void;
}

export function Comment({content,onDeleteComment} : CommentProps){
    const [likeCount, setLikeCount] = useState(0);

    function handleDeleteComment(){
        onDeleteComment(content)
    }

    function handleLikeCount(){
        setLikeCount(likeCount + 1);
    }
    return(
        <div className={styles.comment}>
            <Avatar hasBorder = {false} src="https://github.com/danielmarquesdm.png" alt="" />
            <div className={styles.commentBox} >
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Daniel Marques</strong>
                            <time title='30 de maio as 15:40' dateTime='2023-05-30 14:55:05'>Cerca de 1 hora atrás</time>
                        </div>
                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <Trash size={24}/>
                        </button>
                    </header>
                    <p>
                        {content}
                    </p>
                </div>
                <footer>
                    <button onClick={handleLikeCount}>
                        <ThumbsUp/>
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    );
}