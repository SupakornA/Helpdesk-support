import './FormComponent.css'
import {useState} from "react"

const FormComponent = ()=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [fullname,setFullname] = useState('')
    const [emaillogin,setEmaillogin] = useState('')
    const [passwordlogin,setPasswordlogin] = useState('')
    
    const [errorEmail,setErrorEmail] = useState('')
    const [errorPassword,setErrorPassword] = useState('')
    const [emailColor,setEmailColor] = useState('')
    const [passwordColor,setPasswordColor] = useState('')
    
    const [errorEmaillogin,setErrorEmaillogin] = useState('')
    const [errorPasswordlogin,setErrorPasswordlogin] = useState('')
    const [emailColorlogin,setEmailColorlogin] = useState('')
    const [passwordColorlogin,setPasswordColorlogin] = useState('')
    
    
    const validateForm = (e)=>{
        e.preventDefault()
        if(email.includes('@')){
            setErrorEmail('')
            setEmailColor('green')
        }else{
            setErrorEmail('รูปแบบอีเมลไม่ถูกต้อง')
            setEmailColor('gainsboro')
        }
        if(password.length>=8){
            setErrorPassword('')
            setPasswordColor('green')
        }else{
            setErrorPassword('รหัสผ่านต้องมีจำนวน 8 ตัวอักษร')
            setPasswordColor('gainsboro')
        }
        
        const jsonData = {
            email: email,
            password: password,
            fullname: fullname,
        }
            console.log("Su:", jsonData);
            async function postJSON(jsonData) {
                try {
                const response = await fetch("http://localhost:3333/register", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(jsonData),
                });
                const result = await response.json();
                if(result.status === 'ok'){
                    alert('register succes') 
                }else{
                    alert('register fail')
                }
                
                console.log("Success:", result);
                } catch (error) {
                console.error("Error:", error);
                }
            }postJSON(jsonData);
    } 

    const validateFormlogin = (e)=>{
        e.preventDefault()
        if(emaillogin.includes('@')){
            setErrorEmaillogin('')
            setEmailColorlogin('green')
        }else{
            setErrorEmaillogin('รูปแบบอีเมลไม่ถูกต้อง')
            setEmailColorlogin('red')
        }
        if(passwordlogin.length>=8){
            setErrorPasswordlogin('')
            setPasswordColorlogin('green')
        }else{
            setErrorPasswordlogin('รหัสผ่านต้องมีจำนวน 8 ตัวอักษร')
            setPasswordColorlogin('red')
        }

        const jsonData = {
            email: emaillogin,
            password: passwordlogin,
        }
        async function postJSON(jsonData) {
            try {
            const response = await fetch("http://localhost:3333/login", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(jsonData),
            });
            const result = await response.json();
            if(result.status === 'ok'){
                alert('login succes') 
                localStorage.setItem('token', result.token)
                window.location = '/home'
            }else{
                alert('login fail')
            }
            
            console.log("Success:", result);
            } catch (error) {
            console.error("Error:", error);
            }
        }postJSON(jsonData);
    }


    const [wrap, setWrap] = useState(true);
    const toggleWrap = ()=>setWrap(!wrap)
  
    return(
        <body className='bo-dy'>
        <div className="container">
            
            <form className={wrap ? "form" : "form2"} onSubmit={validateForm}>
                <h2 onClick={toggleWrap}>Signup</h2>
                <div className="form-control">
                    <input type="text" placeholder="Full name" value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
                    <small style={{color:emailColor}}></small>
                    <input type="text" placeholder="Email address" value={email} onChange={(e)=>setEmail(e.target.value)} style={{borderColor:emailColor}}/>
                    <small style={{color:emailColor}}>{errorEmail}</small>
                    <input type="text" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{borderColor:passwordColor}}/>
                    <small style={{color:passwordColor}}>{errorPassword}</small>
                </div>
                <button className='btn' type="submit">Signup</button>
            </form>
            <form className={wrap ? "form-login" : "login"} onSubmit={validateFormlogin}>
                <h2 onClick={toggleWrap} >Login</h2>
                <div className="form-control">
                    <div className='form-control2'>
                        <input type="text" placeholder="Email address" value={emaillogin} onChange={(e)=>setEmaillogin(e.target.value)} style={{borderColor:emailColorlogin}}/>
                        <small style={{color:emailColorlogin}}>{errorEmaillogin}</small>
                        <input type="text" placeholder="Password" value={passwordlogin} onChange={(e)=>setPasswordlogin(e.target.value)} style={{borderColor:passwordColorlogin}}/>
                        <small style={{color:passwordColorlogin}}>{errorPasswordlogin}</small>
                    </div>
                </div>
                <button className='btnlogin' type="submit">Login</button>
            </form>
        </div>
        </body>
    )
}

export default FormComponent