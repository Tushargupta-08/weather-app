const [data,setData]=useState(null);

   useEffect(()=>{
    getPost().then((post)=>setData(post));

   },[])
   
  
  return ( <div className='App'>

    {
      data?data.map((e)=><Card  title={e.title} body={e.body}/>):<p>No data</p>
    }

   </div>
  );