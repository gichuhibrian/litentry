import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requests } from "../utils/api";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const token = localStorage.getItem("litauth");
function Dashboard() {
    const [secret, setSecret] = useState<string>('');
    const navigate = useNavigate();
    const getSecret = async () => {
        await requests.get('v1/secret', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setSecret(response.secret)
        }).catch((error) => {
            console.log(error)
        })
    }
    const logout = () => {
        localStorage.removeItem("litauth");
        navigate("/login");
    }
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [])
    return (
        <div>
            <Stack direction="column" spacing={2} style={{ marginLeft: '400px' }}>
                <Stack direction="row" spacing={2}>
                    <h2 style={{ marginLeft: '250px' }}>Welcome</h2>
                    <Button variant="outlined" onClick={logout}>Logout</Button>
                </Stack>
                <Button variant="contained" sx={{ width: '50%' }} onClick={getSecret}>Get Secret</Button>
                <h5>{secret}</h5>
            </Stack>
        </div>
    )
}

export default Dashboard;