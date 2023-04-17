import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBar from "./navbar";

export default function EditUser() {
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [status, setStatus] = useState(''); 
    const timestamp = Date.now();
    const L = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp);

    const { id } = useParams();
    useEffect(() => {
        var requestOptions ={
            method: 'GET',
            redirect: 'follow'
        };
        fetch("http://localhost:3333/edit/"+id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                if(result['status'] === 'ok'){
                    setUsername(result.user[0].username)
                    setTitle(result.user[0].title)
                    setDescription(result.user[0].description)
                    setEmail(result.user[0].email)
                    setContact(result.user[0].contact)
                    setStatus(result.user[0].status)
                }
            })
            .catch(error => console.log('error',error));
      }, [id])

    
    const handleSubmit = event => {
        event.preventDefault();

    const jsonData = {
        id: id,
        username: username,
        title: title,
        description: description,
        email: email,
        contact: contact,
        status: status,
        lastupdate: L
    }
    async function postJSON(jsonData) {
        try {
        const response = await fetch("http://localhost:3333/edit", {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        });
        const result = await response.json();
        if(result.status === 'ok'){
            alert('update succes') 
            window.location.href = '/home';
        }else{
            alert('update fail')
        }
        
        console.log("Success:", result);
        } catch (error) {
        console.error("Error:", error);
        }
    }postJSON(jsonData);
  }
  return (
    <div>
        <NavBar />
        <Container sx={{ p:5 }} maxWidth="sm">    
        <div>    
            <Typography component="h1" variant="h5">
                Update User
            </Typography>
            <form onSubmit={handleSubmit}>
            <Grid container sx={{ pt:2 }} spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="User"
                    name="UserName"
                    variant="outlined"
                    required
                    fullWidth
                    id="UserName"
                    label="User Name"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    autoFocus
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="Title"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="Description"
                    label="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="Contact"
                    label="Contact"
                    onChange={(e) => setContact(e.target.value)}
                    value={contact}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="Status"
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                />
                </Grid>
                <Grid item xs={12}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Update
                </Button>
                </Grid>
            </Grid>
            </form>
        </div>
        </Container>
    </div>
  );
}