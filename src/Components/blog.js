import { useState } from "react";

function Blog(){

    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    function handleSubmit(e){
        e.preventDefault();
    }
    return(
        <>
         <h1>Write a Blog!</h1>
         <div className="section">
            <form onSubmit={handleSubmit}>
               <Row label="Title">
                 <input className="input"
                        placeholder="Enter title here..."
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}/>
               </Row>
               <Row label="Content">
                 <textarea className="input content"
                           placeholder="Content goes here..."
                           value={content}
                           onChange={(e)=> setContent(e.target.value)}/>
               </Row>
               <button className="btn">ADD</button>
            </form>
         </div>
         <hr/>
         <h2>Blogs</h2>
         <h3>{title}</h3>
         <h4>{content}</h4>
        </>
    );
}
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
export default Blog;