import { Button, Container, Stack } from '@mantine/core'
import { TextInput } from '@mantine/core';
import React, { useState } from 'react'
import { Text } from '@mantine/core';
import Service from '../utils/http';

const service = new Service();
export default function UrlShortner() {


    async function generateShortUrl() {
        try{
            let data = await service.post("s",input);
            setResponse(data);
            console.log(data);
        } catch(error){
            console.log(error);
        }
        
    }
    const [input,setInput] = useState({
        "originalUrl":"",
        "expiresAt":"",
        "title":"",
        "customUrl":""
    })

    const [response, setResponse] = useState(null);
  return (
    <Container size={"xs"}>
        {response?<>{response.shortCode}</>:
        <Stack m="xl"> 
            <Text size="30px"style={{"textShadow":"1px 2px 3px"}}>Show your URL</Text>
            <TextInput onChange={(e)=>{
                setInput({...input,originalUrl:e.target.value});
            }} required label="Original Url"/>

             
                <TextInput onChange={(e)=>{setInput({...InputDescription,customUrl:e.target.value});}}
                label="custom url"
                placeholder="Input placeholder"
                />
                <TextInput onChange={(e)=>{setInput({...input,title:e.target.value});}}
                label="title input"
                placeholder="Input placeholder"
                />
                <TextInput onChange={(e)=>{setInput({...input,expiresAt:e.target.value});}}
                label="date of Expiry"
                placeholder="Input placeholder"
                />
                <Button disabled={input.originalUrl.length<5} onClick={()=>{generateShortUrl()}}>
                    Generate short url
                </Button>
        </Stack>}
    </Container>
  )
}
