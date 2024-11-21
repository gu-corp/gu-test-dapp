import { useAccount, useConnect, useDisconnect } from 'wagmi'
import Button from '@mui/material/Button';
import { getConnectorClient } from '@wagmi/core'
import { mainnet, polygon, sepolia } from '@wagmi/core/chains'
import { config } from './wagmi.ts'
import { addChain, switchChain } from 'viem/actions'

const fakeTargetChain = sepolia;

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const handleSwitchChain = async () => {
    try{
      const walletClient = await getConnectorClient(config)
      console.log(walletClient)
      await switchChain(walletClient, { id: fakeTargetChain.id })
    }catch(e){
      console.error(e);
    }
  }

  const handleAddChain = async () => {
    try{
      const walletClient = await getConnectorClient(config)
      console.log(walletClient)
      await addChain(walletClient, { chain: fakeTargetChain })
    }catch(e){
      console.error(e);
    }
  }

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <Button onClick={() => disconnect()}>
            Disconnect
          </Button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <Button
            key={connector.uid}
            onClick={() => connect({ connector })}
            variant="outlined"
            style={{ marginRight: 8 }}
          >
            {connector.name}
          </Button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>


        <Button onClick={handleAddChain}>
          Add {fakeTargetChain.name} network
        </Button>

        <Button onClick={handleSwitchChain}>
          Switch to {fakeTargetChain.name} network
        </Button>

      </div>
    </>
  )
}

export default App
