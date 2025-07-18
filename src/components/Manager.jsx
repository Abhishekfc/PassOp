import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async()=>{
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {

            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"

        }
    }

    const savePassword = async () => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>3){

            //if any such id exist in the db, delete it
            await fetch("http://localhost:3000/", {method: "DELETE", headers: {"content-Type": "application/json"},
                body: JSON.stringify({id: form.id}) })

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", {method: "POST", headers: {"content-Type": "application/json"},
                body: JSON.stringify({...form, id: uuidv4() }) })
            
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                
            });
        }

        else{
             toast('Password not saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        }
    }
    const deletePassword = async (id) => {
        let c = confirm("Do you really wnat to delete Password?")

        if (c) {

            console.log("Deleting password with id " + id)
            setPasswordArray([...passwordArray.filter(item => item.id !== id)])
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray.filter(item => item.id !== id)]))
            let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"content-Type": "application/json"},
                body: JSON.stringify({ id}) })
        }
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        // console.log([...passwordArray, form])
    }
    const editPassword = (id) => {
        console.log("Editing password with id " + id)
        setform({...passwordArray.filter(i => i.id === id)[0], id: id})
        setPasswordArray([...passwordArray.filter(item => item.id !== id)])
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form, id:uuidv4()}]))
        // console.log([...passwordArray, form])
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"

            />
            {/* <div className="absolute inset-0 z-[-2] overflow-hidden bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,255,128,0.13)_0,rgba(0,255,128,0)_50%,rgba(0,255,128,0)_100%)]"></div> */}

            {/* <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div> */}


            <div className="py-6 mycontainer min-h-[88.2vh] max-w-3/4">
                <h1 className="logo font-bold text-4xl text-bold text-center">

                    <span className='text-green-700'> &lt;</span>
                    <span>Pass</span>
                    <span className="text-green-500">OP/&gt;</span></h1>
                <p className='text-green-700 text-lg text-center'>Your own Passsword Manager</p>


                <div className=" flex flex-col p-4 gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='bg-white rounded-3xl border border-green-500 w-full p-4 py-1' type="text" name="site" id="" />
                    <div className="flex justify-between w-full gap-4">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='bg-white rounded-3xl border border-green-500 w-full p-4 py-1' type="text" name="username" id="" />

                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='bg-white rounded-3xl border border-green-500 w-full p-4 py-1' type="password" name="password" id="" />
                            <span className="absolute right-[3px] top-[2px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className="p-1" width={30} src="/icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex gap-2 justify-center items-center bg-green-400 hover:bg-green-300 px-6 py-2 rounded-3xl w-fit border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>Save Password</button>

                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Paswords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full overflow-hidden rounded-md">
                            <thead className='bg-green-800 text-white' >
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {

                                    return <tr key={index}>

                                        <td className=' justify-center py-2 border border-white text-center '>

                                            <div className="flex justify-center items-center" >
                                                <a href={item.site} target='_blank'><span>{item.site}</span></a>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.site)}>

                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">

                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' justify-center  py-2 border border-white text-center '>

                                            <div className="flex justify-center items-center" >
                                                <span>{item.username}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.username)}>

                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">

                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='  justify-center  py-2 border border-white text-center '>
                                            <div className="flex justify-center items-center" >
                                                <span>{"*".repeat(item.password.length)}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.password)}>

                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">

                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='  justify-center  py-2 border border-white text-center '>
                                            <span className='cursor-pointer mx-1' onClick={() => editPassword(item.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => deletePassword(item.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "Width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>}
                </div>
            </div >
        </>
    )
}

export default Manager
