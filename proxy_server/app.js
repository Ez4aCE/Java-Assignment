const express = require('express');
const axios = require('axios');
var cors = require('cors')
const app = express();
const port = 3000; 

app.use(express.json());
app.use(cors())
app.post('/login', async (req, res) => {
    console.log("login request")
    const url = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp';
    
    try {
        const response = await axios.post(url, req.body);
        res.status(response.status).json(response.data);
        console.log(response.data)
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Proxy error' });
    }
});

app.post('/getCustomerList', async (req, res) => {
    console.log("getCustomerList request");
    const url = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list';
    console.log(req.body.token)
    try {
        const response = await axios.get(url, {
            params: {
                cmd: 'get_customer_list'
            },
            headers: {
                Authorization: `Bearer ${req.body.token}`
            }
        });
        res.status(response.status).json(response.data);
        console.log(res.data)
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Proxy error' });
    }
});

app.post('/deleteCustomer', async (req, res) => {
    console.log("deleteCustomer request");
    const url = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
    
    try {
        const response = await axios.post(url, null, {
            params: {
                cmd: req.body.cmd,
                uuid: req.body.uuid
            },
            headers: {
                Authorization: `Bearer ${req.body.token}`
            }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Proxy error' });
    }
});


app.post('/addCustomer', async (req, res) => {
    console.log("addCustomer request");
    const url = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
    console.log(req.body)
    const requestData = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "street": req.body.street,
        "address": req.body.address,
        "city": req.body.city,
        "state": req.body.state,
        "email": req.body.email,
        "phone": req.body.email
        };
    console.log(requestData)
    try {
        const response = await axios.post(url, requestData, {
            params: {
                cmd: "create",
            },
            headers: {
                Authorization: `Bearer ${req.body.token}`
            }
        });
        console.log(response.status,response.data)
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Proxy error' });
    }
});

app.post('/updateCustomer', async (req, res) => {
    console.log("updateCustomer request");
    const url = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
    console.log(req.body.data)
    
    try {
        const response = await axios.post(url, req.body.data, {
            params: {
                cmd: "update",
                uuid: req.body.uuid,
            },
            headers: {
                Authorization: `Bearer ${req.body.token}`
            }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Proxy error' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});
