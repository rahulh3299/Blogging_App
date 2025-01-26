import { useState,useRef,useEffect, useReducer} from "react";
import { db } from "../firebaseInit";
import { collection, addDoc ,getDocs} from "firebase/firestore"; 

function blogsReducer(state,action){
  switch(action.type){
    case "ADD":
        return [action.blog, ...state]  ;
    case "REMOVE":
        return state.filter((blog,index) => index !== action.index);
    default:
        return [action.blog, ...state];
  }
}

function Blog(){

    // let [title,setTitle] = useState("");
    // let [content,setContent] = useState("");
    const [formData,setFormData] = useState({title:"",content:""});
    // const [blogs,setBlogs] = useState([]);
    const [blogs,dispatch] = useReducer(blogsReducer,[])
    const titleRef = useRef(null);
    useEffect(()=>{
        titleRef.current.focus();
    },[]);
    useEffect(()=>{
        if(blogs.length && blogs[0]){
            document.title = blogs[0].title;
        }else{
            document.title = "No Blogs";
        }
    },[blogs]);
    useEffect(()=>{
      async function fetchData(){
        const querySnapshot = await getDocs(collection(db, "blogs"));
        console.log(querySnapshot);
        const blogs = querySnapshot.docs.map((doc)=>{
            return {
                id:doc.id,
                ...doc.data()
            }
        });
        console.log(blogs);
        

      }
      fetchData();
    },[]);
    async function handleSubmit(e){
        e.preventDefault();
       // setBlogs([{title:formData.title,content:formData.content},...blogs]);
       dispatch({type:"ADD",blog:{title:formData.title,content:formData.content}});
        console.log(blogs);
        const docRef = await addDoc(collection(db, "blogs"), {
            title: formData.title,
            content: formData.content,
            createdOn: new Date()
          });
          console.log("Document written with ID: ", docRef.id);

        setFormData({title:"",content:""});
        titleRef.current.focus();
        
    }
    function removeBlog(i){
    //  setBlogs(blogs.filter((blog,index)=>i!==index))
    dispatch({type:"REMOVE",index:i});
    }
    return(
        <>
         <h1>Write a Blog!</h1>
         <div className="section">
            <form onSubmit={handleSubmit}>
               <Row label="Title">
                 <input className="input"
                        placeholder="Enter title here..."
                        value={formData.title}
                        onChange={(e)=> setFormData({title:e.target.value,content:formData.content})}
                        ref = {titleRef}/>
               </Row>
               <Row label="Content">
                 <textarea className="input content"
                           placeholder="Content goes here..."
                           value={formData.content}
                           onChange={(e)=> setFormData({title:formData.title,content:e.target.value})}
                           required/>
               </Row>
               <button className="btn">ADD</button>
            </form>
         </div>
         <hr/>
         <h2>Blogs</h2>
         {/* <h3>{title}</h3>
         <h4>{content}</h4> */}
         {blogs.map((blog,i)=>{
            return(
                <div className="blog" key={i}>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <button onClick={()=>removeBlog(i)} className="btn remove">Delete</button>
                </div>
            )
            
            
         })}
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