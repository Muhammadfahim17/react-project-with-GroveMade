import React, { useEffect, useState } from 'react'
import { Button, Modal, Input } from 'antd';
import image1 from './assets/Frame (55).png'
import image2 from './assets/Frame (56).png'
import image3 from './assets/Frame (57).png'
// import image4 from './assets/Frame (58).png'
// import image5 from './assets/Frame (59).png'
// import image6 from './assets/Frame (60).png'
// import image7 from './assets/Frame (61).png'
import image8 from './assets/Frame (62).png'
import image9 from './assets/Frame (63).png'
import image10 from './assets/Frame (64).png'
import image11 from './assets/Frame (65).png'
import image12 from './assets/Frame (66).png'
import image13 from './assets/Frame (67).png'
import image14 from './assets/Frame (68).png'
import image15 from './assets/Frame (69).png'
import image16 from './assets/Frame (70).png'
import image17 from './assets/Frame (71).png'
import image18 from './assets/Frame (72).png'
import image19 from './assets/Frame (73).png'
import image20 from './assets/Frame (74).png'
import image21 from './assets/Frame (75).png'
import image22 from './assets/Frame (76).png'
import image23 from './assets/Frame (77).png'
import image24 from './assets/Frame (78).png'
import image25 from './assets/Frame (79).png'
import image26 from './assets/Frame (80).png'
import image27 from './assets/Rectangle (21).png'
import image28 from './assets/image 1.png'
import image29 from './assets/Frame (81).png'
import image30 from './assets/Frame (82).png'
import image31 from './assets/Frame (83).png'
import image32 from './assets/Frame (84).png'
import image33 from './assets/Frame (85).png'
import image34 from './assets/Rectangle (26).png'
import image35 from './assets/Frame (86).png'

import './App.css'

const App = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let[inpName,setInpName] = useState('')
  let[inpImage,setInpImage] = useState('')
  let[inpPrice,setInpPrice] = useState('')
  let[inpStatus,setInpStatus] = useState('true')


  async function addNewProducts() {
    let newProducts = {
      img : inpImage,
      name : inpName,
      price : inpPrice,
      status : inpStatus == 'true' ? true : false
    }
    try {
      await fetch(`${api}`, {
        method : 'POST',
        headers : {'Content-type':'application/json'},
        body : JSON.stringify(newProducts)
      })
      get()
      handleCancel()
    } catch (error) {
      console.error(error);
    }
  }


  let api = "http://localhost:3000/data"
  let[data,setData] = useState([])
  async function get() {
    try {
      let response = await fetch(api)
      let data = await response.json()
      setData(data)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    get()
  }, []);


  async function deleteUser(id) {
    try {
      await fetch(`${api}/${id}`, {
        method : 'DELETE'
      })
      get()
    } catch (error) {
      console.error(error);
    }
  }

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  // const handleOk = () => {
  //   setIsEditModalOpen(false);
  // };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  let[inpEditName,setInpEditName] = useState('')
  let[inpEditImage,setInpEditImage] = useState('')
  let[inpEditPrice,setInpEditPrice] = useState('')
  let[inpEditStatus,setInpEditStatus] = useState('true')
  let [idx,setIdx] = useState(null)

  function openDialog(e) {
    showEditModal()
    setInpEditImage(e.img)
    setInpEditName(e.name)
    setInpEditPrice(e.price)
    setInpEditStatus(e.status)
    setIdx(e.id)
  }

  async function editProducts() {
    let edit = {
      img : inpEditImage,
      name : inpEditName,
      price : inpEditPrice,
      status : inpEditStatus == 'true'
    }
    try {
      await fetch(`${api}/${idx}`, {
        method : 'PUT',
        headers : {'Content-type':'application/json'},
        body : JSON.stringify(edit)
      })
      get()
      handleEditCancel()
    } catch (error) {
      console.error(error);
    }
  }

  

  let [info,setInfo] = useState(null)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const showInfotModal = () => {
    setIsInfoModalOpen(true);
  };

  // const handleOk = () => {
  //   setIsInfoModalOpen(false);
  // };

  const handleInfoCancel = () => {
    setIsInfoModalOpen(false);
  };


  async function changeStatus(e) {
    let change = {
      ...e,
      status : !e.status
    }
    try {
        await fetch(`${api}/${e.id}`, {
        method : 'PUT',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify(change)
      })
      get()
    } catch (error) {
      console.error(error);
    }
  }

  async function openInfoModal(id) {
    try {
      let response = await fetch(`${api}/${id}`)
      let products = await response.json()
      setInfo(products)
      showInfotModal()
    } catch (error) {
      console.error(error);
    }
  }

  let[status, setStatus] = useState('all')
  

  async function selectStatus() {
    try {
      if (status !== 'all') {
        let response = await fetch(`${api}?status=${status === 'true' ? true : false}`)
        let data = await response.json()
        setData(data)
      } else {
        let response = await fetch(api)
        let data = await response.json()
        setData(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    selectStatus()
  }, [status])

  let [search,setSearch] = useState('')





  return (
    <div>

    <Modal
        title="Info Products"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isInfoModalOpen}
        // onOk={addNewProducts}
        onCancel={handleInfoCancel}
      >
        {info && (
          <div className='flex gap-[20px] items-center'>
            <img className='w-[50%]' src={info.img} alt="" />
            <div className='flex flex-col gap-[10px]'>
            <h1 className='text-[20px] font-[500]'>{info.name}</h1>
            <h1 className='text-[18px] text-[#2dc82d] font-[500]'>{info.price}</h1>
            <h1 className='font-bold'>{info.status ? 'Active' : 'Inactive'}</h1>
            </div>
          </div>
        )}
      </Modal>


      <Modal
        title="Add New Products"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={addNewProducts}
        onCancel={handleCancel}
      >
        <div className='flex flex-col items-center gap-[20px] mt-[35px]'>
        <Input value={inpImage} onChange={(e) => setInpImage(e.target.value)} placeholder="Image..." />
        <Input value={inpName} onChange={(e) => setInpName(e.target.value)} placeholder="Name..." />
        <Input value={inpPrice} onChange={(e) => setInpPrice(e.target.value)} placeholder="Price..." />
        <select value={inpStatus} onChange={(e) => setInpStatus(e.target.value)} className='border px-[50px] py-[7px] font-bold rounded-xl'>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        </div>
      </Modal>


      <Modal
        title="Edit Products"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isEditModalOpen}
        onOk={editProducts}
        onCancel={handleEditCancel}
      >
        <div className='flex flex-col items-center gap-[20px] mt-[35px]'>
        <Input value={inpEditImage} onChange={(e) => setInpEditImage(e.target.value)} placeholder="Image..." />
        <Input value={inpEditName} onChange={(e) => setInpEditName(e.target.value)} placeholder="Name..." />
        <Input value={inpEditPrice} onChange={(e) => setInpEditPrice(e.target.value)} placeholder="Price..." />
        <select value={inpEditStatus} onChange={(e) => setInpEditStatus(e.target.value)} className='border px-[50px] py-[7px] font-bold rounded-xl'>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        </div>
      </Modal>


      <div className='flex items-center justify-between p-[25px]'>
        <div className='hidden sm:flex gap-[25px]'>
          <h3 className='text-[18px] font-[600]'>Shop</h3>
          <h3 className='text-[18px] font-[600]'>Explore</h3>
        </div>
        <img src={image1} alt="" />
        <h3 className='hidden sm:flex text-[18px] font-[600]'>My Cart</h3>
        <button className='sm:hidden'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg></button>
      </div>

      <div  className='container mt-[30px]'>
          <div className='text-[white] w-[80%] m-auto text-center flex flex-col gap-[20px] pt-[110px] sm:pt-[150px]'>
            <h1 className='text-[40px] font-[700] sm:text-[50px]'>The Desk Shelf System</h1>
            <p className='text-[17px] font-[500]'>Available in Walnut or Maple</p>
            <p className='text-[17px] font-[500]'>LEARN MORE</p>
          </div>
      </div>

      <div className='w-[80%] m-auto text-center mt-[70px] flex flex-col gap-[15px] mb-[100px]'>
        <h1 className='text-[35px] font-[500]'>Design Inspires</h1>
        <p className='text-[#A0A0A0] text-[17px] font-[500]'>Build your dream workspace, so you can get your best work done.</p>
        <p className='text-[17px] text-[black] font-[500]'>GET STARTED</p>
      </div>

      <div className='w-[90%] m-auto flex flex-col gap-[30px] sm:flex-row mb-[200px]'>
        <div className='flex flex-col items-center gap-[15px]'>
          <img src={image27} alt="" />
          <h1 className='text-[24px] font-[500]'>Desk Pads</h1>
          <p className='text-[17px] font-[500]'>LEARN MORE</p>
        </div>
        <div className='flex flex-col items-center gap-[15px]'>
          <img src={image2} alt="" />
          <h1 className='text-[24px] font-[500]'>Laptop Stands</h1>
          <p className='text-[17px] font-[500]'>LEARN MORE</p>
        </div>
      </div>

      <div className='w-[80%] m-auto text-center mt-[70px] flex flex-col gap-[15px] mb-[100px]'>
        <h1 className='text-[35px] font-[500]'>Featured Products</h1>
        <p className='text-[#A0A0A0] text-[17px] font-[500]'>See What’s Trending Right Now</p>
        <img src={image3} alt="" />
      </div>

      <div className='w-[90%] m-auto flex flex-col items-center sm:flex-row sm:items-center sm:justify-between mb-[80px]'>
        <div className='flex flex-col gap-[15px] items-center sm:flex-row sm:items-center sm:gap-[50px]'>
        <input value={search} onChange={(e) => setSearch(e.target.value)} className='border px-[50px] py-[7px] rounded-xl font-bold sm:px-[70px]' type="text" placeholder='🔍 Search...' />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className='border  px-[20px] py-[7px] rounded-xl font-bold sm:px-[30px]'>
          <option value="all" key="">All</option>
          <option value="true" key="">Active</option>
          <option value="false" key="">Inactive</option>
        </select>
        </div>
        <Button className='mt-[25px] sm:m-0' type="primary" onClick={showModal}>
        + Add New Products
      </Button>
      </div>

      <div className='w-[90%] m-auto gap-[40px] flex items-center overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide py-4 mb-[180px]'>
        {data.filter((e) => e.name.toLowerCase().includes(search.toLowerCase())).map((e) => {
          return (
            <div key={e.id} className='min-w-[300px]  flex-shrink-0 flex flex-col gap-[15px]'>
              <img className='w-[310px] h-[430px]' src={e.img} alt="" />
              <h3 className='text-[#A0A0A0] text-[18px] font-[500]'>{e.name}</h3>
              <p className='text-[#A0A0A0] font-[700]'>{e.price}</p>
              <div className='flex items-center gap-[20px]'>
                <button onClick={() => openInfoModal(e.id)}  className='hover:text-[green] cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg></button>
                <button onClick={() => openDialog(e)} className='hover:text-[blue] cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg></button>
                <button className='cursor-pointer hover:text-[red]' onClick={() => deleteUser(e.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg></button>
                <input onChange={() => changeStatus(e)} checked={e.status} type="checkbox" />
              </div>
            </div>
          )
        })}
      </div>

      <div  className='container1 mt-[30px] mb-[150px]'>
          <div className='text-[white] w-[80%] m-auto text-center flex flex-col gap-[20px] pt-[110px] sm:pt-[150px]'>
            <h1 className='text-[40px] font-[700] sm:text-[50px]'>Home Office Inspiration</h1>
            <p className='text-[17px] font-[500]'>Working from home can be a challenge—see some creative solutions to get it just right.</p>
            <p className='text-[17px] font-[500]'>LEARN MORE</p>
          </div>
      </div>
      

      <div className='w-[90%] m-auto text-center mt-[70px] flex flex-col gap-[15px] mb-[50px] sm:w-[50%]'>
        <h1 className='text-[35px] font-[500]'>Made The Hard Way</h1>
        <p className='text-[#A0A0A0] text-[17px] font-[500]'>Our signature craftsmanship has been honed over a decade of manufacturing innovation here in Portland, Oregon. We combine the skills of our small in-house team with the collective strength of collaborators throughout the US to deliver quality products worth investing in.</p>
      </div>
        <img className='w-[90%] sm:w-[70%] m-auto mb-[80px]' src={image28} alt="" />
        <div className='w-[90%] m-auto text-center mt-[70px] flex flex-col gap-[15px] mb-[50px] sm:w-[50%]'>
        <h1 className='text-[35px] font-[500]'>Make Work Meaningful</h1>
        <p className='text-[#A0A0A0] text-[17px] font-[500]'>We're here because we believe that your work deserves the best. A team that loves working together is the magic that makes it all happen.</p>
      </div>


      <div className='w-[90%] m-auto flex flex-wrap justify-between gap-[10px] sm:gap-[40px] mb-[100px]'>
        <img className='w-[30%] sm:w-[20%]'  src={image8} alt="" />
        <img className='w-[30%]  sm:w-[20%]'  src={image9} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image10} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image11} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image12} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image13} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image14} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image15} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image16} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image17} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image18} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image19} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image20} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image21} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image22} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image23} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image24} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image25} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image26} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image29} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image30} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image31} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image32} alt="" />
        <img className='w-[30%] sm:w-[20%]' src={image33} alt="" />
      </div>

      <div className='w-[95%] m-auto text-center mt-[70px] flex flex-col gap-[15px] mb-[50px] sm:w-[50%]'>
        <h1 className='text-[35px] font-[500]'>We Hope You'll Join Us</h1>
        <p className='text-[black] text-[17px] font-[500]'>READ MORE ABOUT OUR STORY</p>
      </div>

      <div className='w-[90%] h-[38vh] mt-[150px] m-auto sm:h-[50vh] bg-[#9AA8B1] mb-[100px]'>
      <div className='text-[white] w-[80%]  m-auto text-center flex flex-col items-center gap-[20px] pt-[20px] sm:pt-[100px]'>
            <img src={image34} alt="" />
            <h1 className='text-[40px] font-[500] sm:text-[50px]'>Design Inspires</h1>
            <p className='text-[17px] font-[500]'>Build your dream workspace, so you can get your best work done.</p>
          </div>
      </div>


      <div className='bg-[#F9F9F9] h-[60vh] sm:h-[50vh] py-[25px]'>
        <div className='flex w-[98%] m-auto justify-between p-[10px]'>
          <div className='w-[20%] flex flex-col gap-[15px] items-start'>
            <h3 className='text-[18px] font-[500]'>Shop</h3>
            <h3 className='text-[18px] font-[500]'>About</h3>
            <h3 className='text-[18px] font-[500]'>Journal</h3>
            <h3 className='text-[18px] font-[500]'>Support</h3>
            <h3 className='text-[18px] font-[500]'>COVID-19 Info</h3>
            <h3 className='text-[18px] font-[500]'>Order Status</h3>
            <h3 className='text-[18px] font-[500]'>Corporate Sales</h3>
          </div>
          <div className='w-[70%]  flex flex-col gap-[15px] sm:w-[40%] sm:absolute sm:left-[25%]'>
            <h3 className='text-[20px] font-[500]'>Newsletter Signup</h3>
            <p className='text-[#A0A0A0] text-[17px] font-[500] border-b-1 pb-[70px] sm:pb-[100px]'>Sign up to our Newsletter to hear about new product releases, learn about our design process, and everything else going on behind the scenes at Grovemade.</p>
          </div>
        </div>
      </div>
      <div className='hidden sm:flex gap-[15px] bg-[#F9F9F9] py-[20px] justify-end pr-[70px]'>
        <p className='text-[#707A7F] text-[17px] font-[500]'>©2020 Grovemade</p>
        <p className='text-[#707A7F] text-[17px] font-[500]'>Terms & Conditions</p>
        <p className='text-[#707A7F] text-[17px] font-[500]'>Privacy Policy</p>
        <p className='text-[black] text-[17px] font-[500]'>Site by Department</p>
      </div>
      <img className='hidden sm:block absolute top-[1042%] left-[90%]' src={image35} alt="" />

    </div>
  )
}

export default App