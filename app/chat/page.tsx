'use client';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function ChatPage(){
  const { messages, sendMessage, status } = useChat({
  transport: new DefaultChatTransport({
    api: '/api/chat',
  }),
});
  const [input,setInput]=useState('');
  return <main style={{maxWidth:760,margin:'40px auto',padding:'0 20px',fontFamily:'system-ui'}}>
    <a href="/" style={{textDecoration:'none'}}>← 回到朝向自由</a>
    <h1 style={{marginTop:30}}>🤖 跟我聊聊</h1>
    <p style={{color:'#777'}}>把你現在的想法說出來，我陪你換一個角度看看。</p>
    <div style={{border:'1px solid #ddd',borderRadius:18,padding:20,minHeight:420,background:'#fffdf9'}}>
      {messages.length===0 && <p style={{color:'#999'}}>例如：「我最近不知道自己想要什麼。」</p>}
      {messages.map(m=><div key={m.id} style={{margin:'18px 0'}}>
        <strong>{m.role==='user'?'你':'朝向自由 AI'}</strong>
        <div style={{whiteSpace:'pre-wrap',marginTop:6}}>
          {m.parts?.map((p,i)=>p.type==='text'?<span key={i}>{p.text}</span>:null)}
        </div>
      </div>)}
    </div>
    <form onSubmit={e=>{e.preventDefault();if(input.trim()){sendMessage({text:input});setInput('')}}} style={{display:'flex',gap:10,marginTop:14}}>
      <input value={input} onChange={e=>setInput(e.target.value)} placeholder="輸入你現在想聊的事…" style={{flex:1,padding:14,borderRadius:12,border:'1px solid #ccc'}} />
      <button disabled={status==='streaming'} style={{padding:'0 20px',borderRadius:12,border:0}}>送出</button>
    </form>
  </main>
}
