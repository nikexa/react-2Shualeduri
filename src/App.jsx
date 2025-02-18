import './App.css'
import plus from '/plus.png'
import minus from '/minus.png'
import pfp from '/pfp.png'
import Reply from '/Reply.png'

import { useEffect, useRef, useState } from 'react'

function App() {

  const [comments,SetComments] = useState([])
  const [NewComment,SetNewComment] = useState("")
  const [reply,SetReply] = useState(null)
  const [replyText,setReplyText] =useState("")
  const [OpenModal,SetOpenModal] = useState(false)
  const [deleteReply,setDelteReply]=useState(false)
  const [deleteId,setDelteId] = useState(null) 
  const [edit,SetEdit] = useState(false)
  const [editedText,SetEditedText]=useState("")
  const deleteREf=useRef(null)
  const editRef=useRef(null)
  const replyRef = useRef(null)

  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  }, [comments]);

  useEffect(() => {
    const savedComs = localStorage.getItem("comments");
    if (savedComs) {
      SetComments(JSON.parse(savedComs));
    }
  }, []);


  function CreateComment () {
    if(NewComment.trim() !== ""){
      SetComments([...comments, {id: Date.now(), text:NewComment, Reply: [], count : 0}])
      SetNewComment("")
    }
  }

  function handlePlus(id, isReply = false){
    if (isReply) {
      SetComments(comments.map((comment) => {
          return {
            ...comment,Reply: comment.Reply.map((reply) => 
              reply.id === id ? { ...reply, count: reply.count + 1 } : reply
            )
          };
      }));
    } else {
      SetComments(comments.map((comment) => 
        comment.id === id ? { ...comment, count: comment.count + 1 } : comment
      ));
    }
  }
  
  function handleMinus(id, isReply = false){
    if (isReply) {
      SetComments(comments.map((comment) => {
          return {
            ...comment,Reply: comment.Reply.map((reply) => 
              reply.id === id ? { ...reply, count: Math.max(0, reply.count - 1) } : reply
            )
        }
      }));
    } else {
      SetComments(comments.map((comment) => 
        comment.id === id ? { ...comment, count: Math.max(0, comment.count - 1) } : comment
      ));
    }
  }

  function handleReply(comentId){
    SetReply(comentId)
    setReplyText("")
  }

  function HandleSubmitReply(comentId){
    if(replyText.trim() !== ""){
      SetComments(comments.map(comment => comment.id === comentId ? { ...comment, Reply: [...comment.Reply, { id: Date.now(), text: replyText ,count : 0}] } : comment));
      SetReply(null)
    }
  }

  function HandleDeleteComment(){
    if(deleteReply){
      SetComments(comments.map((comment) => {
        
        console.log("dfxbvdfb");
          return {
            ...comment,Reply: comment.Reply.filter(reply => reply.id !== deleteId)
            
        }
      }));
    } else {
      SetComments(comments.filter(comment => comment.id !== deleteId));
      
    }
    SetOpenModal(false)
  }

  function closeModal(event){
    if(!deleteREf.current?.contains(event.target)){
      SetOpenModal(false)
    }
    if(!replyRef.current?.contains(event.target)){
      SetReply(false)
    }
    if(!editRef.current?.contains(event.target)){
      SetEdit(false)
    }
  }

  document.addEventListener("mousedown",closeModal)


  function handleEdit(editid, IsEdited = false) {
    if (IsEdited) {
      SetComments(comments.map((comment) => {
        return {
          ...comment,
          Reply: comment.Reply.map((reply) =>
            reply.id === editid ? { ...reply, text: editedText || reply.text } : reply
          )
        };
      }));
    } else {
      SetComments(comments.map(comment =>
        comment.id === editid ? { ...comment, text: editedText || comment.text } : comment
      ));
    }
    SetEdit(false);
    SetEditedText("")
  }

  return (
    
    <div className={`w-full h-screen ${OpenModal ? "bg-[#00000080]" : "bg-white"}`}>
          <div className={`flex flex-col items-center`}>
    <div className='w-[740px] h-[70vh] mt-[80px] flex flex-col gap-[20px] overflow-y-auto max-md:w-[352px]'>
      {comments.map((coment)=>{
        
        return(
        <>
          <div key={coment.id} className='flex place-content-between max-md:flex-col-reverse'>
          <div className='flex flex-col w-[40px] h-[100px] items-center place-content-around mt-[0px] ml-[50px] max-md:ml-1.5 max-md:flex-row max-md:justify-between max-md:w-[330px]'>
            <div className='flex flex-col w-[40px] h-[100px] items-center place-content-around ml-[50px] max-md:flex-row max-md:gap-[10px] max-md:h-[40px] max-md:w-[100px] max-md:ml-0'>
            <button className='w-full h-[15px] max-md:w-[15px]' onClick={()=> handlePlus(coment.id)}><img className='w-[10px] h-[10px] ' src={plus} alt="" /></button>
            <p className='font-[Rubik] w-full font-normal text-[16px] text-[#5357B6] max-md:text-center max-md:mt-[2px]'>{coment.count}</p>
            <button className='w-full h-[15px] max-md:w-[15px]' onClick={()=> handleMinus(coment.id)}><img className='w-[10px] h-[2.5px]' src={minus} alt="" /></button>
            </div>
            <div className='mt-[7px] gap-[25px] hidden max-md:flex'>
                <button onClick={()=> {SetOpenModal(true); setDelteId(coment.id); setDelteReply(false )}} className='flex items-center gap-[10px] cursor-pointer text-[#ED6368] hover:text-[#FFB8BB] '>
                <i className="fa-solid fa-trash-can"></i>
                </button>
                <button onClick={() => SetEdit(coment.id)} className='flex items-center gap-[10px] cursor-pointer text-[#5357B6] hover:text-[#C5C6EF] '>
                <i className="fa-solid fa-pen"></i>
                </button>
                <button onClick={()=>handleReply(coment.id)} className='flex items-center gap-[10px] cursor-pointer text-[#5357B6] hover:text-[#C5C6EF] '>
                <i className="fa-solid fa-reply "></i>
                </button>
              </div>
          </div>
  
          <div key={coment.id} className='flex flex-col '>
            <div className='flex w-[620px] place-content-between max-md:w-[343px]'>
              <div className='flex gap-[20px] items-center'>
                <img src={pfp} alt="" />
                <p className='font-[Rubik] font-normal text-[16px] text-[#334253]'>amyrobson</p>
                <p className='font-[Rubik] font-normal text-[16px] text-[#67727E] max-md:hidden'>1 month ago</p>
              </div>
              <div>
              <p className='hidden font-[Rubik] font-normal text-[16px] text-[#67727E] max-md:block '>1 month ago</p>

              </div>
              <div className='mt-[7px] flex gap-[25px] max-md:hidden'>
                <button onClick={()=> {SetOpenModal(true); setDelteId(coment.id); setDelteReply(false )}} className='flex items-center gap-[10px] cursor-pointer text-[#ED6368] hover:text-[#FFB8BB] '>
                <i className="fa-solid fa-trash-can"></i>
                  <p className='font-[Rubik] font-normal text-[16px] '>Delete</p>
                </button>
                <button onClick={() => SetEdit(coment.id)} className='flex items-center gap-[10px] cursor-pointer text-[#5357B6] hover:text-[#C5C6EF] '>
                <i className="fa-solid fa-pen"></i>
                <p>Edit</p>
                </button>
                <button className='flex items-center gap-[10px] cursor-pointer text-[#5357B6] hover:text-[#C5C6EF] '>
                <i className="fa-solid fa-reply "></i>
                  <button onClick={()=>handleReply(coment.id)} className='font-[Rubik] font-normal text-[16px] cursor-pointer'>Reply</button>
                </button>
              </div>
            </div>
            {edit === coment.id ?       
              <div ref={editRef} className='mt-[20px] flex gap-[15px]'>
                <textarea onChange={(e)=> SetEditedText(e.target.value)} defaultValue={coment.text} className='w-[500px] h-[124px] border border-[#5357B6] resize-none outline-none rounded-[8px] pl-[20px] pr-[20px] pt-[5px] font-[Rubik] font-normal text-[16px] text-[#334253] max-md:w-full'></textarea>
                <button onClick={()=> handleEdit(coment.id)} className='w-[104px] h-[48px] rounded-[8px] bg-[#5357B6] text-white text-[16px] font-[Rubik] font-normal cursor-pointer max-md:text-[14px]'>UPDATE</button>
              </div>:
              <p className='w-[500px] font-[Rubik] font-normal text-[16px] text-[#67727E] mt-[10px] max-md:w-[300px]'>{coment.text}</p>
              }
          </div>
          </div>  


            {reply === coment.id && 
            <div ref={replyRef} className='w-[730px] flex justify-end items-start gap-[15px] max-md:w-[325px]'>
            <img src={pfp} alt="" />
            <textarea onChange={(e)=> setReplyText(e.target.value)} value={replyText} className='border border-[#5357B6] outline-none w-[506px] h-[96px] rounded-[8px] pl-[20px] pr-[20px] pt-[5px] resize-none font-[Rubik] font-normal text-[16px] text-[#334253] max-md:w-full' />
            <button onClick={()=> HandleSubmitReply(coment.id)} className='w-[105px] h-[48px] rounded-[8px] bg-[#5357B6] hover:bg-[#C5C6EF] font-[Rubik] font-normal text-[16px] text-white cursor-pointer max-md:text-[14px]'>REPLY</button>
          </div>
          }

          {coment.Reply.length > 0 && (
            coment.Reply.map((Eachreply)=>(
            <div className='flex justify-between max-md:w-[330px] max-md:ml-[5px]'>
              <div className='w-[2px] h-[100%] bg-[#E9EBF0] ml-[80px] max-md:ml-[0px]'></div>

              <div key={Eachreply.id} className='flex place-content-between max-md:flex-col-reverse'>
                <div className='flex flex-col w-[40px] h-[100px] items-center place-content-around mt-[0px] ml-[0px] max-md:ml-1.5 max-md:flex-row max-md:justify-between max-md:w-[330px]'>
                <div className='flex flex-col w-[40px] h-[100px] items-center place-content-around mt-[5px] mr-[20px] max-md:flex-row max-md:gap-[10px] max-md:h-[40px] max-md:w-[100px] max-md:ml-0 '>
                  <button className='w-full h-[15px]' onClick={()=> handlePlus(Eachreply.id, true)}><img className='w-[10px] h-[10px]' src={plus} alt="" /></button>
                  <p className='font-[Rubik] w-full font-normal text-[16px] text-[#5357B6]'>{Eachreply.count}</p>
                  <button className='w-full h-[15px]' onClick={()=> handleMinus(Eachreply.id, true)}><img className='w-[10px] h-[2.5px]' src={minus} alt="" /></button>
                </div>
                <div className='hidden max-md:flex max-md:gap-[25px]'>
                <button onClick={()=> {SetOpenModal(true); setDelteReply(true); setDelteId(Eachreply.id)}} className='flex items-center gap-[10px] cursor-pointer text-[#ED6368] hover:text-[#FFB8BB] '>
                    <i className="fa-solid fa-trash-can"></i>
                    </button>
                    <button onClick={() => SetEdit(Eachreply.id, true)} className='flex items-center gap-[10px] cursor-pointer text-[#5357B6] hover:text-[#C5C6EF] '>
                      <i className="fa-solid fa-pen"></i>
                      
                    </button>
                    <button onClick={()=>handleReply(coment.id)} className='flex items-center gap-[10px] cursor-pointer text-[#5357B6] hover:text-[#C5C6EF] '>
                    <i className="fa-solid fa-reply "></i>
                     
                    </button>
                </div>
              </div>
      
              <div key={Eachreply.id} className='flex flex-col w-[530px] max-md:w-[330px]'>
                <div className='flex w-[530px] place-content-between max-md:w-[330px]'>
                  <div className='flex gap-[20px] items-center justify-between w-full'>
                    <div className='flex gap-[20px] items-center'>
                    <img src={pfp} alt="" />
                    <p className='font-[Rubik] font-normal text-[16px] text-[#334253]'>amyrobson</p>
                    <p className='font-[Rubik] font-normal text-[16px] text-[#67727E] max-md:hidden'>1 month ago</p>

                    </div>
                    <p className='font-[Rubik] hidden font-normal text-[16px] text-[#67727E] max-md:block'>1 month ago</p>
                  </div>
                  <div className='mt-[3px] flex gap-[25px] max-md:hidden'>
                    <button onClick={()=> {SetOpenModal(true); setDelteReply(true); setDelteId(Eachreply.id)}} className='flex items-center gap-[10px] cursor-pointer text-[#ED6368] hover:text-[#FFB8BB] '>
                    <i className="fa-solid fa-trash-can"></i>
                      <p className='font-[Rubik] font-normal text-[16px] '>Delete</p>
                    </button>
                    <button onClick={() => SetEdit(Eachreply.id, true)} className='flex items-center gap-[10px] cursor-pointer text-[#5357B6] hover:text-[#C5C6EF] '>
                      <i className="fa-solid fa-pen"></i>
                      <p>Edit</p>
                    </button>
                    <button className='flex items-center gap-[10px] cursor-pointer text-[#5357B6] hover:text-[#C5C6EF] '>
                    <i className="fa-solid fa-reply "></i>
                      <button onClick={()=>handleReply(coment.id)} className='font-[Rubik] font-normal text-[16px] cursor-pointer'>Reply</button>
                    </button>
                  </div>
                </div>
                {edit === Eachreply.id ?       
                <div ref={editRef} className='w-[530px] h-[180px] relative mt-[20px] max-md:w-[300px]'>
                <textarea onChange={(e) => SetEditedText(e.target.value)} defaultValue={Eachreply.text} className='w-[530px] h-[124px] border border-[#5357B6] resize-none outline-none rounded-[8px] pl-[20px] pr-[20px] pt-[5px] font-[Rubik] font-normal text-[16px] text-[#334253] max-md:w-full'></textarea>
                <button onClick={()=> handleEdit(Eachreply.id, true)} className='w-[104px] h-[48px] rounded-[8px] bg-[#5357B6] text-white text-[16px] font-[Rubik] font-normal absolute right-0 bottom-0'>UPDATE</button>
              </div>:
                <p className='w-[500px] font-[Rubik] font-normal text-[16px] text-[#67727E] mt-[10px] max-md:w-[300px]'>@amyrobson {Eachreply.text}</p>
              }
              </div>
            </div>  

              {OpenModal && 
                <div ref={deleteREf} className='w-[400px] h-[252px] bg-white rounded-[8px] flex flex-col items-center justify-center gap-[20px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <p className='font-[Rubik] font-normal text-[24px] text-[#334253] w-[336px]'>Delete comment</p>
                <p className='font-[Rubik] font-normal text-[16px] text-[#334253] w-[336px]'>Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</p>
                <div className='flex gap-[20px]'>
                <button onClick={()=> SetOpenModal(false)} className='w-[161px] h-[48px] bg-[#67727E] text-white text-[16px] font-[Rubik] font-normal rounded-[8px]'>NO, CANCEL</button>
                <button onClick={HandleDeleteComment}className='w-[161px] h-[48px] bg-[#ED6368] text-white text-[16px] font-[Rubik] font-normal rounded-[8px]'>YES, DELETE</button>
                </div> 
              </div>}
            
            </div>

            ))
          )}

          {OpenModal && 
                <div ref={deleteREf} className='w-[400px] h-[252px] bg-white rounded-[8px] flex flex-col items-center justify-center gap-[20px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-md:w-[343px] max-md:h-[224px]'>
                <p className='font-[Rubik] font-normal text-[24px] text-[#334253] w-[336px] max-md:text-[20px] max-md:w-[288px]'>Delete comment</p>
                <p className='font-[Rubik] font-normal text-[16px] text-[#334253] w-[336px] max-md:w-[288px]'>Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</p>
                <div className='flex gap-[20px]'>
                <button onClick={()=> SetOpenModal(false)} className='w-[161px] h-[48px] bg-[#67727E] text-white text-[16px] font-[Rubik] font-normal rounded-[8px] max-md:w-[138px] max-md:h-[48px]'>NO, CANCEL</button>
                <button onClick={HandleDeleteComment} className='w-[161px] h-[48px] bg-[#ED6368] text-white text-[16px] font-[Rubik] font-normal rounded-[8px] max-md:w-[138px] max-md:h-[48px]'>YES, DELETE</button>
                </div> 
              </div>}


          
        </>

        
        
        )

      })}



    </div>

    <div className='w-[730px] flex justify-end items-start gap-[15px] max-md:w-[311px] max-md:flex-col '>
      <img className='max-md:hidden' src={pfp} alt="" />
      <textarea onChange={(e)=> SetNewComment(e.target.value)} value={NewComment} className='border border-[#5357B6] outline-none w-[506px] h-[96px] rounded-[8px] pl-[20px] pr-[20px] pt-[5px] resize-none font-[Rubik] font-normal text-[16px] text-[#334253] max-md:w-[311px]' />
      <button onClick={()=> CreateComment()} className='w-[105px] h-[48px] rounded-[8px] bg-[#5357B6] hover:bg-[#C5C6EF] font-[Rubik] font-normal text-[16px] text-white cursor-pointer max-md:hidden'>SEND</button>
      <div className='hidden max-md:flex max-md:justify-between max-md:items-center w-full'>
      <img src={pfp} alt="" />
      <button onClick={()=> CreateComment()} className='w-[105px] h-[48px] rounded-[8px] bg-[#5357B6] hover:bg-[#C5C6EF] font-[Rubik] font-normal text-[16px] text-white cursor-pointer'>SEND</button>
      </div>
    </div>
    </div>
    </div>
    
  )
}

export default App
