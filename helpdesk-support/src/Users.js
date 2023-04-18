
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useState, useEffect } from 'react';
  
export default function Users() {
  useEffect(()=>{
    const token = localStorage.getItem('token')
    async function postJSON() {
      try {
      const response = await fetch("http://localhost:3333/authen", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+token
          },
      });
      const result = await response.json();
      if(result.status === 'ok'){
          //alert(' succes') 
      }else{
          alert(' fail')
          localStorage.removeItem('token');
          window.location = '/'
      }
      
      console.log("Success:", result);
      } catch (error) {
      console.error("Error:", error);
      }
    } 
    postJSON();
  }, [])
  const [items, setItems] = useState([]);
  const [itemsfilter, setItemsfilter] = useState([]);
  const [menu, setMenu] = useState('');
  useEffect(() => {
    fetch("http://localhost:3333/create")
  .then(res => res.json())
  .then(
    (result) => {
      setItemsfilter(result);
      setItems(result);
    }
  )
  }, [])

  const handleChange = (event) => {
    setMenu(event.target.value);
    const m = event.target.value;
    if(m === "All"){
      setItems(itemsfilter);
    }else{
      const group = itemsfilter.filter((element)=>{
        return element.status === m
      })
      setItems(group);
    }
  };
  return (
    <React.Fragment>
      <CssBaseline />
      
      <Container maxWidth="lg" sx={{ p:3 }} >
        <Paper sx={{p:2}}>
            <Box display={'flex'}  >
                <Box sx={{flexGrow:1}}>
                    <Typography variant='h6' gutterBottom component="div">User</Typography></Box>
                <Box>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={menu}
                        label="Staus"
                        sx={{width:90, height:40,margin: 1}}
                        onChange={handleChange}
                    >
                        <MenuItem value={"All"}>All</MenuItem>
                        <MenuItem value={"pending"}>pending</MenuItem>
                        <MenuItem value={"accepted"}>accepted</MenuItem>
                        <MenuItem value={"resolved"}>resolved</MenuItem>
                        <MenuItem value={"rejected"}>rejected</MenuItem>
                        
                    </Select>
                    </FormControl>
                    
                </Box>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell align="left">Title</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="right">Contact</TableCell>
                        <TableCell align="right">STATUS</TableCell>
                        <TableCell align="right">Last update</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {items.map((row) => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{row.username}</TableCell>
                        <TableCell align="left">{row.title}</TableCell>
                        <TableCell align="left">{row.description}</TableCell>
                        <TableCell align="right">{row.contact}</TableCell>
                        <TableCell align="right"><h4 >{row.status}</h4></TableCell>
                        <TableCell align="right">{row.lastupdate}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}