import { useState, useEffect } from 'react';
import { web3Enable, web3Accounts, web3FromSource } from '@polkadot/extension-dapp';
import { stringToU8a } from '@polkadot/util';
import Identicon from '@polkadot/react-identicon';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { requests } from '../utils/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [account, setAccount] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [isConnecting, setIsConnecting] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [signMessage, setSignMessage] = useState<string>("");

    const navigate = useNavigate();

    const connect = async () => {
        setIsConnecting(true);
        try {
            const extensions = await web3Enable('Connect to my wallet');
            if (extensions.length === 0) {
                setError('No extension found');
                return;
            }
            const allAccounts = await web3Accounts();
            if (allAccounts.length === 0) {
                setError('No accounts found');
                return;
            }
            setAccount(allAccounts[0].address);
            setIsConnected(true);
            setStatus('Connected');
        } catch (error) {
            setStatus('Error connecting');
        }
        setIsConnecting(false);
    };

    const SignMessage = async () => {
        try {
            const allAccounts = await web3Accounts();
            if (allAccounts.length === 0) {
                setError('No accounts found');
                return;
            }
            const account = allAccounts[0];
            // get the pair and the message to sign
            const pair = await web3FromSource(account.meta.source);
            const message = stringToU8a(signMessage);
            // sign the message
            const { signature } = await pair.signer.signRaw({ address: account.address, data: message, type: 'bytes' });
            SignIn(signature);
            console.log(signature)
        } catch (error) {
            setStatus('Error signing message');
        }
    };

    const SignIn = async (signature:string) => {
        requests.post('v1/signin', {
            address: account,
            message: signMessage,
            signature: signature
        }, {}).then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
            }).then(() => {
                localStorage.setItem('litauth', response.access_token);
                navigate('/dashboard')
            })
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        })
    }

    return (
        <div>
            <Box>
                <h2 style={{marginLeft: '600px'}}>Login</h2>
                {
                    error && (
                        <div>
                            <p>{error}</p>
                        </div>
                    )
                }
                <Stack spacing={2} direction="column">
                    <Stack spacing={2} direction="row">

                        {/* <Button variant="contained" onClick={connect} disabled={isConnecting}>{isConnecting ? 'Connecting...' : 'ConnectWallet'}</Button> */}
                        <Fab variant="extended" sx={{ width: '75%' }} onClick={connect} disabled={isConnecting}>
                            <Identicon
                                value={`${account}`}
                                size={32}
                                theme={'polkadot'}
                            />
                            {isConnecting ? 'Connecting...' : isConnected ? account : 'Connect Wallet'}
                        </Fab>
                    </Stack>
                    {
                        isConnected && account && (
                            <Stack spacing={2} direction="column">
                                <Stack spacing={2} direction="row">
                                    <TextField id="outlined-basic" label="Message to sign" variant="outlined" sx={{ width: '75%' }} onChange={(e) => setSignMessage(e.target.value)} />
                                </Stack>
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" sx={{ width: '75%' }} onClick={() => SignMessage()}>Login</Button>
                                </Stack>
                            </Stack>
                        )
                    }
                </Stack>
            </Box>
        </div>
    )
}

export default Login;
