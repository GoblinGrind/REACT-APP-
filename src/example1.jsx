import { useState } from 'react'

const Card = ({ title }) => {
const [liked, setLiked] = useState(false);
const [disliked, setDisliked] = useState(false);
const handlelike = () => {
    setLiked(!liked);
    if (!liked) {
        setDisliked(false); //resets the dislike button.
    }
}

const handledislike = () => {
    setDisliked(!disliked);
    if (!disliked) {
        setLiked(false); //resets the like button.
    }
}
return (
    <div className = "card">
    <h2>{title}</h2>

    <button onClick = {handlelike}>
        {liked ? "liked" : "like"}
    </button>
    <button onClick = {handledislike}>
        {disliked ? "disliked" : "dislike"}
    </button>
    </div>
    )
}

const App = () => {
    return (
        <div className = "card-container">
        <Card title="immitation game" />
        <Card  title="roll n rola" />
        <Card title="the Devils advocate" />
        </div>
    )
}

export default App