
function Blog(){
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
                        placeholder="Enter title here..."/>
               </Row>
               <Row label="Content">
                 <textarea className="input content"
                           placeholder="Content goes here..."/>
               </Row>
               <button className="btn">ADD</button>
            </form>
         </div>
         <hr/>
         <h2>Blogs</h2>
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