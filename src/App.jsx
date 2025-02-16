import './App.css'
import plus from '/plus.png'
import minus from '/minus.png'
import pfp from '/pfp.png'
import Reply from '/Reply.png'

import { useState } from 'react'

function App() {

  const [comments,SetComments] = useState([])
  const [NewComment,SetNewComment] = useState("")
  const [reply,SetReply] = useState(null)
  const [replyText,setReplyText] =useState("")



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
    SetComments(comments.map(comment => comment.id === comentId ? { ...comment, Reply: [...comment.Reply, { id: Date.now(), text: replyText ,count : 0}] } : comment));
    SetReply(null)
  }

  function HandleDeleteComment(comentId, Delete = false){
    if(Delete){
      SetComments(comments.map((comment) => {
          return {
            ...comment,Reply: comment.Reply.filter(reply => reply.id !== comentId)
        }
      }));
    } else {
      SetComments(comments.filter(comment => comment.id !== comentId));
    }
  }

  return (
    <div className='flex flex-col items-center'>
    <div className='w-[730px] h-[70vh] mt-[80px] flex flex-col gap-[20px]'>
      {comments.map((coment)=>{
        
        return(
        <>
          <div key={coment.id} className='flex place-content-between '>
          <div className='flex flex-col w-[40px] h-[100px] items-center place-content-around mt-[10px] ml-[50px]'>
            <button className='w-full h-[15px]' onClick={()=> handlePlus(coment.id)}><img className='w-[10px] h-[10px]' src={plus} alt="" /></button>
            <p className='font-[Rubik] w-full font-normal text-[16px] text-[#5357B6]'>{coment.count}</p>
            <button className='w-full h-[15px]' onClick={()=> handleMinus(coment.id)}><img className='w-[10px] h-[2.5px]' src={minus} alt="" /></button>
          </div>
  
          <div key={coment.id} className='flex flex-col '>
            <div className='flex w-[620px] place-content-between'>
              <div className='flex gap-[20px] items-center'>
                <img src={pfp} alt="" />
                <p className='font-[Rubik] font-normal text-[16px] text-[#334253]'>amyrobson</p>
                <p className='font-[Rubik] font-normal text-[16px] text-[#67727E]'>1 month ago</p>
              </div>
              <div className='mt-[7px] flex gap-[25px]'>
                <button onClick={()=>HandleDeleteComment(coment.id)} className='flex items-center gap-[10px] cursor-pointer text-[#ED6368] hover:text-[#FFB8BB] '>
                <i className="fa-solid fa-trash-can"></i>
                  <p className='font-[Rubik] font-normal text-[16px] '>Delete</p>
                </button>

                <button className='flex items-center gap-[10px] cursor-pointer text-[#5357B6] hover:text-[#C5C6EF] '>
                <i className="fa-solid fa-reply "></i>
                  <button onClick={()=>handleReply(coment.id)} className='font-[Rubik] font-normal text-[16px] cursor-pointer'>Reply</button>
                </button>
              </div>
            </div>
            <p className='w-[620px] font-[Rubik] font-normal text-[16px] text-[#67727E] mt-[10px]'>{coment.text}</p>
          </div>
        </div>  


          {reply === coment.id && 
          <div className='w-[730px] flex justify-end items-start gap-[15px]'>
          <img src={pfp} alt="" />
          <textarea onChange={(e)=> setReplyText(e.target.value)} value={replyText} className='border border-[#5357B6] outline-none w-[506px] h-[96px] rounded-[8px] pl-[20px] pr-[20px] pt-[5px] resize-none font-[Rubik] font-normal text-[16px] text-[#334253]' />
          <button onClick={()=> HandleSubmitReply(coment.id)} className='w-[105px] h-[48px] rounded-[8px] bg-[#5357B6] hover:bg-[#C5C6EF] font-[Rubik] font-normal text-[16px] text-white cursor-pointer'>REPLY</button>
        </div>
          }

          {coment.Reply.length > 0 && (
            coment.Reply.map((Eachreply)=>(
            <div className='flex justify-between'>
              <div className='w-[2px] h-[100%] bg-[#E9EBF0] ml-[50px]'></div>

              <div key={Eachreply.id} className='flex place-content-between '>
              <div className='flex flex-col w-[40px] h-[100px] items-center place-content-around mt-[10px] ml-[50px]'>
              <button className='w-full h-[15px]' onClick={()=> handlePlus(Eachreply.id, true)}><img className='w-[10px] h-[10px]' src={plus} alt="" /></button>
              <p className='font-[Rubik] w-full font-normal text-[16px] text-[#5357B6]'>{Eachreply.count}</p>
              <button className='w-full h-[15px]' onClick={()=> handleMinus(Eachreply.id, true)}><img className='w-[10px] h-[2.5px]' src={minus} alt="" /></button>
              </div>
      
              <div key={Eachreply.id} className='flex flex-col w-[530px]'>
                <div className='flex w-[530px] place-content-between'>
                  <div className='flex gap-[20px] items-center'>
                    <img src={pfp} alt="" />
                    <p className='font-[Rubik] font-normal text-[16px] text-[#334253]'>amyrobson</p>
                    <p className='font-[Rubik] font-normal text-[16px] text-[#67727E]'>1 month ago</p>
                  </div>
                  <div className='mt-[7px] flex gap-[25px]'>
                    <button onClick={()=>HandleDeleteComment(Eachreply.id, true)} className='flex items-center gap-[10px] cursor-pointer text-[#ED6368] hover:text-[#FFB8BB] '>
                    <i className="fa-solid fa-trash-can"></i>
                      <p className='font-[Rubik] font-normal text-[16px] '>Delete</p>
                    </button>
    
                    <button className='flex items-center gap-[10px] cursor-pointer text-[#5357B6] hover:text-[#C5C6EF] '>
                    <i className="fa-solid fa-reply "></i>
                      <button onClick={()=>handleReply(coment.id)} className='font-[Rubik] font-normal text-[16px] cursor-pointer'>Reply</button>
                    </button>
                  </div>
                </div>
                <p className='w-[620px] font-[Rubik] font-normal text-[16px] text-[#67727E] mt-[10px]'>@amyrobson {Eachreply.text}</p>
              </div>
            </div>  
            </div>
            ))
          )}
          
        </>

        
        )
      })}
    </div>

    <div className='w-[730px] flex justify-end items-start gap-[15px]'>
      <img src={pfp} alt="" />
      <textarea onChange={(e)=> SetNewComment(e.target.value)} value={NewComment} className='border border-[#5357B6] outline-none w-[506px] h-[96px] rounded-[8px] pl-[20px] pr-[20px] pt-[5px] resize-none font-[Rubik] font-normal text-[16px] text-[#334253]' />
      <button onClick={()=> CreateComment()} className='w-[105px] h-[48px] rounded-[8px] bg-[#5357B6] hover:bg-[#C5C6EF] font-[Rubik] font-normal text-[16px] text-white cursor-pointer'>SEND</button>
    </div>
    </div>
    
  )
}

export default App
