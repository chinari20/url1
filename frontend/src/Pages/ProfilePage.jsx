import { Avatar } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { Stack} from '@mantine/core';
import { Text } from '@mantine/core';
import Service from '../utils/http';
const service = new Service()


export default function ProfilePage() {
    const[user,setUser] = useState({});
    async function getMyData() {
        try{
            let data = await service.get("user/me");
            setUser(data);
        }
        catch(error){
            console.log(error);
        }
    }
  useEffect(()=>{
      getMyData();

  },[])
  return ( 
    <div>
        <Stack
      h={300}
      bg="var(--mantine-color-body)"
      align="center"
      justify="center"
      gap="md"
    >
        <Text size="lg">This is my profilePage</Text>
        <Avatar src={user.avatar} alt = "it's me"/>
        <img src={user.avatar} alt="me"/>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
        <Text>show the id</Text>
        </Stack>
    </div>
  )
}
