import './App.css'
import plus from '../src/IMAGES/plus.png'
import minus from '../src/IMAGES/minus.png'
import pfp from '../src/IMAGES/pfp.png'
import Reply from '../src/IMAGES/Reply.png'

import { useState } from 'react'

function App() {

  const [comments,SetComments] = useState([])
  const [NewComment,SetNewComment] = useState("")



  function CreateComment () {
    if(NewComment.trim() !== ""){
      SetComments([...comments, {id: Date.now(), text:NewComment, reply: [], count : 0}])
      SetNewComment("")
    }
  }

  function handlePlus(id){
    SetComments(comments.map((comment)=>{
      return(
        comment.id === id ? {...comment, count:comment.count+1}:comment
      )
    }))
  }

  function handleMinus(id){
    SetComments(comments.map((comment)=>{
      return(
        comment.id === id ?{...comment , count: Math.max(0, comment.count - 1) } : comment
      )
    }))
  }

  return (
    <div className='flex flex-col items-center'>
    <div className='w-[730px] h-[70vh] mt-[80px] flex flex-col gap-[20px]'>
      {comments.map((coment)=>{
        
        return(
          <div key={coment.id} className='flex place-content-between '>
          <div className='flex flex-col w-[40px] h-[100px] items-center place-content-around mt-[10px] ml-[50px]'>
            <button className='w-full h-[15px]' onClick={()=> handlePlus(coment.id)}><img className='w-[10px] h-[10px]' src={plus} alt="" /></button>
            <p className='font-[Rubik] w-full font-normal text-[16px] text-[#5357B6]'>{coment.count}</p>
            <button className='w-full h-[15px]' onClick={()=> handleMinus(coment.id)}><img className='w-[10px] h-[2.5px]' src={minus} alt="" /></button>
          </div>
  
          <div className='flex flex-col '>
            <div className='flex w-[620px] place-content-between'>
              <div className='flex gap-[20px] items-center'>
                <img src={pfp} alt="" />
                <p className='font-[Rubik] font-normal text-[16px] text-[#334253]'>amyrobson</p>
                <p className='font-[Rubik] font-normal text-[16px] text-[#67727E]'>1 month ago</p>
              </div>
              <div className='mt-[7px] flex gap-[25px]'>
                <button className='flex items-center gap-[10px] cursor-pointer text-[#ED6368] hover:text-[#FFB8BB] '>
                <i className="fa-solid fa-trash-can"></i>
                  <p className='font-[Rubik] font-normal text-[16px] '>Delete</p>
                </button>

                <button className='flex items-center gap-[10px] cursor-pointer text-[#5357B6] hover:text-[#C5C6EF] '>
                <i className="fa-solid fa-reply "></i>
                  <p className='font-[Rubik] font-normal text-[16px] '>Reply</p>
                </button>
              </div>
            </div>
            <p className='w-[620px] font-[Rubik] font-normal text-[16px] text-[#67727E] mt-[10px]'>{coment.text}</p>
          </div>
        </div>
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
