require("dotenv").config();
const express = require('express');
const axios = require("axios");
const cron = require('node-cron');

 
const app = express();

  function fetchUsers(){
    const username = process.env.API_KEY
    const password = ''
    const token = `${username}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');
    const session_url = process.env.API_ALL_USERS

    var config = {
      method: 'GET',
      url: session_url,
      headers: { 'Authorization': 'Basic '+ encodedToken }
    };

    axios(config)
      .then(function (response) {
        const allUsers = JSON.stringify(response.data)
        console.log(allUsers.length)
      })
      .catch(function (error) {
      console.log('error', error);
      });

}




const boot = () => {
  cron.schedule(('0 */1 * * * *'), () => {
    fetchUsers()
    console.log('Run task every minute');
  });
  
  const PORT = 4000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
boot();




//this code just test to convert to CSV files
        // const user = [{
        //   name: 'John',
        //   username: 'johnja',
        // },
        // {
        //   name: 'John2',
        //   username: 'johnja2',
        // },
        // ]
      
     
        // const createWriter = require('csv-writer').createObjectCsvWriter
        // const csvWriter = createWriter({
        //   path: 'test_output.csv',
        //   header: [
        //     {id: "name" , title: "name"},
        //     {id: "username", title: "username"}
        //   ]
        // })
        // csvWriter
        //   .writeRecords(user)
        //   .then(()=> console.log('successfully'))
      // console.log(allUsers);