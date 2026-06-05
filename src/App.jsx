import React, { useContext, useEffect, useRef, useState } from 'react'
import { Camera, ArrowLeftRight, Pencil, ArrowRightLeft } from 'lucide-react'

const App = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [from, setFrom] = useState("");
  const [tocntry, setTocntry] = useState("");
  const [convertedamt, setConvertedamt] = useState("");
  const [fromval, setFromval] = useState("")
  const [toval, setToval] = useState("")
  const [active, setActive] = useState(false)

  const fetchData = async () => {
    const res = await fetch("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_zbl3bIxoH6IjPCy12sTci3XncMVqJfarXLhUGoFT");
    const data = await res.json();
    console.log(data.data);
    const list = Object.entries(data.data);
    setData(list);
  }


  useEffect(() => {
    fetchData()
  }, [])

  const handleClick = () => {
    const num = input;
    if (num === "" || from === "" || tocntry === "") { alert("Enter a valid selection"); return; }
    convert();
    console.log(amt);
    setActive(true);
  }

  const ref1 = useRef();
  const ref2 = useRef();

const convert=()=>{
   const amt = (tocntry / from).toFixed(8);
    const total = (amt * input).toFixed(2);
    setConvertedamt(total);

}

  const handleToggle = () => {
    if(fromval&&toval){
      const fromv = ref1.current.value;
    const tov = ref2.current.value;

    const index1=data.findIndex((item)=>{
      return item[0]===fromv;
    })
    const index2=data.findIndex((item)=>{
      return item[0]===tov;
    })
    console.log(data[index1][1],data[index2][1]);
    setFrom(data[index2][1]);
    setTocntry(data[index1][1])
    setFromval(tov);
    setToval(fromv);
    // setActive(false);
    
    }
    else{
      return ;
    }
  }
  useEffect(()=>{
    if(active&&input) convert();
  },[fromval,input,toval])

  
  return (
    <div className='h-screen w-scren flex justify-center items-start'>
      <div className=' border w-[400px] sm:w-[600px] h-[350px] mx-auto my-10 px-4 py-3 rounded-md overflow-hidden '>
        <div className='my-7 text-center'>
          <h1 className='text-[38px] font-bold   '>Currency Converter</h1>
        </div>
        <div>
          <div className='flex justify-between'>
            <div className='w-3/10'>
              <label htmlFor="amt" className='block text-[18px] text-green-500 font-semibold mb-2 '>Amount</label>
              <input type="number" id='amt'
                className='border px-1 w-full border-gray-400 outline-none rounded-sm'
                value={input}
                onChange={(e) => {
                  // setActive(false);
                  setInput(e.target.value);

                }}
              />
            </div>
            <div className='w-2/10'>
              <label htmlFor="fromCntry"

                className='block text-[18px] text-green-500 font-semibold mb-2 '>From</label>
              <select
                value={fromval}
                name="" id="fromCntry" className='border w-full px-1 text-[14px] font-semibold  border-gray-400 outline-none rounded-sm max-h-[200x]'
                ref={ref1}
                onChange={(e) => {
                  // setActive(false);

                  const index = data.findIndex((item) => {
                    // console.log(e.target.value);
                    return item[0] === e.target.value;
                  })

                  setFrom(data[index][1]);
                  setFromval(data[index][0]);

                }}

              >
                <option value="" hidden></option>
                {
                  data.map((elem, index) => {
                    return (
                      <option key={index} value={`${elem[0]}`}>{elem[0]}</option>
                    )

                  })
                }
              </select>
            </div>
            <button onClick={handleToggle}>

              <ArrowRightLeft className='w-[30px] h-[30px] p-[6px] text-[#01ff05] rounded-full bg-green-400/10 ' />
            </button>
            <div className='w-2/10'>
              <label htmlFor="toCntry" className='block text-[18px] text-green-500 font-semibold mb-2'>To</label>
              <select
                name="" id="toCntry"
                value={toval}
                className='border  w-full px-1 text-[14px] font-semibold border-gray-400 outline-none rounded-sm '
                ref={ref2}
                onChange={(e) => {
                  // setActive(false);

                  const index = data.findIndex((item) => {
                   
                    return item[0] === e.target.value;
                  })

                  setTocntry(data[index][1]);
                  setToval(data[index][0]);

                }}
              >
                <option value="" hidden></option>

                {
                  data.map((elem, index) => {
                    return (
                      <option key={index} value={`${elem[0]}`}>{elem[0]}</option>
                    )

                  })
                }

              </select>
            </div>
          </div>
          <button className='text-[rgb(0,255,0)] font-bold bg-[rgba(0,255,0,0.1)] px-2 py-1 rounded-sm my-2 ' onClick={handleClick} >Convert</button>

        </div>
        <div>
          <h2 className='font-bold text-[18px] tracking-wide '>
            Converted Amount:
          </h2>

          <div className='text-[20px] mt-5 text-[rgb(0,255,0,0.9)] font-semibold   '>
            {
              active ? `${input?input:1} ${fromval} = ${convertedamt} ${toval} ` : ""
              // convertedamt

            }
          </div>
        </div>


      </div>

    </div>
  )
}

export default App
